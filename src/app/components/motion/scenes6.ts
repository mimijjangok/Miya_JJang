import { W, H, Scene, prog, lerp, clamp, easeOutBack, easeInOut3, easeOutCubic, KR, roundRect } from "./util";
import { rollText, cursor } from "./scenes4";

// 모션 100에서 고른 두 번째 묶음 10개
type S = Scene & { dur: number };
const io = easeInOut3;
const T = (c: CanvasRenderingContext2D, s: string, x: number, y: number, font: string, col: string, al: CanvasTextAlign = "left") => {
  c.font = font; c.fillStyle = col; c.textAlign = al; c.textBaseline = "middle"; c.fillText(s, x, y);
};
const tick = (c: CanvasRenderingContext2D, x: number, y: number, s: number, k: number, col: string, lw = 8) => {
  const a = [x - s * 0.5, y], b = [x - s * 0.12, y + s * 0.38], d = [x + s * 0.55, y - s * 0.4];
  const l1 = Math.hypot(b[0] - a[0], b[1] - a[1]), l2 = Math.hypot(d[0] - b[0], d[1] - b[1]), L = (l1 + l2) * clamp(k);
  c.strokeStyle = col; c.lineWidth = lw; c.lineCap = "round"; c.lineJoin = "round"; c.beginPath(); c.moveTo(a[0], a[1]);
  if (L <= l1) c.lineTo(lerp(a[0], b[0], L / l1), lerp(a[1], b[1], L / l1));
  else { c.lineTo(b[0], b[1]); c.lineTo(lerp(b[0], d[0], (L - l1) / l2), lerp(b[1], d[1], (L - l1) / l2)); }
  c.stroke();
};
const press = (t: number, at: number) => Math.sin(Math.PI * prog(t, at - 0.08, at + 0.12));
const path = (t: number, keys: [number, number, number][]) => {
  if (t <= keys[0][0]) return [keys[0][1], keys[0][2]];
  for (let i = 0; i < keys.length - 1; i++) {
    const [t0, x0, y0] = keys[i], [t1, x1, y1] = keys[i + 1];
    if (t <= t1) { const k = io(prog(t, t0, t1)); return [lerp(x0, x1, k), lerp(y0, y1, k)]; }
  }
  const l = keys[keys.length - 1]; return [l[1], l[2]];
};
// 마스크 선 위로 올라오는 글자
const rise = (c: CanvasRenderingContext2D, s: string, x: number, y: number, k: number, font: string, col: string, al: CanvasTextAlign = "left", h = 120) => {
  if (k <= 0) return;
  c.save(); c.beginPath(); c.rect(0, y - h, W, h * 1.6); c.clip();
  T(c, s, x, y + (1 - easeOutCubic(k)) * h, font, col, al); c.restore();
};

// ───────── #2 키노트식 제품 소개와 숫자 세 개 (20초) ─────────
export const keynote: S = {
  dur: 20,
  draw(c, t) {
    const BL = "#2F6BFF";
    c.fillStyle = "#000"; c.fillRect(0, 0, W, H);
    const back = t < 4 ? (Math.floor(t * 2) + io((t * 2) % 1)) / 8 : 1;
    const merge = io(prog(t, 18.2, 19.6));
    // 큰 제품 이름 → 물러남
    const nameS = lerp(lerp(2.6, 1, back), 1, 0);
    if (t < 8 || merge > 0) {
      const s = t < 8 ? nameS : lerp(0.3, 2.6, merge);
      const y = t < 8 ? lerp(H / 2, 360, io(prog(t, 3.6, 4.4))) : H / 2;
      c.save(); c.translate(W / 2, y); c.scale(s, s); c.globalAlpha = t < 8 ? 1 : merge;
      T(c, "LIBMS", 0, 0, `900 220px ${KR}`, "#fff", "center"); c.restore();
    }
    // 카피 (단어 단위로 올라옴)
    if (t >= 4 && t < 8) {
      const words = ["배터리를", "한눈에,", "끝까지."];
      let x = W / 2 - 430;
      c.font = `700 74px ${KR}`;
      words.forEach((w, i) => { const k = prog(t, 4 + i * 0.5, 4.4 + i * 0.5); rise(c, w, x, 600, k, `700 74px ${KR}`, "#fff"); x += c.measureText(w + " ").width; });
    }
    // 숫자 세 개 (카메라가 오른쪽으로 미끄러짐)
    const NUMS = [["0000", "1280", "셀 동시 감시"], ["0.0", "0.5", "초마다 갱신"], ["00", "24", "시간 모니터링"]];
    if (t >= 7.6 && t < 18.4) {
      const slot = t < 12 ? 0 : t < 16 ? 1 : 2;
      const cam = lerp(slot, slot + 1, io(prog(t, [11.6, 15.6, 99][slot], [12.2, 16.2, 99][slot]))) ;
      const ex = io(prog(t, 7.6, 8.2));
      c.save(); c.translate(-cam * W, 0);
      NUMS.forEach(([a, b, u], i) => {
        const cx = W / 2 + i * W, t0 = 8 + i * 4;
        if (t < t0 - 0.4) return;
        const k = prog(t, t0, t0 + 1.6);
        c.fillStyle = i === 2 ? BL : "#fff";
        c.save(); c.translate(cx - 330, H / 2 + 60); c.scale(ex, 1);
        rollText(c, a, b, 0, 0, k, 230); c.restore();
        rise(c, u, cx - 320, H / 2 + 170, prog(t, t0 + 1.6, t0 + 2.0), `600 46px ${KR}`, i === 2 ? BL : "#9A9AA0");
      });
      c.restore();
    }
  },
};

