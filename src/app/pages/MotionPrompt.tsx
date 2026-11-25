import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router";
import { ArrowLeft, Check, ChevronDown, Copy, Download } from "lucide-react";
import { motionPrep, motionPrompts, motionTips } from "../data/motionPrompts";

// 클로드 모션 프롬프트 12종: 카드마다 펼쳐 보기 + 복사 버튼
const PromptCard = ({ p, index }: { p: (typeof motionPrompts)[number]; index: number }) => {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(p.prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setOpen(true);
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.06 }}
      className="border-2 border-black flex flex-col bg-white"
    >
      <div className="p-6 md:p-8 flex-1">
        <div className="flex items-center justify-between mb-6">
          <span className="text-[11px] font-mono text-[#05D920] tracking-widest">{p.no}</span>
          {p.en && <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400">{p.en}</span>}
        </div>
        <h3 className="text-2xl md:text-3xl font-black tracking-tighter mb-3">{p.title}</h3>
        <p className="text-sm text-gray-500 leading-relaxed break-keep">{p.subtitle}</p>
      </div>

      {open && (
        <pre className="mx-6 md:mx-8 mb-6 p-4 bg-zinc-50 border border-zinc-200 text-xs leading-relaxed text-gray-700 whitespace-pre-wrap break-keep font-sans max-h-[420px] overflow-auto">
          {p.prompt}
        </pre>
      )}

      <div className="grid grid-cols-2 border-t-2 border-black">
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex items-center justify-center gap-2 py-4 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-zinc-100 transition-colors"
        >
          {open ? "접기" : "프롬프트 보기"}
          <ChevronDown size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
        <button
          onClick={copy}
          className="flex items-center justify-center gap-2 py-4 text-[11px] font-bold uppercase tracking-[0.2em] border-l-2 border-black bg-black text-white hover:bg-[#05D920] hover:text-black transition-colors"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? "복사됨" : "복사"}
        </button>
      </div>
    </motion.article>
  );
};

export const MotionPrompt = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="pt-28 pb-20 px-6 md:px-12 max-w-7xl mx-auto text-black"
    >
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 hover:text-[#05D920] transition-colors mb-6"
      >
        <ArrowLeft size={12} /> Home
      </Link>

      {/* 제목 */}
      <div className="border-b-2 border-black pb-10 mb-12">
        <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#05D920] mb-4">
          Claude Motion Prompt · 12 Styles
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9]">
            MOTION
            <br />
            PROMPT
          </h1>
          <p className="text-base md:text-lg text-zinc-500 max-w-md leading-relaxed break-keep">
            Claude Code에 붙여 넣기만 하면 3초 모션 영상(mp4)이 완성되는 스타일별 프롬프트 12종입니다. 외부 AI 영상 서비스 없이
            HTML·CSS·JavaScript로 만들고 HyperFrames로 렌더해요.
          </p>
        </div>
      </div>

      {/* 준비물 · 바꿔 쓰기 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        <div className="bg-zinc-50 p-6 md:p-8">
          <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400 mb-4">준비물</div>
          <ul className="space-y-3">
            {motionPrep.map((t, i) => (
              <li key={t} className="grid grid-cols-[28px_1fr] gap-2 text-sm md:text-base">
                <span className="text-xs font-mono text-[#05D920] pt-1">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-medium break-keep">{t}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-black text-white p-6 md:p-8">
          <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#05D920] mb-2">자유롭게 바꿔 쓰세요</div>
          <p className="text-sm text-zinc-400 mb-4 break-keep">프롬프트 첫 문단에 규격이 들어 있어요. 그 숫자와 단어만 바꾸면 돼요.</p>
          <dl className="space-y-2">
            {motionTips.map((t) => (
              <div key={t.label} className="grid grid-cols-[48px_1fr] gap-3 text-sm">
                <dt className="font-bold">{t.label}</dt>
                <dd className="text-zinc-300 break-keep">{t.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* 프롬프트 12종 */}
      <div className="flex items-center justify-between mb-6">
        <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Total {String(motionPrompts.length).padStart(2, "0")}</div>
        <a
          href="/motion-prompt.pdf"
          download
          className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] hover:text-[#05D920] transition-colors"
        >
          <Download size={12} /> PDF 다운로드
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
        {motionPrompts.map((p, i) => (
          <PromptCard key={p.no} p={p} index={i} />
        ))}
      </div>
    </motion.div>
  );
};
