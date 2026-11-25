import {
  W, H, Scene, prog, lerp, clamp, easeOutBack, easeInOut3, easeOutCubic, easeOutExpo, hash, mix, mixSteps,
  KR, ARCHIVO, roundRect, makeCanvas,
} from "./util";

// ───────── No.01 팝아트 ─────────
const POP = ["#FF3EA5", "#FFE600", "#4FC3F7", "#39FF14"];
const LIP = ["#E0102A", "#7A1FD6", "#FF6A00", "#1B3BFF"];

const drawLips = (c: CanvasRenderingContext2D, cx: number, cy: number, s: number, col: string, squash = 0) => {
  c.save();
  c.translate(cx, cy);
  c.scale(s * (1 + squash * 0.5), s * (1 - squash));
  c.lineJoin = "round";
  c.lineWidth = 0.07;
  // 윗입술
  c.beginPath();
  c.moveTo(-1, 0);
  c.bezierCurveTo(-0.62, -0.62, -0.25, -0.62, 0, -0.34);
  c.bezierCurveTo(0.25, -0.62, 0.62, -0.62, 1, 0);
  c.bezierCurveTo(0.55, 0.12, -0.55, 0.12, -1, 0);
  c.fillStyle = col; c.fill(); c.strokeStyle = "#000"; c.stroke();
  // 아랫입술
  c.beginPath();
  c.moveTo(-1, 0);
  c.bezierCurveTo(-0.55, 0.12, 0.55, 0.12, 1, 0);
  c.bezierCurveTo(0.62, 0.78, -0.62, 0.78, -1, 0);
  c.fillStyle = col; c.fill(); c.stroke();
  // 광택
  c.fillStyle = "rgba(255,255,255,0.9)";
  c.beginPath(); c.ellipse(-0.32, 0.36, 0.2, 0.07, -0.2, 0, Math.PI * 2); c.fill();
  c.beginPath(); c.ellipse(0.42, -0.36, 0.1, 0.04, 0.4, 0, Math.PI * 2); c.fill();
  c.restore();
};

const drawHeart = (c: CanvasRenderingContext2D, x: number, y: number, s: number, rot: number) => {
  c.save(); c.translate(x, y); c.rotate(rot); c.scale(s, s);
  c.beginPath();
  c.moveTo(0, 0.35);
  c.bezierCurveTo(-1.1, -0.35, -0.5, -1.05, 0, -0.45);
  c.bezierCurveTo(0.5, -1.05, 1.1, -0.35, 0, 0.35);
  c.fillStyle = "#FF2D6F"; c.fill();
  c.lineWidth = 0.1; c.strokeStyle = "#000"; c.stroke();
  c.restore();
};

