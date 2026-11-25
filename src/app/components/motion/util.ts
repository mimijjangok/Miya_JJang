// 모션 프롬프트 캔버스 공통 도구
export const W = 1440;
export const H = 1080;
export const DUR = 3;

export const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x));
export const prog = (t: number, a: number, b: number) => clamp((t - a) / (b - a));
export const lerp = (a: number, b: number, k: number) => a + (b - a) * k;
export const easeOutBack = (x: number, s = 1.70158) => {
  const c = s + 1;
  return 1 + c * Math.pow(x - 1, 3) + s * Math.pow(x - 1, 2);
};
export const easeOutExpo = (x: number) => (x >= 1 ? 1 : 1 - Math.pow(2, -10 * x));
export const easeInOut3 = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
export const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3);
export const easeInCubic = (x: number) => x * x * x;
export const easeOutElastic = (x: number) =>
  x <= 0 ? 0 : x >= 1 ? 1 : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * ((2 * Math.PI) / 3)) + 1;
// 통통 튀며 떨어지는 바운스
export const easeOutBounce = (x: number) => {
  const n = 7.5625, d = 2.75;
  if (x < 1 / d) return n * x * x;
  if (x < 2 / d) return n * (x -= 1.5 / d) * x + 0.75;
  if (x < 2.5 / d) return n * (x -= 2.25 / d) * x + 0.9375;
  return n * (x -= 2.625 / d) * x + 0.984375;
};

// 시드 고정 난수
export const hash = (n: number) => {
  const s = Math.sin(n * 127.1 + 311.7) * 43758.5453123;
  return s - Math.floor(s);
};
export const rng = (seed: number) => {
  let a = seed >>> 0;
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

const hexToRgb = (h: string) => {
  const v = parseInt(h.slice(1), 16);
  return [(v >> 16) & 255, (v >> 8) & 255, v & 255];
};
export const mix = (a: string, b: string, k: number) => {
  const A = hexToRgb(a), B = hexToRgb(b);
  const c = A.map((x, i) => Math.round(lerp(x, B[i], clamp(k))));
  return `rgb(${c[0]},${c[1]},${c[2]})`;
};
export const mixRgb = (a: string, b: string, k: number) => {
  const A = hexToRgb(a), B = hexToRgb(b);
  return A.map((x, i) => Math.round(lerp(x, B[i], clamp(k))));
};
// 여러 색 사이를 차례로
export const mixSteps = (cols: string[], k: number) => {
  const n = cols.length - 1;
  const x = clamp(k) * n;
  const i = Math.min(n - 1, Math.floor(x));
  return mix(cols[i], cols[i + 1], x - i);
};

export const KR = `'Pretendard', 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif`;
export const ARCHIVO = `'Archivo Black', 'Arial Black', 'Pretendard', sans-serif`;

export const roundRect = (c: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) => {
  c.beginPath();
  c.moveTo(x + r, y);
  c.arcTo(x + w, y, x + w, y + h, r);
  c.arcTo(x + w, y + h, x, y + h, r);
  c.arcTo(x, y + h, x, y, r);
  c.arcTo(x, y, x + w, y, r);
  c.closePath();
};

// 화면 크기의 보조 캔버스
export const makeCanvas = (w: number, h: number) => {
  const cv = document.createElement("canvas");
  cv.width = w; cv.height = h;
  return cv;
};

export interface Scene {
  // 매 프레임: t(0~3초)만으로 그림 → 몇 번을 그려도 같은 결과
  draw: (c: CanvasRenderingContext2D, t: number, st: any) => void;
  init?: () => any;
  dur?: number; // 기본 3초
}
