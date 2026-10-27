import React from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProjectCardProps {
  title: string;
  category: string;
  image: string;
  index: number;
  link?: string; // <-- 1. 링크 속성을 선택적으로 받을 수 있게 추가합니다!
}

export const ProjectCard = ({ title, category, image, index, link }: ProjectCardProps) => {
  // 2. 카드를 클릭했을 때 link가 있으면 해당 주소로 이동하도록 설정합니다.
  const handleClick = () => {
    if (link) {
      window.location.href = link;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onClick={handleClick} // <-- 3. 클릭 이벤트를 연결합니다.
      className="group relative overflow-hidden rounded-none bg-black aspect-[4/5] cursor-pointer"
    >
      <div className="absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-110">
        <ImageWithFallback 
          src={image} 
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
  );
};
