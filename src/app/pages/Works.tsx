import React from "react";
import { motion } from "motion/react";
import { Download } from "lucide-react";
import { ProjectCard } from "../components/ProjectCard";
import { projects } from "../data/projects";

// 작업 목록은 data/projects.ts 한 곳에서 관리
const allProjects = projects;

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
  {/* 이력서 다운로드 링크 */}
 <a
    href="/resume.pdf"
    download="Resume_MI3_Lee.pdf"
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em]"
  >
    <Download
      size={12}
      className="group-hover:translate-y-0.5 transition-transform"
    />
    Download Resume
  </a>

  {/* 포트폴리오 다운로드 링크 */}
  <a
    href="/portfolio.pdf"
    download="Portfolio_MI3_Lee.pdf"
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em]"
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
            key={project.slug}
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
