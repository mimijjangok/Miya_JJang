import {
  W, H, Scene, prog, lerp, clamp, easeOutBack, easeOutCubic, easeInOut3, easeOutBounce, hash, rng, mix,
  KR, roundRect,
} from "./util";

// ───────── No.09 베이퍼웨이브 ─────────
const ICO = (() => {
  const p = (1 + Math.sqrt(5)) / 2;
  const v = [[-1, p, 0], [1, p, 0], [-1, -p, 0], [1, -p, 0], [0, -1, p], [0, 1, p], [0, -1, -p], [0, 1, -p], [p, 0, -1], [p, 0, 1], [-p, 0, -1], [-p, 0, 1]];
  const e: number[][] = [];
  for (let i = 0; i < 12; i++) for (let j = i + 1; j < 12; j++) {
    const d = Math.hypot(v[i][0] - v[j][0], v[i][1] - v[j][1], v[i][2] - v[j][2]);
    if (Math.abs(d - 2) < 0.01) e.push([i, j]);
  }
  return { v, e };
})();

const column = (c: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) => {
  const g = c.createLinearGradient(x, 0, x + w, 0);
  g.addColorStop(0, "#F3C4E4"); g.addColorStop(0.5, "#FFE6F6"); g.addColorStop(1, "#D9A1CF");
  c.fillStyle = g; c.fillRect(x, y + 50, w, h - 100);
  c.strokeStyle = "rgba(170,90,150,0.35)"; c.lineWidth = 3;
  for (let i = 1; i < 6; i++) { c.beginPath(); c.moveTo(x + (w * i) / 6, y + 60); c.lineTo(x + (w * i) / 6, y + h - 60); c.stroke(); }
  c.strokeStyle = "rgba(150,90,160,0.25)"; c.lineWidth = 2;
  for (let i = 0; i < 5; i++) { c.beginPath(); c.moveTo(x + hash(i + x) * w, y + 80 + i * 120); c.quadraticCurveTo(x + w / 2, y + 140 + i * 120, x + hash(i + 3) * w, y + 200 + i * 120); c.stroke(); }
  c.fillStyle = "#FBD5EE"; c.fillRect(x - 24, y, w + 48, 30); c.fillRect(x - 12, y + 30, w + 24, 22);
  c.fillRect(x - 12, y + h - 52, w + 24, 22); c.fillRect(x - 24, y + h - 30, w + 48, 30);
};