// ───────── #4 한 장의 카드가 네 번 뒤집히는 업데이트 소식 (20초) ─────────
const FEAT4 = ["QR로 바로 출근", "근무 시간 자동 계산", "대표 승인 한 번에", "월간 리포트"];
export const flipCard: S = {
  dur: 20,
  draw(c, t) {
    const OR = "#FF5A1F";
    c.fillStyle = "#ECEBE7"; c.fillRect(0, 0, W, H);
    const grow = io(prog(t, 0.8, 1.9)) * (1 - io(prog(t, 18.2, 19.4)));
    // 제목
    const ta = 1 - grow;
    if (ta > 0.02) {
      c.globalAlpha = ta;
      T(c, "바로Check, 새로워진 것", W / 2 - 60, H / 2, `800 60px ${KR}`, "#111", "right");
      c.globalAlpha = 1;
    }
    // "4" → 카드
    const cw = lerp(70, 760, grow), chh = lerp(110, 860, grow), cx = lerp(W / 2 + 40, W / 2, grow), cy = H / 2;
    let flip = 0, face = -1;
    for (let i = 0; i < 4; i++) { const f0 = 2 + i * 4; const p = prog(t, f0, f0 + 0.6); if (t >= f0) { face = i; flip = p; } }
    if (t > 18) face = 3;
    const sx = Math.abs(Math.cos(Math.PI * flip));
    const showing = flip < 0.5 ? face - 1 : face;
    c.save(); c.translate(cx, cy); c.scale(grow > 0.05 ? sx : 1, 1);
    if (grow < 0.05) { T(c, "4", 0, 0, `900 140px ${KR}`, OR, "center"); c.restore(); return; }
    c.shadowColor = "rgba(0,0,0,0.12)"; c.shadowBlur = 50; c.shadowOffsetY = 20;
    roundRect(c, -cw / 2, -chh / 2, cw, chh, 36); c.fillStyle = "#fff"; c.fill(); c.shadowColor = "transparent";
    if (showing < 0) { c.globalAlpha = clamp(grow * 2 - 1); T(c, "4", 0, 0, `900 ${lerp(140, 420, grow)}px ${KR}`, OR, "center"); c.globalAlpha = 1; c.restore(); return; }
    if (grow < 0.9) { c.restore(); return; }
    const L = -cw / 2 + 56, top = -chh / 2;
    T(c, `0${showing + 1}`, L, top + 70, `700 28px ${KR}`, OR);
    T(c, FEAT4[showing], L, top + 130, `800 52px ${KR}`, "#111");
    const f0 = 2 + showing * 4, clk = f0 + 1.6, done = t > clk + 0.2;
    // 기능마다 미니 UI
    roundRect(c, L, top + 200, cw - 112, 560, 24); c.fillStyle = "#F5F4F0"; c.fill();
    const ux = L + 40, uy = top + 240, uw = cw - 192;
    if (showing === 0) {
      for (let i = 0; i < 7; i++) for (let j = 0; j < 7; j++) if ((i * 3 + j * 5 + i * j) % 3 !== 0 || i < 2 && j < 2 || i > 4 && j < 2 || i < 2 && j > 4) { c.fillStyle = "#111"; c.fillRect(ux + 150 + i * 34, uy + 40 + j * 34, 30, 30); }
      roundRect(c, ux, uy + 330, uw, 90, 45); c.fillStyle = done ? OR : "#111"; c.fill();
      T(c, done ? "출근 완료 · 09:00" : "QR 찍고 출근", ux + uw / 2, uy + 376, `700 30px ${KR}`, "#fff", "center");
    } else if (showing === 1) {
      T(c, "이번 주 근무", ux, uy + 30, `600 28px ${KR}`, "#888");
      c.fillStyle = "#111"; rollText(c, "00:00", done ? "38:30" : "00:00", ux, uy + 130, prog(t, clk, clk + 0.8), 110);
      [0.7, 0.9, 0.8, 0.95, 0.5].forEach((v, i) => { const h = v * 160 * (done ? 1 : 0.15); roundRect(c, ux + i * 110, uy + 420 - h, 70, h, 10); c.fillStyle = i === 3 ? OR : "#111"; c.fill(); });
    } else if (showing === 2) {
      ["김하늘 · 연장 근무 1시간", "이준 · 휴가 신청"].forEach((s, i) => {
        roundRect(c, ux, uy + 20 + i * 150, uw, 120, 20); c.fillStyle = "#fff"; c.fill();
        T(c, s, ux + 30, uy + 80 + i * 150, `600 28px ${KR}`, "#111");
        roundRect(c, ux + uw - 150, uy + 50 + i * 150, 120, 60, 30); c.fillStyle = done ? OR : "#E4E2DC"; c.fill();
        T(c, done ? "승인됨" : "승인", ux + uw - 90, uy + 81 + i * 150, `700 24px ${KR}`, done ? "#fff" : "#111", "center");
      });
    } else {
      c.strokeStyle = "#111"; c.lineWidth = 6; c.beginPath();
      for (let i = 0; i < 8; i++) { const x = ux + i * (uw / 7), y = uy + 360 - (Math.sin(i * 0.9) + 1.2) * 120 * (done ? 1 : 0.2); i ? c.lineTo(x, y) : c.moveTo(x, y); }
      c.stroke();
      T(c, done ? "11월 리포트 · PDF 저장됨" : "리포트 만들기", ux, uy + 440, `700 30px ${KR}`, done ? OR : "#111");
    }
    c.restore();
    const [mx, my] = path(t, [[0, W - 200, H - 80], [2.6, W - 200, H - 80], ...[0, 1, 2, 3].flatMap((i) => [[2 + i * 4 + 1.2, W / 2 + 80, H / 2 + 200] as [number, number, number], [2 + i * 4 + 2.4, W / 2 + 80, H / 2 + 200] as [number, number, number], [2 + i * 4 + 3.6, W - 200, H - 80] as [number, number, number]]), [20, W - 200, H - 80]]);
    cursor(c, mx, my, [0, 1, 2, 3].reduce((m, i) => Math.max(m, press(t, 2 + i * 4 + 1.6)), 0));
  },
};

