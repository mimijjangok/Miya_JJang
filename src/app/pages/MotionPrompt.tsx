import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router";
import { ArrowLeft, Check, Copy, Download } from "lucide-react";
import { MotionCanvas } from "../components/motion/MotionCanvas";
import { motionPrep, motionPrompts, motionTips } from "../data/motionPrompts";
import { categories } from "../data/projects";

// 클로드 모션 프롬프트 12종: 프롬프트대로 만든 모션을 위에서 재생, 아래에 아주 작은 보기·복사
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
      className="group flex flex-col"
    >
      <div className="relative">
        <MotionCanvas id={p.no} />
        <div
          className={`absolute top-3 right-3 flex items-center gap-1.5 transition-opacity duration-300 ${
            open || copied ? "opacity-100" : "opacity-100 md:opacity-0 md:group-hover:opacity-100 md:focus-within:opacity-100"
          }`}
        >
          <button
            onClick={() => setOpen((v) => !v)}
            className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur text-white text-[10px] font-semibold hover:bg-black transition-colors"
          >
            {open ? "접기" : "프롬프트"}
          </button>
          <button
            onClick={copy}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/85 backdrop-blur text-black text-[10px] font-semibold hover:bg-white transition-colors"
          >
            {copied ? <Check size={10} /> : <Copy size={10} />}
            {copied ? "복사됨" : "복사"}
          </button>
        </div>
      </div>
      <div className="pt-4">
        <div className="flex items-baseline gap-3 min-w-0">
          <span className="text-[10px] font-mono text-[#05D920] tracking-widest shrink-0">{p.no}</span>
          <h3 className="text-lg md:text-xl font-bold tracking-tight truncate">{p.title}</h3>
        </div>
        <p className="text-sm text-gray-500 leading-relaxed break-keep mt-1">{p.subtitle}</p>
        {open && (
          <pre className="mt-3 p-4 bg-zinc-50 border border-zinc-200 text-[11px] leading-relaxed text-gray-600 whitespace-pre-wrap break-keep font-sans max-h-[360px] overflow-auto">
            {p.prompt}
          </pre>
        )}
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
            스타일별 프롬프트 12종과, 각 프롬프트대로 만든 모션입니다. 외부 AI 영상 서비스 없이 코드만으로 그렸어요. 프롬프트를 Claude Code에 붙여 넣으면 같은 모션을 mp4로 만들 수 있어요.
          </p>
        </div>
      </div>

      {/* 분류 탭 */}
      <div className="flex flex-wrap gap-2 mb-10 -mt-2">
        {categories.map((c) => (
          <Link
            key={c.slug}
            to={`/works/${c.slug}`}
            className="px-5 py-2.5 text-[13px] md:text-sm font-bold border transition-colors border-zinc-300 text-gray-600 hover:border-black hover:text-black"
          >
            {c.category}
          </Link>
        ))}
        <span className="px-5 py-2.5 text-[13px] md:text-sm font-bold border bg-black text-white border-black">모션 프롬프트</span>
        <Link to="/motion-100" className="px-5 py-2.5 text-[13px] md:text-sm font-bold border transition-colors border-zinc-300 text-gray-600 hover:border-black hover:text-black">
          모션 100
        </Link>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 items-start">
        {motionPrompts.map((p, i) => (
          <PromptCard key={p.no} p={p} index={i} />
        ))}
      </div>
    </motion.div>
  );
};