export const vaporwave: Scene = {
  draw(c, t) {
    const track = (t < 0.25 ? 1 - t / 0.25 : 0) + (t > 2.2 && t < 2.45 ? Math.sin(Math.PI * prog(t, 2.2, 2.45)) : 0);
    const HZ = 640;
    const sky = c.createLinearGradient(0, 0, 0, HZ);
    sky.addColorStop(0, "#FF9CEE"); sky.addColorStop(0.55, "#B967FF"); sky.addColorStop(1, "#62E8FF");
    c.fillStyle = sky; c.fillRect(0, 0, W, HZ);
    c.fillStyle = "#fff";
    for (let i = 0; i < 16; i++) {
      const a = Math.max(0, Math.sin(t * 4 + i * 1.7)); if (a < 0.3) continue;
      const x = hash(i) * W, y = hash(i + 30) * (HZ - 80), s = 10 * a + 4;
      c.globalAlpha = a; c.fillRect(x - s, y - 2, s * 2, 4); c.fillRect(x - 2, y - s, 4, s * 2); c.globalAlpha = 1;
    }
    // 바다
    c.fillStyle = "#2A0848"; c.fillRect(0, HZ, W, H - HZ);
    for (let i = 0; i < 26; i++) {
      const z = 26 - ((t * 7 + i) % 26);
      const y = HZ + 2400 / (z + 4) - 2400 / 30;
      c.strokeStyle = i % 2 ? "rgba(0,255,230,0.75)" : "rgba(255,110,220,0.75)";
      c.lineWidth = Math.max(1, 8 / (z * 0.4 + 1));
      c.beginPath(); c.moveTo(0, y); c.lineTo(W, y); c.stroke();
    }
    // 기둥
    const cr = easeOutBack(prog(t, 0, 0.6), 1.2);
    column(c, 70, lerp(H + 40, 250, cr), 140, 820);
    column(c, W - 210, lerp(H + 40, 250, easeOutBack(prog(t, 0.08, 0.68), 1.2)), 140, 820);
    // 정이십면체
    const sc = easeOutBack(prog(t, 0.2, 0.7), 2.2) * 210;
    if (sc > 0) {
      const ax = t * 0.9, ay = t * 1.3;
      const P = ICO.v.map(([x, y, z]) => {
        let X = x * Math.cos(ay) + z * Math.sin(ay), Z = -x * Math.sin(ay) + z * Math.cos(ay);
        let Y = y * Math.cos(ax) - Z * Math.sin(ax); Z = y * Math.sin(ax) + Z * Math.cos(ax);
        const f = 5 / (5 + Z);
        return [W / 2 + X * sc * f * 0.55, 560 + Y * sc * f * 0.55];
      });
      c.save(); c.shadowColor = "#FF4FD8"; c.shadowBlur = 20; c.strokeStyle = "#FF7AE4"; c.lineWidth = 4;
      c.beginPath(); ICO.e.forEach(([i, j]) => { c.moveTo(P[i][0], P[i][1]); c.lineTo(P[j][0], P[j][1]); }); c.stroke();
      c.shadowColor = "#7DFFD9"; c.fillStyle = "#9DFFE4";
      P.forEach(([x, y]) => { c.beginPath(); c.arc(x, y, 8, 0, 7); c.fill(); });
      c.restore();
    }
    // SOFT MEMORY
    const title = "SOFT MEMORY";
    c.font = `italic 700 118px 'EB Garamond', Georgia, serif`; c.textBaseline = "middle";
    const tw = c.measureText(title).width;
    let x = W / 2 - tw / 2;
    [...title].forEach((ch, i) => {
      const p = easeOutBounce(prog(t, 0.15 + i * 0.05, 0.6 + i * 0.05));
      const y = lerp(-120, 200, p);
      const w = c.measureText(ch).width;
      if (p > 0) {
        ["#7A3BFF", "#21E3E0", "#FF5FD2"].forEach((col, k) => { c.fillStyle = col; c.fillText(ch, x + (3 - k) * 7, y + (3 - k) * 7); });
        c.fillStyle = "#fff"; c.fillText(ch, x, y);
      }
      x += w;
    });
    // 일본어 띠
    const jp = easeOutCubic(prog(t, 0.95, 1.3));
    if (jp > 0) {
      c.save(); c.translate(W / 2, 315); c.scale(jp, 1);
      c.fillStyle = "#8FFFD9"; c.fillRect(-300, -34, 600, 68);
      c.fillStyle = "#3A145E"; c.font = `600 40px 'Noto Sans JP', ${KR}`; c.textAlign = "center"; c.fillText("やわらかな記憶", 0, 2);
      c.restore(); c.textAlign = "left";
    }
    // CD
    const cd = prog(t, 1.15, 2.75);
    if (cd > 0 && cd < 1) {
      const e = easeInOut3(cd), cx = lerp(-150, W + 150, e), cy = lerp(H + 120, -120, e);
      c.save(); c.translate(cx, cy); c.rotate(t * 8);
      const cg = (c as any).createConicGradient ? (c as any).createConicGradient(0, 0, 0) : null;
      if (cg) { ["#FFB3F2", "#B3F7FF", "#D9FFB3", "#FFF1B3", "#C9B3FF", "#FFB3F2"].forEach((col, i) => cg.addColorStop(i / 5, col)); c.fillStyle = cg; }
      else c.fillStyle = "#DDD";
      c.beginPath(); c.arc(0, 0, 130, 0, 7); c.arc(0, 0, 22, 0, 7, true); c.fill("evenodd");
      c.strokeStyle = "rgba(255,255,255,0.8)"; c.lineWidth = 3; c.beginPath(); c.arc(0, 0, 130, 0, 7); c.stroke();
      c.restore();
    }
    // 트래킹 깨짐
    if (track > 0) {
      const img = c.getImageData ? null : null; void img;
      for (let i = 0; i < 8; i++) {
        const y = hash(i + Math.floor(t * 20)) * H, h = 30 + hash(i * 3) * 80;
        c.drawImage(c.canvas, 0, (y / H) * c.canvas.height, c.canvas.width, (h / H) * c.canvas.height, (hash(i + 7) - 0.5) * 120 * track, y, W, h);
      }
    }
    // VHS
    const nb = (t * 0.6) % 1;
    c.fillStyle = "rgba(255,255,255,0.18)";
    for (let i = 0; i < 60; i++) c.fillRect(hash(i + Math.floor(t * 30)) * W, nb * H + hash(i) * 40, 30 + hash(i + 1) * 80, 3);
    c.fillStyle = "rgba(0,0,0,0.16)"; for (let y = 0; y < H; y += 5) c.fillRect(0, y, W, 2);
    const v = c.createRadialGradient(W / 2, H / 2, H * 0.4, W / 2, H / 2, H);
    v.addColorStop(0, "rgba(0,0,0,0)"); v.addColorStop(1, "rgba(30,0,40,0.55)"); c.fillStyle = v; c.fillRect(0, 0, W, H);
    c.fillStyle = "#fff"; c.font = `700 40px 'Space Mono', monospace`; c.textBaseline = "top";
    c.shadowColor = "rgba(0,0,0,0.6)"; c.shadowBlur = 6;
    if (Math.floor(t * 2.5) % 2 === 0) c.fillText("PLAY ▶", 50, 40);
    const sec = Math.floor(t), ff = Math.floor((t % 1) * 30);
    c.textAlign = "right"; c.fillText(`AM 03:00:${String(sec).padStart(2, "0")}:${String(ff).padStart(2, "0")}`, W - 50, 40);
    c.fillText("OCT. 28 1995", W - 50, 92); c.textAlign = "left"; c.shadowBlur = 0;
  },
};

// ───────── No.10 아이소메트릭 ─────────
const U = 44;
const iso = (x: number, y: number, z: number, ox: number, oy: number) =>
  [ox + (x - y) * U * 0.866, oy + (x + y) * U * 0.5 - z * U] as const;

