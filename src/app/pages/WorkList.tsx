import React, { useEffect } from "react";
import { motion } from "motion/react";
import { Link, Navigate, useParams } from "react-router";
import { ArrowLeft, ArrowRight, Download } from "lucide-react";
import { categories, freeTemplates, getCategory, getWorksByCategory } from "../data/projects";

// 최소로 보여 줄 칸 수 (작업이 적으면 나머지는 '준비 중' 칸)
const MIN_SLOTS = 8;

// 2단계: 분류별 작업 썸네일 목록 (/works/:cat)
export const WorkList = () => {
  const { cat } = useParams();
  const category = getCategory(cat);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [cat]);

  if (!category) return <Navigate to="/works" replace />;

  const list = getWorksByCategory(category.slug);
  const empty = Math.max(0, MIN_SLOTS - list.length);
  const idx = categories.findIndex((c) => c.slug === category.slug);
  const nextCat = categories[(idx + 1) % categories.length];
  const templates = freeTemplates.filter((t) => t.category === category.slug);

  return (
    <motion.div
      key={category.slug}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="pt-28 pb-20 px-6 md:px-12 max-w-7xl mx-auto text-black"
    >
      {/* 분류 제목 */}
      <div className="border-b-2 border-black pb-10 mb-10">
        <Link
          to="/works"
          className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 hover:text-[#05D920] transition-colors mb-6"
        >
          <ArrowLeft size={12} />
          Project Archive
        </Link>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-[#05D920] mb-2">
              {category.subtitle}
            </div>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">
              {category.title}
            </h1>
          </div>
          <p className="text-sm md:text-base text-gray-600 leading-relaxed max-w-md">{category.description}</p>
        </div>
      </div>

      {/* 분류 탭 */}
      <div className="flex flex-wrap gap-2 mb-10">
        {categories.map((c) => (
          <Link
            key={c.slug}
            to={`/works/${c.slug}`}
            className={`px-4 py-2 text-[11px] font-bold border transition-colors ${
              c.slug === category.slug
                ? "bg-black text-white border-black"
                : "border-zinc-300 text-gray-600 hover:border-black hover:text-black"
            }`}
          >
            {c.category}
          </Link>
        ))}
      </div>

      {/* 무료 템플릿 코너 */}
      {templates.length > 0 && (
        <section className="mb-16 bg-black text-white p-6 md:p-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="text-[11px] font-mono uppercase tracking-widest text-[#05D920] mb-2">Free Templates</div>
              <h2 className="text-2xl md:text-4xl font-black tracking-tighter">무료 템플릿 다운로드</h2>
              <p className="text-sm text-zinc-400 mt-2">바로 고쳐 쓸 수 있는 PPT 템플릿을 무료로 나눕니다.</p>
            </div>
            <p className="text-[11px] text-zinc-500 leading-relaxed md:text-right">
              개인·상업적 사용 가능<br />템플릿 파일 자체의 재판매·재배포 금지
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {templates.map((t) => (
              <div key={t.slug} className="bg-zinc-900 border border-zinc-800 flex flex-col">
                <div className="aspect-video overflow-hidden bg-zinc-800 group">
                  <img src={t.cover} alt={`${t.name} 표지`} loading="lazy" className="w-full h-full object-cover group-hover:hidden" />
                  <img src={t.preview} alt={`${t.name} 내지 미리보기`} loading="lazy" className="w-full h-full object-cover hidden group-hover:block" />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-2">
                    <span>{t.format}</span>
                    <span>·</span>
                    <span>{t.pages}</span>
                  </div>
                  <h3 className="text-lg font-bold">{t.name}</h3>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed flex-1">{t.desc}</p>
                  <a
                    href={t.file}
                    download
                    className="mt-5 inline-flex items-center justify-center gap-2 bg-[#05D920] text-black py-3 text-[11px] font-black uppercase tracking-[0.2em] hover:bg-white transition-colors"
                  >
                    <Download size={14} /> 무료 다운로드
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col md:flex-row md:items-center justify-between gap-3 border-t border-zinc-800 pt-6">
            <p className="text-sm text-zinc-300">우리 회사에 맞춘 제안서·회사소개서가 필요하신가요?</p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-[#05D920] hover:text-white transition-colors"
            >
              맞춤 제작 문의하기 <ArrowRight size={14} />
            </Link>
          </div>
        </section>
      )}

      <div className="flex items-center justify-between mb-4 text-[11px] font-mono uppercase tracking-widest text-gray-500">
        <span>Total {String(list.length).padStart(2, "0")}</span>
      </div>

      {/* 썸네일 목록 */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10">
        {list.map((w, i) => (
          <Link key={w.slug} to={`/works/${category.slug}/${w.slug}`} className="group block">
            <div className="aspect-[4/3] bg-zinc-100 overflow-hidden mb-3">
              <img
                src={w.thumb}
                alt={w.name}
                loading="lazy"
                className="w-full h-full object-cover object-left-top group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="text-[10px] font-mono text-[#05D920] mb-1">{String(i + 1).padStart(2, "0")}</div>
            <h3 className="text-sm md:text-base font-bold leading-snug group-hover:text-[#05D920] transition-colors">
              {w.name}
            </h3>
            {w.desc && <p className="text-xs text-gray-500 mt-1 leading-relaxed">{w.desc}</p>}
          </Link>
        ))}

        {Array.from({ length: empty }).map((_, i) => (
          <div key={`empty-${i}`} aria-hidden="true">
            <div className="aspect-[4/3] border border-dashed border-zinc-300 bg-zinc-50 flex items-center justify-center mb-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">Coming Soon</span>
            </div>
            <div className="text-[10px] font-mono text-zinc-300 mb-1">
              {String(list.length + i + 1).padStart(2, "0")}
            </div>
            <div className="h-4 w-2/3 bg-zinc-100" />
          </div>
        ))}
      </div>

      {/* 다음 분류 */}
      <Link
        to={`/works/${nextCat.slug}`}
        className="group mt-20 flex items-center justify-between border-t-2 border-black pt-8"
      >
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Next Category</span>
        <span className="flex items-center gap-3 text-2xl md:text-4xl font-black uppercase tracking-tighter group-hover:text-[#05D920] transition-colors">
          {nextCat.title} <ArrowRight size={28} />
        </span>
      </Link>
    </motion.div>
  );
};