// ───────── #15 진행 점이 카드로 늘어나는 온보딩 3단계 (16초) ─────────
export const onboarding: S = {
  dur: 16,
  draw(c, t) {
    const B = "#3B5BFF";
    c.fillStyle = "#F4EFE6"; c.fillRect(0, 0, W, H);
    const dotX = (i: number) => W / 2 + (i - 1) * 70, dotY = 120;
    const merge = io(prog(t, 14.0, 14.6)) * (1 - io(prog(t, 15.3, 15.9)));
    const filled = (i: number) => t >= 2 + i * 4 + 3.6 && t < 15.3;
    // 단계 카드
    const step = t >= 2 && t < 14 ? Math.min(2, Math.floor((t - 2) / 4)) : -1;
    if (step >= 0) {
      const t0 = 2 + step * 4, open = io(prog(t, t0, t0 + 0.6)), suck = io(prog(t, t0 + 3.4, t0 + 3.9));
      const cw = lerp(24, 780, open * (1 - suck)), chh = lerp(24, 700, open * (1 - suck));
      const cx = lerp(dotX(step), W / 2, open * (1 - suck)) + suck * (dotX(step + 1 > 2 ? 2 : step + 1) - W / 2) * 0;
      const cy = lerp(dotY, H / 2 + 60, open * (1 - suck));
      roundRect(c, cx - cw / 2, cy - chh / 2, cw, chh, Math.min(36, cw / 2)); c.fillStyle = "#fff"; c.fill();
      if (open > 0.9 && suck < 0.1) {
        const L = cx - cw / 2 + 60, top = cy - chh / 2;
        T(c, `${step + 1} / 3`, L, top + 70, `700 26px ${KR}`, B);
        T(c, ["이름을 알려 주세요", "어떤 작업이 궁금하세요?", "새 작업 알림을 받을까요?"][step], L, top + 140, `800 50px ${KR}`, "#161616");
        if (step === 0) {
          roundRect(c, L, top + 230, cw - 120, 96, 18); c.strokeStyle = "#161616"; c.lineWidth = 3; c.stroke();
          const name = "김미례".slice(0, Math.floor(clamp((t - (t0 + 0.9)) / 1.2) * 3 + 0.999));
          T(c, name, L + 32, top + 279, `600 38px ${KR}`, "#161616");
        } else if (step === 1) {
          ["캐릭터", "웹·앱 UIUX", "브랜딩"].forEach((s, i) => {
            const on = i === 1 && t > t0 + 1.6;
            roundRect(c, L, top + 220 + i * 100, cw - 120, 80, 40); c.fillStyle = on ? B : "#F4EFE6"; c.fill();
            T(c, s, L + 40, top + 261 + i * 100, `700 32px ${KR}`, on ? "#fff" : "#161616");
          });
        } else {
          T(c, "새 작업 알림", L, top + 280, `600 36px ${KR}`, "#161616");
          const on = io(prog(t, t0 + 1.6, t0 + 1.9));
          roundRect(c, L + cw - 260, top + 245, 130, 72, 36); c.fillStyle = on > 0.5 ? B : "#D8D3C8"; c.fill();
          c.fillStyle = "#fff"; c.beginPath(); c.arc(L + cw - 224 + on * 58, top + 281, 28, 0, 7); c.fill();
        }
        roundRect(c, L, top + chh - 150, cw - 120, 96, 48); c.fillStyle = "#161616"; c.fill();
        T(c, "다음", cx, top + chh - 101, `700 32px ${KR}`, "#fff", "center");
      }
    }
    // 진행 점 → 합쳐져 "시작하기"
    if (merge > 0.02) {
      const w = lerp(160, 420, merge);
      roundRect(c, W / 2 - w / 2, H / 2 - 50, w, 100, 50); c.fillStyle = B; c.fill();
      if (merge > 0.8) T(c, "MODUVA 시작하기", W / 2, H / 2 + 2, `800 34px ${KR}`, "#fff", "center");
    } else for (let i = 0; i < 3; i++) {
      c.fillStyle = filled(i) ? B : "#CFC8BA"; c.beginPath(); c.arc(dotX(i), dotY, 14, 0, 7); c.fill();
    }
    const keys: [number, number, number][] = [[0, W - 180, H - 80]];
    [0, 1, 2].forEach((i) => { const t0 = 2 + i * 4; keys.push([t0 + 0.8, W / 2 + 60, H / 2 + (i === 1 ? -40 : 0)], [t0 + 2.6, W / 2 + 60, H / 2 + (i === 1 ? -40 : 0)], [t0 + 3.1, W / 2 + 40, H / 2 + 330], [t0 + 3.6, W / 2 + 40, H / 2 + 330]); });
    keys.push([16, W - 180, H - 80]);
    const [mx, my] = path(t, keys);
    cursor(c, mx, my, [0, 1, 2].reduce((m, i) => Math.max(m, press(t, 2 + i * 4 + 1.6), press(t, 2 + i * 4 + 3.3)), 0));
  },
};

// ───────── #17 답변 안에서 표와 차트가 펼쳐지는 채팅 AI (20초) ─────────
const Q = "올해 프로젝트를 분야별로 정리해줘";
const ROWS = [["웹 · 앱 UIUX", 17], ["기업브랜딩", 7], ["캐릭터", 4], ["제안문서", 3]];
export const chatAI: S = {
  dur: 20,
  draw(c, t) {
    const OR = "#D97757";
    c.fillStyle = "#F5F2EB"; c.fillRect(0, 0, W, H);
    const wind = io(prog(t, 18.2, 19.6));
    const zoom = io(prog(t, 10, 10.8)) * (1 - io(prog(t, 16.4, 17.2)));
    c.save(); c.translate(W / 2, H / 2); c.scale(1 + zoom * 0.3, 1 + zoom * 0.3); c.translate(-W / 2, -H / 2 - zoom * 120 - wind * 900);
    const sent = t >= 3.6;
    // 사용자 말풍선
    if (sent) {
      const k = io(prog(t, 3.6, 4.1));
      const y = lerp(H - 110, 130, k);
      c.font = `600 30px ${KR}`; const w = c.measureText(Q).width + 70;
      roundRect(c, W - 120 - w, y - 40, w, 80, 40); c.fillStyle = "#1F1F1F"; c.fill();
      T(c, Q, W - 120 - w + 35, y + 2, `600 30px ${KR}`, "#fff");
    }
    // 답변
    if (t >= 4.4) {
      c.fillStyle = OR; c.beginPath(); c.arc(140, 250, 22, 0, 7); c.fill();
      const ans = "올해 진행한 프로젝트는 모두 31건이에요. 분야별로 보면 이렇습니다.".split(" ");
      const n = Math.floor(clamp((t - 4.6) / 3.2) * ans.length + 0.999);
      roundRect(c, 190, 210, 1000, 640 + 0, 28); c.fillStyle = "#fff"; c.fill();
      T(c, ans.slice(0, n).join(" "), 230, 262, `500 30px ${KR}`, "#111");
      // 표 (아코디언)
      const rowsShown = t < 8 ? 0 : Math.min(4, Math.floor((t - 8) * 2) + 1);
      const toChart = io(prog(t, 12, 13.2));
      ROWS.forEach(([name, v], i) => {
        if (i >= rowsShown) return;
        const y = 330 + i * 80, sc = easeOutCubic(prog(t, 8 + i * 0.5, 8.3 + i * 0.5));
        c.save(); c.translate(0, y); c.scale(1, sc);
        c.fillStyle = i % 2 ? "#FAF8F3" : "#fff"; c.fillRect(230, -34, 920, 68);
        T(c, String(name), 260, 0, `600 30px ${KR}`, "#111");
        const vx = lerp(1060, 560, toChart);
        if (toChart < 0.05) T(c, `${v}건`, vx, 0, `700 30px ${KR}`, "#111", "right");
        else {
          const bw = (Number(v) / 17) * 520 * toChart, hov = i === 0 && t > 14 && t < 16.4;
          roundRect(c, 560, -20, Math.max(8, bw), 40, 10); c.fillStyle = i === 0 ? OR : "#2B2B2B"; c.fill();
          T(c, `${v}`, 580 + bw, 0, `700 26px ${KR}`, "#111");
          if (hov) { roundRect(c, 560 + bw - 120, -100, 240, 60, 30); c.fillStyle = "#111"; c.fill(); T(c, "전체의 55%", 560 + bw, -70, `700 24px ${KR}`, "#fff", "center"); }
        }
        c.restore();
      });
      if (t > 16) rise(c, "웹 · 앱 작업이 절반 이상을 차지해요.", 230, 700, prog(t, 16, 16.6), `500 30px ${KR}`, "#111", "left", 50);
    }
    c.restore();
    // 입력창
    roundRect(c, 120, H - 160, W - 240, 100, 50); c.fillStyle = "#fff"; c.fill();
    const typed = t < 3.6 ? Q.slice(0, Math.floor(clamp((t - 0.4) / 2.8) * Q.length + 0.999)) : "";
    T(c, typed || (t < 0.4 || t > 3.6 ? "무엇이든 물어보세요" : ""), 170, H - 108, `500 30px ${KR}`, typed ? "#111" : "#AAA");
    c.fillStyle = OR; c.beginPath(); c.arc(W - 180, H - 110, 32, 0, 7); c.fill();
    c.strokeStyle = "#fff"; c.lineWidth = 5; c.beginPath(); c.moveTo(W - 180, H - 95); c.lineTo(W - 180, H - 125); c.moveTo(W - 192, H - 113); c.lineTo(W - 180, H - 125); c.lineTo(W - 168, H - 113); c.stroke();
    const [mx, my] = path(t, [[0, W - 320, H - 300], [3.0, W - 172, H - 100], [3.8, W - 172, H - 100], [4.6, W - 320, H - 300], [13.4, W - 320, H - 300], [14.0, 820, 360], [16.4, 820, 360], [17.2, W - 320, H - 300], [20, W - 320, H - 300]]);
    cursor(c, mx, my, press(t, 3.4));
  },
};