const box = (c: CanvasRenderingContext2D, o: [number, number], x: number, y: number, z: number, w: number, d: number, h: number, top: string, left: string, right: string) => {
  const P = (a: number, b: number, cc: number) => iso(a, b, cc, o[0], o[1]);
  const quad = (pts: (readonly [number, number])[], col: string) => { c.fillStyle = col; c.beginPath(); pts.forEach(([px, py], i) => (i ? c.lineTo(px, py) : c.moveTo(px, py))); c.closePath(); c.fill(); };
  quad([P(x, y + d, z), P(x + w, y + d, z), P(x + w, y + d, z + h), P(x, y + d, z + h)], left);
  quad([P(x + w, y, z), P(x + w, y + d, z), P(x + w, y + d, z + h), P(x + w, y, z + h)], right);
  quad([P(x, y, z + h), P(x + w, y, z + h), P(x + w, y + d, z + h), P(x, y + d, z + h)], top);
};

export const isometric: Scene = {
  draw(c, t) {
    const bg = c.createRadialGradient(W / 2, H / 2, 50, W / 2, H / 2, 900);
    bg.addColorStop(0, "#4B3C8F"); bg.addColorStop(1, "#1B1640"); c.fillStyle = bg; c.fillRect(0, 0, W, H);
    c.fillStyle = "rgba(255,255,255,0.08)";
    for (let y = 30; y < H; y += 40) for (let x = 30; x < W; x += 40) c.fillRect(x, y, 3, 3);
    const zoom = 1 + t * 0.015;
    c.save(); c.translate(W / 2, H / 2 + Math.sin(t * 2) * 10); c.scale(zoom, zoom); c.translate(-W / 2, -H / 2);
    const o: [number, number] = [W / 2, 360];
    const drop = (ts: number) => { const p = prog(t, ts, ts + 0.35); return p <= 0 ? null : (1 - easeOutBounce(p)) * 9; };

    // 바닥
    const fl = easeOutBack(prog(t, 0, 0.35)); if (fl <= 0) { c.restore(); return; }
    const fz = (1 - fl) * -6;
    box(c, o, 0, 0, fz - 0.5, 10, 10, 0.5, "#C98B55", "#9A6338", "#B07445");
    // 벽 2면
    const w1 = drop(0.15);
    if (w1 !== null) box(c, o, -0.4, 0, w1, 0.4, 10, 7, "#FFD7B5", "#F2B68E", "#FFC9A3");
    const w2 = drop(0.22);
    if (w2 !== null) box(c, o, -0.4, -0.4, w2, 10.4, 0.4, 7, "#FFD7B5", "#FFC09A", "#F2B68E");
    // 창문 (뒷벽)
    const wn = drop(0.32);
    if (wn !== null) {
      const P = (a: number, b: number, cc: number) => iso(a, b, cc, o[0], o[1]);
      const q = [P(5.5, 0, 2.8 + wn), P(8.5, 0, 2.8 + wn), P(8.5, 0, 5.6 + wn), P(5.5, 0, 5.6 + wn)];
      c.fillStyle = "#1E2357"; c.beginPath(); q.forEach(([x, y], i) => (i ? c.lineTo(x, y) : c.moveTo(x, y))); c.closePath(); c.fill();
      c.strokeStyle = "#FFF"; c.lineWidth = 6; c.stroke();
      c.fillStyle = "#FFE88A"; for (let i = 0; i < 6; i++) { const [sx, sy] = P(5.8 + hash(i) * 2.4, 0, 3.6 + hash(i + 4) * 1.8 + wn); c.fillRect(sx, sy, 4, 4); }
      c.fillStyle = "#2E3A7A"; for (let i = 0; i < 4; i++) { const [bx, by] = P(5.6 + i * 0.75, 0, 2.8 + wn); c.fillRect(bx - 12, by - 30 - hash(i) * 30, 24, 30 + hash(i) * 30); }
    }
    // 액자 + 시계 (왼벽)
    const fr = drop(0.42);
    if (fr !== null) {
      const P = (a: number, b: number, cc: number) => iso(a, b, cc, o[0], o[1]);
      const q = [P(0, 2, 3.4 + fr), P(0, 4.2, 3.4 + fr), P(0, 4.2, 5.4 + fr), P(0, 2, 5.4 + fr)];
      c.fillStyle = "#3A7BFF"; c.beginPath(); q.forEach(([x, y], i) => (i ? c.lineTo(x, y) : c.moveTo(x, y))); c.closePath(); c.fill();
      c.strokeStyle = "#FFF"; c.lineWidth = 5; c.stroke();
      const [cx, cy] = P(0, 6.6, 4.8 + fr);
      c.save(); c.translate(cx, cy); c.transform(1, 0.58, 0, 1, 0, 0);
      c.fillStyle = "#FFF"; c.beginPath(); c.arc(0, 0, 34, 0, 7); c.fill(); c.strokeStyle = "#333"; c.lineWidth = 4; c.stroke();
      c.lineCap = "round"; c.beginPath(); c.moveTo(0, 0); c.lineTo(Math.cos(t * 4) * 24, Math.sin(t * 4) * 24); c.moveTo(0, 0); c.lineTo(Math.cos(t * 0.6) * 16, Math.sin(t * 0.6) * 16); c.stroke();
      c.restore();
    }
    // 러그
    const rg = drop(0.5); if (rg !== null) box(c, o, 2.5, 3, rg, 5, 4.5, 0.08, "#4CC38A", "#2E9A66", "#38AE75");
    // 책장 + 책
    const bs = drop(0.6);
    if (bs !== null) {
      box(c, o, 0.1, 0.5, bs, 1.2, 3, 4.6, "#E9E2D8", "#CFC6BA", "#DDD4C8");
      const BC = ["#FF6B6B", "#FFD166", "#4D96FF", "#6BCB77", "#B983FF"];
      for (let s = 0; s < 3; s++) for (let b = 0; b < 4; b++) {
        const bd = drop(0.7 + (s * 4 + b) * 0.03); if (bd === null) continue;
        box(c, o, 1.0, 0.8 + b * 0.6, 0.4 + s * 1.5 + bd + bs, 0.3, 0.45, 1.0, BC[(s + b) % 5], BC[(s + b + 2) % 5], BC[(s + b) % 5]);
      }
    }
    // 책상
    const dk = drop(0.85);
    if (dk !== null) {
      box(c, o, 5, 1, dk, 0.25, 0.25, 2.4, "#EEE", "#CCC", "#DDD"); box(c, o, 8.6, 1, dk, 0.25, 0.25, 2.4, "#EEE", "#CCC", "#DDD");
      box(c, o, 5, 3, dk, 0.25, 0.25, 2.4, "#EEE", "#CCC", "#DDD"); box(c, o, 8.6, 3, dk, 0.25, 0.25, 2.4, "#EEE", "#CCC", "#DDD");
      box(c, o, 4.8, 0.8, 2.4 + dk, 4.3, 2.8, 0.25, "#FFFFFF", "#D7D7E0", "#E8E8F0");
    }
    // 모니터
    const mn = drop(1.05);
    if (mn !== null) {
      box(c, o, 6.6, 1.3, 2.65 + mn, 0.6, 0.4, 0.6, "#555", "#333", "#444");
      box(c, o, 5.6, 1.1, 3.2 + mn, 2.6, 0.2, 1.7, "#444", "#222", "#333");
      const on = t >= 1.62;
      const P = (a: number, b: number, cc: number) => iso(a, b, cc, o[0], o[1]);
      const q = [P(5.75, 1.3, 3.35 + mn), P(8.05, 1.3, 3.35 + mn), P(8.05, 1.3, 4.75 + mn), P(5.75, 1.3, 4.75 + mn)];
      if (on) { const gl = c.createRadialGradient(q[0][0] + 60, q[0][1] - 60, 10, q[0][0] + 60, q[0][1] - 60, 260); gl.addColorStop(0, "rgba(120,200,255,0.35)"); gl.addColorStop(1, "rgba(120,200,255,0)"); c.fillStyle = gl; c.fillRect(0, 0, W, H); }
      c.fillStyle = on ? (t < 1.7 ? "#FFFFFF" : "#0E1530") : "#111"; c.beginPath(); q.forEach(([x, y], i) => (i ? c.lineTo(x, y) : c.moveTo(x, y))); c.closePath(); c.fill();
      if (on && t >= 1.7) {
        const CL = ["#FF7AB6", "#7AD7FF", "#FFD166", "#7CFF9B", "#B983FF"];
        const lines = Math.floor((t - 1.7) * 9);
        for (let i = 0; i < Math.min(lines, 7); i++) {
          const len = (0.4 + hash(i) * 1.5) * (i === lines - 1 ? ((t - 1.7) * 9) % 1 : 1);
          const [x1, y1] = P(5.95 + (i % 3 === 0 ? 0 : 0.25), 1.3, 4.55 + mn - i * 0.17), [x2, y2] = P(5.95 + len + (i % 3 === 0 ? 0 : 0.25), 1.3, 4.55 + mn - i * 0.17);
          c.strokeStyle = CL[i % 5]; c.lineWidth = 5; c.beginPath(); c.moveTo(x1, y1); c.lineTo(x2, y2); c.stroke();
        }
        if (Math.floor(t * 4) % 2 === 0) { const [cx, cy] = P(6.1, 1.3, 4.55 + mn - Math.min(lines, 7) * 0.17); c.fillStyle = "#fff"; c.fillRect(cx, cy - 8, 6, 14); }
      }
    }
    // 스탠드
    const lp = drop(1.15);
    if (lp !== null) {
      box(c, o, 8.3, 1.2, 2.65 + lp, 0.5, 0.5, 0.15, "#FFC93B", "#D9A41E", "#E8B52B");
      box(c, o, 8.5, 1.4, 2.8 + lp, 0.1, 0.1, 1.5, "#FFC93B", "#D9A41E", "#E8B52B");
      box(c, o, 8.1, 1.3, 4.2 + lp, 0.6, 0.6, 0.4, "#FFD966", "#E0A91E", "#F0BE30");
      if (t >= 1.95) { const [lx, ly] = iso(8.4, 1.6, 3.6 + lp, o[0], o[1]); const g = c.createRadialGradient(lx, ly, 10, lx, ly, 260); g.addColorStop(0, `rgba(255,220,100,${0.45 * prog(t, 1.95, 2.1)})`); g.addColorStop(1, "rgba(255,220,100,0)"); c.fillStyle = g; c.fillRect(0, 0, W, H); }
    }
    // 머그잔
    const mg = drop(1.22);
    if (mg !== null) {
      box(c, o, 5.2, 2.7, 2.65 + mg, 0.35, 0.35, 0.45, "#FF6B6B", "#D94B4B", "#E85A5A");
      if (t >= 1.95) { c.strokeStyle = "rgba(255,255,255,0.6)"; c.lineWidth = 4; for (let i = 0; i < 2; i++) { const [sx, sy] = iso(5.35 + i * 0.15, 2.85, 3.2 + mg, o[0], o[1]); c.beginPath(); c.moveTo(sx, sy); for (let k = 1; k < 10; k++) c.lineTo(sx + Math.sin(t * 6 + k + i) * 6, sy - k * 6); c.stroke(); } }
    }
    // 의자
    const ch = drop(0.95);
    if (ch !== null) {
      box(c, o, 6.3, 4.2, ch, 0.2, 0.2, 1.4, "#C0392B", "#922B21", "#A93226"); box(c, o, 7.6, 4.2, ch, 0.2, 0.2, 1.4, "#C0392B", "#922B21", "#A93226");
      box(c, o, 6.2, 4.1, 1.4 + ch, 1.7, 1.6, 0.25, "#FF5A4E", "#C0392B", "#E04A3E");
      box(c, o, 6.2, 5.5, 1.65 + ch, 1.7, 0.25, 1.8, "#FF5A4E", "#C0392B", "#E04A3E");
    }
    // 화분
    const pl = drop(1.3);
    if (pl !== null) {
      box(c, o, 2.4, 7.4, pl, 1, 1, 0.9, "#E07A5F", "#B85C44", "#CC6B51");
      const [px, py] = iso(2.9, 7.9, 0.9 + pl, o[0], o[1]);
      c.fillStyle = "#3BB273";
      for (let k = 0; k < 5; k++) { const a = -Math.PI / 2 + (k - 2) * 0.45 + Math.sin(t * 3 + k) * 0.08; c.save(); c.translate(px, py); c.rotate(a); c.beginPath(); c.ellipse(36, 0, 40, 13, 0, 0, 7); c.fill(); c.restore(); }
    }
    // 떠다니는 큐브
    if (t >= 1.35) {
      const CC = ["#FF7AB6", "#7AD7FF", "#FFD166", "#7CFF9B", "#B983FF"];
      [[-2, 4], [11, 2], [10, 9], [3, 12], [-1, 10]].forEach(([x, y], i) => {
        const s = easeOutBack(prog(t, 1.35 + i * 0.06, 1.6 + i * 0.06)) * 0.7; if (s <= 0) return;
        box(c, o, x, y, 3 + Math.sin(t * 3 + i) * 0.5, s, s, s, CC[i], mix(CC[i], "#000000", 0.3), mix(CC[i], "#000000", 0.15));
      });
    }
    c.restore();
    // 집중 모드 알약
    const pb = easeOutBack(prog(t, 1.7, 1.95), 2.4);
    if (pb > 0) {
      c.save(); c.translate(W - 260, 110); c.scale(pb, pb);
      roundRect(c, -190, -40, 380, 80, 40); c.fillStyle = "#fff"; c.fill();
      c.fillStyle = "#2BD46A"; c.beginPath(); c.arc(-140, 0, 12, 0, 7); c.fill();
      c.fillStyle = "#1B1640"; c.font = `700 34px ${KR}`; c.textBaseline = "middle"; c.fillText("집중 모드 ON", -110, 2);
      c.restore();
    }
  },
};

