import React from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProjectCardProps {
  title: string;
  category: string;
  image: string;
  index: number;
}

export const ProjectCard = ({ title, category, image, index }: ProjectCardProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
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
          
          <h3 className="text-2xl font-black text-white tracking-tighter uppercase">{title}</h3>
        </div>
      </div>
    </motion.div>
  );
};