// ───────── #20 쌓인 알림을 한 장으로 접는 요약 (16초) ─────────
const NOTI = [["캘린더", "디자인 리뷰가 3시로 바뀌었어요"], ["결제", "MODUVA Shop 결제 완료 · ₩58,000"], ["Figma", "댓글 3개가 달렸어요"], ["배포", "next-work-thumbs 배포 완료"], ["메일", "LIBMS 시안 피드백 도착"], ["택배", "아기별 쿠션 배송 출발"], ["슬랙", "#design 새 메시지 12개"], ["캘린더", "내일 오전 10시 킥오프"], ["은행", "이번 달 카드 사용 알림"], ["GitHub", "PR 리뷰 요청 2건"], ["메일", "포트폴리오 문의 1건"], ["Figma", "모두바 파일이 수정됐어요"]];
export const notiSummary: S = {
  dur: 16,
  draw(c, t) {
    const Y = "#FFB020";
    c.fillStyle = "#121214"; c.fillRect(0, 0, W, H);
    const fold = io(prog(t, 8, 9.4)) * (1 - io(prog(t, 14.6, 15.6)));
    const cw = 760, x = W / 2 - cw / 2;
    NOTI.forEach(([app, msg], i) => {
      const born = 0.2 + i * 0.5; if (t < born && t < 15) return;
      const drop = easeOutCubic(prog(t, born, born + 0.35));
      const slot = NOTI.filter((_, j) => j > i && t >= 0.2 + j * 0.5).length;
      const spread = t > 15.6 ? 0 : 1;
      let y = 110 + slot * 76 - (1 - drop) * 140 + (i % 3) * 6;
      y = lerp(y, 330 + i * 2, fold);
      if (t > 15.6) return;
      const rot = ((i % 5) - 2) * 0.012 * (1 - fold) * spread;
      c.save(); c.translate(x + cw / 2 + ((i * 37) % 60 - 30) * (1 - fold), y + 40); c.rotate(rot); c.scale(1, lerp(1, 0.2, fold));
      roundRect(c, -cw / 2, -40, cw, 82, 24); c.fillStyle = "rgba(255,255,255,0.12)"; c.fill(); c.strokeStyle = "rgba(255,255,255,0.18)"; c.lineWidth = 1.5; c.stroke();
      if (fold < 0.6) { T(c, app, -cw / 2 + 30, 0, `700 24px ${KR}`, "rgba(255,255,255,0.6)"); T(c, msg, -cw / 2 + 150, 0, `600 28px ${KR}`, "#fff"); }
      c.restore();
    });
    // 요약 카드
    const sm = io(prog(t, 9.2, 9.8)) * (1 - io(prog(t, 14.4, 15.0)));
    if (sm > 0) {
      const h = 380 * sm;
      roundRect(c, x, 330 - h / 2 + 40, cw, h, 32); c.fillStyle = "rgba(255,255,255,0.16)"; c.fill(); c.strokeStyle = "rgba(255,255,255,0.3)"; c.lineWidth = 2; c.stroke();
      if (sm > 0.95) {
        T(c, "MI3 요약 · 알림 12개", x + 44, 230, `700 26px ${KR}`, "rgba(255,255,255,0.6)");
        [["디자인 리뷰가 오늘 3시로 바뀌었어요", true], ["배포 완료 · 결제와 배송도 정상", false], ["답할 것: 피드백 · PR 리뷰 · 문의", false]].forEach(([s, imp], i) =>
          rise(c, String(s), x + 44, 300 + i * 70, prog(t, 10 + i * 0.5, 10.4 + i * 0.5), `700 32px ${KR}`, imp ? Y : "#fff", "left", 50));
      }
    }
    // 요약 버튼
    const bA = t < 9 || t > 13.5 ? 1 : 0;
    roundRect(c, W / 2 - 170, H - 140, 340, 84, 42); c.fillStyle = bA ? Y : "rgba(255,255,255,0.12)"; c.fill();
    T(c, t < 13.5 ? "MI3으로 요약" : "다시 펼치기", W / 2, H - 97, `800 30px ${KR}`, bA ? "#121214" : "#fff", "center");
    const [mx, my] = path(t, [[0, W - 160, H - 300], [7.4, W / 2 + 40, H - 92], [8.4, W / 2 + 40, H - 92], [9.0, W - 160, H - 300], [13.2, W - 160, H - 300], [13.9, W / 2 + 40, H - 92], [14.6, W / 2 + 40, H - 92], [16, W - 160, H - 300]]);
    cursor(c, mx, my, Math.max(press(t, 8.0), press(t, 14.2)));
  },
};