// ───────── No.11 로우폴리 ─────────
const noise2 = (x: number, y: number) => {
  const xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi;
  const h = (a: number, b: number) => hash(a * 157.3 + b * 311.7);
  const s = (q: number) => q * q * (3 - 2 * q);
  const a = lerp(h(xi, yi), h(xi + 1, yi), s(xf)), b = lerp(h(xi, yi + 1), h(xi + 1, yi + 1), s(xf));
  return lerp(a, b, s(yf));
};
const fbm = (x: number, y: number) => { let v = 0, a = 0.5, f = 1; for (let i = 0; i < 4; i++) { v += noise2(x * f, y * f) * a; a *= 0.5; f *= 2; } return v; };
const TCOL = ["#E9D39A", "#9ED36A", "#3E8F4A", "#7B5BA8", "#B9A6E0", "#FFFFFF"];
const SKYL = ["#1F2463", "#5C3A8F", "#E46FA0", "#FFB38A"];

export const lowpoly: Scene = {
  draw(c, t) {
    const sky = c.createLinearGradient(0, 0, 0, H * 0.6);
    SKYL.forEach((col, i) => sky.addColorStop(i / 3, col));
    c.fillStyle = sky; c.fillRect(0, 0, W, H);
    const rise = easeOutBack(prog(t, 0, 0.9), 1.3);
    const camZ = t * 9, camY = lerp(26, 9, easeOutCubic(prog(t, 0, 2.4)));
    const bank = Math.sin(t * 1.6) * 0.06;
    const cell = 2.2, NX = 26, NZ = 22;
    const z0 = Math.floor(camZ / cell);
    const hAt = (x: number, z: number) => {
      const valley = clamp(Math.abs(x) / 14);
      return (fbm(x * 0.07 + 10, z * 0.07) * 22 * valley * valley - 2) * rise;
    };
    const P = (x: number, y: number, z: number) => {
      const dz = z - camZ + 2; const f = 760 / Math.max(0.5, dz);
      let sx = x * f, sy = (y - camY) * f;
      [sx, sy] = [sx * Math.cos(bank) - sy * Math.sin(bank), sx * Math.sin(bank) + sy * Math.cos(bank)];
      return [W / 2 + sx, H * 0.42 - sy, dz];
    };
    const tris: any[] = [];
    for (let iz = NZ; iz >= 1; iz--) for (let ix = -NX / 2; ix < NX / 2; ix++) {
      const x0 = ix * cell, x1 = x0 + cell, za = (z0 + iz) * cell, zb = za + cell;
      const v = [[x0, hAt(x0, za), za], [x1, hAt(x1, za), za], [x1, hAt(x1, zb), zb], [x0, hAt(x0, zb), zb]];
      for (const tri of [[v[0], v[1], v[2]], [v[0], v[2], v[3]]]) {
        const [a, b, cc] = tri;
        const ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2], vx = cc[0] - a[0], vy = cc[1] - a[1], vz = cc[2] - a[2];
        let nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx; const nl = Math.hypot(nx, ny, nz) || 1;
        nx /= nl; ny /= nl; nz /= nl; if (ny < 0) { nx = -nx; ny = -ny; nz = -nz; }
        const hy = (a[1] + b[1] + cc[1]) / 3;
        const li = clamp(0.45 + (nx * 0.5 + ny * 0.7 - nz * 0.4) * 0.6, 0.25, 1.1);
        const hi = clamp((hy + 2) / 16);
        let col = TCOL[Math.min(5, Math.floor(hi * 6))];
        if (hy < -1.3 && Math.abs(a[0]) < 3.5) col = "#7FD3FF";
        const jitter = (hash(ix * 31 + iz * 7 + z0 * 13) - 0.5) * 0.08;
        const dz = (a[2] + b[2] + cc[2]) / 3 - camZ;
        tris.push({ pts: tri, col, li: li + jitter, dz });
      }
    }
    for (const tr of tris) {
      const pp = tr.pts.map((q: number[]) => P(q[0], q[1] + (q[1] < -1.3 && Math.abs(q[0]) < 3.5 ? Math.sin(q[2] + t * 5) * 0.12 : 0), q[2]));
      if (pp.some((q: number[]) => q[2] < 0.6)) continue;
      const fog = clamp((tr.dz - 18) / 30);
      const base = mix(tr.col, "#000000", clamp(1 - tr.li, 0, 0.7));
      c.fillStyle = mix(base.startsWith("rgb") ? rgbToHex(base) : base, "#E48FA8", fog * 0.85);
      c.beginPath(); c.moveTo(pp[0][0], pp[0][1]); c.lineTo(pp[1][0], pp[1][1]); c.lineTo(pp[2][0], pp[2][1]); c.closePath(); c.fill();
      c.strokeStyle = c.fillStyle; c.lineWidth = 1; c.stroke();
    }
    // 나무 (오각뿔)
    for (let iz = NZ; iz >= 2; iz--) for (let ix = -NX / 2; ix < NX / 2; ix++) {
      const gz = z0 + iz; if (hash(ix * 17 + gz * 3) > 0.22) continue;
      const x = (ix + 0.5) * cell, z = (gz + 0.5) * cell;
      if (Math.abs(x) < 5) continue;
      const y = hAt(x, z); if (y > 10 || y < 0) continue;
      const pop = easeOutBack(prog(t, 0.3 + hash(ix + gz) * 0.6, 0.6 + hash(ix + gz) * 0.6), 2);
      if (pop <= 0) continue;
      const [bx, by, dz] = P(x, y, z), [tx, ty] = P(x, y + 2.4 * pop, z);
      if (dz < 0.8) continue;
      const w = (760 / dz) * 0.7 * pop;
      c.fillStyle = mix("#2E7D46", "#E48FA8", clamp((dz - 18) / 30) * 0.85);
      c.beginPath(); c.moveTo(tx, ty); c.lineTo(bx - w, by); c.lineTo(bx + w, by); c.closePath(); c.fill();
      c.fillStyle = mix("#1F5E33", "#E48FA8", clamp((dz - 18) / 30) * 0.85);
      c.beginPath(); c.moveTo(tx, ty); c.lineTo(bx, by + w * 0.2); c.lineTo(bx + w, by); c.closePath(); c.fill();
    }
    // 구름 (카메라가 뚫고 내려옴)
    for (let i = 0; i < 7; i++) {
      const z = camZ + 4 + ((i * 7 - t * 5) % 40 + 40) % 40, x = (hash(i) - 0.5) * 50, y = 18 + hash(i + 3) * 8;
      const [cx, cy, dz] = P(x, y, z); if (dz < 1) continue;
      const s = (760 / dz) * 3;
      c.fillStyle = `rgba(255,255,255,${clamp(dz / 6) * 0.9})`;
      c.beginPath(); for (let k = 0; k < 7; k++) { const a = (k / 7) * Math.PI * 2; c.lineTo(cx + Math.cos(a) * s * (1 + hash(i * 7 + k) * 0.5), cy + Math.sin(a) * s * 0.45); } c.closePath(); c.fill();
    }
    // 고도
    const ap = prog(t, 0.6, 0.8);
    if (ap > 0) {
      const alt = Math.round(lerp(2480, 1040, prog(t, 0.6, 3)) / 10) * 10;
      c.globalAlpha = ap; c.fillStyle = "rgba(20,10,50,0.35)"; roundRect(c, 50, 50, 400, 110, 18); c.fill();
      c.fillStyle = "#fff"; c.font = `600 26px ${KR}`; c.textBaseline = "top"; c.fillText("ALTITUDE", 80, 70);
      c.font = `800 48px ${KR}`; c.fillText(`${alt.toLocaleString()} m`, 80, 100); c.globalAlpha = 1;
    }
  },
};
const rgbToHex = (s: string) => { const m = s.match(/\d+/g)!.map(Number); return "#" + m.slice(0, 3).map((v) => v.toString(16).padStart(2, "0")).join(""); };

