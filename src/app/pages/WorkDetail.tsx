import React, { useEffect } from "react";
import { motion } from "motion/react";
import { Link, Navigate, useParams } from "react-router";
import { ArrowLeft, ArrowRight, ArrowUpRight, Download } from "lucide-react";
import { getCategory, getWork, getWorksByCategory } from "../data/projects";
import { WorkThumb } from "../components/WorkThumb";
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
  // 현재 작업 다음 순서부터 최대 3개 (한 바퀴 돌아서 현재 작업은 제외)
  const moreWorks = Array.from({ length: Math.min(3, siblings.length - 1) }, (_, i) =>
    siblings[(idx + 1 + i) % siblings.length]
  );
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
          <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500 mb-4">
            <Link to="/works" className="hover:text-[#05D920] transition-colors">Works</Link>
            <span>/</span>
            <Link to={`/works/${category.slug}`} className="hover:text-[#05D920] transition-colors">
              {category.title}
            </Link>
          </div>
          <div className="text-[11px] font-mono uppercase tracking-widest text-[#05D920] mb-2">{category.category}</div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">{work.name}</h1>
          {work.desc && <p className="text-sm md:text-base text-gray-600 mt-3">{work.desc}</p>}
        </div>
        {work.link?.textOnly && (
          <span className="inline-flex items-center text-sm font-mono text-gray-600">{work.link.label}</span>
        )}
        {work.link && !work.link.textOnly && (
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
              <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#05D920] mb-2">{work.about.title}</div>
              <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-5">{work.about.lead}</h3>
              <div className="space-y-3">
                {work.about.body.map((t, i) => (
                  <p key={i} className="text-sm text-gray-700 leading-relaxed">{t}</p>
                ))}
              </div>
              {work.about.facts && (
                <dl className="mt-8 border-t border-zinc-200">
                  {work.about.facts.map((f) => (
                    <div key={f.label} className="grid grid-cols-[96px_1fr] gap-3 py-3 border-b border-zinc-200 text-sm">
                      <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400 pt-0.5">{f.label}</dt>
                      <dd className="font-medium">{f.value}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>
          )}
          {/* 앱 아이콘: 앱스토어처럼 썸네일 위에 크게 */}
          {work.icon && (
            <div className="flex items-center gap-5 md:gap-8 mb-6">
              <img
                src={work.icon}
                alt={`${work.name} 앱 아이콘`}
                className="w-24 h-24 md:w-36 md:h-36 shrink-0 object-contain rounded-[22%]"
              />
              <div className="min-w-0">
                <div className="text-xl md:text-3xl font-bold tracking-tight leading-tight">{work.name}</div>
                {work.info?.client && <div className="text-sm md:text-base text-gray-500 mt-1">{work.info.client}</div>}
              </div>
            </div>
          )}
          {work.hero && (
            <div className={`overflow-hidden mb-6 ${work.hero.small ? "flex justify-start py-4" : ""}`}>
              <img
                src={work.hero.src}
                alt={work.hero.alt}
                className={work.hero.small ? "block w-auto max-w-[220px] md:max-w-[260px] h-auto" : "w-full h-auto block"}
              />
            </div>
          )}
          {work.layout === "phones" ? (
            <div className={`grid grid-cols-2 gap-4 bg-zinc-100 p-4 md:p-6 ${work.images.length === 5 ? "md:grid-cols-5" : work.images.length === 3 ? "md:grid-cols-3 md:px-16 lg:px-24" : work.images.length === 2 ? "md:px-24 lg:px-32" : "md:grid-cols-4"}`}>
              {work.images.map((img, iIdx) => (
                <figure key={iIdx} className="flex flex-col">
                  <div className="rounded-[18px] overflow-hidden bg-white">
                    <img src={img.src} alt={img.alt} loading="lazy" className="w-full h-auto block" />
                  </div>
                  <figcaption className="mt-3 text-sm md:text-base font-medium text-gray-600 text-center">
                    {img.alt.replace(/^\S+\s/, "")}
                  </figcaption>
                </figure>
              ))}
            </div>
          ) : work.layout === "cover-grid" ? (
            <div className="space-y-4">
              {work.images[0] && (
                <div className="bg-zinc-50 overflow-hidden">
                  <img src={work.images[0].src} alt={work.images[0].alt} loading="lazy" className="w-full h-auto block" />
                </div>
              )}
              <div className={`grid gap-2 ${work.images.length - 1 <= 3 ? "grid-cols-3" : work.images.length - 1 === 4 ? "grid-cols-2 md:grid-cols-4" : "grid-cols-3 md:grid-cols-6"}`}>
                {work.images.slice(1).map((img, iIdx) => (
                  <figure key={iIdx} className="flex flex-col">
                    <div className="bg-zinc-50 overflow-hidden">
                      <img src={img.src} alt={img.alt} loading="lazy" className="w-full h-auto block" />
                    </div>
                    <figcaption className="mt-1 text-[9px] font-medium text-gray-500 leading-snug">{img.alt}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
          ) : work.layout === "pc-mobile" ? (
            <div className="grid grid-cols-1 md:grid-cols-[minmax(0,3fr)_minmax(0,1fr)] gap-4 items-start">
              {work.images.map((img, iIdx) => (
                <div key={iIdx}>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400 mb-2">
                    {iIdx === 0 ? "PC" : "Mobile"}
                  </div>
                  <div className="bg-zinc-50 overflow-hidden">
                    <img src={img.src} alt={img.alt} loading="lazy" className="w-full h-auto block" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {work.images.map((img, iIdx) => (
                <div key={iIdx} className="bg-zinc-50 overflow-hidden">
                  <img src={img.src} alt={img.alt} loading="lazy" className="w-full h-auto block" />
                </div>
              ))}
            </div>
          )}

          {/* 추가 섹션 (PPT 등) — 작은 원본은 원래 크기 이상으로 늘리지 않음 */}
          {work.extras?.map((ex) => (
            <div key={ex.title} className="mt-10 border border-zinc-200 p-6 md:p-10">
              <h3 className="text-xl md:text-2xl font-bold tracking-tight">{ex.title}</h3>
              {ex.desc && <p className="text-sm text-gray-500 mt-1 mb-6">{ex.desc}</p>}
              <div className={`grid gap-6 ${ex.cols === 4 ? "grid-cols-2 md:grid-cols-4" : ex.cols === 3 ? "grid-cols-2 md:grid-cols-3" : "grid-cols-1 sm:grid-cols-2"}`}>
                {ex.images.map((img) => (
                  <figure key={img.src} className="flex flex-col items-center">
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      className="block w-auto max-w-full h-auto"
                    />
                    {img.caption && (
                      <figcaption className="mt-2 text-[11px] font-medium text-gray-500">{img.caption}</figcaption>
                    )}
                  </figure>
                ))}
                {/* 캐릭터 옆 빈칸: 특징 텍스트 */}
                {ex.withFeatures && work.features && work.features.length > 0 && (
                  <div className="flex flex-col justify-center">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400 mb-4">Features</div>
                    <ol className="space-y-5">
                      {work.features.map((f, i) => (
                        <li key={f.title} className="grid grid-cols-[28px_1fr] gap-2">
                          <span className="text-xs font-mono text-[#05D920] pt-1">{String(i + 1).padStart(2, "0")}</span>
                          <div>
                            <div className="text-base md:text-lg font-bold">{f.title}</div>
                            {f.desc && <div className="text-sm text-gray-500 leading-relaxed mt-1">{f.desc}</div>}
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* 컬러 시스템 */}
          {work.palette && work.palette.length > 0 && (
            <div className="mt-10 border border-zinc-200 p-6 md:p-10">
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-8">Colors</h3>
              <div className="space-y-8">
                {work.palette.map((g) => (
                  <div key={g.group}>
                    <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400 mb-3">{g.group}</div>
                    <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
                      {g.colors.map((c) => (
                        <div key={g.group + c.hex}>
                          <div className="aspect-square border border-zinc-200" style={{ background: c.hex }} />
                          <div className="mt-1 text-[10px] font-medium">{c.name}</div>
                          <div className="text-[10px] font-mono text-gray-400">{c.hex}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 저작권 안내 (아주 작고 연하게) */}
          {work.copyright && (
            <p className="mt-8 text-[10px] leading-relaxed text-gray-400 whitespace-pre-line">{work.copyright}</p>
          )}
        </div>

        {/* 오른쪽: 고정 정보 패널 */}
        <aside className="lg:sticky lg:top-28 self-start">
          <div className="border-t-2 border-black">
            {info.concept && (
              <div className="py-5 border-b border-zinc-200">
                <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400 mb-2">Design Concept</div>
                <p className="text-sm font-medium leading-relaxed">{info.concept}</p>
              </div>
            )}

            {work.features && work.features.length > 0 && !work.extras?.some((e) => e.withFeatures) && (
              <div className="py-5 border-b border-zinc-200">
                <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400 mb-3">Features</div>
                <ol className="space-y-3">
                  {work.features.map((f, i) => (
                    <li key={f.title} className="grid grid-cols-[24px_1fr] gap-2 text-sm">
                      <span className="text-[10px] font-mono text-[#05D920] pt-1">{String(i + 1).padStart(2, "0")}</span>
                      <div>
                        <div className="font-bold">{f.title}</div>
                        {f.desc && <div className="text-xs text-gray-500 leading-relaxed mt-0.5">{f.desc}</div>}
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            <dl>
              {rows
                .filter((r) => r.value)
                .map((r) => (
                  <div key={r.label} className="grid grid-cols-[96px_1fr] gap-3 py-3 border-b border-zinc-200 text-sm">
                    <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400 pt-0.5">{r.label}</dt>
                    <dd className="font-medium">{r.value}</dd>
                  </div>
                ))}
            </dl>

            {info.colors && info.colors.length > 0 && (
              <div className="py-4 border-b border-zinc-200">
                <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400 mb-3">Main Color</div>
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
            {work.link && !work.link.textOnly && (
              <a
                href={work.link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-black text-white py-4 text-[11px] font-semibold uppercase tracking-[0.2em] hover:bg-[#05D920] hover:text-black transition-colors"
              >
                Visit Website <ArrowUpRight size={14} />
              </a>
            )}
            <Link
              to={`/works/${category.slug}`}
              className="flex items-center justify-center gap-2 w-full border border-black py-4 text-[11px] font-semibold uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-colors"
            >
              <ArrowLeft size={12} /> 목록으로
            </Link>
            <a
              href="/portfolio.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500 hover:text-black transition-colors"
            >
              <Download size={12} /> Portfolio PDF
            </a>
          </div>
        </aside>
      </div>

      {/* 개요 / 과제 / 해결 */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-10 border-t-2 border-black pt-10">
        <div>
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#05D920] mb-3">Overview</h3>
          <p className="text-sm text-gray-700 leading-relaxed">{overview}</p>
        </div>
        <div>
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#05D920] mb-3">01 / Challenge</h3>
          <p className="text-sm text-gray-700 leading-relaxed">{challenge}</p>
        </div>
        <div>
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#05D920] mb-3">02 / Solution</h3>
          <p className="text-sm text-gray-700 leading-relaxed">{solution}</p>
        </div>
      </div>

      {/* 다른 작업 썸네일 3개 (같은 분류 안에서, 현재 작업 다음부터) */}
      {moreWorks.length > 0 && (
        <div className="mt-20">
          <div className="flex items-center justify-between mb-5">
            <span className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#05D920]">
              Next Work <ArrowRight size={12} />
            </span>
            <Link
              to={`/works/${category.slug}`}
              className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500 hover:text-black transition-colors"
            >
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
            {moreWorks.map((w) => (
              <Link key={w.slug} to={`/works/${category.slug}/${w.slug}`} className="group block">
                <div className="relative overflow-hidden bg-black aspect-[4/3]">
                  <div className="absolute inset-0 opacity-70 grayscale group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700">
                    <WorkThumb work={w} />
                  </div>
                </div>
                <div className="mt-3 text-sm font-bold tracking-tight leading-snug group-hover:text-[#05D920] transition-colors">
                  {w.name}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 flex justify-between text-[10px] font-semibold uppercase tracking-[0.2em]">
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