// ───────── #21 빈 주간 캘린더가 스스로 채워지는 장면 (16초) ─────────
const EVT: [number, number, number, number][] = [ // 요일, 시작, 길이, 색(0검정 1회색 2포인트)
  [0, 1, 2, 0], [1, 3, 1.5, 2], [2, 0.5, 2, 1], [3, 2, 2, 0], [3, 2.5, 1.5, 2], [4, 1, 3, 1], [1, 5, 1.5, 0], [0, 4.5, 2, 2], [2, 4, 1, 0], [4, 5, 1.5, 2], [3, 5, 1, 1], [2, 6, 1, 2], [0, 7, 1, 1], [1, 7, 1, 0], [4, 7, 1, 1], [3, 7, 1, 0],
];
export const calendarFill: S = {
  dur: 16,
  draw(c, t) {
    const P = "#4C6FFF", COL = ["#141414", "#9C9A94", P];
    c.fillStyle = "#F6F4EF"; c.fillRect(0, 0, W, H);
    const gx = 160, gy = 200, cw = 230, rh = 88;
    T(c, "MI3 캘린더 · 이번 주", gx, 90, `800 38px ${KR}`, "#141414");
    ["월", "화", "수", "목", "금"].forEach((d, i) => T(c, d, gx + i * cw + cw / 2, gy - 30, `600 26px ${KR}`, "#777", "center"));
    c.strokeStyle = "#DCDAD4"; c.lineWidth = 1.5;
    for (let i = 0; i <= 5; i++) { c.beginPath(); c.moveTo(gx + i * cw, gy); c.lineTo(gx + i * cw, gy + 8 * rh); c.stroke(); }
    for (let r = 0; r <= 8; r++) { c.beginPath(); c.moveTo(gx, gy + r * rh); c.lineTo(gx + 5 * cw, gy + r * rh); c.stroke(); }
    const back = io(prog(t, 14.2, 15.4));
    const btn = [W - 260, 90];
    EVT.forEach(([d, s, len, col], i) => {
      const born = 2 + i * 0.5; if (t < born) return;
      const k = easeOutBack(prog(t, born, born + 0.4), 1.2);
      // 겹침: 4번째(목 2시) 블록이 들어오면 3번째와 반씩 나눔
      let x = gx + d * cw + 8, w = cw - 16;
      if ((i === 3 || i === 4) && t >= 2 + 4 * 0.5) { const sp = io(prog(t, 4, 4.4)); w = lerp(cw - 16, (cw - 24) / 2, sp); if (i === 4) x += lerp(0, (cw - 24) / 2 + 8, sp); }
      // 6마디: 블록 하나를 끌어 옮김
      let yOff = 0, xOff = 0;
      if (i === 6) { const dr = io(prog(t, 10.2, 11.4)); xOff = dr * cw * 2; }
      if (i === 8 && t > 10.6) yOff = io(prog(t, 10.6, 11.2)) * rh * 1.5;
      const y = gy + s * rh + 6 + yOff, h = len * rh - 12;
      const bx = lerp(x + xOff, btn[0], back), by = lerp(y, btn[1], back), bw = lerp(w, 20, back), bh = lerp(h * k, 20, back);
      if (back > 0.98) return;
      roundRect(c, bx, by, bw, Math.max(4, bh), 12); c.fillStyle = COL[col]; c.fill();
      if (back < 0.3 && bh > 50) T(c, ["회의", "리뷰", "디자인", "작업"][i % 4], bx + 18, by + 30, `600 22px ${KR}`, col === 1 ? "#141414" : "#fff");
    });
    roundRect(c, btn[0] - 120, btn[1] - 36, 240, 72, 36); c.fillStyle = "#141414"; c.fill();
    T(c, "자동 배치", btn[0], btn[1] + 2, `700 28px ${KR}`, "#fff", "center");
    const sv = prog(t, 12, 12.5) * (1 - prog(t, 14, 14.4));
    if (sv > 0) { c.save(); c.translate(W / 2, H - 70); c.scale(sv, sv); roundRect(c, -260, -40, 520, 80, 40); c.fillStyle = P; c.fill(); T(c, "이번 주 6시간 확보", 0, 2, `800 32px ${KR}`, "#fff", "center"); c.restore(); }
    const [mx, my] = path(t, [[0, W - 200, H - 120], [1.2, btn[0], btn[1] + 10], [1.8, btn[0], btn[1] + 10], [2.4, W - 200, H - 120], [9.6, W - 200, H - 120], [10.2, gx + cw + 100, gy + 5 * rh + 50], [11.4, gx + 3 * cw + 100, gy + 5 * rh + 50], [12, W - 200, H - 120], [16, W - 200, H - 120]]);
    cursor(c, mx, my, Math.max(press(t, 1.5), t > 10.2 && t < 11.4 ? 0.6 : 0));
  },
};

