import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router";
import { ArrowLeft, ArrowUpRight, Check, Copy } from "lucide-react";
import { MotionCanvas } from "../components/motion/MotionCanvas";
import { motion100, MOTION100_URL, MOTION100_CREDIT, MOTION100_COMMON, Motion100Item } from "../data/motion100";
import { categories } from "../data/projects";

// 클로드 모션그래픽 한글 프롬프트 100 중 10개를 직접 만든 결과
const Card = ({ p, index }: { p: Motion100Item; index: number }) => {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`${p.prompt}\n\n${MOTION100_COMMON}`);
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
        <MotionCanvas id={p.id} />
        <div
          className={`absolute top-3 right-3 flex items-center gap-1.5 transition-opacity duration-300 ${
            open || copied ? "opacity-100" : "opacity-100 md:opacity-0 md:group-hover:opacity-100 md:focus-within:opacity-100"
          }`}
        >
          <button onClick={() => setOpen((v) => !v)} className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur text-white text-[10px] font-semibold hover:bg-black transition-colors">
            {open ? "접기" : "프롬프트"}
          </button>
          <button onClick={copy} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/85 backdrop-blur text-black text-[10px] font-semibold hover:bg-white transition-colors">
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
        <p className="text-sm text-gray-500 leading-relaxed break-keep mt-1">{p.desc}</p>
        <p className="text-xs text-gray-400 mt-1 break-keep">넣은 이름 · {p.filled}</p>
        {open && (
          <pre className="mt-3 p-4 bg-zinc-50 border border-zinc-200 text-[11px] leading-relaxed text-gray-600 whitespace-pre-wrap break-keep font-sans max-h-[360px] overflow-auto">
            {p.prompt}
          </pre>
        )}
      </div>
    </motion.article>
  );
};

export const Motion100 = () => {
  const [showCommon, setShowCommon] = useState(false);
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
      <Link to="/motion-prompt" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 hover:text-[#05D920] transition-colors mb-6">
        <ArrowLeft size={12} /> Motion Prompt
      </Link>
      <div className="border-b-2 border-black pb-10 mb-10">
        <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#05D920] mb-4">Motion 100 · Pick 10</div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9]">
            MOTION
            <br />
            100
          </h1>
          <div className="max-w-md">
            <p className="text-base md:text-lg text-zinc-500 leading-relaxed break-keep">
              「클로드 모션그래픽 한글 프롬프트 100」에서 11개를 골라 프롬프트대로 직접 만들어 본 결과예요. [이름] 칸은 포트폴리오에 있는 작업 이름으로 채웠어요.
            </p>
            <a href={MOTION100_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 mt-4 text-xs font-bold hover:text-[#05D920] transition-colors">
              출처 · {MOTION100_CREDIT} <ArrowUpRight size={12} />
            </a>
          </div>
        </div>
      </div>

      {/* 분류 탭 */}
      <div className="flex flex-wrap gap-2 mb-10">
        {categories.map((c) => (
          <Link key={c.slug} to={`/works/${c.slug}`} className="px-5 py-2.5 text-[13px] md:text-sm font-bold border transition-colors border-zinc-300 text-gray-600 hover:border-black hover:text-black">
            {c.category}
          </Link>
        ))}
        <Link to="/motion-prompt" className="px-5 py-2.5 text-[13px] md:text-sm font-bold border transition-colors border-zinc-300 text-gray-600 hover:border-black hover:text-black">
          모션 프롬프트
        </Link>
        <span className="px-5 py-2.5 text-[13px] md:text-sm font-bold border bg-black text-white border-black">모션 100</span>
      </div>

      {/* 공통 블록 */}
      <div className="bg-zinc-50 p-6 md:p-8 mb-12">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400 mb-2">모든 프롬프트 뒤에 붙이는 공통 블록</div>
            <p className="text-sm text-gray-600 break-keep">복사 버튼을 누르면 프롬프트 뒤에 이 블록이 함께 복사돼요.</p>
          </div>
          <button onClick={() => setShowCommon((v) => !v)} className="shrink-0 px-3 py-1.5 rounded-full border border-zinc-300 text-[11px] font-semibold hover:border-black transition-colors">
            {showCommon ? "접기" : "보기"}
          </button>
        </div>
        {showCommon && <pre className="mt-4 text-[11px] leading-relaxed text-gray-600 whitespace-pre-wrap break-keep font-sans">{MOTION100_COMMON}</pre>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 items-start">
        {motion100.map((p, i) => (
          <Card key={p.id} p={p} index={i} />
        ))}
      </div>
    </motion.div>
  );
};