export const popArt: Scene = {
  draw(c, t) {
    // 화면 흔들림
    const sh = t > 1.42 && t < 1.8 ? (1 - prog(t, 1.42, 1.8)) * 26 : 0;
    c.save();
    c.translate((hash(Math.floor(t * 30)) - 0.5) * sh, (hash(Math.floor(t * 30) + 9) - 0.5) * sh);
    c.fillStyle = "#111"; c.fillRect(-40, -40, W + 80, H + 80);

    // 색 바꾸기 단계
    let shift = 0;
    if (t >= 0.5 && t < 0.92) shift = Math.floor((t - 0.5) / 0.14) + 1;
    else if (t >= 0.92) shift = 3;
    if (t >= 2.2 && t < 2.6) shift += Math.floor((t - 2.2) / 0.13) + 1;

    const pad = 22, gap = 22;
    const pw = (W - pad * 2 - gap) / 2, ph = (H - pad * 2 - gap) / 2;
    const rects = [0, 1, 2, 3].map((i) => ({ x: pad + (i % 2) * (pw + gap), y: pad + Math.floor(i / 2) * (ph + gap), w: pw, h: ph }));
    const ex = easeInOut3(prog(t, 0.95, 1.37));
    const order = [0, 2, 3, 1]; // 오른쪽 위(1)를 마지막에 그려 화면을 덮게

    for (const i of order) {
      let r = rects[i];
      const appear = easeOutBack(prog(t, i * 0.07, i * 0.07 + 0.22));
      if (appear <= 0) continue;
      if (i === 1 && ex > 0) r = { x: lerp(r.x, -10, ex), y: lerp(r.y, -10, ex), w: lerp(r.w, W + 20, ex), h: lerp(r.h, H + 20, ex) };
      const cx = r.x + r.w / 2, cy = r.y + r.h / 2;
      c.save();
      c.translate(cx, cy); c.scale(appear, appear); c.translate(-cx, -cy);
      const bg = POP[(i + shift) % 4];
      c.fillStyle = bg; c.fillRect(r.x, r.y, r.w, r.h);
      // 망점 (대각선으로 흐름)
      c.save();
      c.beginPath(); c.rect(r.x, r.y, r.w, r.h); c.clip();
      c.fillStyle = "rgba(0,0,0,0.16)";
      const sp = 26, off = (t * 40) % sp;
      for (let y = r.y - sp; y < r.y + r.h + sp; y += sp)
        for (let x = r.x - sp; x < r.x + r.w + sp; x += sp) {
          const odd = Math.round((y - r.y) / sp) % 2 ? sp / 2 : 0;
          c.beginPath(); c.arc(x + off + odd, y + off, 6, 0, Math.PI * 2); c.fill();
        }
      c.restore();
      c.lineWidth = 12; c.strokeStyle = "#000"; c.strokeRect(r.x, r.y, r.w, r.h);
      // 입술
      const la = easeOutBack(prog(t, 0.1 + i * 0.07, 0.32 + i * 0.07), 2.4);
      if (la > 0) {
        let sq = 0;
        if (i === 1) sq = Math.sin(Math.PI * prog(t, 1.42, 1.62)) * 0.4 - Math.sin(Math.PI * prog(t, 1.62, 1.8)) * 0.15;
        const s = Math.min(r.w, r.h) * 0.3 * la;
        drawLips(c, cx, cy + s * 0.05, s, LIP[(i + shift + 1) % 4], sq);
      }
      c.restore();
    }

    // 하트
    if (t > 1.55) {
      for (let k = 0; k < 3; k++) {
        const p = prog(t, 1.55 + k * 0.06, 2.6 + k * 0.06);
        if (p <= 0) continue;
        const e = easeOutCubic(p);
        const x = W / 2 + (k - 1) * 260 * e + Math.sin(t * 6 + k) * 20;
        const y = H / 2 - 120 - 420 * e;
        c.globalAlpha = 1 - clamp((p - 0.75) / 0.25);
        drawHeart(c, x, y, 70 + 30 * e, (k - 1) * 0.3);
        c.globalAlpha = 1;
      }
    }

    // 해설 상자
    const cap = easeOutBack(prog(t, 1.2, 1.45));
    if (cap > 0) {
      const x = lerp(-520, 50, cap);
      c.save(); c.translate(x, 50); c.rotate(-0.03);
      c.fillStyle = "#000"; c.fillRect(10, 10, 460, 110);
      c.fillStyle = "#FFE600"; c.fillRect(0, 0, 460, 110);
      c.lineWidth = 8; c.strokeStyle = "#000"; c.strokeRect(0, 0, 460, 110);
      c.fillStyle = "#000"; c.font = `800 52px ${KR}`; c.textBaseline = "middle";
      c.fillText("한편, 그 시각…", 30, 58);
      c.restore();
    }

    // 쾅!
    const kp = prog(t, 1.42, 1.7);
    if (kp > 0) {
      const e = easeOutBack(kp, 2.2);
      let s = lerp(3.2, 1, e);
      if (t > 2.2) s *= 1 + Math.sin(Math.PI * prog(t, 2.2, 2.4)) * 0.18;
      const rot = lerp(-0.9, -0.12, easeOutCubic(kp));
      c.save(); c.translate(W - 380, H - 250); c.rotate(rot); c.scale(s, s);
      c.font = `900 240px ${KR}`; c.textAlign = "center"; c.textBaseline = "middle";
      c.lineJoin = "round";
      c.fillStyle = "#000"; c.fillText("쾅!", 18, 18);
      c.lineWidth = 34; c.strokeStyle = "#000"; c.strokeText("쾅!", 0, 0);
      c.fillStyle = "#fff"; c.fillText("쾅!", 0, 0);
      c.restore();
    }
    c.restore();

    // 흰 번쩍임
    const fl = t > 1.42 ? 1 - prog(t, 1.42, 1.62) : 0;
    if (fl > 0) { c.fillStyle = `rgba(255,255,255,${fl * 0.9})`; c.fillRect(0, 0, W, H); }
  },
};

// ───────── No.02 플랫 2D ─────────
const SKY_DAY = ["#BFE8FF", "#A9DFFB", "#93D5F7", "#7DCBF2", "#69C0EC", "#55B4E6", "#43A8DF"];
const SKY_SET = ["#FFD27A", "#FFC06A", "#FFAE5C", "#FF9A55", "#FF8552", "#FF7052", "#F25D58"];
const SKY_PUR = ["#F7A3C8", "#E98DC6", "#D479C4", "#BB68C2", "#9F5BBE", "#844FB7", "#6A45AC"];
const SKY_NIT = ["#3B3A86", "#34327A", "#2D2B6E", "#262562", "#201F56", "#1A1A4B", "#151541"];
const MT_DAY = ["#9BB7D9", "#7FA0CC", "#5FB37C", "#3E9A61", "#2C7F4C"];
const MT_NIT = ["#4A4C8E", "#3D3F7C", "#2F4A6A", "#25405B", "#1B344C"];

