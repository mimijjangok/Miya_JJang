import {
  W, H, Scene, prog, lerp, clamp, easeOutBack, easeOutCubic, easeInOut3, easeOutExpo, hash, rng, mix,
  KR, ARCHIVO, roundRect, makeCanvas,
} from "./util";

// ───────── No.05 신스웨이브 ─────────
const HOR = 600; // 지평선
const proj = (x: number, y: number, z: number) => {
  const f = 900 / z;
  return [W / 2 + x * f, HOR - y * f, f] as const;
};

export const synthwave: Scene = {
  draw(c, t) {
    const out = t >= 1.28;
    // 하늘
    const sky = c.createLinearGradient(0, 0, 0, HOR);
    sky.addColorStop(0, "#0B0626"); sky.addColorStop(0.7, "#2A0E52"); sky.addColorStop(1, "#5B1676");
    c.fillStyle = sky; c.fillRect(0, 0, W, HOR);
    for (let i = 0; i < 80; i++) {
      const a = 0.4 + 0.6 * Math.abs(Math.sin(t * 3 + i));
      c.fillStyle = `rgba(255,255,255,${a * 0.8})`;
      c.fillRect(hash(i) * W, hash(i + 50) * (HOR - 60), 3, 3);
    }
    // 도시 실루엣
    const cr = easeOutBack(prog(t, 1.28, 1.7), 1.2);
    if (cr > 0) {
      // 레이저
      c.save(); c.globalCompositeOperation = "lighter";
      for (let i = 0; i < 5; i++) {
        const a = -Math.PI / 2 + Math.sin(t * 1.6 + i * 1.3) * 0.7;
        const x0 = 380 + i * 170;
        c.strokeStyle = i % 2 ? "rgba(0,255,240,0.55)" : "rgba(255,60,200,0.55)";
        c.lineWidth = 5;
        c.beginPath(); c.moveTo(x0, HOR - 120); c.lineTo(x0 + Math.cos(a) * 1200, HOR - 120 + Math.sin(a) * 1200); c.stroke();
      }
      c.restore();
      const r = rng(7);
      let x = 220;
      while (x < W - 220) {
        const bw = 40 + r() * 70, bh = (80 + r() * 210) * cr;
        c.fillStyle = "#12062A"; c.fillRect(x, HOR - bh, bw, bh);
        for (let wy = HOR - bh + 12; wy < HOR - 10; wy += 22)
          for (let wx = x + 8; wx < x + bw - 8; wx += 16) {
            if (hash(wx * 3 + wy) > 0.55 && Math.sin(t * 4 + wx + wy) > -0.5) {
              c.fillStyle = hash(wx + wy) > 0.5 ? "#FFD36B" : "#FF7FD8"; c.fillRect(wx, wy, 6, 8);
            }
          }
        x += bw + 6;
      }
    }
    // 지평선 빛띠
    const hg = c.createLinearGradient(0, HOR - 40, 0, HOR + 10);
    hg.addColorStop(0, "rgba(255,60,190,0)"); hg.addColorStop(1, "rgba(255,90,210,0.9)");
    c.fillStyle = hg; c.fillRect(0, HOR - 40, W, 50);
    // 바닥
    c.fillStyle = "#12021F"; c.fillRect(0, HOR, W, H - HOR);
    const speed = 22;
    c.save(); c.shadowColor = "#FF2FC8"; c.shadowBlur = 14;
    c.strokeStyle = "#FF3FD0"; c.lineWidth = 2.5;
    for (let gx = -60; gx <= 60; gx += 3) {
      if (Math.abs(gx) < 3) continue;
      const [x1, y1] = proj(gx, -2, 1); const [x2, y2] = proj(gx, -2, 80);
      c.beginPath(); c.moveTo(x1, y1); c.lineTo(x2, y2); c.stroke();
    }
    for (let i = 0; i < 40; i++) {
      const z = 80 - ((t * speed + i * 2) % 80);
      if (z < 0.6) continue;
      const [, y] = proj(0, -2, z);
      c.globalAlpha = clamp(1 - z / 80); c.beginPath(); c.moveTo(0, y); c.lineTo(W, y); c.stroke();
    }
    c.globalAlpha = 1; c.restore();
    // 도로
    const rw = 2.6;
    const [a1x, a1y] = proj(-rw, -2, 0.8), [a2x, a2y] = proj(rw, -2, 0.8), [b1x, b1y] = proj(-rw, -2, 80), [b2x] = proj(rw, -2, 80);
    c.fillStyle = "#050208"; c.beginPath(); c.moveTo(a1x, a1y); c.lineTo(b1x, b1y); c.lineTo(b2x, b1y); c.lineTo(a2x, a2y); c.fill();
    c.save(); c.shadowColor = "#00FFF0"; c.shadowBlur = 18; c.strokeStyle = "#3BFFF2"; c.lineWidth = 5;
    c.beginPath(); c.moveTo(a1x, a1y); c.lineTo(b1x, b1y); c.moveTo(a2x, a2y); c.lineTo(b2x, b1y); c.stroke(); c.restore();
    c.fillStyle = "#FFFFFF";
    for (let i = 0; i < 30; i++) {
      const z = 60 - ((t * speed * 1.2 + i * 3) % 60);
      if (z < 1) continue;
      const [x1, y1, f1] = proj(0, -2, z), [, y2] = proj(0, -2, z + 1.2);
      c.fillRect(x1 - f1 * 0.06, y2, f1 * 0.12, Math.max(1, y1 - y2));
    }
    // 헤드라이트·미등
    c.save(); c.globalCompositeOperation = "lighter";
    for (let i = 0; i < 4; i++) {
      const z = 60 - ((t * speed * 2.2 + i * 15) % 60);
      if (z > 1.5) {
        const [x, y, f] = proj(-1.4, -1.6, z);
        c.fillStyle = "rgba(255,255,255,0.9)"; c.beginPath(); c.ellipse(x - f * 0.25, y, f * 0.12, f * 0.05, 0, 0, 7); c.ellipse(x + f * 0.25, y, f * 0.12, f * 0.05, 0, 0, 7); c.fill();
      }
      const z2 = 10 + ((i * 11 + t * 3) % 40);
      const [x2, y2, f2] = proj(1.3, -1.6, z2);
      c.fillStyle = "rgba(255,40,60,0.9)"; c.beginPath(); c.ellipse(x2 - f2 * 0.22, y2, f2 * 0.08, f2 * 0.04, 0, 0, 7); c.ellipse(x2 + f2 * 0.22, y2, f2 * 0.08, f2 * 0.04, 0, 0, 7); c.fill();
    }
    c.restore();
    // 야자수
    if (out) {
      for (let i = 0; i < 6; i++) {
        const z = 40 - ((t * speed * 0.8 + i * 7) % 40);
        if (z < 1.2) continue;
        for (const side of [-1, 1]) {
          const [x, y, f] = proj(side * 7, -2, z);
          c.save(); c.translate(x, y); c.scale(f / 60, f / 60);
          c.fillStyle = "#0A0216";
          c.beginPath(); c.moveTo(-6, 0); c.quadraticCurveTo(side * 30, -180, side * 10, -360); c.lineTo(side * 22, -360); c.quadraticCurveTo(side * 44, -180, 6, 0); c.fill();
          for (let l = 0; l < 6; l++) {
            const a = -Math.PI / 2 + (l - 2.5) * 0.55;
            c.beginPath(); c.moveTo(side * 16, -360);
            c.quadraticCurveTo(side * 16 + Math.cos(a) * 120, -360 + Math.sin(a) * 120 - 30, side * 16 + Math.cos(a) * 200, -360 + Math.sin(a) * 200 + 60);
            c.quadraticCurveTo(side * 16 + Math.cos(a) * 110, -360 + Math.sin(a) * 110, side * 16, -350); c.fill();
          }
          c.restore();
        }
      }
    }
    // 팔각 아치 터널
    if (!out) {
      for (let i = 9; i >= 0; i--) {
        const z = (i * 4 + 4) - ((t * speed * 1.4) % 4);
        if (z < 0.5) continue;
        const pts: number[][] = [];
        for (let k = 0; k < 8; k++) {
          const a = Math.PI / 8 + (k * Math.PI) / 4;
          pts.push([...proj(Math.cos(a) * 9, Math.sin(a) * 6 + 2, z)] as any);
        }
        c.save(); c.shadowBlur = 22;
        const pink = (i + Math.floor(t * 8)) % 2 === 0;
        c.shadowColor = pink ? "#FF2FC8" : "#00FFF0"; c.strokeStyle = pink ? "#FF5ED8" : "#5BFFF4";
        c.lineWidth = Math.max(2, 60 / z); c.globalAlpha = clamp(1.4 - z / 40);
        c.beginPath(); pts.forEach(([x, y], k) => (k ? c.lineTo(x, y) : c.moveTo(x, y))); c.closePath(); c.stroke();
        c.restore();
      }
      // 천장 레일 + 속도선
      c.strokeStyle = "rgba(91,255,244,0.5)"; c.lineWidth = 3;
      for (const rx of [-3, 3]) { const [x1, y1] = proj(rx, 8, 0.8), [x2, y2] = proj(rx, 8, 40); c.beginPath(); c.moveTo(x1, y1); c.lineTo(x2, y2); c.stroke(); }
      c.strokeStyle = "rgba(255,255,255,0.35)"; c.lineWidth = 2;
      for (let i = 0; i < 26; i++) {
        const a = hash(i) * Math.PI * 2, ph = (t * 3 + hash(i + 9)) % 1;
        const r0 = 500 + ph * 500;
        c.beginPath(); c.moveTo(W / 2 + Math.cos(a) * r0, HOR - 60 + Math.sin(a) * r0 * 0.7);
        c.lineTo(W / 2 + Math.cos(a) * (r0 + 180), HOR - 60 + Math.sin(a) * (r0 + 180) * 0.7); c.stroke();
      }
    }
    // NIGHT / DRIVE
    if (out) {
      const p = easeOutExpo(prog(t, 1.28, 1.62));
      const flick = t < 2.3 && Math.sin(t * 70) > 0.6 && t > 1.7 ? 0.45 : 1;
      c.save(); c.translate(W / 2, 220); c.scale(lerp(1.7, 1, p), lerp(1.7, 1, p)); c.transform(1, 0, -0.18, 1, 0, 0);
      if (p < 1) c.filter = `blur(${(1 - p) * 20}px)`;
      c.font = `400 150px ${ARCHIVO}`; c.textAlign = "center"; c.textBaseline = "middle";
      const g = c.createLinearGradient(0, -170, 0, 170);
      g.addColorStop(0, "#9BE7FF"); g.addColorStop(0.48, "#1B1F6B"); g.addColorStop(0.52, "#FF4FC8"); g.addColorStop(1, "#FF9A3D");
      c.globalAlpha = flick; c.shadowColor = "#FF2FC8"; c.shadowBlur = 40;
      c.fillStyle = g; c.fillText("NIGHT", 0, -80); c.fillText("DRIVE", 0, 75);
      c.shadowBlur = 0; c.lineWidth = 3; c.strokeStyle = "rgba(255,255,255,0.7)"; c.strokeText("NIGHT", 0, -80); c.strokeText("DRIVE", 0, 75);
      c.filter = "none"; c.restore();
      const kp = easeOutCubic(prog(t, 1.7, 2.0));
      if (kp > 0) {
        c.save(); c.translate(W / 2, 450); c.scale(kp, 1);
        c.font = `700 46px ${KR}`; c.textAlign = "center"; c.textBaseline = "middle";
        c.shadowColor = "#00FFF0"; c.shadowBlur = 24; c.fillStyle = "#7CFFF6";
        c.fillText("▶  120 KM/H  ◀", 0, 0); c.restore();
      }
    }
    // 번쩍
    const fl = out ? 1 - prog(t, 1.28, 1.5) : 0;
    if (fl > 0) { c.fillStyle = `rgba(255,255,255,${fl})`; c.fillRect(0, 0, W, H); }
    // 주사선 + 비네트
    c.fillStyle = "rgba(0,0,0,0.18)";
    for (let y = 0; y < H; y += 6) c.fillRect(0, y, W, 2);
    const v = c.createRadialGradient(W / 2, H / 2, H * 0.35, W / 2, H / 2, H * 0.95);
    v.addColorStop(0, "rgba(0,0,0,0)"); v.addColorStop(1, "rgba(0,0,0,0.65)");
    c.fillStyle = v; c.fillRect(0, 0, W, H);
  },
};

