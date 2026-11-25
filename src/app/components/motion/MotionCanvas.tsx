import React, { useEffect, useRef } from "react";
import { W, H, DUR, Scene } from "./util";
import { popArt, flat2d, glass, y2k } from "./scenes1";
import { synthwave, collage, glitch, particles } from "./scenes2";
import { vaporwave, isometric, lowpoly, lineart } from "./scenes3";
import { pricing } from "./scenes4";
import { tilePuzzle, countdown, morphDash, searchDemo, todoList, checkout, beforeAfter, themeSwitch, fitnessRing, donutBudget } from "./scenes5";

// No.01 ~ No.12 순서
export const SCENES: Record<string, Scene> = {
  "No.01": popArt, "No.02": flat2d, "No.03": glass, "No.04": y2k,
  "No.05": synthwave, "No.06": collage, "No.07": glitch, "No.08": particles,
  "No.09": vaporwave, "No.10": isometric, "No.11": lowpoly, "No.12": lineart,
  "J.10": pricing,
  "J.03": tilePuzzle, "J.05": countdown, "J.11": morphDash, "J.13": searchDemo, "J.14": todoList,
  "J.18": checkout, "J.19": beforeAfter, "J.24": themeSwitch, "J.31": fitnessRing, "J.32": donutBudget,
};

// 3초 모션을 계속 반복 재생 (화면에 보일 때만 그림)
export const MotionCanvas = ({ id, className = "" }: { id: string; className?: string }) => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current; const scene = SCENES[id];
    if (!cv || !scene) return;
    const ctx = cv.getContext("2d"); if (!ctx) return;
    let st: any = null;
    try { st = scene.init ? scene.init() : null; } catch { st = null; }
    let raf = 0, visible = false, start = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.round(cv.clientWidth * dpr));
      cv.width = w; cv.height = Math.round((w * H) / W);
    };
    resize();
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (!visible) return;
      const t = (((now - start) / 1000) % (scene.dur ?? DUR));
      ctx.setTransform(cv.width / W, 0, 0, cv.height / H, 0, 0);
      ctx.globalAlpha = 1; ctx.globalCompositeOperation = "source-over"; ctx.filter = "none";
      try { scene.draw(ctx, t, st); } catch { /* 한 프레임 실패는 건너뜀 */ }
    };
    const io = new IntersectionObserver(([e]) => {
      const was = visible; visible = e.isIntersecting;
      if (visible && !was) start = performance.now();
    }, { rootMargin: "100px" });
    io.observe(cv);
    const ro = new ResizeObserver(resize); ro.observe(cv);
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); io.disconnect(); ro.disconnect(); };
  }, [id]);

  return <canvas ref={ref} className={`block w-full aspect-[4/3] bg-black ${className}`} />;
};