// ───────── No.12 라인아트 ─────────
type Pt = [number, number];
const sampleBez = (p0: Pt, p1: Pt, p2: Pt, p3: Pt, n = 30): Pt[] =>
  Array.from({ length: n + 1 }, (_, i) => {
    const s = i / n, u = 1 - s;
    return [u * u * u * p0[0] + 3 * u * u * s * p1[0] + 3 * u * s * s * p2[0] + s * s * s * p3[0], u * u * u * p0[1] + 3 * u * u * s * p1[1] + 3 * u * s * s * p2[1] + s * s * s * p3[1]];
  });
const rose = (cx: number, cy: number, r: number, k: number, n = 160): Pt[] =>
  Array.from({ length: n + 1 }, (_, i) => { const a = (i / n) * Math.PI * 2; const rr = r * Math.cos(k * a); return [cx + rr * Math.cos(a), cy + rr * Math.sin(a)]; });
const spiral = (cx: number, cy: number, r: number, n = 120): Pt[] =>
  Array.from({ length: n + 1 }, (_, i) => { const s = i / n, a = s * Math.PI * 6; return [cx + Math.cos(a) * r * s, cy + Math.sin(a) * r * s]; });

const FLOWERS: { c: Pt; kind: "rose" | "spiral"; r: number; k?: number; blob: string }[] = [
  { c: [600, 300], kind: "rose", r: 90, k: 3, blob: "#F4A6B8" },
  { c: [840, 250], kind: "spiral", r: 80, blob: "#D9774B" },
  { c: [990, 380], kind: "rose", r: 75, k: 5, blob: "#E8B547" },
];

