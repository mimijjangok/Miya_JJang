import { W, H, Scene, prog, lerp, clamp, easeOutBack, easeInOut3, easeOutCubic, easeOutElastic, KR, roundRect } from "./util";

// ───────── No.13 가격 공개 (120 BPM · 8마디 = 16초) ─────────
// 예시 값: 제품 이름 MI3 Studio / Basic · Pro · Team / 인기 Pro
const ACCENT = "#6C4CF5";
const PLANS = [
  { name: "Basic", m: "9,900", y: "7,900" },
  { name: "Pro", m: "19,900", y: "15,900" },
  { name: "Team", m: "39,000", y: "31,200" },
];
const POP = 1;
const BEAT = 0.5;
const BAR = 2;

// 자릿수마다 세로로 구르는 숫자
export const rollText = (c: CanvasRenderingContext2D, from: string, to: string, x: number, y: number, k: number, size: number) => {
  const n = Math.max(from.length, to.length);
  const a = from.padStart(n, " "), b = to.padStart(n, " ");
  c.font = `800 ${size}px ${KR}`;
  const cw = c.measureText("0").width * 1.02;
  let cx = x; // 왼쪽 정렬
  for (let i = 0; i < n; i++) {
    const ca = a[i], cb = b[i];
    const w = cb === "," || cb === "." || cb === ":" ? cw * 0.45 : cb === " " ? 0 : cw;
    const p = easeInOut3(clamp((k - i * 0.06) / 0.7));
    c.save(); c.beginPath(); c.rect(cx - 4, y - size * 0.95, w + 8, size * 1.2); c.clip();
    if (ca === cb || p <= 0) c.fillText(p >= 1 ? cb : ca, cx, y);
    else { c.fillText(ca, cx, y - p * size * 1.1); c.fillText(cb, cx, y + (1 - p) * size * 1.1); }
    c.restore();
    cx += w;
  }
};

export const cursor = (c: CanvasRenderingContext2D, x: number, y: number, press: number) => {
  c.save(); c.translate(x, y); c.scale(1 - press * 0.15, 1 - press * 0.15);
  c.beginPath(); c.moveTo(0, 0); c.lineTo(0, 44); c.lineTo(12, 33); c.lineTo(21, 52); c.lineTo(29, 48); c.lineTo(20, 30); c.lineTo(36, 30); c.closePath();
  c.fillStyle = "#111"; c.fill(); c.lineWidth = 3; c.strokeStyle = "#fff"; c.stroke();
  c.restore();
};