const ridge = (x: number, layer: number) => {
  // 겹마다 다른 모양 (뒤 2겹: 뾰족, 앞 3겹: 둥근)
  if (layer < 2) {
    const p = 380 - layer * 60, xx = ((x % p) + p) % p;
    const tri = 1 - Math.abs(xx / p - 0.5) * 2;
    return tri * (layer === 0 ? 330 : 270) + Math.sin(x * 0.01 + layer) * 18;
  }
  return 90 + Math.sin(x * 0.006 + layer * 2) * 60 + Math.sin(x * 0.013 + layer) * 30;
};

export const flat2d: Scene = {
  draw(c, t) {
    const k = prog(t, 1.15, 2.15);
    const skyK = (i: number) => {
      if (k <= 0) return SKY_DAY[i];
      if (k < 0.34) return mix(SKY_DAY[i], SKY_SET[i], k / 0.34);
      if (k < 0.67) return mix(SKY_SET[i], SKY_PUR[i], (k - 0.34) / 0.33);
      return mix(SKY_PUR[i], SKY_NIT[i], (k - 0.67) / 0.33);
    };
    const bandH = (H * 0.78) / 7;
    for (let i = 0; i < 7; i++) { c.fillStyle = skyK(i); c.fillRect(0, i * bandH, W, bandH + 1); }
    c.fillStyle = skyK(6); c.fillRect(0, 7 * bandH, W, H);

    // 별
    if (k > 0.6) {
      for (let i = 0; i < 60; i++) {
        const st = 0.6 + hash(i) * 0.35;
        const a = prog(k, st, st + 0.08) * (0.6 + 0.4 * Math.sin(t * 9 + i));
        if (a <= 0) continue;
        c.fillStyle = `rgba(255,250,220,${a})`;
        const x = hash(i + 3) * W, y = hash(i + 7) * H * 0.5;
        c.fillRect(x - 2, y - 2, 4, 4);
      }
    }
    // 초승달
    const mo = easeOutCubic(prog(t, 1.85, 2.6));
    if (mo > 0) {
      const mx = 1150, my = lerp(420, 170, mo);
      c.fillStyle = "#FFF3B0"; c.beginPath(); c.arc(mx, my, 50, 0, Math.PI * 2); c.fill();
      c.fillStyle = skyK(1); c.beginPath(); c.arc(mx + 22, my - 12, 46, 0, Math.PI * 2); c.fill();
    }
    // 해
    const sy = lerp(300, 820, easeInOut3(k));
    c.fillStyle = "rgba(255,230,120,0.25)"; c.beginPath(); c.arc(360, sy, 170, 0, Math.PI * 2); c.fill();
    c.fillStyle = "rgba(255,230,120,0.35)"; c.beginPath(); c.arc(360, sy, 125, 0, Math.PI * 2); c.fill();
    c.fillStyle = k < 0.4 ? "#FFD93B" : mix("#FFD93B", "#FF7A3D", (k - 0.4) * 2); c.beginPath(); c.arc(360, sy, 88, 0, Math.PI * 2); c.fill();

    // 구름
    c.fillStyle = mix("#FFFFFF", "#7C79B8", k);
    for (let i = 0; i < 3; i++) {
      const x = ((i * 520 + t * (30 + i * 12)) % (W + 400)) - 200, y = 140 + i * 70;
      roundRect(c, x, y, 240 - i * 30, 56, 28); c.fill();
      roundRect(c, x + 60, y - 30, 130, 56, 28); c.fill();
    }
    // 새 떼
    c.strokeStyle = mix("#2B2B4A", "#11112A", k); c.lineWidth = 5; c.lineCap = "round";
    for (let i = 0; i < 5; i++) {
      const bx = 520 + i * 55 + t * 120, by = 250 + (i % 2) * 30 + Math.sin(t * 3 + i) * 6;
      const f = Math.sin(t * 22 + i) * 14;
      c.beginPath(); c.moveTo(bx - 18, by - f); c.lineTo(bx, by); c.lineTo(bx + 18, by - f); c.stroke();
    }

    // 산 5겹
    const baseY = [560, 620, 700, 790, 900];
    const spd = [12, 24, 50, 80, 120];
    for (let L = 0; L < 5; L++) {
      const rise = (1 - easeOutBack(prog(t, L * 0.09, L * 0.09 + 0.55), 1.4)) * 520;
      const col = mix(MT_DAY[L], MT_NIT[L], k);
      const off = t * spd[L];
      c.fillStyle = col;
      c.beginPath(); c.moveTo(0, H);
      for (let x = 0; x <= W; x += 8) c.lineTo(x, baseY[L] + rise - ridge(x + off, L));
      c.lineTo(W, H); c.closePath(); c.fill();
      // 눈 덮인 봉우리
      if (L < 2) {
        const p = 380 - L * 60, hgt = L === 0 ? 330 : 270;
        c.fillStyle = mix("#FFFFFF", "#B9B8E8", k);
        for (let px = -p; px < W + p; px += p) {
          const peakX = px + p / 2 - (((off % p) + p) % p);
          const py = baseY[L] + rise - ridge(peakX + off, L);
          const sw = 34, shh = sw * (hgt / (p / 2));
          c.beginPath(); c.moveTo(peakX, py); c.lineTo(peakX - sw, py + shh); c.lineTo(peakX - sw / 3, py + shh - 10);
          c.lineTo(peakX, py + shh); c.lineTo(peakX + sw / 3, py + shh - 10); c.lineTo(peakX + sw, py + shh); c.closePath(); c.fill();
        }
      }
      // 집 (3번째 겹 위)
      if (L === 3) {
        const hx = ((900 - off) % (W + 400) + W + 400) % (W + 400) - 200;
        const hy = baseY[L] + rise - ridge(hx + off, L);
        c.fillStyle = mix("#F5EBDD", "#8A86B0", k); c.fillRect(hx - 50, hy - 70, 100, 72);
        c.fillStyle = mix("#E2463A", "#8C3550", k);
        c.beginPath(); c.moveTo(hx - 64, hy - 66); c.lineTo(hx, hy - 120); c.lineTo(hx + 64, hy - 66); c.closePath(); c.fill();
        const on = k > 0.8 && Math.sin(t * 50) > -0.6 || k > 0.9;
        if (on) {
          c.fillStyle = "rgba(255,220,90,0.25)"; c.beginPath(); c.arc(hx - 18, hy - 36, 46, 0, Math.PI * 2); c.fill();
        }
        c.fillStyle = on ? "#FFD84A" : mix("#7CC3E6", "#2B2E5C", k);
        c.fillRect(hx - 32, hy - 50, 28, 26); c.fillRect(hx + 8, hy - 50, 28, 26);
      }
      // 삼각형 나무 (맨 앞)
      if (L === 4) {
        c.fillStyle = mix("#1E6B3D", "#11283E", k);
        for (let i = 0; i < 9; i++) {
          const tx = ((i * 190 - off) % (W + 200) + W + 200) % (W + 200) - 100;
          const ty = baseY[L] + rise - ridge(tx + off, L) + 10;
          c.beginPath(); c.moveTo(tx, ty - 110); c.lineTo(tx - 34, ty); c.lineTo(tx + 34, ty); c.closePath(); c.fill();
        }
      }
    }

    // 열기구
    const BAL = [
      { x: 980, c: ["#E9463B", "#FFF3DE"], d: 0 },
      { x: 1210, c: ["#FFC93B", "#2BB7A8"], d: 0.15 },
      { x: 760, c: ["#2BB7A8", "#FFF3DE"], d: 0.3 },
      { x: 1330, c: ["#E9463B", "#FFC93B"], d: 0.45 },
    ];
    BAL.forEach((b, i) => {
      const up = easeOutCubic(prog(t, b.d * 0.4, 1.6 + b.d));
      const boost = t > 2.0 ? easeOutCubic(prog(t, 2.0, 2.6)) * 40 : 0;
      const by = lerp(H + 200, 260 + i * 90, up) - boost - t * 10;
      const bx = b.x + Math.sin(t * 2 + i) * 22;
      const s = 1 - i * 0.16;
      c.save(); c.translate(bx, by); c.scale(s, s);
      c.save(); c.beginPath(); c.ellipse(0, 0, 70, 82, 0, 0, Math.PI * 2); c.clip();
      for (let j = -3; j <= 3; j++) {
        c.fillStyle = mix(b.c[(j + 3) % 2], "#3A3570", k * 0.55);
        c.fillRect(j * 20 - 10, -90, 20, 180);
      }
      c.restore();
      c.strokeStyle = mix("#6B4E3A", "#2A2348", k); c.lineWidth = 3;
      c.beginPath(); c.moveTo(-40, 60); c.lineTo(-16, 110); c.moveTo(40, 60); c.lineTo(16, 110); c.stroke();
      c.fillStyle = mix("#9A6B45", "#3E2F4E", k); c.fillRect(-18, 108, 36, 26);
      if (t > 2.0 && t < 2.6) {
        const fh = 22 + Math.sin(t * 60) * 8;
        c.fillStyle = "#FFB43B"; c.beginPath(); c.moveTo(-8, 100); c.lineTo(0, 100 - fh); c.lineTo(8, 100); c.fill();
      }
      c.restore();
    });

    // 별똥별
    const ss = prog(t, 2.35, 2.75);
    if (ss > 0 && ss < 1) {
      const x = lerp(1100, 600, ss), y = lerp(60, 260, ss);
      const g = c.createLinearGradient(x, y, x + 160, y - 64);
      g.addColorStop(0, "rgba(255,255,255,0.95)"); g.addColorStop(1, "rgba(255,255,255,0)");
      c.strokeStyle = g; c.lineWidth = 4; c.beginPath(); c.moveTo(x, y); c.lineTo(x + 160, y - 64); c.stroke();
    }
  },
};

