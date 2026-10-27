import React from "react";
import { motion } from "motion/react";
import { Download } from "lucide-react";
import { ProjectCard } from "../components/ProjectCard";

const allProjects = [
  {
    title: "Brand Identity System",
    category: "기업브랜딩 CIBI",
    image:
      "https://images.unsplash.com/photo-1586830746542-19b25c53497f",
  },
  {
    title: "Web Platform Design",
    category: "웹 홈페이지",
    image:
      "https://images.unsplash.com/photo-1761792654327-b32d0be2a96b",
  },
  {
    title: "Mobile User Experience",
    category: "앱 디자인 UIUX",
    image:
      "https://images.unsplash.com/photo-1622212993957-6d4631a0ba8b",
  },
  {
    title: "Strategic Documentation",
    category: "제안문서",
    image:
      "https://images.unsplash.com/photo-1693045181676-57199422ee66",
  },
  {
    title: "Design Leadership",
    category: "PMPL 리딩",
    image:
      "https://images.unsplash.com/photo-1765405016361-5881d4f8982b",
  },
  {
    title: "AI & Digital Transformation",
    category: "AI UX 전략 및 DX",
    image:
      "https://images.unsplash.com/photo-1622631407413-bfb7d4aec3b0",
  },
];

export const Works = () => {
  return (
    <div className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-20 border-b-2 border-black pb-12 flex flex-col md:flex-row md:items-end justify-between gap-8"
      >
        <div className="max-w-2xl">
          <h1 className="text-6xl font-black uppercase mb-4 tracking-tighter text-black">
            PROJECT{" "}
            <span className="text-[#05D920]">ARCHIVE</span>
          </h1>
          <p className="text-xl text-black font-medium">
            실제 출시된 상용 앱부터 실험적인 컨셉 디자인까지,
            미니멀리즘 철학이 담긴 작업물들을 소개합니다.
          </p>
        </div>

        <div className="flex items-center gap-6 mb-1">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              alert("이력서 다운로드 준비 중입니다.");
            }}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-[#05D920] transition-colors group"
          >
            <Download
              size={12}
              className="group-hover:translate-y-0.5 transition-transform"
            />
            Download Resume
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              alert("포트폴리오 PDF 다운로드 준비 중입니다.");
            }}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-[#05D920] transition-colors group"
          >
            <Download
              size={12}
              className="group-hover:translate-y-0.5 transition-transform"
            />
            Download Portfolio
          </a>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
        {allProjects.map((project, idx) => (
          <ProjectCard
            key={idx}
            title={project.title}
            category={project.category}
            image={project.image}
            index={idx}
          />
        ))}
      </div>
    </div>
  );
};