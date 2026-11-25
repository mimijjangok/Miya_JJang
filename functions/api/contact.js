// Cloudflare Pages Functions: POST /api/contact
// (모두바 사이트의 의뢰 접수와 같은 방식. Cloudflare 설정에 RESEND_API_KEY, NOTIFY_EMAIL 을 넣어야 메일이 갑니다.)
// 의뢰 접수 → 이메일(Resend)로 알림 발송. 발송 실패 시 502.

const MAX = { ref: 50, name: 50, phone: 20, email: 100, company: 100, budget: 30, due: 100, body: 3000 };
const clip = (v, n) => String(v ?? '').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').trim().slice(0, n);
const list = (a) => (Array.isArray(a) ? a.map((x) => clip(x, 20)).filter(Boolean).slice(0, 10) : []);

function normalize(b) {
  return {
    ref: clip(b.ref, MAX.ref),
    types: list(b.types),
    scope: list(b.scope),
    name: clip(b.name, MAX.name),
    phone: clip(b.phone, MAX.phone),
    email: clip(b.email, MAX.email),
    company: clip(b.company, MAX.company),
    budget: clip(b.budget, MAX.budget),
    due: clip(b.due, MAX.due),
    body: clip(b.body, MAX.body),
    hp: clip(b.hp, 10),
  };
}

function valid(d) {
  return d.types.length && d.name && d.phone.replace(/\D/g, '').length >= 9 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email) && d.body.length >= 10;
}

function buildText(d) {
  const L = [`[MI3 포트폴리오 새 의뢰]`, `유형: ${d.types.join(', ')}`];
  if (d.ref) L.push(`보던 작업: ${d.ref}`);
  if (d.scope.length) L.push(`범위: ${d.scope.join(', ')}`);
  L.push(`이름: ${d.name}`, `연락처: ${d.phone}`, `이메일: ${d.email}`);
  if (d.company) L.push(`브랜드: ${d.company}`);
  if (d.budget && d.budget !== '미정') L.push(`예산: ${d.budget}`);
  if (d.due) L.push(`일정: ${d.due}`);
  L.push('', d.body);
  return L.join('\n');
}

async function sendEmail(d, env) {
  const { RESEND_API_KEY, NOTIFY_EMAIL, MAIL_FROM } = env;
  if (!RESEND_API_KEY || !NOTIFY_EMAIL) throw new Error('email env missing');
  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: MAIL_FROM || 'MI3 Portfolio <onboarding@resend.dev>',
      to: [NOTIFY_EMAIL],
      reply_to: d.email,
      subject: `[포트폴리오 의뢰] ${d.name} · ${d.types.join(', ')}${d.ref ? ' · ' + d.ref : ''}`,
      text: buildText(d),
    }),
  });
  if (!r.ok) throw new Error('email ' + r.status + ' ' + (await r.text()));
}

const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
  });

export async function onRequestPost({ request, env }) {
  let body = {};
  try { body = await request.json(); } catch { body = {}; }
  const d = normalize(body || {});
  if (d.hp) return json({ ok: true }); // 스팸봇(허니팟)은 조용히 성공 처리
  if (!valid(d)) return json({ ok: false, error: 'invalid' }, 400);
  try {
    await sendEmail(d, env);
    return json({ ok: true });
  } catch (e) {
    console.error('[email]', e.message);
    return json({ ok: false }, 502);
  }
}

// POST 외 요청은 405
export async function onRequest() {
  return json({ ok: false }, 405);
}
