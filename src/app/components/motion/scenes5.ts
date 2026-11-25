import { W, H, Scene, prog, lerp, clamp, easeOutBack, easeInOut3, easeOutCubic, KR, roundRect, makeCanvas } from "./util";
import { rollText, cursor } from "./scenes4";

// 빌더 조쉬 「클로드 모션그래픽 한글 프롬프트 100」 중 10개를 골라 만든 모션
// (이름 칸은 포트폴리오에 있는 작업 이름으로 채움)
type S = Scene & { dur: number };
const io = easeInOut3;
const fmt = (n: number) => Math.round(n).toLocaleString("en-US");
const text = (c: CanvasRenderingContext2D, s: string, x: number, y: number, font: string, col: string, align: CanvasTextAlign = "left") => {
  c.font = font; c.fillStyle = col; c.textAlign = align; c.textBaseline = "middle"; c.fillText(s, x, y);
};
const check = (c: CanvasRenderingContext2D, x: number, y: number, s: number, k: number, col: string, lw = 8) => {
  // 선으로 그려지는 체크 (k: 0~1)
  const a = [x - s * 0.5, y], b = [x - s * 0.12, y + s * 0.38], d = [x + s * 0.55, y - s * 0.4];
  const l1 = Math.hypot(b[0] - a[0], b[1] - a[1]), l2 = Math.hypot(d[0] - b[0], d[1] - b[1]);
  const L = (l1 + l2) * clamp(k);
  c.strokeStyle = col; c.lineWidth = lw; c.lineCap = "round"; c.lineJoin = "round";
  c.beginPath(); c.moveTo(a[0], a[1]);
  if (L <= l1) c.lineTo(lerp(a[0], b[0], L / l1), lerp(a[1], b[1], L / l1));
  else { c.lineTo(b[0], b[1]); c.lineTo(lerp(b[0], d[0], (L - l1) / l2), lerp(b[1], d[1], (L - l1) / l2)); }
  c.stroke();
};
const press = (t: number, at: number) => Math.sin(Math.PI * prog(t, at - 0.08, at + 0.12));
// 여러 지점을 차례로 지나는 커서
const path = (t: number, keys: [number, number, number][]) => {
  if (t <= keys[0][0]) return [keys[0][1], keys[0][2]];
  for (let i = 0; i < keys.length - 1; i++) {
    const [t0, x0, y0] = keys[i], [t1, x1, y1] = keys[i + 1];
    if (t <= t1) { const k = io(prog(t, t0, t1)); return [lerp(x0, x1, k), lerp(y0, y1, k)]; }
  }
  const l = keys[keys.length - 1]; return [l[1], l[2]];
};

// ───────── #3 타일 퍼즐로 맞춰지는 슬로건 티저 (10초) ─────────
const SLOGAN = [..."생각을디자인으로"];
const SCAT = [[5, 0], [1, 4], [7, 5], [2, 1], [6, 3], [0, 5], [3, 4], [4, 0]];
export const tilePuzzle: S = {
  dur: 10,
  draw(c, t) {
    c.fillStyle = "#EEEAE2"; c.fillRect(0, 0, W, H);
    const T = 150, G = 14, P = T + G, X0 = (W - (8 * P - G)) / 2, Y0 = (H - (6 * P - G)) / 2;
    const ROW = 2, BR = "#19C37D";
    // 1마디: 박자마다 줄 하나씩 한 칸 미끄러짐 (끝에서 거꾸로 되돌아감)
    const slid = [0, 1, 3, 4];
    const rowOff = (r: number) => {
      const i = slid.indexOf(r); if (i < 0) return 0;
      return io(prog(t, i * 0.5 + 0.1, i * 0.5 + 0.45)) * (1 - io(prog(t, 9.2, 9.8)));
    };
    const fold = t < 8.6 ? io(prog(t, 6, 7)) : 1 - io(prog(t, 8.9, 9.8));
    const rise = t < 8.6 ? io(prog(t, 7, 7.8)) : 1 - io(prog(t, 8.6, 9.2));
    const sq = io(prog(t, 8, 8.5)) * (1 - io(prog(t, 8.6, 9.0)));
    // 빈 타일
    for (let r = 0; r < 6; r++) for (let col = 0; col < 8; col++) {
      if (r === ROW) continue;
      const delay = ((r * 8 + col) % 7) * 0.05;
      const f = t < 8.6 ? io(prog(t, 6 + delay, 6.6 + delay)) : 1 - io(prog(t, 9.0 + delay, 9.6 + delay));
      if (f >= 1) continue;
      const cc = ((col + rowOff(r)) % 8 + 8) % 8;
      const x = X0 + cc * P, y = Y0 + r * P;
      const h = T * (1 - f);
      roundRect(c, x, y + (T - h) / 2, T, Math.max(1, h), 14); c.fillStyle = "#DAD4C8"; c.fill();
    }
    void fold;
    // 글자 타일
    const cy = lerp(Y0 + ROW * P, (H - T) / 2, rise);
    SLOGAN.forEach((ch, i) => {
      const [sc, sr] = SCAT[i];
      const off = slid.includes(sr) ? (i % 2 ? 1 : 1) : 0;
      const sx = X0 + ((sc + off) % 8) * P, sy = Y0 + sr * P;
      const tb = 2 + i * 0.5;
      let m = io(prog(t, tb, tb + 0.4));
      if (t > 8.6) m = 1 - io(prog(t, 9.0 + i * 0.04, 9.7 + i * 0.04));
      const tx = X0 + i * P;
      // 가로 먼저, 다음 세로 (퍼즐처럼)
      let x = m < 0.5 ? lerp(sx, tx, m * 2) : tx, y = m < 0.5 ? sy : lerp(sy, cy, (m - 0.5) * 2);
      if (m >= 1) y = cy;
      // 5마디: 가운데로 모여 줄어듦
      x = lerp(x, W / 2 - T / 2, sq); const s = 1 - sq * 0.85;
      const flip = t < 8.6 ? prog(t, tb + 0.4, tb + 0.5) : 1 - prog(t, 8.9, 9.0);
      const fx = Math.abs(Math.cos(Math.PI * flip));
      c.save(); c.translate(x + T / 2, y + T / 2); c.scale(fx * s, s);
      roundRect(c, -T / 2, -T / 2, T, T, 14); c.fillStyle = flip > 0.5 ? BR : "#141414"; c.fill();
      text(c, ch, 0, 4, `900 88px ${KR}`, "#F7F4EE", "center");
      c.restore();
    });
    // 서비스 이름
    const nm = io(prog(t, 8.3, 8.6)) * (1 - io(prog(t, 8.7, 8.95)));
    if (nm > 0) {
      c.save(); c.translate(W / 2, H / 2); c.scale(1, nm);
      roundRect(c, -330, -90, 660, 180, 24); c.fillStyle = "#141414"; c.fill();
      text(c, "MODUVA", 0, 6, `900 120px ${KR}`, BR, "center"); c.restore();
    }
  },
};

