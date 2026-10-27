import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Mail, Linkedin, Globe, MessageSquare, Phone, Instagram } from 'lucide-react';

const revealVariants = {
  hidden: { opacity: 0, y: 50 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export const Contact = () => {
  return (
    <div className="pt-40 pb-32 px-6 md:px-12 max-w-7xl mx-auto">
      <motion.section 
        initial="hidden"
        animate="show"
        variants={staggerContainer}
        className="grid grid-cols-1 lg:grid-cols-2 gap-24"
      >
        {/* Left Side: Content */}
        <div className="space-y-16">
          <motion.div variants={revealVariants}>
            <span className="text-[#05D920] font-black tracking-[0.4em] uppercase text-xs block mb-8">
              Inquiry / Collaboration
            </span>
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] text-black mb-12">
              START A <br />
              <span className="text-[#05D920]">PROJECT</span>
            </h1>
            <p className="text-xl md:text-2xl font-medium text-zinc-500 leading-relaxed break-keep max-w-xl">
              새로운 비즈니스의 시작부터 글로벌 플랫폼의 고도화까지, 
              20년의 리더십으로 당신의 비전을 현실로 만듭니다.
            </p>
          </motion.div>

          <motion.div variants={revealVariants} className="space-y-8">
            <a href="mailto:mimijjangok@naver.com" className="flex items-center gap-6 group cursor-pointer border-b border-zinc-100 pb-6 hover:border-black transition-colors">
              <div className="w-16 h-16 bg-zinc-100 flex items-center justify-center group-hover:bg-[#05D920] group-hover:text-black transition-all">
                <Mail size={24} strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-1">Email</p>
                <p className="text-xl font-black">mimijjangok@naver.com</p>
              </div>
            </a>

            <a href="tel:01027773462" className="flex items-center gap-6 group cursor-pointer border-b border-zinc-100 pb-6 hover:border-black transition-colors">
              <div className="w-16 h-16 bg-zinc-100 flex items-center justify-center group-hover:bg-[#05D920] group-hover:text-black transition-all">
                <Phone size={24} strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-1">Phone</p>
                <p className="text-xl font-black">010 2777 3462</p>
              </div>
            </a>

            <a href="https://instagram.com/mi3___lee" target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 group cursor-pointer border-b border-zinc-100 pb-6 hover:border-black transition-colors">
              <div className="w-16 h-16 bg-zinc-100 flex items-center justify-center group-hover:bg-[#05D920] group-hover:text-black transition-all">
                <Instagram size={24} strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-1">Instagram</p>
                <p className="text-xl font-black">@mi3___lee</p>
              </div>
            </a>

            <div className="flex items-center gap-6 group cursor-pointer border-b border-zinc-100 pb-6 hover:border-black transition-colors">
              <div className="w-16 h-16 bg-zinc-100 flex items-center justify-center group-hover:bg-[#05D920] group-hover:text-black transition-all">
                <MessageSquare size={24} strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-1">Messenger</p>
                <p className="text-xl font-black">@mi3___lee</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Simple Inquiry Form Mockup */}
        <motion.div 
          variants={revealVariants}
          className="bg-black text-white p-12 md:p-20 flex flex-col justify-between"
        >
          <div className="space-y-12">
            <h2 className="text-3xl font-black uppercase tracking-tighter border-b border-white/20 pb-8">Quick Brief</h2>
            
            <div className="space-y-10">
              <div className="space-y-4">
                <label className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40">01. What is your name?</label>
                <input type="text" placeholder="Your Name" className="w-full bg-transparent border-b border-white/20 py-4 outline-none focus:border-[#05D920] transition-colors text-xl font-bold" />
              </div>
              
              <div className="space-y-4">
                <label className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40">02. Your Email Address?</label>
                <input type="email" placeholder="email@address.com" className="w-full bg-transparent border-b border-white/20 py-4 outline-none focus:border-[#05D920] transition-colors text-xl font-bold" />
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40">03. Project Details</label>
                <textarea rows={4} placeholder="Briefly describe your vision..." className="w-full bg-transparent border-b border-white/20 py-4 outline-none focus:border-[#05D920] transition-colors text-xl font-bold resize-none" />
              </div>
            </div>
          </div>

          <motion.button 
            whileHover={{ backgroundColor: '#05D920', color: '#000' }}
            className="mt-20 w-full py-8 border-2 border-white text-white font-black text-xl tracking-tighter uppercase flex items-center justify-center gap-4 transition-all"
          >
            SEND INQUIRY <ArrowRight />
          </motion.button>
        </motion.div>
      </motion.section>

      {/* Philosophy Statement */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="mt-40 pt-20 border-t border-black flex flex-col md:flex-row justify-between items-start gap-12"
      >
        <div className="max-w-md">
          <p className="text-zinc-400 font-bold tracking-[0.4em] uppercase text-[10px] mb-6">Strategic Partnership</p>
          <h3 className="text-2xl font-black uppercase tracking-tighter leading-tight">단순한 용역이 아닌, <br />성공을 위한 파트너십을 지향합니다.</h3>
        </div>
        <div className="max-w-xl">
          <p className="text-zinc-500 font-medium leading-relaxed break-keep">
            모든 프로젝트는 20년의 노하우를 가진 리더가 직접 초기 기획부터 디자인 시스템 구축까지 총괄합니다. 
            AI 기술의 효율성과 인간 중심의 감성이 결합된 최상의 결과물을 약속드립니다.
          </p>
        </div>
      </motion.div>
    </div>
  );
};