// ───────── No.03 글래스모피즘 ─────────
export const glass: Scene = {
  init() {
    return { bg: makeCanvas(W / 4, H / 4) };
  },
  draw(c, t, st) {
    // 빛 덩어리 배경 (작은 캔버스에 그려서 키움 → 부드러운 번짐)
    const b: HTMLCanvasElement = st.bg; const g = b.getContext("2d")!;
    g.setTransform(0.25, 0, 0, 0.25, 0, 0);
    g.globalCompositeOperation = "source-over"; g.fillStyle = "#07060F"; g.fillRect(0, 0, W, H);
    g.globalCompositeOperation = "lighter";
    const blobs = [["#FF7A1A", 300, 300], ["#FF2D9B", 1100, 260], ["#2D5BFF", 1000, 820], ["#16D6C4", 380, 860], ["#FFC23B", 720, 540]];
    blobs.forEach(([col, x, y]: any, i) => {
      const bx = x + Math.sin(t * 0.9 + i * 2) * 90, by = y + Math.cos(t * 0.7 + i) * 70;
      const rg = g.createRadialGradient(bx, by, 0, bx, by, 420);
      rg.addColorStop(0, col + "CC"); rg.addColorStop(1, col + "00");
      g.fillStyle = rg; g.fillRect(0, 0, W, H);
    });
    g.globalCompositeOperation = "source-over";
    c.drawImage(b, 0, 0, W, H);

    // 카드
    const land = easeOutExpo(prog(t, 0, 0.62));
    const cw = 640, chh = 400;
    const cx = 470, cy = 560;
    const tilt = lerp(0.55, 0, land) + Math.sin(t * 1.3) * 0.06;
    const skewY = lerp(-0.35, 0, land) + Math.sin(t * 1.1 + 1) * 0.04;
    const yOff = lerp(520, 0, land);
    c.save();
    c.translate(cx, cy + yOff);
    c.transform(1, skewY * 0.4, -tilt * 0.3, 1, 0, 0);
    c.rotate(lerp(-0.4, -0.06, land));
    c.scale(lerp(1.35, 1, land), lerp(1.35, 1, land) * (1 - tilt * 0.18));
    c.globalAlpha = clamp(land * 1.6);
    if (land < 0.9) c.filter = `blur(${(1 - land / 0.9) * 18}px)`;
    // 유리 = 뒤 배경을 흐리게 비춤
    roundRect(c, -cw / 2, -chh / 2, cw, chh, 34);
    c.save(); c.clip();
    c.filter = (land < 0.9 ? `blur(${(1 - land / 0.9) * 18 + 14}px)` : "blur(14px)");
    c.drawImage(b, -cx, -cy - yOff, W, H);
    c.filter = land < 0.9 ? `blur(${(1 - land / 0.9) * 18}px)` : "none";
    c.fillStyle = "rgba(255,255,255,0.12)"; c.fillRect(-cw, -chh, cw * 2, chh * 2);
    const hl = c.createLinearGradient(0, -chh / 2, 0, -chh / 2 + 120);
    hl.addColorStop(0, "rgba(255,255,255,0.35)"); hl.addColorStop(1, "rgba(255,255,255,0)");
    c.fillStyle = hl; c.fillRect(-cw / 2, -chh / 2, cw, 120);
    // 빛줄기 두 번
    for (const [a, bb] of [[0.7, 1.15], [1.75, 2.2]]) {
      const p = prog(t, a, bb);
      if (p > 0 && p < 1) {
        const x = lerp(-cw, cw, p);
        const sg = c.createLinearGradient(x - 90, 0, x + 90, 0);
        sg.addColorStop(0, "rgba(255,255,255,0)"); sg.addColorStop(0.5, "rgba(255,255,255,0.45)"); sg.addColorStop(1, "rgba(255,255,255,0)");
        c.save(); c.rotate(-0.4); c.fillStyle = sg; c.fillRect(x - 90, -cw, 180, cw * 2); c.restore();
      }
    }
    c.restore();
    roundRect(c, -cw / 2, -chh / 2, cw, chh, 34);
    c.lineWidth = 2; c.strokeStyle = "rgba(255,255,255,0.55)"; c.stroke();
    // 카드 내용
    c.fillStyle = "#fff"; c.textBaseline = "alphabetic";
    c.font = `800 40px ${KR}`; c.fillText("GLASS", -cw / 2 + 44, -chh / 2 + 76);
    c.font = `300 40px ${KR}`; c.fillText("pay", -cw / 2 + 178, -chh / 2 + 76);
    roundRect(c, cw / 2 - 190, -chh / 2 + 42, 146, 44, 22); c.fillStyle = "rgba(255,255,255,0.2)"; c.fill();
    c.fillStyle = "#fff"; c.font = `700 20px ${KR}`; c.textAlign = "center"; c.fillText("PREMIUM", cw / 2 - 117, -chh / 2 + 71); c.textAlign = "left";
    // IC칩
    const chip = c.createLinearGradient(-cw / 2 + 44, -40, -cw / 2 + 134, 30);
    chip.addColorStop(0, "#F7DC8A"); chip.addColorStop(1, "#C9962E");
    roundRect(c, -cw / 2 + 44, -46, 92, 68, 12); c.fillStyle = chip; c.fill();
    c.strokeStyle = "rgba(120,80,10,0.6)"; c.lineWidth = 2;
    c.beginPath(); c.moveTo(-cw / 2 + 44, -12); c.lineTo(-cw / 2 + 136, -12); c.moveTo(-cw / 2 + 90, -46); c.lineTo(-cw / 2 + 90, 22); c.stroke();
    // 비접촉 아이콘
    c.strokeStyle = "rgba(255,255,255,0.85)"; c.lineWidth = 4;
    for (let i = 0; i < 3; i++) { c.beginPath(); c.arc(-cw / 2 + 170, -12, 14 + i * 12, -0.8, 0.8); c.stroke(); }
    // 홀로그램 스티커
    const holo = c.createLinearGradient(cw / 2 - 140, 0, cw / 2 - 44, 70);
    const hs = (t * 0.6) % 1;
    ["#FF8BD1", "#8BE8FF", "#B8FF8B", "#FFE48B", "#C58BFF"].forEach((col, i) => holo.addColorStop((i / 4 + hs) % 1, col));
    roundRect(c, cw / 2 - 140, -40, 96, 64, 14); c.fillStyle = holo; c.globalAlpha *= 0.85; c.fill(); c.globalAlpha = clamp(land * 1.6);
    c.fillStyle = "#fff"; c.font = `600 38px ${KR}`; c.fillText("••••  ••••  ••••  2026", -cw / 2 + 44, 96);
    c.font = `500 20px ${KR}`; c.fillStyle = "rgba(255,255,255,0.75)"; c.fillText("VALID THRU  12/29", -cw / 2 + 44, 150);
    // 상태 라벨
    const ok = t >= 1;
    roundRect(c, cw / 2 - 230, chh / 2 - 74, 190, 44, 22);
    c.fillStyle = ok ? "rgba(52,211,153,0.35)" : "rgba(255,255,255,0.18)"; c.fill();
    c.fillStyle = ok ? "#B7FFD9" : "#fff"; c.font = `700 20px ${KR}`; c.textAlign = "center";
    c.fillText(ok ? "APPROVED" : "PAYING" + ".".repeat(1 + (Math.floor(t * 6) % 3)), cw / 2 - 135, chh / 2 - 45);
    c.textAlign = "left";
    c.filter = "none";
    c.restore();
    c.globalAlpha = 1;

    // 알림 3개
    const notes = [
      { t: 0.85, a: "결제 완료", v: 49000, f: (n: number) => `₩ ${n.toLocaleString()}` },
      { t: 1.2, a: "포인트 적립", v: 1200, f: (n: number) => `+ ${n.toLocaleString()} P` },
      { t: 1.55, a: "이번 달 절약", v: 32, f: (n: number) => `${n}%` },
    ];
    const arrived = notes.filter((n) => t >= n.t);
    notes.forEach((n, i) => {
      if (t < n.t) return;
      const drop = easeOutBack(prog(t, n.t, n.t + 0.35), 1.2);
      const newer = arrived.length - 1 - i; // 위에서부터 자리
      let slot = 0;
      for (let j = i + 1; j < notes.length; j++) if (t >= notes[j].t) slot += easeOutCubic(prog(t, notes[j].t, notes[j].t + 0.3));
      void newer;
      const x = 900, y = lerp(-140, 220, drop) + slot * 150;
      c.save(); c.translate(x, y);
      roundRect(c, 0, 0, 440, 124, 30);
      c.save(); c.clip(); c.filter = "blur(12px)"; c.drawImage(b, -x, -y, W, H); c.filter = "none";
      c.fillStyle = "rgba(255,255,255,0.14)"; c.fillRect(0, 0, 440, 124); c.restore();
      c.strokeStyle = "rgba(255,255,255,0.5)"; c.lineWidth = 2; c.stroke();
      c.fillStyle = "rgba(255,255,255,0.75)"; c.font = `500 24px ${KR}`; c.fillText(n.a, 34, 48);
      const num = Math.round(n.v * easeOutCubic(prog(t, n.t + 0.1, n.t + 0.7)));
      c.fillStyle = "#fff"; c.font = `800 40px ${KR}`; c.fillText(n.f(num), 34, 98);
      c.restore();
    });

    // 체크 배지
    const bd = easeOutBack(prog(t, 2.05, 2.35), 2.5);
    if (bd > 0) {
      c.save(); c.translate(760, 330); c.scale(bd, bd);
      c.beginPath(); c.arc(0, 0, 62, 0, Math.PI * 2);
      c.fillStyle = "rgba(255,255,255,0.2)"; c.fill(); c.strokeStyle = "rgba(255,255,255,0.7)"; c.lineWidth = 3; c.stroke();
      c.strokeStyle = "#3EF29A"; c.lineWidth = 12; c.lineCap = "round"; c.lineJoin = "round";
      c.beginPath(); c.moveTo(-26, 2); c.lineTo(-6, 22); c.lineTo(28, -18); c.stroke();
      c.restore();
    }
  },
};