// ───────── #23 3x2 그리드에서 차례로 열리는 기능 카드 6장 (28초) ─────────
const F6 = ["캐릭터", "로고", "홈페이지", "앱 UI", "굿즈", "모션"];
const F6D = ["성격과 색이 분명한 오리지널 캐릭터", "심볼부터 사용 규칙까지 브랜드 로고", "기획부터 배포까지 반응형 홈페이지", "자주 쓰는 동선을 줄인 앱 화면", "캐릭터를 입힌 머그·키링·에코백", "코드로 만드는 3초 브랜드 모션"];
const icon6 = (c: CanvasRenderingContext2D, i: number, cx: number, cy: number, s: number, act: number, col: string) => {
  c.save(); c.translate(cx, cy); c.scale(s, s); c.strokeStyle = "#111"; c.fillStyle = "#111"; c.lineWidth = 6; c.lineCap = "round"; c.lineJoin = "round";
  if (i === 0) { c.beginPath(); c.arc(0, 0, 40, 0, 7); c.stroke(); c.beginPath(); c.arc(-14, -6, 5, 0, 7); c.arc(14, -6 - act * 0, 5, 0, 7); c.fill(); c.beginPath(); c.arc(0, 8, 14, 0.2, Math.PI - 0.2); c.stroke(); c.save(); c.rotate(Math.sin(act * Math.PI * 2) * 0.3); c.fillStyle = col; c.beginPath(); c.arc(0, -56, 10, 0, 7); c.fill(); c.restore(); }
  if (i === 1) { c.save(); c.rotate(act * Math.PI * 2 / 3); c.beginPath(); for (let k = 0; k < 6; k++) { const a = (k * Math.PI) / 3; c.lineTo(Math.cos(a) * 42, Math.sin(a) * 42); } c.closePath(); c.stroke(); c.restore(); c.fillStyle = col; c.beginPath(); c.arc(0, 0, 12, 0, 7); c.fill(); }
  if (i === 2) { roundRect(c, -48, -36, 96, 72, 8); c.stroke(); c.beginPath(); c.moveTo(-48, -18); c.lineTo(48, -18); c.stroke(); c.fillStyle = col; c.fillRect(-36, -6, 72 * act, 10); c.fillStyle = "#111"; c.fillRect(-36, 12, 40, 8); }
  if (i === 3) { roundRect(c, -28, -50, 56, 100, 12); c.stroke(); c.fillStyle = col; roundRect(c, -16, -30 + act * 30, 32, 20, 6); c.fill(); }
  if (i === 4) { roundRect(c, -34, -26, 56, 60, 8); c.stroke(); c.beginPath(); c.arc(28, 4, 14, -1.3, 1.3); c.stroke(); c.fillStyle = col; c.beginPath(); c.arc(-6, 4, 10 + act * 4, 0, 7); c.fill(); }
  if (i === 5) { c.beginPath(); c.moveTo(-40, 0); for (let k = 0; k <= 40; k++) { const x = -40 + k * 2; c.lineTo(x, Math.sin(k * 0.3 + act * 8) * 20); } c.stroke(); c.fillStyle = col; c.beginPath(); c.arc(-40 + act * 80, Math.sin(act * 12 + 0) * 20, 9, 0, 7); c.fill(); }
  c.restore();
};
export const featureGrid: S = {
  dur: 28,
  draw(c, t) {
    const OR = "#FF5A1F";
    c.fillStyle = "#F2F1EE"; c.fillRect(0, 0, W, H);
    const split = io(prog(t, 0.2, 1.8)) * (1 - io(prog(t, 26.2, 27.6)));
    const gw = 1080, gh = 680, gx = W / 2 - gw / 2, gy = 230, G = 24;
    const cwF = (gw - 2 * G) / 3, chF = (gh - G) / 2;
    T(c, "MI3 Studio가 만드는 것", W / 2, 130, `800 44px ${KR}`, "#111", "center");
    const active = t >= 2 && t < 26 ? Math.floor((t - 2) / 4) : -1;
    const at0 = 2 + active * 4;
    const ex = active >= 0 ? io(prog(t, at0 + 0.3, at0 + 0.9)) * (1 - io(prog(t, at0 + 3.2, at0 + 3.8))) : 0;
    for (let i = 0; i < 6; i++) {
      const col = i % 3, row = Math.floor(i / 3);
      let x = lerp(gx + gw / 2 - gh / 2, gx + col * (cwF + G), split), y = lerp(gy, gy + row * (chF + G), split);
      let w = lerp(gh / (split < 0.3 ? 1 : 3), cwF, split), h = lerp(gh / (split < 0.3 ? 1 : 2), chF, split);
      if (split < 0.02) { x = gx + gw / 2 - gh / 2; y = gy; w = gh; h = gh; }
      if (i === active) { x = lerp(x, 120, ex); y = lerp(y, 190, ex); w = lerp(w, W - 240, ex); h = lerp(h, H - 260, ex); }
      else if (ex > 0) { const dx = x + w / 2 - W / 2, dy = y + h / 2 - H / 2; x += dx * ex * 1.4; y += dy * ex * 1.4; }
      if (split < 0.02 && i > 0) continue;
      if (i !== active && ex > 0.55) continue;
      c.save(); c.shadowColor = "rgba(0,0,0,0.06)"; c.shadowBlur = 30; c.shadowOffsetY = 10;
      roundRect(c, x, y, w, h, 26); c.fillStyle = "#fff"; c.fill(); c.restore();
      if (split < 0.6) continue;
      const big = i === active ? ex : 0;
      const act = i === active ? prog(t, at0 + 0.9, at0 + 2.0) : 0;
      icon6(c, i, x + w / 2, y + h / 2 - lerp(30, 90, big), lerp(1, 2.2, big), act, OR);
      T(c, F6[i], x + w / 2, y + h - lerp(50, 150, big), `800 ${lerp(30, 56, big)}px ${KR}`, "#111", "center");
      if (big > 0.9) rise(c, F6D[i], x + w / 2, y + h - 80, prog(t, at0 + 1.6, at0 + 2.2), `500 34px ${KR}`, "#666", "center", 50);
    }
    if (active >= 0) {
      const ci = active, col = ci % 3, row = Math.floor(ci / 3);
      const tx = gx + col * (cwF + G) + cwF / 2 + 40, ty = gy + row * (chF + G) + chF / 2 + 40;
      const [mx, my] = path(t, [[at0 - 0.4, W - 200, H - 80], [at0 + 0.2, tx, ty], [at0 + 0.4, tx, ty], [at0 + 1.0, W - 200, H - 80], [at0 + 4, W - 200, H - 80]]);
      cursor(c, mx, my, press(t, at0 + 0.3));
    }
  },
};