export const lineart: Scene = {
  init() {
    const paths: { pts: Pt[]; flower?: number; vase?: boolean }[] = [];
    paths.push({ pts: [[200, 860], [1240, 860]] });
    const L = sampleBez([700, 860], [520, 840], [520, 600], [660, 540]), Rr = sampleBez([780, 540], [920, 600], [920, 840], [740, 860]);
    paths.push({ pts: [...L, [660, 500], [780, 500], ...Rr, [700, 860]], vase: true });
    paths.push({ pts: Array.from({ length: 60 }, (_, i) => [565 + i * 5.2, 700 + Math.sin(i * 0.5) * 16] as Pt) });
    paths.push({ pts: sampleBez([700, 500], [690, 420], [620, 380], [600, 300]) });
    paths.push({ pts: sampleBez([720, 500], [760, 400], [830, 330], [840, 250]) });
    paths.push({ pts: sampleBez([740, 500], [820, 470], [950, 450], [990, 380]) });
    FLOWERS.forEach((f, i) => paths.push({ pts: f.kind === "rose" ? rose(f.c[0], f.c[1], f.r, f.k!) : spiral(f.c[0], f.c[1], f.r), flower: i }));
    paths.push({ pts: sampleBez([680, 420], [620, 400], [610, 440], [680, 420]) });
    paths.push({ pts: sampleBez([770, 400], [840, 380], [850, 420], [770, 400]) });
    paths.push({ pts: sampleBez([870, 460], [930, 470], [920, 500], [870, 460]) });
    const sp: Pt[] = [];
    [[480, 220], [1100, 260], [560, 430]].forEach(([x, y]) => { sp.push([x - 20, y], [x + 20, y], [x, y], [x, y - 20], [x, y + 20]); });
    paths.push({ pts: sp });
    const lens = paths.map((p) => { let l = 0; for (let i = 1; i < p.pts.length; i++) l += Math.hypot(p.pts[i][0] - p.pts[i - 1][0], p.pts[i][1] - p.pts[i - 1][1]); return l; });
    return { paths, lens, total: lens.reduce((a, b) => a + b, 0) };
  },
  draw(c, t, st) {
    const bg = c.createRadialGradient(W / 2, H / 2, 50, W / 2, H / 2, 900);
    bg.addColorStop(0, "#1E2F57"); bg.addColorStop(1, "#14213D"); c.fillStyle = bg; c.fillRect(0, 0, W, H);
    const drawn = easeInOut3(prog(t, 0, 2.0)) * st.total;
    // 각 길의 진행
    let acc = 0; const done: number[] = [];
    st.lens.forEach((l: number) => { done.push(clamp((drawn - acc) / l)); acc += l; });
    // 색 덩어리 (선과 살짝 어긋나게)
    const blob = (x: number, y: number, r: number, col: string, k: number, seed: number) => {
      const s = easeOutBack(k, 2.2); if (s <= 0) return;
      const dx = Math.sin(t * 0.8 + seed) * 10 + 18, dy = Math.cos(t * 0.7 + seed) * 8 - 14;
      c.fillStyle = col; c.globalAlpha = 0.9; c.beginPath(); c.arc(x + dx, y + dy, r * s, 0, 7); c.fill(); c.globalAlpha = 1;
    };
    c.save(); c.fillStyle = "#8FAE8B"; const vs = easeOutBack(prog(done[1], 0.6, 1) , 2);
    if (vs > 0) { c.globalAlpha = 0.9; c.beginPath(); c.ellipse(735 + Math.sin(t) * 8, 700 - 10, 150 * vs, 170 * vs, 0.1, 0, 7); c.fill(); }
    c.restore();
    FLOWERS.forEach((f, i) => blob(f.c[0], f.c[1], f.r * 0.95, f.blob, prog(done[6 + i], 0.5, 1) * 1.0, i));
    // 선
    c.strokeStyle = "#FFF1DA"; c.lineWidth = 9; c.lineCap = "round"; c.lineJoin = "round";
    let tip: Pt | null = null;
    st.paths.forEach((p: any, i: number) => {
      const d = done[i]; if (d <= 0) return;
      let pts: Pt[] = p.pts;
      if (p.flower !== undefined && d >= 1) {
        const f = FLOWERS[p.flower], a = (t - 1.2) * 0.4;
        pts = pts.map(([x, y]) => [f.c[0] + (x - f.c[0]) * Math.cos(a) - (y - f.c[1]) * Math.sin(a), f.c[1] + (x - f.c[0]) * Math.sin(a) + (y - f.c[1]) * Math.cos(a)]);
      }
      const n = Math.max(1, Math.floor(d * (pts.length - 1)));
      if (i === st.paths.length - 1) {
        // 반짝임: 짧은 선 조각들
        c.beginPath(); for (let k = 0; k + 1 <= n; k += 5) { const q = pts.slice(k, k + 5); c.moveTo(q[0][0], q[0][1]); c.lineTo(q[1][0], q[1][1]); c.moveTo(q[3][0], q[3][1]); c.lineTo(q[4][0], q[4][1]); } c.stroke();
      } else {
        c.beginPath(); c.moveTo(pts[0][0], pts[0][1]); for (let k = 1; k <= n; k++) c.lineTo(pts[k][0], pts[k][1]); c.stroke();
      }
      if (d < 1) tip = pts[n];
    });
    if (!tip && t < 2.02) tip = st.paths[st.paths.length - 1].pts.slice(-1)[0];
    if (tip) {
      const g = c.createRadialGradient(tip[0], tip[1], 0, tip[0], tip[1], 40);
      g.addColorStop(0, "rgba(255,241,218,1)"); g.addColorStop(1, "rgba(255,241,218,0)");
      c.fillStyle = g; c.beginPath(); c.arc(tip[0], tip[1], 40, 0, 7); c.fill();
    }
    // 꽃병 선 위로 흐르는 빛
    if (t >= 2.1) {
      const vp: Pt[] = st.paths[1].pts, k = ((t - 2.1) / 0.9) * (vp.length - 1);
      c.save(); c.strokeStyle = "#FFFFFF"; c.lineWidth = 14; c.shadowColor = "#FFE9B0"; c.shadowBlur = 30;
      c.beginPath(); const a = Math.max(0, Math.floor(k) - 8), b = Math.min(vp.length - 1, Math.floor(k));
      for (let i = a; i <= b; i++) (i === a ? c.moveTo(vp[i][0], vp[i][1]) : c.lineTo(vp[i][0], vp[i][1])); c.stroke(); c.restore();
    }
    // 문구
    const tp = prog(t, 2.05, 2.5);
    if (tp > 0) {
      c.save(); c.globalAlpha = tp; if (tp < 1) c.filter = `blur(${(1 - tp) * 14}px)`;
      c.fillStyle = "#FFF1DA"; c.font = `500 52px ${KR}`; c.textAlign = "center"; c.textBaseline = "middle";
      (c as any).letterSpacing = "18px"; c.fillText("한 줄의 선으로", W / 2 + 9, 975); c.restore();
    }
  },
};