// ───────── #5 숫자가 띠로 갈라지는 카운트다운 (16초) ─────────
export const countdown: S = {
  dur: 16,
  init() {
    const mk = (s: string, size: number, col: string) => {
      const cv = makeCanvas(1000, 900), g = cv.getContext("2d")!;
      g.font = `900 ${size}px ${KR}`; g.fillStyle = col; g.textAlign = "center"; g.textBaseline = "middle"; g.fillText(s, 500, 470);
      return cv;
    };
    return { d: ["3", "2", "1", "0"].map((n) => mk(n, 860, "#F5F2EC")), name: mk("MOTION PROMPT", 120, "#F5F2EC") };
  },
  draw(c, t, st) {
    c.fillStyle = "#0D0D0D"; c.fillRect(0, 0, W, H);
    const RED = "#FF3B30", N = 8, cx = W / 2, cy = H / 2;
    // 어떤 글자에서 어떤 글자로 (띠마다 박자 하나씩 엇갈림)
    const strips = (A: HTMLCanvasElement, B: HTMLCanvasElement, t0: number, dur: number, nudge = 0) => {
      const sh = 900 / N;
      for (let i = 0; i < N; i++) {
        const st0 = t0 + (i / N) * dur * 0.5;
        const p = prog(t, st0, st0 + dur * 0.5);
        const dir = i % 2 ? 1 : -1;
        const off = Math.sin(Math.PI * p) * 420 * dir + nudge * dir * (i % 3 === 0 ? 1 : 0);
        const src = p < 0.5 ? A : B;
        c.drawImage(src, 0, i * sh, 1000, sh, cx - 500 + off, cy - 450 + i * sh, 1000, sh);
      }
    };
    const D = st.d;
    const nudge = t < 4 ? Math.sin(Math.PI * ((t * 2) % 1)) * 26 : 0;
    if (t < 4) strips(D[0], D[0], 99, 1, nudge);
    else if (t < 6) strips(D[0], D[1], 4.1, 1.8);
    else if (t < 8) strips(D[1], D[2], 6.1, 1.8);
    else if (t < 10) strips(D[2], D[3], 8.1, 1.8);
    else if (t < 14) {
      // 6마디: 0 안쪽 원형 와이프 → 화면 덮기 / 7마디: 수축, 제품 이름
      const grow = io(prog(t, 10.1, 11.9)), shrink = io(prog(t, 12, 12.8));
      if (grow < 0.98) c.drawImage(D[3], cx - 500, cy - 450);
      const r = lerp(lerp(0, 1100, grow), 330, shrink);
      c.fillStyle = RED; c.beginPath(); c.arc(cx, cy + 20, Math.max(0, r), 0, 7); c.fill();
      const up = io(prog(t, 12.6, 13.4));
      if (up > 0) {
        c.save(); c.beginPath(); c.rect(0, 0, W, cy + 60); c.clip();
        c.drawImage(st.name, 0, 380, 1000, 180, cx - 500, cy - 90 + (1 - up) * 160, 1000, 180); c.restore();
        c.fillStyle = "#F5F2EC"; c.fillRect(cx - 220 * up, cy + 60, 440 * up, 4);
      }
    } else {
      // 8마디: 제품 이름이 띠로 썰려 "3"으로
      const r = 330 * (1 - io(prog(t, 14, 14.6)));
      if (r > 0) { c.fillStyle = RED; c.beginPath(); c.arc(cx, cy + 20, r, 0, 7); c.fill(); }
      const nameCv = makeName(st);
      strips(nameCv, D[0], 14.3, 1.5);
    }
  },
};
const makeName = (st: any) => {
  if (st.nameFull) return st.nameFull;
  const cv = makeCanvas(1000, 900), g = cv.getContext("2d")!;
  g.drawImage(st.name, 0, 0); st.nameFull = cv; return cv;
};

// ───────── #11 버튼이 차트가 되는 대시보드 데모 (16초) ─────────
export const morphDash: S = {
  dur: 16,
  draw(c, t) {
    c.fillStyle = "#EDEBE6"; c.fillRect(0, 0, W, H);
    const OR = "#FF5A1F";
    // 상태별 도형 (w, h, r, 색)
    const ST: [number, number, number, number, string][] = [
      [0, 320, 96, 48, "#111"], [1.9, 320, 96, 48, "#111"], [2.2, 120, 120, 60, "#FFF"], [3.2, 120, 120, 60, OR],
      [4.2, 600, 360, 28, "#FFF"], [6.0, 600, 360, 28, "#FFF"], [6.6, 920, 560, 28, "#FFF"], [10.2, 920, 560, 28, "#FFF"],
      [10.8, 560, 110, 55, "#111"], [14.2, 560, 110, 55, "#111"], [15.4, 320, 96, 48, "#111"],
    ];
    let k = 0; while (k < ST.length - 2 && t > ST[k + 1][0]) k++;
    const [t0, w0, h0, r0, c0] = ST[k], [t1, w1, h1, r1, c1] = ST[k + 1];
    const e = io(prog(t, t0, t1));
    const w = lerp(w0, w1, e), h = lerp(h0, h1, e), r = lerp(r0, r1, e);
    const col = e < 0.5 ? c0 : c1;
    // 토스트 밀어서 닫기
    const swipe = Math.sin(Math.PI * prog(t, 12.4, 14.0)) * 260;
    // 카메라: 요소가 화면을 채우도록
    const cam = clamp((W * 0.62) / w, 1, 2.1);
    c.save(); c.translate(W / 2, H / 2); c.scale(cam, cam);
    c.save(); c.translate(swipe, 0);
    c.shadowColor = "rgba(0,0,0,0.12)"; c.shadowBlur = 40; c.shadowOffsetY = 16;
    roundRect(c, -w / 2, -h / 2, w, h, Math.min(r, h / 2)); c.fillStyle = col; c.fill();
    c.shadowColor = "transparent";
    if (t < 2.0) text(c, "LIBMS 시작하기", 0, 2, `700 30px ${KR}`, "#fff", "center");
    else if (t < 3.2) {
      c.strokeStyle = OR; c.lineWidth = 10; c.lineCap = "round"; c.beginPath(); const a = t * 9; c.arc(0, 0, 34, a, a + 4.2); c.stroke();
    } else if (t < 4.3) check(c, 0, 0, 56, prog(t, 3.3, 3.7), "#fff", 10);
    else if (t < 10.4) {
      const a = prog(t, 4.3, 4.6);
      c.globalAlpha = a;
      text(c, "이번 달 처리량", -w / 2 + 44, -h / 2 + 60, `600 26px ${KR}`, "#888");
      text(c, `${fmt(lerp(0, 12480, easeOutCubic(prog(t, 4.4, 5.8))))} kWh`, -w / 2 + 44, -h / 2 + 122, `800 64px ${KR}`, "#111");
      text(c, "+18.4%", w / 2 - 44, -h / 2 + 60, `700 24px ${KR}`, OR, "right");
      // 선 차트 (아랫변에서 그려짐)
      const dp = prog(t, 6.6, 8.2);
      if (dp > 0) {
        const pts = [0.62, 0.55, 0.7, 0.48, 0.52, 0.3, 0.38, 0.18].map((v, i) => [-w / 2 + 60 + (i * (w - 120)) / 7, -h / 2 + 190 + v * (h - 250)]);
        c.strokeStyle = "#111"; c.lineWidth = 5; c.lineJoin = "round"; c.beginPath();
        const n = dp * 7;
        pts.forEach((p, i) => { if (i <= n) (i ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1])); });
        const fi = Math.floor(n); if (fi < 7) c.lineTo(lerp(pts[fi][0], pts[fi + 1][0], n - fi), lerp(pts[fi][1], pts[fi + 1][1], n - fi));
        c.stroke();
        // 툴팁
        const tp = easeOutBack(prog(t, 8.6, 8.9)) * (1 - prog(t, 10.0, 10.3));
        if (tp > 0) {
          const [px, py] = pts[5];
          c.fillStyle = OR; c.beginPath(); c.arc(px, py, 12 * tp, 0, 7); c.fill();
          c.save(); c.translate(px, py - 70); c.scale(tp, tp);
          roundRect(c, -110, -34, 220, 68, 34); c.fillStyle = "#111"; c.fill();
          text(c, "금요일 2,140 kWh", 0, 1, `700 22px ${KR}`, "#fff", "center"); c.restore();
        }
      }
      c.globalAlpha = 1;
    } else if (t > 10.9 && t < 14.3) {
      c.fillStyle = OR; c.beginPath(); c.arc(-w / 2 + 56, 0, 14, 0, 7); c.fill();
      text(c, "모듈 온도가 정상으로 돌아왔어요", -w / 2 + 90, 2, `600 28px ${KR}`, "#fff");
    } else if (t >= 15.3) text(c, "LIBMS 시작하기", 0, 2, `700 30px ${KR}`, "#fff", "center");
    c.restore();
    // 커서 (도형 기준)
    const [mx, my] = path(t, [[0, 420, 300], [1.4, 40, 20], [8.0, 40, 20], [8.5, 140, -60], [12.2, 140, -60], [12.4, 60, 10], [14.0, 60, 10], [14.6, 420, 300], [16, 420, 300]]);
    cursor(c, mx, my, Math.max(press(t, 1.7), press(t, 12.4)));
    c.restore();
  },
};

