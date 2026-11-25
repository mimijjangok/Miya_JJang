import React, { useEffect } from "react";
import { motion } from "motion/react";
import { Link, Navigate, useParams } from "react-router";
import { ArrowLeft, ArrowRight, ArrowUpRight, Download } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { projects, projectDetails, getProjectBySlug } from "../data/projects";

// 프로젝트 상세 페이지 (/works/:slug)
// GDWEB 선정작 페이지처럼: 위 제목·주소 / 왼쪽 큰 작업 이미지 / 오른쪽 고정 정보 패널
export const ProjectDetail = () => {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) return <Navigate to="/works" replace />;

  const detail = projectDetails[project.title];
  const info = detail.info || {};
  const idx = projects.findIndex((p) => p.slug === project.slug);
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];
  const nextThumb = projectDetails[next.title]?.thumb || next.image;
  const hasCases = !!detail.cases && detail.cases.length > 0;

  const rows: { label: string; value?: string }[] = [
    { label: "Category", value: project.category },
    { label: "Client", value: info.client },
    { label: "Year", value: info.year },
    { label: "Role", value: info.role },
    { label: "Target", value: info.target },
    { label: "Expression", value: info.expression },
    { label: "Tools", value: info.tools },
  ];

  return (
    <motion.div
      key={project.slug}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="pt-28 pb-20 px-6 md:px-12 max-w-7xl mx-auto text-black"
    >
      {/* 상단 제목 바 */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-2 border-black pb-6 mb-10">
        <div>
          <Link
            to="/works"
            className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 hover:text-[#05D920] transition-colors mb-4"
          >
            <ArrowLeft size={12} />
            Project Archive
          </Link>
          <div className="text-[11px] font-mono uppercase tracking-widest text-[#05D920] mb-2">
            {detail.subtitle}
          </div>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">
            {project.title}
          </h1>
        </div>
        {detail.link && (
          <a
            href={detail.link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-mono hover:text-[#05D920] transition-colors"
          >
            {detail.link.label}
            <span className="text-xs font-sans font-bold">(사이트 바로가기)</span>
            <ArrowUpRight size={14} />
          </a>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-10 lg:gap-14">
        {/* 왼쪽: 작업 이미지 */}
        <div className="min-w-0 space-y-6">
          {hasCases ? (
            detail.cases!.map((c, cIdx) => (
              <div key={cIdx} className="space-y-6 pb-10 border-b border-zinc-200 last:border-0 last:pb-0">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-1">
                  <h2 className="text-xl md:text-2xl font-black tracking-tighter">{c.name}</h2>
                  {c.desc && <p className="text-sm text-gray-500">{c.desc}</p>}
                </div>
                {c.layout === "pc-mobile" ? (
                  <div className="grid grid-cols-1 md:grid-cols-[minmax(0,3fr)_minmax(0,1fr)] gap-4 items-start">
                    {c.images.map((img, iIdx) => (
                      <div key={iIdx}>
                        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">
                          {iIdx === 0 ? "PC" : "Mobile"}
                        </div>
                        <div className="bg-zinc-50 border border-zinc-200 overflow-hidden">
                          <img src={img.src} alt={img.alt} loading="lazy" className="w-full h-auto block" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  c.images.map((img, iIdx) => (
                    <div key={iIdx} className="bg-zinc-50 border border-zinc-200 overflow-hidden">
                      <img src={img.src} alt={img.alt} loading="lazy" className="w-full h-auto block" />
                    </div>
                  ))
                )}
              </div>
            ))
          ) : (
            <>
              <div className="w-full aspect-[16/10] bg-black overflow-hidden">
                <ImageWithFallback src={project.image} alt={project.title} className="w-full h-full object-cover" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {detail.banners.map((banner, bIdx) => (
                  <div key={bIdx} className="bg-zinc-50 border border-zinc-200 p-4">
                    <div className={`w-full h-44 ${banner.bg} mb-4 relative flex flex-col justify-between p-5`}>
                      <div className="absolute top-3 left-3 bg-white text-black text-[10px] font-mono px-2 py-0.5 font-bold">
                        0{bIdx + 1}
                      </div>
                      <div className="text-white text-4xl font-black tracking-tighter mt-6">{banner.number}</div>
                      <div className="text-white text-xl font-bold tracking-widest">{banner.text}</div>
                    </div>
                    <h4 className="font-bold text-sm mb-1 uppercase tracking-tight">{banner.title}</h4>
                    <p className="text-xs text-gray-600 leading-relaxed">{banner.desc}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* 오른쪽: 고정 정보 패널 */}
        <aside className="lg:sticky lg:top-28 self-start">
          <div className="border-t-2 border-black">
            <div className="py-5 border-b border-zinc-200">
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">Design Concept</div>
              <p className="text-sm font-bold leading-relaxed">
                {info.concept || detail.description}
              </p>
            </div>

            <dl>
              {rows
                .filter((r) => r.value)
                .map((r) => (
                  <div key={r.label} className="grid grid-cols-[96px_1fr] gap-3 py-3 border-b border-zinc-200 text-sm">
                    <dt className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 pt-0.5">{r.label}</dt>
                    <dd className="font-medium">{r.value}</dd>
                  </div>
                ))}
            </dl>

            {info.colors && info.colors.length > 0 && (
              <div className="py-4 border-b border-zinc-200">
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3">Main Color</div>
                <div className="flex flex-wrap gap-3">
                  {info.colors.map((c) => (
                    <div key={c.hex} className="flex items-center gap-2">
                      <span className="w-6 h-6 border border-zinc-300" style={{ background: c.hex }} />
                      <span className="text-[11px] font-mono">{c.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 space-y-2">
            {detail.link && (
              <a
                href={detail.link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-black text-white py-4 text-[11px] font-black uppercase tracking-[0.2em] hover:bg-[#05D920] hover:text-black transition-colors"
              >
                Visit Website <ArrowUpRight size={14} />
              </a>
            )}
            <a
              href="/portfolio.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full border border-black py-4 text-[11px] font-black uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-colors"
            >
              <Download size={12} /> Portfolio PDF
            </a>
          </div>
        </aside>
      </div>

      {/* 개요 / 과제 / 해결 */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-10 border-t-2 border-black pt-10">
        <div>
          <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-[#05D920] mb-3">Overview</h3>
          <p className="text-sm text-gray-700 leading-relaxed">{detail.description}</p>
        </div>
        <div>
          <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-[#05D920] mb-3">01 / Challenge</h3>
          <p className="text-sm text-gray-700 leading-relaxed">{detail.challenge}</p>
        </div>
        <div>
          <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-[#05D920] mb-3">02 / Solution</h3>
          <p className="text-sm text-gray-700 leading-relaxed">{detail.solution}</p>
        </div>
      </div>

      {/* 다음 프로젝트 (크게) */}
      <Link to={`/works/${next.slug}`} className="group block mt-20 relative overflow-hidden bg-black aspect-[21/9]">
        <ImageWithFallback
          src={nextThumb}
          alt={next.title}
          className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
        />
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
          <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#05D920] mb-3">
            Next Project <ArrowRight size={12} />
          </span>
          <span className="text-3xl md:text-6xl font-black uppercase tracking-tighter text-white">{next.title}</span>
        </div>
      </Link>

      <div className="mt-6 flex justify-between text-[10px] font-black uppercase tracking-[0.2em]">
        <Link to={`/works/${prev.slug}`} className="flex items-center gap-2 hover:text-[#05D920] transition-colors">
          <ArrowLeft size={12} /> {prev.title}
        </Link>
        <Link to="/contact" className="hover:text-[#05D920] transition-colors">
          Start a Project →
        </Link>
      </div>
    </motion.div>
  );
};
