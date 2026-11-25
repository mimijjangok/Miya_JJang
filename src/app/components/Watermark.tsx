import React from "react";

// 연한 "MI3___LEE" 반복 워터마크 (클릭·스크롤 방해 없음)
const svg = (size: number) =>
  `url("data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size * 0.6}'><text x='50%' y='50%' text-anchor='middle' dominant-baseline='middle' transform='rotate(-24 ${size / 2} ${size * 0.3})' font-family='Arial, sans-serif' font-size='${Math.round(size / 11)}' font-weight='700' letter-spacing='2' fill='rgb(128,128,128)'>MI3___LEE</text></svg>`
  )}")`;

export const Watermark = ({ size = 220, opacity = 0.22 }: { size?: number; opacity?: number }) => (
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 z-10 select-none"
    style={{ backgroundImage: svg(size), backgroundRepeat: "repeat", opacity }}
  />
);
