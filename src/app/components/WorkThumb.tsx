import React from "react";
import type { Work } from "../data/projects";

// 목록 썸네일: thumbCard가 있으면 로고 또는 작업 이름 글자로, 없으면 thumb 이미지로 표시
export const WorkThumb = ({ work, className = "" }: { work: Work; className?: string }) => {
  const c = work.thumbCard;
  if (!c) {
    return (
      <img
        src={work.thumb}
        alt={work.name}
        loading="lazy"
        className={`w-full h-full object-cover object-left-top ${className}`}
      />
    );
  }
  return (
    <div
      className={`w-full h-full flex flex-col items-center justify-center text-center px-6 ${c.border ? "border border-zinc-200" : ""} ${className}`}
      style={{ background: c.bg, color: c.color ?? "#111111" }}
    >
      {c.logo ? (
        <img src={c.logo} alt={work.name} loading="lazy" className={c.sub ? "max-w-[80%] max-h-[66%] object-contain" : "max-w-[62%] max-h-[42%] object-contain"} />
      ) : (
        <div className="text-2xl md:text-4xl font-black tracking-tighter leading-tight break-keep">{c.text}</div>
      )}
      {c.sub && <div className={c.logo ? "mt-2 md:mt-3 text-sm md:text-lg font-bold opacity-80" : "mt-2 md:mt-3 text-[10px] md:text-xs font-bold opacity-70"}>{c.sub}</div>}
    </div>
  );
};
