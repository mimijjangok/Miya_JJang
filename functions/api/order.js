// Cloudflare Pages Functions: /api/order
// 포트폴리오 목록 순서 저장. Cloudflare 설정에 KV 바인딩 ORDER_KV 와 환경 변수 ADMIN_PASSWORD 가 있어야 저장됩니다.
// GET  /api/order?cat=<분류>  → { order: [slug, ...] }
// POST /api/order  { cat, order, password } → 비밀번호가 맞으면 저장

const SLUG = /^[a-z0-9-]{1,80}$/;
const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });

function same(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string' || a.length !== b.length) return false;
  let r = 0;
  for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
}

export async function onRequestGet({ request, env }) {
  const cat = new URL(request.url).searchParams.get('cat') || '';
  if (!SLUG.test(cat) || !env.ORDER_KV) return json({ order: [] });
  const raw = await env.ORDER_KV.get('order:' + cat);
  let order = [];
  try { order = JSON.parse(raw || '[]'); } catch { order = []; }
  return json({ order: Array.isArray(order) ? order.filter((s) => SLUG.test(s)) : [] });
}

export async function onRequestPost({ request, env }) {
  if (!env.ORDER_KV || !env.ADMIN_PASSWORD) return json({ error: 'not_configured' }, 503);
  let b;
  try { b = await request.json(); } catch { return json({ error: 'bad_request' }, 400); }
  if (!same(String(b.password || ''), env.ADMIN_PASSWORD)) return json({ error: 'wrong_password' }, 401);
  const cat = String(b.cat || '');
  const order = Array.isArray(b.order) ? b.order.map(String).filter((s) => SLUG.test(s)).slice(0, 300) : null;
  if (!SLUG.test(cat) || !order) return json({ error: 'bad_request' }, 400);
  await env.ORDER_KV.put('order:' + cat, JSON.stringify(order));
  return json({ ok: true, order });
}
