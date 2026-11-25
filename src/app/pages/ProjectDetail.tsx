import React, { useEffect } from "react";
import { motion } from "motion/react";
import { Link, Navigate, useParams } from "react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { projects, projectDetails, getProjectBySlug } from "../data/projects";

// 프로젝트 상세 페이지 (/works/:slug) — 예전 팝업 내용을 한 페이지로 보여 줍니다.
export const ProjectDetail = () => {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) return <Navigate to="/works" replace />;

  const detail = projectDetails[project.title];
  const idx = projects.findIndex((p) => p.slug === project.slug);
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];

  return (
    <motion.div
      key={project.slug}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto text-black"
    >
      {/* 목록으로 */}
      <Link
        to="/works"
        className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] hover:text-[#05D920] transition-colors mb-12"
      >
        <ArrowLeft size={14} />
        All Works
      </Link>

      {/* 제목 영역 */}
      <div className="border-b-2 border-black pb-12 mb-12">
        <span className="text-xs font-mono tracking-widest text-[#05D920] uppercase block mb-3">
          {project.category}
        </span>
        <div className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-3">
          {detail.subtitle}
        </div>
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6">
          {project.title}
        </h1>
        <p className="text-base md:text-xl text-gray-700 leading-relaxed max-w-3xl">
          {detail.description}
        </p>
      </div>

      {/* 대표 이미지 */}
      <div className="w-full aspect-[16/9] bg-black overflow-hidden mb-16">
        <ImageWithFallback
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* 배너 3개 */}
      <div className="mb-16">
        <h3 className="text-sm font-mono tracking-widest uppercase text-gray-500 mb-6 border-b border-gray-200 pb-2">
          Featured Key Visuals & Examples (3 Cases)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {detail.banners.map((banner, bIdx) => (
            <div key={bIdx} className="bg-zinc-50 border border-zinc-200 p-4 flex flex-col justify-between">
              <div className={`w-full h-64 ${banner.bg} mb-4 overflow-hidden relative flex flex-col justify-between p-6`}>
                <div className="absolute top-3 left-3 bg-white text-black text-[10px] font-mono px-2 py-0.5 font-bold">
                  0{bIdx + 1}
                </div>
                <div className="text-white text-5xl font-black tracking-tighter mt-6">{banner.number}</div>
                <div className="text-white text-2xl font-bold tracking-widest">{banner.text}</div>
              </div>
              <div>
                <h4 className="font-bold text-base mb-1 uppercase tracking-tight">{banner.title}</h4>
                <p className="text-xs text-gray-600 leading-relaxed">{banner.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Challenge & Solution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 bg-zinc-50 p-8 border border-zinc-200">
        <div>
          <h3 className="text-lg font-bold mb-2 uppercase text-[#05D920]">01 / Challenge</h3>
          <p className="text-sm text-gray-700 leading-relaxed">{detail.challenge}</p>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-2 uppercase text-[#05D920]">02 / Solution</h3>
          <p className="text-sm text-gray-700 leading-relaxed">{detail.solution}</p>
        </div>
      </div>

      {/* 이전 / 다음 프로젝트 */}
      <div className="border-t-2 border-black pt-8 grid grid-cols-2 gap-6">
        <Link to={`/works/${prev.slug}`} className="group">
          <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-2">
            <ArrowLeft size={12} /> Prev
          </span>
          <span className="block text-lg md:text-2xl font-black uppercase tracking-tighter group-hover:text-[#05D920] transition-colors">
            {prev.title}
          </span>
        </Link>
        <Link to={`/works/${next.slug}`} className="group text-right">
          <span className="flex items-center justify-end gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-2">
            Next <ArrowRight size={12} />
          </span>
          <span className="block text-lg md:text-2xl font-black uppercase tracking-tighter group-hover:text-[#05D920] transition-colors">
            {next.title}
          </span>
        </Link>
      </div>
    </motion.div>
  );
};