// ───────── #13 한 글자씩 치면 쏟아지는 검색 결과 (16초) ─────────
const QUERY = [..."모바일 앱 UI"];
const RESULTS = [
  ["바로Check", "출퇴근 체크 앱 UI"], ["NH 오늘농사", "네이티브 앱 4차 고도화 UI"], ["나무증권", "MTS 모바일 앱 UI"],
  ["WIOTP", "골프 앱 UI 디자인"], ["우리WON뱅킹", "모바일 뱅킹 앱 UI"], ["KEB하나은행", "모바일웹 · 앱 메인 UI"],
  ["POSCO DX", "모바일 앱 UI"], ["LG ThinQ", "모바일웹 UI"],
];
export const searchDemo: S = {
  dur: 16,
  draw(c, t) {
    const GR = "#19C37D";
    c.fillStyle = "#F5F3EE"; c.fillRect(0, 0, W, H);
    const typed = t < 14 ? QUERY.filter((_, i) => t >= 2 + i * 0.5).length : 0;
    const up = io(prog(t, 1.6, 2.0)) * (1 - io(prog(t, 15.2, 15.8)));
    const by = lerp(H / 2, 130, up);
    // 결과 카드 (위에서 미끄러져 내려와 쌓임)
    const exp = io(prog(t, 11.0, 11.8)), scroll = io(prog(t, 12.4, 13.2)) * 260;
    const shrink = io(prog(t, 14.8, 15.6));
    const nCards = Math.min(typed, 8);
    if (exp < 1) for (let j = 0; j < nCards; j++) {
      const idx = nCards - 1 - j; // 최신이 맨 위
      const born = 2 + idx * 0.5, dp = easeOutCubic(prog(t, born, born + 0.35));
      const slot = j; if (slot > 5) continue;
      const y = 230 + slot * 128 - (1 - dp) * 120;
      const x = W / 2 - 460, cw = 920, chh = 108;
      const pick = slot === 2 && t > 10.6;
      c.save(); c.globalAlpha = dp;
      roundRect(c, x, y, cw, chh, 20); c.fillStyle = "#fff"; c.fill();
      if (pick) { c.lineWidth = 3; c.strokeStyle = "#111"; c.stroke(); }
      const [a, b] = RESULTS[idx];
      text(c, a, x + 36, y + 40, `800 30px ${KR}`, "#111");
      // 5마디: 일치하는 단어만 강조
      const hl = prog(t, 8.2, 8.6);
      c.font = `500 24px ${KR}`; let xx = x + 36;
      b.split(" ").forEach((wd) => {
        const hit = ["앱", "UI", "모바일"].some((q) => wd.includes(q));
        c.fillStyle = hit && hl > 0 ? GR : "#888"; c.textAlign = "left"; c.fillText(wd, xx, y + 78);
        if (hit && hl > 0) { c.fillStyle = `rgba(25,195,125,${0.18 * hl})`; c.fillRect(xx - 4, y + 64, c.measureText(wd).width + 8, 30); }
        xx += c.measureText(wd + " ").width;
      });
      c.restore();
    }
    // 상세 페이지 (세 번째 카드가 늘어남)
    if (exp > 0) {
      const y0 = 230 + 2 * 128, x = lerp(W / 2 - 460, 0, exp), y = lerp(y0, 0, exp) , w = lerp(920, W, exp), h = lerp(108, H, exp);
      const s = 1 - shrink;
      c.save(); c.translate(W / 2, by); c.scale(lerp(1, 0.3, shrink), lerp(1, 0.05, shrink)); c.translate(-W / 2, -by);
      roundRect(c, x, y, w, h, lerp(20, 0, exp) + shrink * 40); c.fillStyle = "#fff"; c.fill();
      if (s > 0.2) {
        c.save(); c.beginPath(); c.rect(x, y, w, h); c.clip(); c.translate(0, -scroll);
        const ca = prog(t, 11.6, 12.0);
        c.globalAlpha = ca;
        text(c, "나무증권 · MTS 모바일 앱 UI", 90, 200, `800 54px ${KR}`, "#111");
        text(c, "NH투자증권 · 나무앱 UXUI · 운영 리더", 90, 262, `500 28px ${KR}`, "#888");
        roundRect(c, 90, 320, W - 180, 420, 24); c.fillStyle = "#E9F8F1"; c.fill();
        for (let i = 0; i < 3; i++) { roundRect(c, 150 + i * 400, 380, 320, 300, 18); c.fillStyle = "#fff"; c.fill(); roundRect(c, 180 + i * 400, 420, 200, 22, 11); c.fillStyle = GR; c.fill(); }
        for (let i = 0; i < 6; i++) { roundRect(c, 90, 790 + i * 50, (W - 180) * (0.5 + ((i * 37) % 40) / 100), 20, 10); c.fillStyle = "#E4E2DC"; c.fill(); }
        c.restore();
        c.globalAlpha = 1;
      }
      c.restore();
    }
    // 검색창
    const bw = 760;
    if (exp < 0.95 || shrink > 0.6) {
      c.save(); roundRect(c, W / 2 - bw / 2, by - 44, bw, 88, 44); c.fillStyle = "#fff"; c.shadowColor = "rgba(0,0,0,0.08)"; c.shadowBlur = 30; c.fill(); c.restore();
      c.strokeStyle = "#111"; c.lineWidth = 5; c.beginPath(); c.arc(W / 2 - bw / 2 + 54, by - 4, 15, 0, 7); c.moveTo(W / 2 - bw / 2 + 65, by + 7); c.lineTo(W / 2 - bw / 2 + 78, by + 20); c.stroke();
      const q = QUERY.slice(0, typed).join("");
      text(c, q, W / 2 - bw / 2 + 100, by + 2, `600 34px ${KR}`, "#111");
      c.font = `600 34px ${KR}`;
      if (t > 1.0 && Math.floor(t * 2.4) % 2 === 0) { c.fillStyle = GR; c.fillRect(W / 2 - bw / 2 + 104 + c.measureText(q).width, by - 22, 4, 44); }
    } else {
      // 상세 페이지 위 검색 아이콘
      c.strokeStyle = "#111"; c.lineWidth = 5; c.beginPath(); c.arc(W - 110, 80 - scroll * 0, 18, 0, 7); c.moveTo(W - 97, 93); c.lineTo(W - 82, 108); c.stroke();
    }
    const [mx, my] = path(t, [[0, W - 160, H - 120], [0.9, W / 2 + 80, H / 2 + 10], [1.6, W / 2 + 80, H / 2 + 10], [2.0, W - 160, H - 120], [10.2, W - 160, H - 120], [10.8, W / 2 + 200, 230 + 256 + 60], [12.0, W / 2 + 200, 600], [13.6, W - 200, 400], [14.4, W - 106, 84], [15.0, W - 106, 84], [16, W - 160, H - 120]]);
    cursor(c, mx, my, Math.max(press(t, 1.0), press(t, 10.9), press(t, 14.6)));
  },
};