// ───────── #25 끌어다 놓으면 링이 도는 업로드 (16초) ─────────
const FILES = [["Portfolio_2027.pdf", "8.8 MB", "#E5484D"], ["Resume_2027.pdf", "0.4 MB", "#2F6BFF"], ["motion-banner.jpg", "1.2 MB", "#19C37D"]];
export const uploadRing: S = {
  dur: 16,
  draw(c, t) {
    const B = "#2F6BFF";
    c.fillStyle = "#F4F2ED"; c.fillRect(0, 0, W, H);
    T(c, "MI3 Drive", 120, 100, `800 40px ${KR}`, "#111");
    const zx = W / 2 - 420, zy = 220, zw = 840, zh = 420;
    const hover = io(prog(t, 3.2, 3.7)) * (1 - io(prog(t, 4.0, 4.3)));
    const done = t > 12 ? io(prog(t, 14.2, 15.2)) : 0;
    c.save(); c.translate(W / 2, zy + zh / 2); c.scale(1 + hover * 0.03, 1 + hover * 0.03); c.translate(-W / 2, -(zy + zh / 2));
    roundRect(c, zx, zy, zw, zh, 32); c.fillStyle = hover > 0.3 ? "#EAF0FF" : "#fff"; c.fill();
    if (hover < 0.3) c.setLineDash([16, 12]); c.strokeStyle = hover > 0.3 ? B : "#BDB9B0"; c.lineWidth = 4; c.stroke(); c.setLineDash([]);
    c.restore();
    const dropped = t >= 4;
    if (!dropped || t > 15.4) T(c, "파일을 여기로 끌어다 놓으세요", W / 2, zy + zh / 2, `600 32px ${KR}`, "#999", "center");
    // 끌고 들어오는 파일
    const fileIcon = (x: number, y: number, col: string, s = 1) => { c.save(); c.translate(x, y); c.scale(s, s); roundRect(c, -40, -52, 80, 104, 12); c.fillStyle = "#fff"; c.fill(); c.strokeStyle = "#111"; c.lineWidth = 3; c.stroke(); c.fillStyle = col; c.fillRect(-26, 10, 52, 14); c.restore(); };
    const [mx, my] = path(t, [[0, W + 120, zy + 200], [2, W + 120, zy + 200], [3.6, W / 2 + 40, zy + zh / 2], [4.2, W / 2 + 40, zy + zh / 2], [5, W - 200, H - 80], [12.6, W - 200, H - 80], [13.2, W / 2 + 200, 760], [14, W / 2 + 200, 760], [14.6, W - 200, H - 80], [16, W - 200, H - 80]]);
    if (!dropped) FILES.forEach((f, i) => fileIcon(mx - 60 + i * 30, my + 20 + i * 10, f[2] as string, 1));
    // 링 → 체크 → 카드
    if (dropped && t < 15.4) FILES.forEach(([name, size, col], i) => {
      const rx = W / 2 + (i - 1) * 260, ry = zy + zh / 2;
      const speed = [1, 0.8, 1.15][i];
      const p = clamp(((t - 4.4) / 3.6) * speed);
      const card = io(prog(t, 10 + i * 0.2, 10.8 + i * 0.2)) * (1 - done);
      const cx = lerp(rx, W / 2, card), cy = lerp(ry, 720 + i * 100, card);
      if (card < 0.05) {
        const shrink = easeOutCubic(prog(t, 4, 4.4));
        c.strokeStyle = "#E4E1DA"; c.lineWidth = 14; c.beginPath(); c.arc(cx, cy, 70 * shrink, 0, 7); c.stroke();
        c.strokeStyle = B; c.lineCap = "round"; c.beginPath(); c.arc(cx, cy, 70 * shrink, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * p); c.stroke();
        if (p < 1 || t < 9) { c.fillStyle = "#111"; rollText(c, String(Math.max(0, Math.round(p * 100) - 1)).padStart(3, " "), String(Math.round(p * 100)).padStart(3, " "), cx - 50, cy + 14, 1, 38); }
        if (t > 9 && p >= 1) { c.fillStyle = B; c.beginPath(); c.arc(cx, cy, 70, 0, 7); c.fill(); tick(c, cx, cy, 60, prog(t, 9, 9.4), "#fff", 10); }
      } else {
        const w = lerp(140, 760, card), h = lerp(140, 84, card);
        roundRect(c, cx - w / 2, cy - h / 2, w, h, lerp(70, 20, card)); c.fillStyle = "#fff"; c.fill();
        if (card > 0.8) {
          c.fillStyle = col as string; roundRect(c, cx - w / 2 + 20, cy - 26, 52, 52, 10); c.fill();
          T(c, name as string, cx - w / 2 + 96, cy, `700 28px ${KR}`, "#111"); T(c, size as string, cx + w / 2 - 30, cy, `500 24px ${KR}`, "#999", "right");
          const hov = i === 0 && t > 13.0 && t < 14.2;
          if (hov) { roundRect(c, cx + w / 2 - 300, cy - 260, 280, 210, 18); c.fillStyle = "#111"; c.fill(); T(c, "미리보기", cx + w / 2 - 160, cy - 155, `700 28px ${KR}`, "#fff", "center"); }
        }
      }
    });
    if (!dropped || t > 4.2) cursor(c, mx, my, press(t, 4.0));
  },
};

// ───────── #27 한 대에서 세 대로 갈라지는 앱스토어 홍보 (20초) ─────────
const F3 = ["실전 게임", "연습 게임", "라운딩 기록"];
const phone = (c: CanvasRenderingContext2D, x: number, y: number, s: number, rot: number, kind: number, t: number) => {
  c.save(); c.translate(x, y); c.rotate(rot); c.scale(s, s);
  roundRect(c, -150, -300, 300, 600, 46); c.fillStyle = "#111"; c.fill();
  roundRect(c, -136, -286, 272, 572, 36); c.fillStyle = "#24282C"; c.fill();
  c.save(); roundRect(c, -136, -286, 272, 572, 36); c.clip();
  const L = "#2F6BFF";
  T(c, F3[kind], -110, -230, `800 28px ${KR}`, "#fff");
  if (kind === 0) { c.fillStyle = "#3E8F4A"; c.fillRect(-136, -180, 272, 300); const bx = -60 + ((t * 80) % 160); c.fillStyle = "#fff"; c.beginPath(); c.arc(bx, 40 - Math.sin(((t * 80) % 160) / 160 * Math.PI) * 140, 10, 0, 7); c.fill(); c.fillStyle = "#E5484D"; c.fillRect(90, -60, 4, 70); }
  if (kind === 1) { for (let i = 0; i < 5; i++) { const w = 60 + ((Math.sin(t * 2 + i) + 1) / 2) * 160; roundRect(c, -110, -150 + i * 70, w, 40, 12); c.fillStyle = i === 2 ? L : "#3A3F45"; c.fill(); } }
  if (kind === 2) { c.strokeStyle = L; c.lineWidth = 6; c.beginPath(); for (let i = 0; i < 9; i++) { const xx = -110 + i * 27, yy = 40 - Math.sin(i * 0.8 + t) * 60 - i * 8; i ? c.lineTo(xx, yy) : c.moveTo(xx, yy); } c.stroke(); T(c, "78타", -110, 180, `900 60px ${KR}`, "#fff"); }
  c.restore(); c.restore();
};
export const appStore: S = {
  dur: 20,
  draw(c, t) {
    c.fillStyle = "#E4E8E1"; c.fillRect(0, 0, W, H);
    const fan = io(prog(t, 2, 3.4)) * (1 - io(prog(t, 18.2, 19.6)));
    const focus = t >= 4 && t < 16 ? Math.floor((t - 4) / 4) : -1;
    const ft0 = 4 + focus * 4, fk = focus >= 0 ? io(prog(t, ft0, ft0 + 0.6)) * (1 - io(prog(t, ft0 + 3.4, ft0 + 4))) : 0;
    const row = io(prog(t, 16, 16.6)) * (1 - io(prog(t, 18.2, 19.0)));
    const order = [0, 2, 1].sort((a, b) => (a === focus ? 1 : 0) - (b === focus ? 1 : 0));
    order.forEach((i) => {
      let x = W / 2 + (i - 1) * 230 * fan, y = H / 2 + Math.abs(i - 1) * 30 * fan, s = 1 - Math.abs(i - 1) * 0.08 * fan, r = (i - 1) * 0.16 * fan;
      if (row > 0) { x = lerp(x, W / 2 + (i - 1) * 360, row); y = lerp(y, H / 2 + 40, row); r = lerp(r, 0, row); s = lerp(s, 0.9, row); }
      if (i === focus) { x = lerp(x, W / 2 - 400, fk); y = lerp(y, H / 2, fk); s = lerp(s, 1.4, fk); r = lerp(r, 0, fk); }
      else if (fk > 0) { const slot = i < focus || (focus === 0 && i === 1) ? 0 : 1; s = lerp(s, 0.55, fk); x = lerp(x, W - 250 + slot * 120, fk); y = lerp(y, H / 2 - 160 + slot * 330, fk); r = lerp(r, 0.08, fk); }
      phone(c, x, y, s, r, i, t);
    });
    if (focus >= 0) rise(c, F3[focus], W / 2 - 140, H / 2, prog(t, ft0 + 0.5, ft0 + 1.0) * (1 - prog(t, ft0 + 3.4, ft0 + 3.6)), `900 96px ${KR}`, "#111", "left", 110);
    if (row > 0.5) rise(c, "WIOTP", W / 2, 140, prog(t, 16.4, 16.9), `900 110px ${KR}`, "#111", "center", 120);
  },
};

