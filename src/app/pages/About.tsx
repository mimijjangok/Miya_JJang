import React from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Mail, Instagram, Linkedin, Github, Download } from 'lucide-react';

export const About = () => {
  return (
    <div className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative aspect-[3/4] rounded-none overflow-hidden border-2 border-black"
        >
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1647892842753-01ee3cafd42e" 
            alt="Minimalist Graphic Layout" 
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
          />
        </motion.div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="space-y-12"
        >
          <div>
            <h1 className="text-5xl font-black uppercase mb-6 tracking-tight">
              DESIGN <span className="text-[#05D920]">LEADERSHIP</span>
            </h1>
            <p className="text-xl text-black leading-relaxed mb-6 font-medium">
              20년의 세월 동안 웹과 앱의 진화 과정을 최전선에서 경험하며, 
              단순한 디자인을 넘어 비즈니스 성공을 리딩하는 UXUI 전략가로 성장했습니다.
            </p>
            <p className="text-lg text-black/60 leading-relaxed font-normal">
              수많은 대규모 프로젝트의 PM과 PL로서 팀의 방향성을 제시하고 리드해왔으며, 
              이제는 AI 기술을 온·오프라인 디자인에 접목하여 더욱 지능적이고 입체적인 
              사용자 경험을 설계하는 데 주력하고 있습니다.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 border-t-2 border-black pt-12">
            <div>
              <h3 className="text-[#05D920] font-bold mb-4 uppercase text-xs tracking-[0.2em]">Experience</h3>
              <ul className="space-y-3 text-black text-sm font-medium">
                <li>Senior Designer at TechFlow</li>
                <li>UX Consultant for Startups</li>
                <li>Digital Art Director</li>
              </ul>
            </div>
                        <div>
              <h3 className="text-black font-bold mb-4 uppercase text-xs tracking-[0.2em]">Tool Stack</h3>
              <ul className="space-y-3 text-black text-sm font-medium">
                <li>Adobe Creative Cloud</li>
                <li>Cursor (AI Code Editor)</li>
                <li>Figma</li>
              </ul>
            </div>
          </div>

          <div className="pt-12 border-t-2 border-black flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div>
              <h3 className="text-black font-bold mb-6 uppercase text-xs tracking-[0.2em]">Contact & Social</h3>
              <div className="flex gap-8">
                <motion.a whileHover={{ scale: 1.2, color: '#05D920' }} href="#" className="text-black transition-colors"><Mail size={20} /></motion.a>
                <motion.a whileHover={{ scale: 1.2, color: '#05D920' }} href="#" className="text-black transition-colors"><Instagram size={20} /></motion.a>
                <motion.a whileHover={{ scale: 1.2, color: '#05D920' }} href="#" className="text-black transition-colors"><Linkedin size={20} /></motion.a>
                <motion.a whileHover={{ scale: 1.2, color: '#05D920' }} href="#" className="text-black transition-colors"><Github size={20} /></motion.a>
              </div>
            </div>

            <div className="flex flex-col items-start md:items-end gap-3">
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); alert('이력서 PDF 다운로드 준비 중입니다.'); }}
                className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white hover:bg-[#05D920] hover:text-black transition-all font-black uppercase text-xs tracking-widest"
              >
                Download Resume <Download size={14} />
              </a>
              <p className="text-[10px] font-bold text-black/30 tracking-[0.2em] uppercase">Last Update: Feb 2026</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