// ───────── #14 체크할 때마다 차오르는 할 일 목록 (16초) ─────────
const TODOS = ["로고 시안 정리", "메인 화면 디자인", "아이콘 일러스트", "포트폴리오 PDF", "사이트 배포"];
export const todoList: S = {
  dur: 16,
  draw(c, t) {
    const OR = "#FF7A00";
    c.fillStyle = "#ECEAE5"; c.fillRect(0, 0, W, H);
    const cw = 760, cx = W / 2 - cw / 2, top = 110;
    roundRect(c, cx, top, cw, 860, 32); c.fillStyle = "#fff"; c.fill();
    text(c, "바로Check · 오늘 할 일", cx + 50, top + 70, `800 36px ${KR}`, "#111");
    // 진행률 바 → 원 → 바
    const done = TODOS.filter((_, i) => t >= 2 + i * 2 + 0.4 && t < 14.6).length;
    const pr = lerp(0, 1, 0) + done / 5;
    const curl = io(prog(t, 12.2, 12.9)) * (1 - io(prog(t, 14.0, 14.6)));
    const bx = cx + 50, by = top + 130, bw = cw - 100;
    if (curl < 0.02) {
      roundRect(c, bx, by, bw, 18, 9); c.fillStyle = "#EEE"; c.fill();
      const fw = bw * clamp(pr - (1 - prog(t, Math.floor((t - 2.4) / 2) * 2 + 2.4, Math.floor((t - 2.4) / 2) * 2 + 2.8)) * 0.2 * (done > 0 && t < 12 ? 1 : 0));
      if (fw > 0) { roundRect(c, bx, by, Math.max(18, fw), 18, 9); c.fillStyle = OR; c.fill(); }
      text(c, `${done}/5`, bx + bw, by - 26, `700 24px ${KR}`, "#999", "right");
    } else {
      const R = lerp(bw / 2, 90, curl), cxx = bx + bw / 2, cyy = lerp(by + 9, top + 430, curl);
      c.strokeStyle = OR; c.lineWidth = lerp(18, 16, curl); c.lineCap = "round";
      c.beginPath(); c.arc(cxx, cyy + R * (1 - curl) * 0, R, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * curl); c.stroke();
      if (curl > 0.95) check(c, cxx, cyy, 90, prog(t, 12.9, 13.3), OR, 14);
    }
    // 항목들
    const listTop = top + 200, rowH = 96;
    const fadeOut = io(prog(t, 15.3, 15.8));
    const order: number[] = [];
    // 아직 남은 항목 → 위, 완료 항목 → 아래 (완료 순서)
    const moved = TODOS.map((_, i) => io(prog(t, 2 + i * 2 + 1.0, 2 + i * 2 + 1.7)) * (1 - io(prog(t, 14.6, 15.2))));
    TODOS.forEach((_, i) => order.push(i));
    if (curl > 0.5) return;
    TODOS.forEach((name, i) => {
      const appear = easeOutCubic(prog(t, 0.3 + i * 0.3, 0.6 + i * 0.3)) * (1 - fadeOut);
      if (appear <= 0) return;
      const left = TODOS.filter((_, j) => j > i && moved[j] < 0.5 && moved[i] < 0.5).length; void left;
      // 기본 자리
      const restIdx = TODOS.slice(0, i).filter((_, j) => moved[j] < 0.5).length;
      const doneIdx = TODOS.filter((_, j) => j < i && moved[j] >= 0.5).length;
      const nActive = TODOS.filter((_, j) => moved[j] < 0.5).length;
      const yA = listTop + restIdx * rowH, yB = listTop + nActive * rowH + 70 + doneIdx * rowH * 0.8;
      const y = lerp(yA, yB, moved[i]);
      const ch = prog(t, 2 + i * 2 + 0.3, 2 + i * 2 + 0.6) * (1 - prog(t, 14.6, 14.9));
      const strike = prog(t, 2 + i * 2 + 0.6, 2 + i * 2 + 0.95) * (1 - prog(t, 14.6, 14.9));
      const sc = 1 - Math.sin(Math.PI * moved[i]) * 0.5;
      c.save(); c.translate(0, y + rowH / 2); c.scale(1, appear * sc); c.globalAlpha = appear;
      roundRect(c, cx + 50, -24, 48, 48, 12);
      if (ch > 0) { c.fillStyle = OR; c.fill(); check(c, cx + 74, 0, 26, ch * 1.2, "#fff", 6); } else { c.lineWidth = 3; c.strokeStyle = "#CCC"; c.stroke(); }
      text(c, name, cx + 124, 2, `600 32px ${KR}`, moved[i] > 0.5 ? "#AAA" : "#111");
      if (strike > 0) { c.font = `600 32px ${KR}`; c.fillStyle = "#AAA"; c.fillRect(cx + 122, 0, c.measureText(name).width * strike + 4, 3); }
      c.restore();
    });
    const anyDone = moved.some((m) => m > 0.5);
    if (anyDone) {
      const nActive = moved.filter((m) => m < 0.5).length;
      text(c, "완료", cx + 50, listTop + nActive * rowH + 40, `700 22px ${KR}`, "#AAA");
    }
    const ci = Math.min(4, Math.floor(clamp((t - 1.6) / 2, 0, 4.99)));
    const [mx, my] = path(t, [[0, W - 200, H - 100], ...TODOS.flatMap((_, i) => [[1.9 + i * 2, cx + 74, listTop + 48 + 0 * rowH] as [number, number, number], [2.5 + i * 2, cx + 74, listTop + 48] as [number, number, number]]), [12.2, W - 200, H - 100], [16, W - 200, H - 100]]);
    void ci;
    cursor(c, mx, my, TODOS.reduce((m, _, i) => Math.max(m, press(t, 2.3 + i * 2)), 0));
  },
};