export const pricing: Scene & { dur: number } = {
  dur: 16,
  draw(c, t) {
    c.fillStyle = "#FFFFFF"; c.fillRect(0, 0, W, H);
    const cx = W / 2, cy = H / 2 + 40;
    const cw = 330, chh = 470, gap = 40;
    const cardX = (i: number) => cx + (i - 1) * (cw + gap);

    // 1마디: 알약 → 가로로 늘어남 → 세로로 갈라져 카드 3장 / 8마디: 거꾸로
    let form: number; // 0 = 알약, 1 = 카드
    if (t < BAR) form = easeInOut3(prog(t, 0.9, 1.9));
    else if (t < 7 * BAR) form = 1;
    else form = 1 - easeInOut3(prog(t, 7 * BAR + 0.2, 7 * BAR + 1.6));
    let stretch: number;
    if (t < BAR) stretch = easeOutBack(prog(t, 0.1, 0.9), 1.3);
    else if (t < 7 * BAR) stretch = 1;
    else stretch = 1 - easeInOut3(prog(t, 7 * BAR + 1.3, 8 * BAR - 0.05));

    // 카메라 줌 (6~7마디)
    const zoom = easeInOut3(prog(t, 5 * BAR + 0.8, 5 * BAR + 1.8)) * (1 - easeInOut3(prog(t, 7 * BAR - 0.4, 7 * BAR + 0.4)));
    const zx = cardX(POP), zy = cy;
    c.save();
    c.translate(lerp(cx, cx, zoom), lerp(cy, cy, zoom));
    c.scale(1 + zoom * 0.42, 1 + zoom * 0.42);
    c.translate(-lerp(cx, zx, zoom), -lerp(cy, zy, zoom));

    // 월간 / 연간 토글
    const tg = easeOutBack(prog(t, 1.4, 1.9), 1.6) * (1 - prog(t, 7 * BAR, 7 * BAR + 0.4));
    const yearly = t >= 4 * BAR - 1 && t < 7 * BAR + 0.6;
    const knob = easeInOut3(prog(t, 4 * BAR - 1, 4 * BAR - 0.7)) * (1 - easeInOut3(prog(t, 7 * BAR + 0.2, 7 * BAR + 0.5)));
    if (tg > 0) {
      c.save(); c.translate(cx, 175); c.scale(tg, tg);
      roundRect(c, -170, -36, 340, 72, 36); c.fillStyle = "#F1F1F3"; c.fill();
      roundRect(c, -164 + knob * 164, -30, 164, 60, 30); c.fillStyle = "#111"; c.fill();
      c.font = `700 26px ${KR}`; c.textAlign = "center"; c.textBaseline = "middle";
      c.fillStyle = knob < 0.5 ? "#fff" : "#777"; c.fillText("월간", -82, 2);
      c.fillStyle = knob >= 0.5 ? "#fff" : "#777"; c.fillText("연간", 82, 2);
      c.restore();
    }

    // 알약 / 카드
    const pillW = lerp(150, 1060, stretch), pillH = 64;
    for (let i = 0; i < 3; i++) {
      const segW = pillW / 3;
      const px = cx - pillW / 2 + segW * (i + 0.5);
      const x = lerp(px, cardX(i), form), w = lerp(segW + 1, cw, form), h = lerp(pillH, chh, form);
      const r = lerp(i === 1 ? 0 : 32, 28, form);
      const pop = i === POP ? easeOutBack(prog(t, 5 * BAR + 0.3, 5 * BAR + 0.9), 1.6) * (1 - easeInOut3(prog(t, 7 * BAR - 0.4, 7 * BAR + 0.2))) : 0;
      const dim = i !== POP ? easeOutCubic(prog(t, 5 * BAR + 0.3, 5 * BAR + 0.9)) * (1 - prog(t, 7 * BAR - 0.4, 7 * BAR)) : 0;
      c.save(); c.translate(x, cy - pop * 18); c.scale(1 + pop * 0.08, 1 + pop * 0.08);
      if (pop > 0) { c.shadowColor = "rgba(40,20,120,0.25)"; c.shadowBlur = 60 * pop; c.shadowOffsetY = 30 * pop; }
      // 알약일 때는 양 끝만 둥글게
      if (form < 0.05) {
        c.beginPath();
        if (i === 0) { c.moveTo(-w / 2 + 32, -h / 2); c.lineTo(w / 2, -h / 2); c.lineTo(w / 2, h / 2); c.lineTo(-w / 2 + 32, h / 2); c.arc(-w / 2 + 32, 0, 32, Math.PI / 2, -Math.PI / 2); }
        else if (i === 2) { c.moveTo(-w / 2, -h / 2); c.lineTo(w / 2 - 32, -h / 2); c.arc(w / 2 - 32, 0, 32, -Math.PI / 2, Math.PI / 2); c.lineTo(-w / 2, h / 2); }
        else c.rect(-w / 2, -h / 2, w, h);
        c.closePath();
      } else roundRect(c, -w / 2, -h / 2, w, h, Math.min(r, h / 2));
      c.fillStyle = "#111111"; c.fill();
      c.shadowColor = "transparent";
      if (pop > 0) { c.lineWidth = 5; c.strokeStyle = ACCENT; c.globalAlpha = clamp(pop); c.stroke(); c.globalAlpha = 1; }
      if (form > 0.95) {
        const L = -w / 2 + 34;
        // 요금제 이름 (2마디, 박자마다)
        const na = easeOutCubic(prog(t, BAR + i * BEAT, BAR + i * BEAT + 0.3)) * (1 - prog(t, 7 * BAR, 7 * BAR + 0.2));
        if (na > 0) {
          c.globalAlpha = na; c.fillStyle = "#fff"; c.font = `700 34px ${KR}`; c.textBaseline = "alphabetic"; c.textAlign = "left";
          c.fillText(PLANS[i].name, L, -h / 2 + 70 + (1 - na) * 20);
          if (i === POP) {
            const ta = prog(t, 5 * BAR + 0.5, 5 * BAR + 0.8) * (1 - prog(t, 7 * BAR - 0.4, 7 * BAR));
            if (ta > 0) { c.globalAlpha = na * ta; roundRect(c, w / 2 - 150, -h / 2 + 40, 116, 40, 20); c.fillStyle = ACCENT; c.fill(); c.fillStyle = "#fff"; c.font = `700 20px ${KR}`; c.textAlign = "center"; c.fillText("가장 인기", w / 2 - 92, -h / 2 + 67); c.textAlign = "left"; }
          }
          c.globalAlpha = 1;
        }
        // 가격 (3마디) + 롤링 (4마디)
        const pa = easeOutCubic(prog(t, 2 * BAR + i * BEAT, 2 * BAR + i * BEAT + 0.35)) * (1 - prog(t, 7 * BAR, 7 * BAR + 0.2));
        if (pa > 0) {
          c.globalAlpha = pa; c.fillStyle = "#fff"; c.textBaseline = "alphabetic";
          c.font = `700 28px ${KR}`; c.fillText("₩", L, -h / 2 + 196);
          const k1 = prog(t, 4 * BAR - 1 + i * 0.12, 4 * BAR - 1 + i * 0.12 + 0.9);
          const k2 = prog(t, 7 * BAR - 0.2, 7 * BAR + 0.4);
          const from = k2 > 0 ? PLANS[i].y : PLANS[i].m, to = k2 > 0 ? PLANS[i].m : PLANS[i].y;
          const k = k2 > 0 ? k2 : k1;
          c.save(); c.translate(0, (1 - pa) * 24);
          rollText(c, from, to, L + 38, -h / 2 + 200, k, 66);
          c.restore();
          c.font = `500 22px ${KR}`; c.fillStyle = "rgba(255,255,255,0.55)";
          c.fillText(yearly ? "/ 월 · 연간 결제" : "/ 월", L, -h / 2 + 240);
          c.globalAlpha = 1;
        }
        // 기능 줄 (자리만)
        const fa = prog(t, 2 * BAR + 1.4, 3 * BAR) * (1 - prog(t, 7 * BAR, 7 * BAR + 0.2));
        if (fa > 0) {
          c.globalAlpha = fa * 0.9;
          for (let k = 0; k < 3 + i; k++) {
            c.fillStyle = i === POP && pop > 0.5 ? ACCENT : "#3DDC84"; c.beginPath(); c.arc(L + 8, -h / 2 + 296 + k * 36, 6, 0, 7); c.fill();
            c.fillStyle = "rgba(255,255,255,0.22)"; roundRect(c, L + 26, -h / 2 + 289 + k * 36, 150 + ((k * 53 + i * 31) % 90), 14, 7); c.fill();
          }
          c.globalAlpha = 1;
        }
        // 할인 배지 (5마디, 스프링)
        const ba = easeOutElastic(prog(t, 4 * BAR + i * BEAT, 4 * BAR + i * BEAT + 0.8)) * (1 - easeInOut3(prog(t, 7 * BAR - 0.3, 7 * BAR + 0.1)));
        if (ba > 0) {
          c.save(); c.translate(w / 2 - 20, -h / 2 + 20); c.rotate(0.12); c.scale(ba, ba);
          roundRect(c, -70, -26, 140, 52, 26); c.fillStyle = i === POP ? ACCENT : "#FFFFFF"; c.fill();
          c.fillStyle = i === POP ? "#fff" : "#111"; c.font = `800 26px ${KR}`; c.textAlign = "center"; c.textBaseline = "middle"; c.fillText("-20%", 0, 2);
          c.restore(); c.textAlign = "left";
        }
      }
      // 나머지 카드 흐리게
      if (dim > 0) { roundRect(c, -w / 2 - 2, -h / 2 - 2, w + 4, h + 4, 28); c.fillStyle = `rgba(255,255,255,${dim * 0.55})`; c.fill(); }
      c.restore();
    }

    // 혜택 한 줄
    const bn = easeOutBack(prog(t, 6 * BAR, 6 * BAR + 0.5), 1.4) * (1 - prog(t, 7 * BAR - 0.4, 7 * BAR - 0.1));
    if (bn > 0) {
      c.save(); c.translate(cardX(POP), cy + chh / 2 + 70); c.scale(bn, bn);
      c.font = `700 30px ${KR}`; c.textAlign = "center"; c.textBaseline = "middle";
      const tw = c.measureText("첫 달 무료 · 언제든 해지").width + 60;
      roundRect(c, -tw / 2, -30, tw, 60, 30); c.fillStyle = ACCENT; c.fill();
      c.fillStyle = "#fff"; c.fillText("첫 달 무료 · 언제든 해지", 0, 2);
      c.restore();
    }
    c.restore();

    // 제품 이름
    const pn = prog(t, 1.2, 1.6) * (1 - prog(t, 7 * BAR, 7 * BAR + 0.3));
    if (pn > 0) {
      c.globalAlpha = pn * (1 - zoom); c.fillStyle = "#111"; c.font = `800 30px ${KR}`; c.textAlign = "left"; c.textBaseline = "middle";
      c.fillText("MI3 Studio", 60, 70); c.fillStyle = ACCENT; c.beginPath(); c.arc(42, 70, 9, 0, 7); c.fill(); c.globalAlpha = 1;
    }

    // 커서: 4마디 토글 클릭 → 6마디 인기 카드
    if (t > 3 * BAR && t < 7 * BAR + 0.6) {
      const tx = cx + 82, ty = 175;
      let x = W - 120, y = H - 80;
      const m1 = easeInOut3(prog(t, 3 * BAR + 0.2, 4 * BAR - 1.1));
      x = lerp(x, tx, m1); y = lerp(y, ty, m1);
      const m2 = easeInOut3(prog(t, 5 * BAR - 0.4, 5 * BAR + 0.4));
      x = lerp(x, cardX(POP) + 90, m2); y = lerp(y, cy + 40, m2);
      const press = Math.sin(Math.PI * prog(t, 4 * BAR - 1.05, 4 * BAR - 0.8));
      const fade = 1 - prog(t, 7 * BAR + 0.2, 7 * BAR + 0.6);
      if (press > 0) { c.strokeStyle = `rgba(108,76,245,${press})`; c.lineWidth = 4; c.beginPath(); c.arc(tx, ty, 30 + press * 30, 0, 7); c.stroke(); }
      c.globalAlpha = fade; cursor(c, x, y, press); c.globalAlpha = 1;
    }
  },
};
