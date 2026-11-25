import React, { useEffect } from "react";
import { motion } from "motion/react";
import { Link, Navigate, useParams } from "react-router";
import { ArrowLeft, ArrowRight, ArrowUpRight, Download } from "lucide-react";
import { getCategory, getWork, getWorksByCategory } from "../data/projects";
import { GoestBrandSheet } from "../components/GoestBrandSheet";

// 3단계: 작업 상세 페이지 (/works/:cat/:item)
// GDWEB 선정작 페이지처럼: 위 제목·주소 / 왼쪽 큰 작업 이미지 / 오른쪽 고정 정보 패널
export const WorkDetail = () => {
  const { cat, item } = useParams();
  const category = getCategory(cat);
  const work = getWork(cat, item);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [cat, item]);

  if (!category) return <Navigate to="/works" replace />;
  if (!work) return <Navigate to={`/works/${category.slug}`} replace />;

  const info = work.info || {};
  const siblings = getWorksByCategory(category.slug);
  const idx = siblings.findIndex((w) => w.slug === work.slug);
  const next = siblings.length > 1 ? siblings[(idx + 1) % siblings.length] : undefined;
  const prev = siblings.length > 1 ? siblings[(idx - 1 + siblings.length) % siblings.length] : undefined;

  const rows: { label: string; value?: string }[] = [
    { label: "Category", value: category.category },
    { label: "Client", value: info.client },
    { label: "Year", value: info.year },
    { label: "Role", value: info.role },
    { label: "Target", value: info.target },
    { label: "Expression", value: info.expression },
    { label: "Tools", value: info.tools },
  ];

  const overview = work.overview || category.description;
  const challenge = work.challenge || category.challenge;
  const solution = work.solution || category.solution;

  return (
    <motion.div
      key={work.slug}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="pt-28 pb-20 px-6 md:px-12 max-w-7xl mx-auto text-black"
    >
      {/* 상단 제목 바 */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-2 border-black pb-6 mb-10">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-4">
            <Link to="/works" className="hover:text-[#05D920] transition-colors">Works</Link>
            <span>/</span>
            <Link to={`/works/${category.slug}`} className="hover:text-[#05D920] transition-colors">
              {category.title}
            </Link>
          </div>
          <div className="text-[11px] font-mono uppercase tracking-widest text-[#05D920] mb-2">{category.category}</div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter leading-tight">{work.name}</h1>
          {work.desc && <p className="text-sm md:text-base text-gray-600 mt-3">{work.desc}</p>}
        </div>
        {work.link && (
          <a
            href={work.link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-mono hover:text-[#05D920] transition-colors"
          >
            {work.link.label}
            <span className="text-xs font-sans font-bold">(사이트 바로가기)</span>
            <ArrowUpRight size={14} />
          </a>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-10 lg:gap-14">
        {/* 왼쪽: 작업 이미지 */}
        <div className="min-w-0">
          {work.custom === "goest-brand" && <GoestBrandSheet />}

          {/* 고객사 소개 */}
          {work.about && (
            <div className="mt-10 border border-zinc-200 p-6 md:p-10">
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[#05D920] mb-2">{work.about.title}</div>
              <h3 className="text-xl md:text-2xl font-black tracking-tighter mb-5">{work.about.lead}</h3>
              <div className="space-y-3">
                {work.about.body.map((t, i) => (
                  <p key={i} className="text-sm text-gray-700 leading-relaxed">{t}</p>
                ))}
              </div>
              {work.about.facts && (
                <dl className="mt-8 border-t border-zinc-200">
                  {work.about.facts.map((f) => (
                    <div key={f.label} className="grid grid-cols-[96px_1fr] gap-3 py-3 border-b border-zinc-200 text-sm">
                      <dt className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 pt-0.5">{f.label}</dt>
                      <dd className="font-medium">{f.value}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>
          )}
          {work.layout === "pc-mobile" ? (
            <div className="grid grid-cols-1 md:grid-cols-[minmax(0,3fr)_minmax(0,1fr)] gap-4 items-start">
              {work.images.map((img, iIdx) => (
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
            <div className="space-y-6">
              {work.images.map((img, iIdx) => (
                <div key={iIdx} className="bg-zinc-50 border border-zinc-200 overflow-hidden">
                  <img src={img.src} alt={img.alt} loading="lazy" className="w-full h-auto block" />
                </div>
              ))}
            </div>
          )}

          {/* 추가 섹션 (PPT 등) — 작은 원본은 원래 크기 이상으로 늘리지 않음 */}
          {work.extras?.map((ex) => (
            <div key={ex.title} className="mt-10 border border-zinc-200 p-6 md:p-10">
              <h3 className="text-xl md:text-2xl font-black tracking-tighter">{ex.title}</h3>
              {ex.desc && <p className="text-sm text-gray-500 mt-1 mb-6">{ex.desc}</p>}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {ex.images.map((img) => (
                  <figure key={img.src} className="flex flex-col items-center">
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      className="block w-auto max-w-full h-auto border border-zinc-200 shadow-sm"
                    />
                    {img.caption && (
                      <figcaption className="mt-2 text-[11px] font-bold text-gray-500">{img.caption}</figcaption>
                    )}
                  </figure>
                ))}
              </div>
            </div>
          ))}

          {/* 컬러 시스템 */}
          {work.palette && work.palette.length > 0 && (
            <div className="mt-10 border border-zinc-200 p-6 md:p-10">
              <h3 className="text-2xl md:text-3xl font-black tracking-tighter mb-8">Colors</h3>
              <div className="space-y-8">
                {work.palette.map((g) => (
                  <div key={g.group}>
                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3">{g.group}</div>
                    <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
                      {g.colors.map((c) => (
                        <div key={g.group + c.hex}>
                          <div className="aspect-square border border-zinc-200" style={{ background: c.hex }} />
                          <div className="mt-1 text-[10px] font-bold">{c.name}</div>
                          <div className="text-[10px] font-mono text-gray-400">{c.hex}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 오른쪽: 고정 정보 패널 */}
        <aside className="lg:sticky lg:top-28 self-start">
          <div className="border-t-2 border-black">
            {info.concept && (
              <div className="py-5 border-b border-zinc-200">
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">Design Concept</div>
                <p className="text-sm font-bold leading-relaxed">{info.concept}</p>
              </div>
            )}

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
            {work.link && (
              <a
                href={work.link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-black text-white py-4 text-[11px] font-black uppercase tracking-[0.2em] hover:bg-[#05D920] hover:text-black transition-colors"
              >
                Visit Website <ArrowUpRight size={14} />
              </a>
            )}
            <Link
              to={`/works/${category.slug}`}
              className="flex items-center justify-center gap-2 w-full border border-black py-4 text-[11px] font-black uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-colors"
            >
              <ArrowLeft size={12} /> 목록으로
            </Link>
            <a
              href="/portfolio.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 hover:text-black transition-colors"
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
          <p className="text-sm text-gray-700 leading-relaxed">{overview}</p>
        </div>
        <div>
          <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-[#05D920] mb-3">01 / Challenge</h3>
          <p className="text-sm text-gray-700 leading-relaxed">{challenge}</p>
        </div>
        <div>
          <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-[#05D920] mb-3">02 / Solution</h3>
          <p className="text-sm text-gray-700 leading-relaxed">{solution}</p>
        </div>
      </div>

      {/* 다음 작업 (같은 분류 안에서) */}
      {next && (
        <Link
          to={`/works/${category.slug}/${next.slug}`}
          className="group block mt-20 relative overflow-hidden bg-black aspect-[21/9]"
        >
          <img
            src={next.thumb}
            alt={next.name}
            className="absolute inset-0 w-full h-full object-cover object-top opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
          />
          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
            <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#05D920] mb-3">
              Next Work <ArrowRight size={12} />
            </span>
            <span className="text-2xl md:text-5xl font-black tracking-tighter text-white">{next.name}</span>
          </div>
        </Link>
      )}

      <div className="mt-6 flex justify-between text-[10px] font-black uppercase tracking-[0.2em]">
        {prev ? (
          <Link to={`/works/${category.slug}/${prev.slug}`} className="flex items-center gap-2 hover:text-[#05D920] transition-colors">
            <ArrowLeft size={12} /> {prev.name}
          </Link>
        ) : (
          <Link to={`/works/${category.slug}`} className="flex items-center gap-2 hover:text-[#05D920] transition-colors">
            <ArrowLeft size={12} /> {category.title}
          </Link>
        )}
        <Link to="/contact" className="hover:text-[#05D920] transition-colors">
          Start a Project →
        </Link>
      </div>
    </motion.div>
  );
};