// ───────── #18 버튼 하나로 끝나는 결제 흐름 (16초) ─────────
export const checkout: S = {
  dur: 16,
  draw(c, t) {
    const BL = "#0064FF";
    c.fillStyle = "#EFEFEC"; c.fillRect(0, 0, W, H);
    const pw = 600, ph = 940, px = W / 2 - pw / 2, py = 70;
    const fold = io(prog(t, 14.0, 15.2));
    roundRect(c, px, py, pw, ph, 44); c.fillStyle = "#fff"; c.fill();
    const qty = t >= 1.0 && t < 15.2 ? 2 : 1;
    const totalK = prog(t, 1.0, 1.6) * (1 - prog(t, 15.2, 15.6));
    // 장바구니
    const cartA = t < 2.6 || t > 15.1 ? 1 : 0;
    if (cartA) {
      text(c, "MODUVA Shop · 장바구니", px + 44, py + 80, `800 32px ${KR}`, "#111");
      roundRect(c, px + 44, py + 130, 160, 160, 24); c.fillStyle = "#FFF1C2"; c.fill();
      c.fillStyle = "#FFC93B"; c.beginPath(); for (let i = 0; i < 10; i++) { const r = i % 2 ? 26 : 58, a = -Math.PI / 2 + (i * Math.PI) / 5; c.lineTo(px + 124 + Math.cos(a) * r, py + 210 + Math.sin(a) * r); } c.fill();
      text(c, "아기별 쿠션", px + 230, py + 170, `700 30px ${KR}`, "#111");
      text(c, "₩29,000", px + 230, py + 214, `500 26px ${KR}`, "#888");
      roundRect(c, px + 230, py + 245, 170, 52, 26); c.fillStyle = "#F2F2F0"; c.fill();
      text(c, "−", px + 262, py + 272, `600 30px ${KR}`, "#111", "center"); text(c, "+", px + 368, py + 272, `600 30px ${KR}`, "#111", "center");
      text(c, String(qty), px + 315, py + 272, `700 28px ${KR}`, "#111", "center");
      text(c, "합계", px + 44, py + 380, `600 28px ${KR}`, "#888");
      c.fillStyle = "#111"; rollText(c, "29,000", "58,000", px + 330, py + 392, totalK, 44);
      text(c, "₩", px + 300, py + 380, `700 30px ${KR}`, "#111", "right");
    }
    // 버튼 → 폼 → 버튼 → 링 → 체크 → 영수증
    const bx = px + 40, bw0 = pw - 80, bh0 = 96, byb = py + ph - 140;
    const grow = io(prog(t, 2.6, 3.4)) * (1 - io(prog(t, 8.0, 8.5)));
    const ring = io(prog(t, 9.0, 9.6)) * (1 - io(prog(t, 12.0, 12.7)));
    const rec = io(prog(t, 12.0, 12.7)) * (1 - fold);
    let x = bx, y = lerp(byb, py + 120, grow), w = bw0, h = lerp(bh0, ph - 260 + 96, grow), r = lerp(48, 28, grow);
    const RS = 120;
    x = lerp(x, W / 2 - RS / 2, ring); y = lerp(y, py + 380, ring); w = lerp(w, RS, ring); h = lerp(h, RS, ring); r = lerp(r, RS / 2, ring);
    if (rec > 0) { x = lerp(W / 2 - RS / 2, px + 50, rec); y = lerp(py + 380, py + 150, rec); w = lerp(RS, pw - 100, rec); h = lerp(RS, 640, rec) * (1 - fold * 0); r = lerp(RS / 2, 28, rec); }
    if (fold > 0) { h = h * (1 - fold); }
    const isForm = grow > 0.5, isRing = ring > 0.3 && rec < 0.3;
    c.save();
    roundRect(c, x, y, w, Math.max(2, h), Math.min(r, Math.max(2, h) / 2));
    c.fillStyle = isForm ? "#F6F7F9" : isRing ? "#fff" : rec > 0.3 ? "#F6F7F9" : BL; c.fill();
    if (isRing) {
      const close = prog(t, 10.0, 10.8);
      c.strokeStyle = BL; c.lineWidth = 12; c.lineCap = "round"; c.beginPath();
      const a = close > 0 ? -Math.PI / 2 : t * 8;
      c.arc(x + w / 2, y + h / 2, 48, a, a + (close > 0 ? Math.PI * 2 * close : 4.2)); c.stroke();
      if (t > 10.8) { c.fillStyle = BL; c.beginPath(); c.arc(x + w / 2, y + h / 2, 54, 0, 7); c.fill(); check(c, x + w / 2, y + h / 2, 52, prog(t, 10.8, 11.3), "#fff", 10); }
    } else if (isForm && h > 300) {
      text(c, "카드 정보", x + 40, y + 60, `800 30px ${KR}`, "#111");
      const groups = ["4518", "2211", "0937", "2026"];
      text(c, "카드 번호", x + 40, y + 130, `500 22px ${KR}`, "#888");
      roundRect(c, x + 40, y + 155, w - 80, 76, 16); c.fillStyle = "#fff"; c.fill();
      groups.forEach((g, i) => { if (t >= 4 + i * 0.5) text(c, i < 3 && i > 0 ? "••••" : g, x + 70 + i * 120, y + 194, `700 30px ${KR}`, "#111"); });
      text(c, "유효기간", x + 40, y + 280, `500 22px ${KR}`, "#888");
      roundRect(c, x + 40, y + 305, 220, 76, 16); c.fillStyle = "#fff"; c.fill();
      if (t >= 6.2) text(c, t >= 6.7 ? "12 / 29" : "12 /", x + 70, y + 344, `700 30px ${KR}`, "#111");
      roundRect(c, x + 40, y + h - 136, w - 80, 96, 48); c.fillStyle = BL; c.fill();
      text(c, "₩58,000 결제하기", x + w / 2, y + h - 87, `700 32px ${KR}`, "#fff", "center");
    } else if (rec > 0.6 && fold < 0.5) {
      const a = prog(t, 12.6, 13.0);
      c.globalAlpha = a;
      c.fillStyle = BL; c.beginPath(); c.arc(x + w / 2, y + 90, 40, 0, 7); c.fill(); check(c, x + w / 2, y + 90, 38, 1, "#fff", 8);
      text(c, "결제 완료", x + w / 2, y + 180, `800 40px ${KR}`, "#111", "center");
      [["상품", "아기별 쿠션 × 2"], ["결제 수단", "카드 •••• 2026"], ["결제 금액", "₩58,000"]].forEach(([k, v], i) => {
        text(c, k, x + 40, y + 280 + i * 80, `500 26px ${KR}`, "#888"); text(c, v, x + w - 40, y + 280 + i * 80, `700 28px ${KR}`, "#111", "right");
      });
      c.globalAlpha = 1;
    } else if (!isForm && !isRing && rec < 0.3 && h < 200) {
      text(c, t > 7.5 && t < 9.2 ? "₩58,000 결제하기" : "결제하기", x + w / 2, y + h / 2 + 2, `700 32px ${KR}`, "#fff", "center");
    }
    c.restore();
    const [mx, my] = path(t, [[0, W - 220, H - 60], [0.8, px + 368, py + 285], [1.6, px + 368, py + 285], [2.3, W / 2, byb + 48], [2.8, W / 2 + 160, byb + 140], [8.0, W / 2 + 160, py + ph - 60], [8.6, W / 2, byb + 48], [9.2, W - 220, H - 60], [16, W - 220, H - 60]]);
    cursor(c, mx, my, Math.max(press(t, 1.0), press(t, 2.5), press(t, 8.8)));
  },
};