// ───────── #33 경로를 따라 줄어드는 도착 시간 (16초) ─────────
const ROUTE: [number, number][] = [[260, 260], [480, 260], [480, 420], [760, 420], [760, 300], [1020, 300], [1020, 520], [1180, 520]];
export const delivery: S = {
  dur: 16,
  draw(c, t) {
    const TL = "#2AC1BC";
    const zoom = io(prog(t, 12.2, 13.0)) * (1 - io(prog(t, 14.0, 14.8)));
    const rewind = io(prog(t, 14.4, 15.8));
    c.save(); c.translate(W / 2, H / 2); c.scale(1 + zoom * 1.2, 1 + zoom * 1.2); c.translate(-lerp(W / 2, 1180, zoom), -lerp(H / 2, 520, zoom));
    c.fillStyle = "#F1EEE7"; c.fillRect(-200, -200, W + 400, H + 400);
    c.strokeStyle = "#E2DDD2"; c.lineWidth = 26;
    [[0, 260, W, 260], [0, 420, W, 420], [0, 520, W, 520], [480, 0, 480, 760], [760, 0, 760, 760], [1020, 0, 1020, 760], [200, 0, 200, 760]].forEach(([a, b, d, e]) => { c.beginPath(); c.moveTo(a, b); c.lineTo(d, e); c.stroke(); });
    // 경로 (한 획으로 그려짐)
    const segs = ROUTE.length - 1;
    const drawn = io(prog(t, 0.2, 1.8)) * (1 - rewind);
    const prog2 = t < 4 ? 0 : t < 12 ? (Math.floor((t - 4) * 2) / 16 + io(((t - 4) * 2) % 1) / 16) * 1.75 : 1;
    const travelled = clamp(prog2) * (1 - rewind);
    const at = (k: number) => { const f = k * segs, i = Math.min(segs - 1, Math.floor(f)), q = f - i; return [lerp(ROUTE[i][0], ROUTE[i + 1][0], q), lerp(ROUTE[i][1], ROUTE[i + 1][1], q)]; };
    const line = (from: number, to: number, col: string) => { c.strokeStyle = col; c.lineWidth = 10; c.lineCap = "round"; c.lineJoin = "round"; c.beginPath(); const n = 80; for (let i = 0; i <= n; i++) { const k = lerp(from, to, i / n); const [x, y] = at(k); i ? c.lineTo(x, y) : c.moveTo(x, y); } c.stroke(); };
    if (drawn > 0) line(0, drawn, "#141414");
    if (travelled > 0) line(0, travelled, TL);
    // 가게 · 집
    c.fillStyle = "#141414"; roundRect(c, 230, 230, 60, 60, 14); c.fill(); T(c, "가게", 260, 320, `700 22px ${KR}`, "#141414", "center");
    const arrived = t > 12 && t < 15;
    c.fillStyle = arrived ? TL : "#141414"; c.beginPath(); c.arc(1180, 520, 34, 0, 7); c.fill();
    if (arrived) tick(c, 1180, 520, 34, prog(t, 12.6, 13.0), "#fff", 6); else { c.fillStyle = "#fff"; c.beginPath(); c.moveTo(1162, 524); c.lineTo(1180, 506); c.lineTo(1198, 524); c.lineTo(1198, 538); c.lineTo(1162, 538); c.fill(); }
    if (t >= 4 && t < 12.2) { const [x, y] = at(travelled); c.fillStyle = TL; c.beginPath(); c.arc(x, y, 26, 0, 7); c.fill(); c.strokeStyle = "#fff"; c.lineWidth = 4; c.stroke(); }
    c.restore();
    // 아래 시트
    const sy = H - 300;
    roundRect(c, 80, sy, W - 160, 260, 36); c.fillStyle = "#fff"; c.fill();
    T(c, "오늘농사 · 개봉동 로컬푸드", 130, sy + 56, `700 28px ${KR}`, "#777");
    const mins = t < 4 ? 15 : t < 12 ? 15 - Math.floor((t - 4) * 1.75) : t < 15 ? 0 : 15;
    const prev = t < 4 || t >= 15 ? mins : Math.min(15, mins + 1);
    c.fillStyle = "#141414"; rollText(c, String(prev).padStart(2, "0"), String(mins).padStart(2, "0"), 130, sy + 150, t < 4 ? 1 : clamp((((t - 4) * 1.75) % 1) * 2), 92);
    T(c, t > 12 && t < 15 ? "도착했어요" : "분 후 도착", 260, sy + 140, `700 40px ${KR}`, "#141414");
    const st = t < 2 ? 0 : t < 4 ? 1 : t < 12 ? 2 : t < 15 ? 3 : 0;
    ["접수", "조리", "출발", "도착"].forEach((s, i) => {
      const x = W - 760 + i * 170;
      c.fillStyle = i <= st ? TL : "#E2DDD2"; c.beginPath(); c.arc(x, sy + 130, 16, 0, 7); c.fill();
      if (i < 3) { c.fillStyle = i < st ? TL : "#E2DDD2"; c.fillRect(x + 20, sy + 127, 130, 6); }
      T(c, s, x, sy + 180, `600 24px ${KR}`, i <= st ? "#141414" : "#AAA", "center");
    });
  },
};