// ───────── No.06 종이 콜라주 ─────────
const torn = (c: CanvasRenderingContext2D, pts: number[][], seed: number, amp = 10) => {
  // 꼭짓점 사이를 들쭉날쭉 찢긴 선으로
  const r = rng(seed);
  c.beginPath();
  pts.forEach(([x, y], i) => {
    const [nx, ny] = pts[(i + 1) % pts.length];
    const n = Math.max(2, Math.floor(Math.hypot(nx - x, ny - y) / 18));
    for (let k = 0; k < n; k++) {
      const q = k / n;
      const ox = (r() - 0.5) * amp, oy = (r() - 0.5) * amp;
      const px = lerp(x, nx, q) + ox, py = lerp(y, ny, q) + oy;
      if (i === 0 && k === 0) c.moveTo(px, py); else c.lineTo(px, py);
    }
  });
  c.closePath();
};
const circlePts = (cx: number, cy: number, r: number, n = 26) =>
  Array.from({ length: n }, (_, i) => [cx + Math.cos((i / n) * Math.PI * 2) * r, cy + Math.sin((i / n) * Math.PI * 2) * r]);

export const collage: Scene = {
  init() {
    const cv = makeCanvas(720, 540), g = cv.getContext("2d")!;
    g.fillStyle = "#D8C29E"; g.fillRect(0, 0, 720, 540);
    const r = rng(3);
    for (let i = 0; i < 9000; i++) { g.fillStyle = `rgba(${r() > 0.5 ? "255,255,255" : "90,60,20"},${r() * 0.08})`; g.fillRect(r() * 720, r() * 540, 1.5, 1.5); }
    g.strokeStyle = "rgba(120,90,40,0.12)"; g.lineWidth = 0.6;
    for (let i = 0; i < 160; i++) { const x = r() * 720, y = r() * 540; g.beginPath(); g.moveTo(x, y); g.lineTo(x + (r() - 0.5) * 40, y + (r() - 0.5) * 10); g.stroke(); }
    return { paper: cv };
  },
  draw(c, t, st) {
    const tq = Math.floor(t * 12) / 12; // 1초 12장
    const frame = Math.floor(t * 12);
    c.drawImage(st.paper, 0, 0, W, H);
    const fall = prog(t, 2.42, 3);

    // 붙이기 공통
    const stick = (i: number, cx: number, cy: number, fn: () => void, seedRot = 0) => {
      const ts = 0.08 + i * 0.17;
      if (tq < ts) return;
      const n = Math.floor((tq - ts) * 12 + 0.001);
      const s = n === 0 ? 1.32 : n === 1 ? 1.08 : 1;
      const jit = (hash(frame * 13 + i) - 0.5) * 0.012;
      c.save(); c.translate(cx, cy); c.rotate(seedRot + jit); c.scale(s, s);
      c.shadowColor = "rgba(60,40,10,0.35)"; c.shadowBlur = n === 0 ? 30 : n === 1 ? 14 : 6; c.shadowOffsetY = n === 0 ? 18 : n === 1 ? 8 : 3;
      fn();
      c.restore();
    };
    const piece = (pts: number[][], seed: number, col: string) => {
      c.fillStyle = "#FBF7EE"; torn(c, pts.map(([x, y]) => [x * 1.03, y * 1.05]), seed, 14); c.fill();
      c.shadowColor = "transparent"; c.fillStyle = col; torn(c, pts, seed + 1, 10); c.fill();
    };

    // 파란 띠
    stick(0, W / 2, 300, () => piece([[-800, -70], [800, -90], [800, 80], [-800, 60]], 11, "#2F5BD9"), -0.08);
    // 분홍 원 + 망점
    stick(1, 330, 360, () => {
      piece(circlePts(0, 0, 190), 21, "#FF8FB8");
      c.fillStyle = "rgba(255,255,255,0.6)";
      for (let y = -170; y < 170; y += 22) for (let x = -170; x < 170; x += 22) if (x * x + y * y < 160 * 160) { c.beginPath(); c.arc(x, y, 5, 0, 7); c.fill(); }
    });
    // 눈 사진 조각
    stick(2, 760, 380, () => {
      piece([[-260, -150], [260, -160], [250, 150], [-250, 160]], 31, "#E9E4DA");
      c.save(); torn(c, [[-250, -150], [250, -150], [240, 145], [-240, 150]], 32, 10); c.clip();
      c.fillStyle = "#CFC6B8"; c.fillRect(-260, -160, 520, 320);
      c.fillStyle = "rgba(0,0,0,0.12)";
      for (let y = -160; y < 160; y += 9) for (let x = -260; x < 260; x += 9) { c.beginPath(); c.arc(x, y, 2.2 + (Math.sin(x * 0.02) + 1), 0, 7); c.fill(); }
      const blink = t > 1.85 && t < 2.05 ? Math.sin(Math.PI * prog(t, 1.85, 2.05)) : 0;
      const eh = 110 * (1 - blink);
      c.fillStyle = "#FFFFFF"; c.beginPath(); c.moveTo(-200, 0); c.quadraticCurveTo(0, -eh, 200, 0); c.quadraticCurveTo(0, eh, -200, 0); c.fill();
      c.save(); c.clip();
      const px = Math.sin(t * 2.2) * 60;
      c.fillStyle = "#2E6FD6"; c.beginPath(); c.arc(px, 0, 70, 0, 7); c.fill();
      c.fillStyle = "#0E1A3A"; c.beginPath(); c.arc(px, 0, 30, 0, 7); c.fill();
      c.fillStyle = "#fff"; c.beginPath(); c.arc(px + 22, -22, 12, 0, 7); c.fill();
      c.restore();
      c.strokeStyle = "#1B1410"; c.lineWidth = 9; c.lineCap = "round";
      c.beginPath(); c.moveTo(-200, 0); c.quadraticCurveTo(0, -eh, 200, 0); c.stroke();
      for (let k = -5; k <= 5; k++) { const x = k * 34, y = -eh * (1 - (x / 200) ** 2) / 1.0 * 0.5 - 4; c.beginPath(); c.moveTo(x, y); c.lineTo(x + k * 4, y - 40); c.stroke(); }
      c.restore();
    }, 0.05);
    // 종이꽃
    stick(3, 1180, 560, () => {
      c.strokeStyle = "#3F8A3A"; c.lineWidth = 14; c.beginPath(); c.moveTo(0, 40); c.quadraticCurveTo(-20, 160, 10, 300); c.stroke();
      piece([[0, 180], [-110, 130], [-130, 200], [-30, 220]], 41, "#4FA34A");
      const step = Math.floor(t * 12) * (Math.PI / 12);
      for (let k = 0; k < 6; k++) {
        const a = step + (k * Math.PI) / 3;
        c.save(); c.rotate(a);
        piece([[0, -20], [-48, -110], [0, -150], [48, -110]], 50 + k, k % 2 ? "#FF8A2B" : "#FF7417");
        c.restore();
      }
      piece(circlePts(0, 0, 42, 14), 60, "#FFD23B");
    }, -0.1);
    // 빨간 우표
    stick(4, 360, 760, () => {
      c.fillStyle = "#FFF"; c.beginPath();
      const w = 220, h = 270, tz = 14;
      for (let x = -w / 2; x < w / 2; x += tz) { c.lineTo(x, -h / 2); c.arc(x + tz / 2, -h / 2, tz / 2, Math.PI, 0, true); }
      for (let y = -h / 2; y < h / 2; y += tz) { c.lineTo(w / 2, y); c.arc(w / 2, y + tz / 2, tz / 2, -Math.PI / 2, Math.PI / 2, true); }
      for (let x = w / 2; x > -w / 2; x -= tz) { c.lineTo(x, h / 2); c.arc(x - tz / 2, h / 2, tz / 2, 0, Math.PI, true); }
      for (let y = h / 2; y > -h / 2; y -= tz) { c.lineTo(-w / 2, y); c.arc(-w / 2, y - tz / 2, tz / 2, Math.PI / 2, -Math.PI / 2, true); }
      c.fill();
      c.shadowColor = "transparent"; c.fillStyle = "#E3302F"; c.fillRect(-w / 2 + 16, -h / 2 + 16, w - 32, h - 32);
      c.fillStyle = "#FFF"; c.beginPath();
      for (let i = 0; i < 10; i++) { const r = i % 2 ? 26 : 62, a = -Math.PI / 2 + (i * Math.PI) / 5; c.lineTo(Math.cos(a) * r, -20 + Math.sin(a) * r); }
      c.fill();
      c.font = `700 40px 'Space Mono', monospace`; c.textAlign = "center"; c.fillText("2026", 0, 92);
    }, 0.12);
    // Paper Dreams
    stick(5, 820, 700, () => {
      piece([[-330, -70], [330, -80], [320, 70], [-320, 80]], 71, "#FFFDF6");
      c.fillStyle = "#1D1B2E"; c.font = `italic 900 92px 'Playfair Display', Georgia, serif`; c.textAlign = "center"; c.textBaseline = "middle";
      c.fillText("Paper Dreams", 0, 6);
    }, -0.04);
    // 마스킹테이프 4장
    [[190, 170, -0.6], [1010, 230, 0.5], [530, 640, 0.3], [1140, 640, -0.4]].forEach(([x, y, r], i) =>
      stick(6 + i * 0.25, x, y, () => {
        c.fillStyle = "rgba(240,228,190,0.82)"; torn(c, [[-80, -24], [80, -24], [80, 24], [-80, 24]], 80 + i, 6); c.fill();
      }, r));

    // 아래 노란 띠 + 점선 (잘린 뒤 아래 조각이 떨어짐)
    const cutY = 940;
    const drawStrip = (lower: boolean) => {
      c.save();
      c.beginPath(); lower ? c.rect(0, cutY, W, H) : c.rect(0, 0, W, cutY); c.clip();
      c.fillStyle = "#FFD43B"; torn(c, [[-20, 880], [W + 20, 870], [W + 20, 1010], [-20, 1020]], 90, 12); c.fill();
      c.fillStyle = "#2A2418"; c.font = `700 40px 'Space Mono', monospace`; c.textAlign = "center"; c.textBaseline = "middle";
      c.fillText("CUT · PASTE · REPEAT", W / 2, 905);
      c.restore();
    };
    drawStrip(false);
    if (fall > 0) {
      c.save(); c.translate(W / 2, cutY); c.rotate(fall * 0.5); c.translate(-W / 2 + fall * 80, -cutY + easeOutCubic(fall) * 0 + fall * fall * 600);
      drawStrip(true); c.restore();
    } else drawStrip(true);
    // 점선 / 잘린 선
    const sp = prog(t, 1.5, 2.4);
    const sx = lerp(-80, W + 80, sp);
    c.strokeStyle = "#2A2418"; c.lineWidth = 4; c.setLineDash([18, 14]);
    c.beginPath(); c.moveTo(Math.max(0, sx), cutY); c.lineTo(W, cutY); c.stroke(); c.setLineDash([]);
    if (sp > 0 && fall <= 0) { c.lineWidth = 3; c.beginPath(); c.moveTo(0, cutY); c.lineTo(sx, cutY); c.stroke(); }
    // 가위
    if (sp > 0 && sp < 1) {
      const open = Math.abs(Math.sin(t * 22)) * 0.45;
      c.save(); c.translate(sx, cutY); c.scale(2, 2);
      for (const s of [-1, 1]) {
        c.save(); c.rotate(s * open);
        c.fillStyle = "#C9CED6"; c.beginPath(); c.moveTo(0, 0); c.lineTo(150, s * -8); c.lineTo(0, s * 14); c.fill();
        c.strokeStyle = "#E84A3D"; c.lineWidth = 14; c.beginPath(); c.ellipse(-70, s * 34, 44, 28, 0, 0, 7); c.stroke();
        c.restore();
      }
      c.fillStyle = "#333"; c.beginPath(); c.arc(0, 0, 8, 0, 7); c.fill();
      c.restore();
    }
  },
};