// ───────── #19 슬라이더로 가르는 전과 후 (16초) ─────────
export const beforeAfter: S = {
  dur: 16,
  draw(c, t) {
    const GR = "#19C37D";
    // 슬라이더 위치
    const keys: [number, number][] = [[0, 0.5], [2, 0.5], [2.5, 0.44], [3, 0.38], [3.5, 0.33], [4, 0.28], [4.5, 0.24], [5, 0.2], [5.5, 0.18], [6, 0.18], [7.5, 0.78], [8, 0.78], [11.5, 0], [14, 0], [15.6, 0.5], [16, 0.5]];
    let s = 0.5; for (let i = 0; i < keys.length - 1; i++) if (t >= keys[i][0] && t <= keys[i + 1][0]) s = lerp(keys[i][1], keys[i + 1][1], io(prog(t, keys[i][0], keys[i + 1][0])));
    const sx = s * W;
    const zoom = io(prog(t, 12, 12.8)) * (1 - io(prog(t, 14, 14.8)));
    const kcx = 330 + 290, kcy = 300 + 160;
    c.save(); c.translate(W / 2, H / 2); c.scale(1 + zoom * 0.9, 1 + zoom * 0.9); c.translate(-lerp(W / 2, kcx, zoom), -lerp(H / 2, kcy, zoom));
    // 오른쪽: 제품 화면
    c.fillStyle = "#FFFFFF"; c.fillRect(0, 0, W, H);
    text(c, "LIBMS 리포트", 90, 110, `800 44px ${KR}`, "#111");
    const cards = [[90, 190, 560, 240], [690, 190, 330, 240], [1060, 190, 290, 240], [90, 470, 640, 420], [770, 470, 580, 420]];
    cards.forEach(([x, y, w, h], i) => {
      roundRect(c, x, y, w, h, 24); c.fillStyle = "#F6F7F5"; c.fill();
      if (i === 0) { text(c, "보고서 작성 시간", x + 36, y + 56, `600 26px ${KR}`, "#888"); text(c, "3시간 → 5분", x + 36, y + 140, `800 66px ${KR}`, GR); }
      else if (i < 3) { text(c, ["점검 셀", "경고"][i - 1], x + 30, y + 56, `600 24px ${KR}`, "#888"); text(c, ["1,280", "3"][i - 1], x + 30, y + 140, `800 58px ${KR}`, "#111"); }
      else {
        c.strokeStyle = i === 3 ? GR : "#111"; c.lineWidth = 5; c.beginPath();
        for (let k = 0; k < 8; k++) { const xx = x + 40 + k * (w - 80) / 7, yy = y + h - 60 - ((Math.sin(k * 1.3 + i) + 1) / 2) * (h - 140); k ? c.lineTo(xx, yy) : c.moveTo(xx, yy); }
        c.stroke();
      }
    });
    // 왼쪽: 빽빽한 엑셀 (슬라이더 왼쪽만)
    c.save(); c.beginPath(); c.rect(0, 0, sx, H); c.clip();
    c.fillStyle = "#FBFBFA"; c.fillRect(0, 0, W, H);
    c.strokeStyle = "#D9D9D6"; c.lineWidth = 1;
    for (let x = 0; x < W; x += 96) { c.beginPath(); c.moveTo(x, 0); c.lineTo(x, H); c.stroke(); }
    for (let y = 0; y < H; y += 30) { c.beginPath(); c.moveTo(0, y); c.lineTo(W, y); c.stroke(); }
    c.font = `400 14px ${KR}`; c.fillStyle = "#777"; c.textAlign = "left"; c.textBaseline = "middle";
    for (let r = 0; r < 36; r++) for (let k = 0; k < 15; k++) c.fillText(r === 0 ? ["셀ID", "전압", "온도", "SOC", "상태"][k % 5] : String(((r * 37 + k * 91) % 997) / 10), k * 96 + 8, r * 30 + 16);
    c.restore();
    // 경계: 셀이 카드 쪽으로 모여듦
    for (let i = 0; i < 14; i++) {
      const ry = (i * 77) % H, d = ((t * 120 + i * 40) % 140);
      c.fillStyle = `rgba(25,195,125,${0.35 * (1 - d / 140)})`; roundRect(c, sx + d * 0.6, ry, 90 - d * 0.3, 26, 6); c.fill();
    }
    c.restore();
    // 슬라이더
    if (zoom < 0.5) {
      c.fillStyle = "#111"; c.fillRect(sx - 2, 0, 4, H);
      c.beginPath(); c.arc(sx, H / 2, 38, 0, 7); c.fill();
      text(c, "‹ ›", sx, H / 2 + 2, `700 28px ${KR}`, "#fff", "center");
      const [mx, my] = path(t, [[0, W - 200, H - 120], [1.5, W / 2 + 6, H / 2 + 8], [16, W / 2 + 6, H / 2 + 8]]);
      cursor(c, t > 1.5 ? sx + 6 : mx, my, press(t, 1.8));
    }
  },
};

