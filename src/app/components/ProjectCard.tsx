import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { getProjectByTitle, projectDetails } from '../data/projects';

interface ProjectCardProps {
  title: string;
  category: string;
  image: string;
  index: number;
}

// 카드를 누르면 팝업 대신 프로젝트 상세 페이지(/works/:slug)로 이동합니다.
export const ProjectCard = ({ title, category, image, index }: ProjectCardProps) => {
  const slug = getProjectByTitle(title)?.slug;
  const to = slug ? `/works/${slug}` : '/works';
  // 실제 작업 썸네일이 있으면 그걸 우선 사용
  const src = projectDetails[title]?.thumb || image;

  return (
    <Link to={to} className="block" aria-label={`${title} 상세 보기`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        className="group relative overflow-hidden rounded-none bg-black aspect-[4/5] cursor-pointer"
      >
        <div className="absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-110">
          <ImageWithFallback
            src={src}
            alt={title}
            className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity grayscale hover:grayscale-0 duration-700"
          />
        </div>
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-transparent to-transparent z-10" />

        <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
          <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <span className="text-xs font-mono tracking-widest text-[#05D920] uppercase block mb-2">{category}</span>
            <h3 className="text-2xl font-black text-white tracking-tighter uppercase">{title}</h3>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};
