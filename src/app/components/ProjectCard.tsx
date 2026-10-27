import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProjectCardProps {
  title: string;
  category: string;
  image: string;
  index: number;
}

export const ProjectCard = ({ title, category, image, index }: ProjectCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const isAiProject = title === "AI & Digital Transformation";

  const handleClick = () => {
    if (isAiProject) {
      setIsOpen(true); // AI 프로젝트일 경우 상세 모달 열기
    }
  };

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        onClick={handleClick}
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

      {/* AI & Digital Transformation 클릭 시 뜨는 상세 모달 화면 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 md:p-10 overflow-y-auto"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white text-black w-full max-w-4xl max-h-[90vh] overflow-y-auto p-8 md:p-16 relative shadow-2xl"
            >
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 text-xl font-bold bg-black text-white w-10 h-10 flex items-center justify-center hover:bg-[#05D920] hover:text-black transition-colors"
              >
                ✕
              </button>

              <div className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-3">
                Section 01 / Detailed Project Case
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6">
                AI & DIGITAL TRANSFORMATION
              </h1>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-10">
                최신 생성형 인공지능 기술과 디자인 프로세스를 융합하여, 복잡한 데이터와 워크플로우를 직관적이고 아름다운 사용자 경험으로 재정의한 프로젝트입니다.
              </p>

              <div className="w-full h-64 md:h-80 bg-black flex items-center justify-center text-white mb-10 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(#22c55e_1px,transparent_1px)] [background-size:16px_16px] opacity-20"></div>
                <span className="text-xl md:text-2xl font-bold tracking-wider text-green-400 border border-green-400 px-6 py-3">
                  AI DRIVEN AESTHETICS
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <div>
                  <h3 className="text-lg font-bold mb-2">01 / Challenge</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    기존의 경직된 업무 환경에서 인공지능 솔루션을 도입할 때 사용자가 느끼는 진입 장벽을 낮추고, 시각적인 거부감 없이 자연스럽게 업무에 스며들도록 하는 것이 가장 큰 과제였습니다.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2">02 / Solution</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    미니멀리즘 인터페이스와 고도화된 타이포그래피 시스템을 적용하여 복잡한 알고리즘 결과를 한눈에 파악할 수 있도록 설계하고, 핵심 포인트 컬러로 시인성을 극대화했습니다.
                  </p>
                </div>
              </div>

              <div className="border-t border-black pt-6 flex justify-end">
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-xs font-bold bg-black text-white px-6 py-3 hover:bg-[#05D920] hover:text-black transition-colors"
                >
                  CLOSE WINDOW
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