// ───────── #24 클릭한 자리에서 퍼지는 다크·라이트 전환 (12초) ─────────
export const themeSwitch: S = {
  dur: 12,
  draw(c, t) {
    const Y = "#FFC53D";
    const tgx = W - 150, tgy = 90;
    const app = (dark: boolean) => {
      const bg = dark ? "#111113" : "#FAFAF7", fg = dark ? "#F0EEE9" : "#141414", card = dark ? "#1C1C20" : "#FFFFFF";
      c.fillStyle = bg; c.fillRect(0, 0, W, H);
      text(c, "LIBMS", 80, 90, `900 44px ${KR}`, fg);
      text(c, "배터리 모니터링", 250, 92, `500 26px ${KR}`, dark ? "#8A8A90" : "#888");
      [[80, 180], [740, 180]].forEach(([x, y], i) => {
        c.save(); c.shadowColor = dark ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0.08)"; c.shadowBlur = 40; c.shadowOffsetY = 14;
        roundRect(c, x, y, 620, 300, 28); c.fillStyle = card; c.fill(); c.restore();
        text(c, ["SOC", "전압"][i], x + 40, y + 60, `600 28px ${KR}`, dark ? "#8A8A90" : "#888");
        text(c, ["80%", "383.8 V"][i], x + 40, y + 160, `800 90px ${KR}`, fg);
        roundRect(c, x + 40, y + 230, 540, 16, 8); c.fillStyle = dark ? "#2A2A30" : "#EEE"; c.fill();
        roundRect(c, x + 40, y + 230, 540 * [0.8, 0.62][i], 16, 8); c.fillStyle = Y; c.fill();
      });
      c.save(); c.shadowColor = dark ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0.08)"; c.shadowBlur = 40; c.shadowOffsetY = 14;
      roundRect(c, 80, 530, 1280, 470, 28); c.fillStyle = card; c.fill(); c.restore();
      c.strokeStyle = dark ? Y : "#141414"; c.lineWidth = 6; c.lineJoin = "round"; c.beginPath();
      for (let k = 0; k < 12; k++) { const xx = 140 + k * 105, yy = 900 - ((Math.sin(k * 0.9) + 1.3) / 2.6) * 300; k ? c.lineTo(xx, yy) : c.moveTo(xx, yy); }
      c.stroke();
      // 토글 (해 ↔ 달)
      roundRect(c, tgx - 60, tgy - 36, 120, 72, 36); c.fillStyle = dark ? "#2A2A30" : "#EDEBE4"; c.fill();
      return fg;
    };
    // 지금 테마와 퍼지는 원
    const c1 = prog(t, 4.0, 5.8), c2 = prog(t, 8.5, 10.3);
    const R = (k: number) => io(k) * 1900;
    const base = t < 8.5 ? (c1 >= 1 ? true : false) : !(c2 >= 1);
    const zoom = io(prog(t, 2.0, 3.4)) * (1 - io(prog(t, 4.2, 5.6)));
    c.save(); c.translate(W / 2, H / 2); c.scale(1 + zoom * 1.6, 1 + zoom * 1.6); c.translate(-lerp(W / 2, tgx, zoom), -lerp(H / 2, tgy, zoom));
    app(base);
    const spreading = t >= 4.0 && c1 < 1 ? c1 : t >= 8.5 && c2 < 1 ? c2 : 0;
    if (spreading > 0) { c.save(); c.beginPath(); c.arc(tgx, tgy, R(spreading), 0, 7); c.clip(); app(t < 8.5); c.restore(); }
    // 토글 아이콘 모양 변화
    const moon = t < 4 ? 0 : t < 8.5 ? io(prog(t, 3.6, 4.2)) : 1 - io(prog(t, 8.1, 8.7));
    const kx = tgx + lerp(-24, 24, moon);
    c.fillStyle = Y; c.beginPath(); c.arc(kx, tgy, 22, 0, 7); c.fill();
    if (moon > 0) { c.fillStyle = moon > 0.5 ? "#2A2A30" : "#EDEBE4"; c.beginPath(); c.arc(kx + lerp(40, 9, moon), tgy - lerp(30, 7, moon), 18, 0, 7); c.fill(); }
    if (moon < 1) { c.strokeStyle = Y; c.lineWidth = 3; for (let i = 0; i < 8; i++) { const a = (i * Math.PI) / 4; c.globalAlpha = 1 - moon; c.beginPath(); c.moveTo(kx + Math.cos(a) * 27, tgy + Math.sin(a) * 27); c.lineTo(kx + Math.cos(a) * 33, tgy + Math.sin(a) * 33); c.stroke(); } c.globalAlpha = 1; }
    const [mx, my] = path(t, [[0, W - 260, H - 120], [1.6, tgx + 10, tgy + 14], [5, tgx + 10, tgy + 14], [5.8, W - 380, 400], [7.4, W - 380, 400], [8.2, tgx + 10, tgy + 14], [10.6, tgx + 10, tgy + 14], [12, W - 260, H - 120]]);
    cursor(c, mx, my, Math.max(press(t, 3.9), press(t, 8.4)));
    c.restore();
  },
};

// ───────── #31 링이 차고 배지가 찍히는 운동 앱 (16초) ─────────
export const fitnessRing: S = {
  dur: 16,
  draw(c, t) {
    const L = "#C6FF3D";
    c.fillStyle = "#000"; c.fillRect(0, 0, W, H);
    text(c, "WIOTP", 80, 80, `900 40px ${KR}`, "#fff");
    text(c, "오늘 목표 500kcal", 80, 130, `500 26px ${KR}`, "#888");
    const cx = W / 2, cy = 470, R = 250;
    const fill = clamp((t - 2) / 6); // 2~8초, 박자마다 한 칸
    const step = Math.floor(fill * 12 + 1e-6) / 12 + io(((fill * 12) % 1)) / 12 * 0; void step;
    const beatFill = (Math.floor(Math.max(0, t - 2) * 2) + io((Math.max(0, t - 2) * 2) % 1)) / 12;
    const f = t < 2 ? 0 : t < 8 ? clamp(beatFill) : t < 14.4 ? 1 : 1 - io(prog(t, 14.4, 15.6));
    const toHex = io(prog(t, 8.2, 9.4)) * (1 - io(prog(t, 14.2, 15.4)));
    const drop = io(prog(t, 12.0, 12.8)) * (1 - io(prog(t, 14.0, 14.4)));
    // 링 / 육각 배지 (원 위의 점을 육각형 위의 점으로)
    const N = 120, ring: number[][] = [];
    const rr = lerp(R, 150, toHex);
    for (let i = 0; i <= N; i++) {
      const a = -Math.PI / 2 + (i / N) * Math.PI * 2;
      const seg = Math.floor(((a + Math.PI / 2) / (Math.PI * 2)) * 6), a0 = -Math.PI / 2 + (seg * Math.PI) / 3 - Math.PI / 6 + Math.PI / 6, a1 = a0 + Math.PI / 3;
      const q = ((a + Math.PI / 2) / (Math.PI / 3)) % 1;
      const hx = lerp(Math.cos(a0), Math.cos(a1), q), hy = lerp(Math.sin(a0), Math.sin(a1), q);
      ring.push([cx + lerp(Math.cos(a), hx, toHex) * rr, cy + lerp(Math.sin(a), hy, toHex) * rr + drop * 330]);
    }
    const lw = lerp(46, 18, toHex);
    c.lineCap = "round"; c.lineJoin = "round";
    if (toHex < 0.5) { c.strokeStyle = "#2A2A2A"; c.lineWidth = lw; c.beginPath(); ring.forEach(([x, y], i) => (i ? c.lineTo(x, y) : c.moveTo(x, y))); c.stroke(); }
    if (f > 0 || toHex > 0) {
      c.strokeStyle = L; c.lineWidth = lw; c.beginPath();
      const n = toHex > 0.5 ? N : Math.floor(f * N);
      for (let i = 0; i <= n; i++) (i ? c.lineTo(ring[i][0], ring[i][1]) : c.moveTo(ring[i][0], ring[i][1]));
      c.stroke();
      if (toHex > 0.6) { c.fillStyle = `rgba(198,255,61,${(toHex - 0.6) * 0.4})`; c.beginPath(); ring.forEach(([x, y], i) => (i ? c.lineTo(x, y) : c.moveTo(x, y))); c.fill(); }
    }
    // 칼로리 숫자 (자릿수마다 굴러감)
    if (toHex < 0.4) {
      const bi = t < 2 || t > 14.4 ? 0 : Math.min(12, Math.floor((t - 2) * 2) + 1);
      const val = (b: number) => String(Math.round((500 * b) / 12)).padStart(3, "0");
      const k = t < 2 || t >= 8 ? 1 : ((t - 2) * 2) % 1;
      if (t > 14.4) { /* 처음으로 */ }
      c.fillStyle = "#fff"; c.globalAlpha = 1 - toHex * 2.5;
      rollText(c, val(Math.max(0, bi - 1)), val(bi), cx - 130, cy + 40, t < 2 ? 0 : clamp(k * 1.6), 120);
      text(c, "kcal", cx, cy + 110, `600 30px ${KR}`, "#888", "center"); c.globalAlpha = 1;
    }
    // 배지 각인
    const stamp = prog(t, 10.0, 10.35) * (1 - prog(t, 14.2, 14.6));
    if (stamp > 0 && toHex > 0.8) {
      const s = lerp(1.6, 1, easeOutCubic(stamp));
      c.save(); c.translate(cx, cy + drop * 330); c.scale(s * (1 - drop * 0.6), s * (1 - drop * 0.6)); c.globalAlpha = clamp(stamp * 2);
      text(c, "18홀", 0, -22, `900 52px ${KR}`, L, "center"); text(c, "완주", 0, 36, `900 52px ${KR}`, L, "center"); c.restore();
    }
    // 주간 막대
    const bars = io(prog(t, 11.6, 12.2)) * (1 - io(prog(t, 14.6, 15.2)));
    if (bars > 0) {
      const days = ["월", "화", "수", "목", "금", "토", "일"], vals = [0.5, 0.7, 0.35, 0.8, 0.6, 0.45, 0];
      const today = io(prog(t, 12.6, 13.4)) * (1 - io(prog(t, 14.2, 14.8)));
      days.forEach((d, i) => {
        const x = W / 2 - 3 * 150 + i * 150, base = 990, hgt = (i === 6 ? today : vals[i]) * 180 * bars;
        roundRect(c, x - 34, base - Math.max(8, hgt), 68, Math.max(8, hgt), 14); c.fillStyle = i === 6 ? L : "#2A2A2A"; c.fill();
        text(c, d, x, base + 40, `600 24px ${KR}`, "#777", "center");
      });
    }
  },
};