// ───────── No.07 글리치 ─────────
export const glitch: Scene = {
  init() {
    const s = 0.5;
    const mk = () => { const cv = makeCanvas(W * s, H * s); const g = cv.getContext("2d")!; g.setTransform(s, 0, 0, s, 0, 0); return [cv, g] as const; };
    return { A: mk(), B: mk(), R: mk(), G: mk(), Bc: mk(), s };
  },
  draw(c, t, st) {
    const fr = Math.floor(t * 30);
    const r = rng(fr * 9973 + 17);
    const paint = (g: CanvasRenderingContext2D, word: string, kr: boolean) => {
      g.fillStyle = "#050505"; g.fillRect(0, 0, W, H);
      g.strokeStyle = "rgba(255,255,255,0.06)"; g.lineWidth = 1;
      for (let x = 0; x < W; x += 60) { g.beginPath(); g.moveTo(x, 0); g.lineTo(x, H); g.stroke(); }
      for (let y = 0; y < H; y += 60) { g.beginPath(); g.moveTo(0, y); g.lineTo(W, y); g.stroke(); }
      g.fillStyle = "#3CFF7A"; g.font = `500 30px 'Space Mono', monospace`; g.textBaseline = "top";
      g.fillText("> kernel_panic --code 0x1F", 60, 60);
      g.fillStyle = "#FF2E2E"; g.beginPath(); g.arc(W - 250, 78, 12, 0, 7); g.fill();
      g.fillStyle = "#fff"; g.fillText("REC 00:03", W - 225, 60);
      g.textAlign = "center"; g.textBaseline = "middle"; g.fillStyle = "#fff";
      g.font = kr ? `900 300px ${KR}` : `400 300px ${ARCHIVO}`; g.fillText(word, W / 2, H / 2 - 40);
      roundRect(g, W / 2 - 310, H / 2 + 130, 620, 70, 35); g.fillStyle = "#E3122C"; g.fill();
      g.fillStyle = "#fff"; g.font = `700 30px 'Space Mono', monospace`; g.fillText("FATAL EXCEPTION · 0xDEAD", W / 2, H / 2 + 166);
      const pct = Math.min(99, Math.floor((t / 3) * 100));
      g.textAlign = "left"; g.font = `600 28px ${KR}`; g.fillStyle = "#bbb"; g.fillText(`복구 중 ${pct}%`, 60, H - 90);
      g.fillStyle = "#222"; g.fillRect(260, H - 104, W - 320, 26); g.fillStyle = "#fff"; g.fillRect(260, H - 104, (W - 320) * pct / 100, 26);
      g.textAlign = "left";
    };
    const [Acv, Ag] = st.A, [Bcv, Bg] = st.B;
    paint(Ag, "ERROR", false); paint(Bg, "에러", true);
    const base = t < 1.6 ? Acv : Bcv;
    const alt = () => (t >= 1.6 && r() > 0.5 ? Acv : base);

    // 세기
    const big = (t < 0.34) || (t > 0.58 && t < 0.66) || (t > 1.16 && t < 1.6) || (t > 2.14 && t < 2.22) || t > 2.68;
    const clean = t >= 1.6 && t < 1.72;
    const g = clean ? 0 : big ? 0.7 + r() * 0.3 : 0.06;

    const zoom = clean ? lerp(1.1, 1, prog(t, 1.6, 1.72)) : 1 + (big ? r() * 0.05 : 0);
    const shx = (r() - 0.5) * 40 * g, shy = (r() - 0.5) * 20 * g;
    c.save(); c.translate(W / 2 + shx, H / 2 + shy); c.scale(zoom, zoom); c.translate(-W / 2, -H / 2);
    // RGB 분리
    if (g > 0.1) {
      const chans: [any, string, number][] = [[st.R, "#FF0000", -1], [st.G, "#00FF00", 0], [st.Bc, "#0000FF", 1]];
      c.fillStyle = "#000"; c.fillRect(0, 0, W, H);
      c.globalCompositeOperation = "lighter";
      for (const [[cv, cg], col, d] of chans) {
        cg.globalCompositeOperation = "source-over"; cg.drawImage(base, 0, 0, W, H);
        cg.globalCompositeOperation = "multiply"; cg.fillStyle = col; cg.fillRect(0, 0, W, H);
        cg.globalCompositeOperation = "source-over";
        c.drawImage(cv, d * 26 * g, d * 6 * g, W, H);
      }
      c.globalCompositeOperation = "source-over";
    } else c.drawImage(base, 0, 0, W, H);
    // 밀린 가로 띠
    const nb = Math.floor(g * 10);
    const s = st.s;
    for (let i = 0; i < nb; i++) {
      const y = r() * H, h = 10 + r() * 90, dx = (r() - 0.5) * 260 * g;
      c.drawImage(alt(), 0, y * s, W * s, h * s, dx, y, W, h);
    }
    // 블록 복사 + 색띠
    for (let i = 0; i < nb; i++) {
      const sx = r() * W, sy = r() * H, w = 60 + r() * 300, h = 20 + r() * 120;
      c.drawImage(alt(), sx * s, sy * s, w * s, h * s, r() * W, r() * H, w, h);
      if (r() > 0.6) { c.fillStyle = r() > 0.5 ? "rgba(255,60,200,0.55)" : "rgba(0,255,240,0.55)"; c.fillRect(r() * W, r() * H, 80 + r() * 400, 6 + r() * 20); }
    }
    // 픽셀 번짐
    if (g > 0.5) for (let i = 0; i < 3; i++) { const x = r() * W, y = r() * H, h = 40 + r() * 200; c.drawImage(base, x * s, y * s, 1, h * s, x, y, 200 + r() * 500, h); }
    c.restore();
    // 잡음 + 주사선
    c.fillStyle = "rgba(255,255,255,0.05)";
    for (let i = 0; i < 300 * (0.3 + g); i++) c.fillRect(r() * W, r() * H, 3, 3);
    c.fillStyle = "rgba(0,0,0,0.25)"; for (let y = 0; y < H; y += 5) c.fillRect(0, y, W, 2);
    if (big && r() > 0.8) { c.globalCompositeOperation = "difference"; c.fillStyle = "#fff"; c.fillRect(0, 0, W, H); c.globalCompositeOperation = "source-over"; }
    if (clean) { c.fillStyle = `rgba(255,255,255,${1 - prog(t, 1.6, 1.72)})`; c.fillRect(0, 0, W, H); }
  },
};