// ───────── No.04 Y2K 크롬 ─────────
const chromeGrad = (c: CanvasRenderingContext2D, y0: number, y1: number, shift: number) => {
  const g = c.createLinearGradient(0, y0, 0, y1);
  const s = ["#FFFFFF", "#BFE9FF", "#1C2A6B", "#FFB3E6", "#FFFFFF"];
  for (let i = 0; i < s.length; i++) g.addColorStop(clamp(((i / (s.length - 1)) * 0.8 + shift * 0.2)), s[i]);
  return g;
};

const star4 = (c: CanvasRenderingContext2D, x: number, y: number, r: number, rot: number, fill: string | CanvasGradient) => {
  c.save(); c.translate(x, y); c.rotate(rot);
  c.beginPath();
  for (let i = 0; i < 8; i++) {
    const rr = i % 2 === 0 ? r : r * 0.28;
    const a = (i * Math.PI) / 4 - Math.PI / 2;
    c.lineTo(Math.cos(a) * rr, Math.sin(a) * rr);
  }
  c.closePath(); c.fillStyle = fill; c.fill();
  c.restore();
};

export const y2k: Scene = {
  draw(c, t) {
    const bg = c.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, "#DDE9FF"); bg.addColorStop(0.55, "#F6E8FF"); bg.addColorStop(1, "#FFE3F3");
    c.fillStyle = bg; c.fillRect(0, 0, W, H);
    // 동심 타원
    c.lineWidth = 3;
    for (let i = 0; i < 8; i++) {
      const r = ((t * 0.35 + i / 8) % 1);
      c.strokeStyle = `rgba(120,140,255,${(1 - r) * 0.35})`;
      c.beginPath(); c.ellipse(W / 2, H / 2, 200 + r * 800, 90 + r * 380, 0, 0, Math.PI * 2); c.stroke();
    }
    // 반짝이
    for (let i = 0; i < 14; i++) {
      const a = Math.max(0, Math.sin(t * 5 + i * 2.1));
      if (a < 0.2) continue;
      c.globalAlpha = a;
      star4(c, hash(i) * W, hash(i + 20) * H, 10 + hash(i + 40) * 16, 0, "#FFFFFF");
      c.globalAlpha = 1;
    }

    const cx = W / 2, cy = H / 2 - 20;
    const ringT = (part: "back" | "front") => {
      for (let k = 0; k < 2; k++) {
        const tilt = -0.32 + k * 0.6 + Math.sin(t * 1.2 + k) * 0.08;
        const rx = 560 - k * 70, ry = 120 + k * 30;
        c.save(); c.translate(cx, cy); c.rotate(tilt);
        const g = c.createLinearGradient(-rx, -ry, rx, ry);
        g.addColorStop(0, "#FFFFFF"); g.addColorStop(0.3, "#9FB6FF"); g.addColorStop(0.5, "#22306E");
        g.addColorStop(0.7, "#FFC2EC"); g.addColorStop(1, "#FFFFFF");
        c.strokeStyle = g; c.lineWidth = 16;
        c.beginPath();
        if (part === "back") c.ellipse(0, 0, rx, ry, 0, Math.PI, Math.PI * 2);
        else c.ellipse(0, 0, rx, ry, 0, 0, Math.PI);
        c.stroke();
        // 구슬 5개
        for (let j = 0; j < 5; j++) {
          const a = t * (1.4 - k * 0.3) + (j * Math.PI * 2) / 5 + k;
          const s = Math.sin(a);
          if ((part === "front") !== s > 0) continue;
          const x = Math.cos(a) * rx, y = s * ry;
          const bg2 = c.createRadialGradient(x - 6, y - 6, 2, x, y, 18);
          bg2.addColorStop(0, "#FFFFFF"); bg2.addColorStop(0.6, "#8FA7E8"); bg2.addColorStop(1, "#1C2A6B");
          c.fillStyle = bg2; c.beginPath(); c.arc(x, y, 18, 0, Math.PI * 2); c.fill();
        }
        c.restore();
      }
    };
    ringT("back");

    // Y2K 글자
    const p = easeOutCubic(prog(t, 0, 0.5));
    let s = lerp(1.8, 1, p);
    if (t > 1.3) s *= 1 + Math.sin(Math.PI * prog(t, 1.3, 1.5)) * 0.06;
    c.save(); c.translate(cx, cy); c.scale(s, s); c.transform(1, 0, -0.2, 1, 0, 0);
    if (p < 1) c.filter = `blur(${(1 - p) * 26}px)`;
    c.font = `400 330px ${ARCHIVO}`; c.textAlign = "center"; c.textBaseline = "middle";
    c.lineJoin = "round"; c.lineWidth = 14; c.strokeStyle = "#1C2A6B"; c.strokeText("Y2K", 0, 0);
    c.fillStyle = chromeGrad(c, -150, 150, (Math.sin(t * 2.5) + 1) / 2); c.fillText("Y2K", 0, 0);
    // 빛줄기
    const lp = prog(t, 1.3, 1.62);
    if (lp > 0 && lp < 1) {
      c.save(); c.globalCompositeOperation = "source-atop";
      const x = lerp(-600, 600, lp);
      const lg = c.createLinearGradient(x - 80, 0, x + 80, 0);
      lg.addColorStop(0, "rgba(255,255,255,0)"); lg.addColorStop(0.5, "rgba(255,255,255,1)"); lg.addColorStop(1, "rgba(255,255,255,0)");
      c.rotate(0.4); c.fillStyle = lg; c.fillRect(x - 80, -500, 160, 1000);
      c.restore();
    }
    c.filter = "none";
    c.restore();
    ringT("front");

    // 크롬 별 3개
    const stars = [[1180, 220, 90, 0.2], [270, 330, 54, 0.35], [330, 790, 40, 0.5]];
    stars.forEach(([x, y, r, d], i) => {
      const e = easeOutBack(prog(t, d, d + 0.35), 2.2);
      if (e <= 0) return;
      const g = c.createLinearGradient(x - r, y - r, x + r, y + r);
      g.addColorStop(0, "#FFFFFF"); g.addColorStop(0.45, "#9FB6FF"); g.addColorStop(0.55, "#22306E"); g.addColorStop(1, "#FFD0F0");
      star4(c, x, y, r * e, t * (1 + i * 0.4), g);
    });

    // 알약 버튼
    const bp = easeOutBack(prog(t, 1.7, 2.0), 2.4);
    if (bp > 0) {
      c.save(); c.translate(cx, H - 170); c.scale(bp, bp);
      const g = c.createLinearGradient(0, -40, 0, 40);
      g.addColorStop(0, "#FFFFFF"); g.addColorStop(0.5, "#A9BDF5"); g.addColorStop(0.51, "#6F86D6"); g.addColorStop(1, "#E9EEFF");
      roundRect(c, -250, -42, 500, 84, 42); c.fillStyle = g; c.fill();
      c.lineWidth = 4; c.strokeStyle = "#1C2A6B"; c.stroke();
      c.fillStyle = "#1C2A6B"; c.font = `400 34px ${ARCHIVO}`; c.textAlign = "center"; c.textBaseline = "middle";
      c.fillText("✦ CYBER CHROME ✦", 0, 2);
      c.restore();
    }
    const fl = t > 1.3 ? 1 - prog(t, 1.3, 1.5) : 0;
    if (fl > 0) { c.fillStyle = `rgba(255,255,255,${fl * 0.7})`; c.fillRect(0, 0, W, H); }
  },
};