// ───────── #32 지출을 넣을 때마다 바뀌는 도넛 (18초) ─────────
const CATS = [
  { n: "식비", v: 120000, col: "#111111", budget: 200000 },
  { n: "교통", v: 45000, col: "#9A9A96", budget: 100000 },
  { n: "카페", v: 30000, col: "#C9C9C5", budget: 60000 },
  { n: "쇼핑", v: 60000, col: "#5E5E5A", budget: 80000 },
];
const EXP = [{ c: 0, n: "점심", v: 9000 }, { c: 1, n: "택시", v: 12000 }, { c: 2, n: "카페", v: 4500 }, { c: 3, n: "디자인 툴", v: 33000 }];
export const donutBudget: S = {
  dur: 18,
  draw(c, t) {
    const OR = "#FF7A45";
    c.fillStyle = "#ECEAE4"; c.fillRect(0, 0, W, H);
    const pw = 620, px = W / 2 - pw / 2, py = 60, ph = 960;
    roundRect(c, px, py, pw, ph, 44); c.fillStyle = "#fff"; c.fill();
    text(c, "MI3 가계부 · 11월", px + 44, py + 70, `800 32px ${KR}`, "#111");
    // 금액 상태 (저장할 때마다 바뀜, 마지막 마디에 처음으로)
    const reset = io(prog(t, 17.0, 17.8));
    const amt = CATS.map((ct, i) => {
      let v = ct.v;
      EXP.forEach((e, j) => { if (e.c === i) v += e.v * io(prog(t, 2 + j * 4 + 3.3, 2 + j * 4 + 3.9)); });
      return lerp(v, ct.v, reset);
    });
    const total = amt.reduce((a, b) => a + b, 0);
    const over = io(prog(t, 15.9, 16.3)) * (1 - reset);
    const cx = W / 2, cy = py + 360, R = 200;
    let a = -Math.PI / 2;
    amt.forEach((v, i) => {
      const sw = (v / total) * Math.PI * 2;
      c.strokeStyle = i === 3 && over > 0.5 ? OR : CATS[i].col; c.lineWidth = 64; c.lineCap = "butt";
      c.beginPath(); c.arc(cx, cy, R, a + 0.02, a + sw - 0.02); c.stroke(); a += sw;
    });
    text(c, "이번 달 지출", cx, cy - 40, `600 24px ${KR}`, "#999", "center");
    c.fillStyle = "#111"; c.font = `800 52px ${KR}`;
    const ts = "₩" + fmt(total);
    text(c, ts, cx, cy + 22, `800 52px ${KR}`, "#111", "center");
    // 범례
    CATS.forEach((ct, i) => {
      const y = py + 640 + i * 62;
      c.fillStyle = i === 3 && over > 0.5 ? OR : ct.col; c.beginPath(); c.arc(px + 60, y, 12, 0, 7); c.fill();
      text(c, ct.n, px + 90, y + 2, `600 28px ${KR}`, "#111");
      text(c, "₩" + fmt(amt[i]), px + pw - 50, y + 2, `700 28px ${KR}`, i === 3 && over > 0.5 ? OR : "#111", "right");
      if (i === 3 && over > 0.5) text(c, "예산 초과", px + 190, y + 2, `700 22px ${KR}`, OR);
    });
    // + 버튼 → 입력 시트 → 작은 원 → 도넛으로
    const bxc = px + pw - 90, byc = py + ph - 90;
    EXP.forEach((e, j) => {
      const s = 2 + j * 4;
      const open = io(prog(t, s + 0.4, s + 0.9)) * (1 - io(prog(t, s + 3.0, s + 3.3)));
      const fly = prog(t, s + 3.2, s + 3.7);
      if (open > 0.01) {
        const x = lerp(bxc - 44, px + 30, open), y = lerp(byc - 44, py + ph - 420, open), w = lerp(88, pw - 60, open), h = lerp(88, 390, open);
        roundRect(c, x, y, w, h, lerp(44, 28, open)); c.fillStyle = "#111"; c.fill();
        if (open > 0.8) {
          text(c, `${CATS[e.c].n} · ${e.n}`, x + 40, y + 60, `600 28px ${KR}`, "#AAA");
          const digits = fmt(e.v); const nType = Math.floor(clamp((t - (s + 1.0)) / 1.8) * digits.length + 0.999);
          text(c, "₩" + digits.slice(0, nType), x + 40, y + 160, `800 72px ${KR}`, "#fff");
          roundRect(c, x + 40, y + h - 120, w - 80, 84, 42); c.fillStyle = OR; c.fill();
          text(c, "저장", x + w / 2, y + h - 76, `700 30px ${KR}`, "#fff", "center");
        }
      }
      if (fly > 0 && fly < 1) {
        const fx = lerp(W / 2, cx + R, fly), fy = lerp(py + ph - 140, cy, fly) - Math.sin(Math.PI * fly) * 160;
        c.fillStyle = OR; c.beginPath(); c.arc(fx, fy, lerp(30, 14, fly), 0, 7); c.fill();
      }
    });
    const anyOpen = EXP.some((_, j) => t > 2 + j * 4 + 0.4 && t < 2 + j * 4 + 3.3);
    if (!anyOpen) { c.fillStyle = "#111"; c.beginPath(); c.arc(bxc, byc, 44, 0, 7); c.fill(); text(c, "+", bxc, byc + 2, `500 52px ${KR}`, "#fff", "center"); }
    // 터치 원
    const tk: [number, number, number][] = [[0, W / 2 + 360, H - 80]];
    EXP.forEach((_, j) => { const s = 2 + j * 4; tk.push([s, bxc, byc], [s + 0.6, bxc, byc], [s + 2.6, W / 2, py + ph - 100], [s + 3.2, W / 2, py + ph - 100]); });
    tk.push([18, W / 2 + 360, H - 80]);
    const [mx, my] = path(t, tk);
    const pr = EXP.reduce((m, _, j) => Math.max(m, press(t, 2 + j * 4 + 0.35), press(t, 2 + j * 4 + 2.95)), 0);
    c.fillStyle = `rgba(0,0,0,${0.18 + pr * 0.2})`; c.beginPath(); c.arc(mx, my, 34 - pr * 8, 0, 7); c.fill();
    c.strokeStyle = "rgba(255,255,255,0.9)"; c.lineWidth = 3; c.stroke();
  },
};