// ───────── No.08 파티클 ─────────
const N = 9000;
export const particles: Scene = {
  init() {
    const r = rng(42);
    const P = Array.from({ length: N }, (_, i) => ({
      arm: i % 3, rr: Math.pow(r(), 0.6), a0: r() * Math.PI * 2, sx: (r() - 0.5) * 2.6, sy: (r() - 0.5) * 2.6,
      j: r(), col: r() < 0.08 ? 3 : Math.floor(r() * 3), tx: 0, ty: 0, d: r(),
    }));
    const cv = makeCanvas(W / 2, H / 2);
    const st: any = { P, glow: cv, ready: false };
    st.sample = () => {
      const tc = makeCanvas(W / 4, H / 4), g = tc.getContext("2d")!;
      g.fillStyle = "#fff"; g.textAlign = "center"; g.textBaseline = "middle"; g.font = `900 ${150}px ${KR}`;
      g.fillText("반짝", W / 8, H / 8);
      const d = g.getImageData(0, 0, W / 4, H / 4).data; const pts: number[][] = [];
      for (let y = 0; y < H / 4; y += 1) for (let x = 0; x < W / 4; x += 1) if (d[(y * (W / 4) + x) * 4 + 3] > 128) pts.push([x * 4, y * 4]);
      if (!pts.length) return;
      const rr = rng(5);
      P.forEach((p) => { const q = pts[Math.floor(rr() * pts.length)]; p.tx = q[0] + (rr() - 0.5) * 4; p.ty = q[1] + (rr() - 0.5) * 4; });
      st.ready = true;
    };
    st.sample();
    if (typeof document !== "undefined" && (document as any).fonts) (document as any).fonts.load(`900 150px Pretendard`).then(() => st.sample()).catch(() => {});
    return st;
  },
  draw(c, t, st) {
    const COLS = ["255,140,40", "255,200,70", "255,60,190", "60,240,230"];
    const pos = (p: any, tt: number) => {
      // 은하
      const ang = p.a0 * 0.15 + (p.arm * Math.PI * 2) / 3 + p.rr * 5.2 + tt * 1.6;
      const R = p.rr * 470 + 10;
      let gx = Math.cos(ang) * R + (p.j - 0.5) * 50 * p.rr, gy = Math.sin(ang) * R * 0.42 + (p.d - 0.5) * 30 * p.rr;
      const cr = Math.cos(-0.35), sr = Math.sin(-0.35);
      [gx, gy] = [gx * cr - gy * sr + W / 2, gx * sr + gy * cr + H / 2];
      const inK = easeOutCubic(prog(tt, 0, 0.95 - p.d * 0.2));
      let x = lerp(W / 2 + p.sx * W, gx, inK), y = lerp(H / 2 + p.sy * H, gy, inK);
      // 글자로
      const k = easeInOut3(prog(tt, 0.95 + p.d * 0.15, 1.45 + p.d * 0.15));
      if (k > 0 && st.ready) {
        const mx = (x + p.tx) / 2 + Math.sin(p.a0) * 300, my = (y + p.ty) / 2 + Math.cos(p.a0) * 260;
        const u = 1 - k;
        x = u * u * x + 2 * u * k * mx + k * k * p.tx; y = u * u * y + 2 * u * k * my + k * k * p.ty;
        x += Math.sin(tt * 6 + p.a0) * 1.5 * k;
      }
      // 폭발
      const e = prog(tt, 2.42, 3);
      if (e > 0) {
        const dx = x - W / 2, dy = y - H / 2, a = Math.atan2(dy, dx) + e * 2.5 * (0.5 + p.j), d = Math.hypot(dx, dy) + easeOutExpo(e) * (500 + p.j * 700);
        x = W / 2 + Math.cos(a) * d; y = H / 2 + Math.sin(a) * d;
      }
      return [x, y];
    };
    c.fillStyle = "#05030B"; c.fillRect(0, 0, W, H);
    const core = c.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, 260);
    const cA = t < 1.1 ? 0.6 : 0.6 * (1 - prog(t, 1.1, 1.5));
    core.addColorStop(0, `rgba(255,150,40,${cA})`); core.addColorStop(1, "rgba(255,150,40,0)");
    c.fillStyle = core; c.fillRect(0, 0, W, H);
    c.globalCompositeOperation = "lighter";
    const onText = prog(t, 1.4, 1.6) * (1 - prog(t, 2.42, 2.6));
    const band = prog(t, 1.55, 2.15);
    c.lineCap = "round";
    for (let ci = 0; ci < 4; ci++) {
      c.strokeStyle = `rgba(${COLS[ci]},${0.55 + onText * 0.35})`;
      c.lineWidth = 1.6 + onText * 1.6;
      c.beginPath();
      for (const p of st.P) {
        if (p.col !== ci) continue;
        const [x, y] = pos(p, t), [px, py] = pos(p, t - 1 / 45);
        c.moveTo(px, py); c.lineTo(x + 0.01, y);
      }
      c.stroke();
    }
    // 빛 띠
    if (band > 0 && band < 1) {
      const bx = lerp(200, W - 200, band);
      const g = c.createLinearGradient(bx - 120, 0, bx + 120, 0);
      g.addColorStop(0, "rgba(255,240,200,0)"); g.addColorStop(0.5, "rgba(255,240,200,0.5)"); g.addColorStop(1, "rgba(255,240,200,0)");
      c.fillStyle = g; c.fillRect(bx - 120, 250, 240, 580);
    }
    c.globalCompositeOperation = "source-over";
    // 블룸 (흐린 사본)
    const gl: HTMLCanvasElement = st.glow, gg = gl.getContext("2d")!;
    gg.clearRect(0, 0, gl.width, gl.height); gg.filter = "blur(8px)"; gg.drawImage(c.canvas, 0, 0, gl.width, gl.height); gg.filter = "none";
    c.save(); c.setTransform(1, 0, 0, 1, 0, 0); c.globalCompositeOperation = "lighter"; c.globalAlpha = 0.7;
    c.drawImage(gl, 0, 0, c.canvas.width, c.canvas.height); c.restore();
    // 충격파 + 번쩍
    const e = prog(t, 2.42, 2.95);
    if (e > 0 && e < 1) {
      c.strokeStyle = `rgba(255,220,160,${1 - e})`; c.lineWidth = 10 * (1 - e) + 2;
      c.beginPath(); c.ellipse(W / 2, H / 2, e * 900, e * 600, 0, 0, 7); c.stroke();
      const f = 1 - prog(t, 2.42, 2.6);
      if (f > 0) { c.fillStyle = `rgba(255,240,220,${f * 0.8})`; c.fillRect(0, 0, W, H); }
    }
  },
};
