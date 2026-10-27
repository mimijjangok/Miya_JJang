import React from 'react';
import { motion } from 'motion/react';
import { ProjectCard } from '../components/ProjectCard';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';

const projects = [
  {
    title: "Brand Identity System",
    category: "기업브랜딩 CIBI",
    image: "https://images.unsplash.com/photo-1586830746542-19b25c53497f"
  },
  {
    title: "Web Platform Design",
    category: "웹 홈페이지",
    image: "https://images.unsplash.com/photo-1761792654327-b32d0be2a96b"
  },
  {
    title: "Mobile User Experience",
    category: "앱 디자인 UIUX",
    image: "https://images.unsplash.com/photo-1622212993957-6d4631a0ba8b"
  }
];

// Enhanced Motion Variants
const revealVariants = {
  hidden: { opacity: 0, y: 100, skewY: 5 },
  show: { 
    opacity: 1, 
    y: 0, 
    skewY: 0,
    transition: { 
      duration: 1.2, 
      ease: [0.16, 1, 0.3, 1] 
    } 
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const lineReveal = {
  hidden: { scaleX: 0 },
  show: { 
    scaleX: 1, 
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } 
  }
};

export const Home = () => {
  return (
    <div className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
      {/* Hero Section */}
      <motion.section 
        initial="hidden"
        animate="show"
        variants={staggerContainer}
        className="mb-40"
      >
        <div className="overflow-hidden">
          <motion.p variants={revealVariants} className="text-[#05D920] font-semibold mb-6 tracking-[0.3em] border-l-2 border-[#05D920] pl-4 uppercase text-xs">
            Leadership in Digital Era
          </motion.p>
        </div>
        
        <div className="overflow-hidden">
          <motion.h1 variants={revealVariants} className="text-7xl md:text-[10rem] font-black tracking-tighter leading-[0.9] mb-12 text-black">
            <span className="text-[#05D920]">예쁨</span><br />
            AI가 <br />
            녹여지다.
          </motion.h1>
        </div>

        <motion.div variants={revealVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-12">
          <p className="text-lg md:text-2xl text-zinc-500 max-w-3xl font-normal leading-relaxed break-keep">
            아름다움과 인공지능 기술이 일상에 디자인으로 자연스럽게 녹여지는 순간, <br />
            20년의 설계 노하우와 리더십으로 그 본질적인 가치를 완성합니다.
          </p>
          
          <Link to="/experience-value">
            <motion.button 
              whileHover={{ scale: 1.05, backgroundColor: '#000000', color: '#ffffff' }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-5 bg-transparent border-2 border-black text-black font-bold rounded-none flex items-center gap-4 group transition-all shrink-0"
            >
              EXPERIENCE VALUE <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </motion.button>
          </Link>
        </motion.div>
      </motion.section>

      {/* Philosophy Section */}
      <motion.section 
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="mb-52 grid grid-cols-1 md:grid-cols-2 gap-24 items-center"
      >
        <motion.div variants={revealVariants} className="relative p-12 border border-black/5">
          <motion.div variants={lineReveal} className="absolute top-0 left-0 w-32 h-[2px] bg-black origin-left" />
          <motion.div variants={lineReveal} className="absolute top-0 left-0 w-[2px] h-32 bg-black origin-top" />
          
          <span className="text-xs font-bold text-black tracking-[0.4em] mb-8 block uppercase opacity-30">Section 01 / Core</span>
          <h2 className="text-4xl font-black mb-8 uppercase tracking-tighter text-black leading-tight">일상에 녹아드는 기술</h2>
          <p className="text-zinc-600 font-medium leading-relaxed break-keep mb-12 text-lg">
            인공지능은 이제 도구를 넘어 디자인의 일부가 되었습니다. 복잡한 알고리즘을 사용자가 인지하지 못할 만큼 아름답고 직관적인 형태로 녹여내는 것, 그것이 제가 지향하는 현대적 UI의 핵심입니다.
          </p>
          
          <div className="flex gap-20">
            <div className="border-l-2 border-black pl-8">
              <p className="text-4xl font-light text-black tracking-tighter">20+</p>
              <p className="text-[10px] text-black font-bold uppercase tracking-[0.2em] mt-2 opacity-50">Experience</p>
            </div>
            <div className="border-l-2 border-black pl-8">
              <p className="text-4xl font-light text-black tracking-tighter">100%</p>
              <p className="text-[10px] text-black font-bold uppercase tracking-[0.2em] mt-2 opacity-50">AI Driven</p>
            </div>
          </div>
        </motion.div>

        <motion.div variants={revealVariants} className="space-y-8">
          <h2 className="text-6xl md:text-[7rem] font-black tracking-tighter uppercase leading-[0.85] text-black">
            INTELLIGENT <br />
            <span className="text-[#05D920]">AESTHETICS</span>
          </h2>
          <motion.p 
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="text-xl text-zinc-400 font-medium italic"
          >
            "가장 고도화된 기술은 보이지 않는 디자인 속에 숨어있습니다."
          </motion.p>
        </motion.div>
      </motion.section>

      {/* Featured Works Grid */}
      <motion.section 
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="mb-52"
      >
        <motion.div variants={revealVariants} className="flex justify-between items-end mb-16 border-b border-black pb-12">
          <div>
            <h2 className="text-5xl font-black mb-4 uppercase tracking-tighter text-black">
              DESIGN PORTFOLIO
            </h2>
            <p className="text-zinc-500 font-medium text-lg">기술과 미학의 조화가 만들어낸 결과물</p>
          </div>
          <Link to="/works" className="text-black text-sm font-bold hover:text-[#05D920] transition-all hidden md:flex items-center gap-2 uppercase tracking-[0.2em] group">
            VIEW ALL WORKS <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
          {projects.map((project, idx) => (
            <motion.div 
              key={idx} 
              variants={revealVariants}
              whileHover={{ y: -10 }}
              className="transition-transform duration-500"
            >
              <ProjectCard 
                title={project.title}
                category={project.category}
                image={project.image}
                index={idx}
              />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Capabilities */}
      <motion.section 
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="mb-52 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1 border-t border-black pt-20"
      >
        {[
          { num: "01", title: "UXUI Design", desc: "단순히 예쁜 것을 넘어 사용자의 심리와 AI 데이터를 분석하여 최적화된 동선을 설계합니다." },
          { num: "02", title: "Leadership", desc: "20년의 프로젝트 리딩 경험으로 디자인과 개발, 비즈니스의 간극을 메우고 성공으로 이끕니다." },
          { num: "03", title: "AI Tech", desc: "최신 생성형 AI와 자동화 기술을 디자인 공정에 도입하여 압도적인 효율과 퀄리티를 구현합니다." },
          { num: "04", title: "Integration", desc: "온·오프라인을 넘나드는 심리스한 경험을 통해 브랜드의 정체성을 일상 곳곳에 각인시킵니다." }
        ].map((item, idx) => (
          <motion.div key={idx} variants={revealVariants} className="p-8 hover:bg-black hover:text-white transition-colors duration-500 group">
            <span className="text-[12px] font-black tracking-[0.3em] uppercase block mb-8 group-hover:text-white transition-colors text-[#05d920]">{item.num} / Focus</span>
            <div className="space-y-6">
              <h3 className="text-2xl font-black uppercase tracking-tighter leading-none">{item.title}</h3>
              <p className="text-sm leading-relaxed font-medium break-keep opacity-60 group-hover:opacity-100 transition-opacity">
                {item.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.section>

      {/* Footer / CTA */}
      <motion.section 
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={revealVariants}
        className="text-center py-52 relative group overflow-hidden bg-white text-black border-[1px] border-black/10 cursor-pointer"
      >
        {/* Hover Background Motion */}
        <motion.div 
          className="absolute inset-0 z-0 bg-black opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        />
        <motion.div 
          initial={{ scale: 1.2, opacity: 0 }}
          whileHover={{ scale: 1, opacity: 0.3 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80')] bg-cover bg-center grayscale pointer-events-none" 
        />

        {/* Decorative Lines - Thinner and Lighter */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-black/10 z-20 group-hover:bg-[#05D920]/50 transition-colors duration-500" />
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-black/10 z-20 group-hover:bg-[#05D920]/50 transition-colors duration-500" />
        <div className="absolute top-0 left-0 h-full w-[1px] bg-black/10 z-20 group-hover:bg-[#05D920]/50 transition-colors duration-500" />
        <div className="absolute top-0 right-0 h-full w-[1px] bg-black/10 z-20 group-hover:bg-[#05D920]/50 transition-colors duration-500" />
        
        <div className="relative z-10 px-6 transition-colors duration-500 group-hover:text-white">
          <p className="text-[#05D920] font-bold tracking-[0.4em] mb-10 uppercase text-xs">Project Inquiry</p>
          <h2 className="text-6xl md:text-9xl font-black mb-16 uppercase tracking-tighter leading-[0.85] break-keep">
            당신의 일상에 <br />
            <span className="text-[#05D920]">디자인</span>을 입히다
          </h2>
          <div className="inline-block relative overflow-hidden group/link">
            <Link to="/contact" className="text-2xl md:text-4xl font-black pb-2 tracking-tighter block hover:text-[#05D920] transition-colors uppercase">
              START A PROJECT
            </Link>
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              className="h-[4px] w-full bg-[#05D920] transform origin-left" 
            />
          </div>
          <div className="mt-6 flex flex-col items-center gap-2">
            <a 
              href="mailto:mimijjangok@naver.com" 
              className="text-[11px] font-bold tracking-[0.2em] opacity-40 uppercase hover:opacity-100 group-hover:text-[#05D920] group-hover:opacity-100 transition-all"
            >
              mimijjangok@naver.com
            </a>
            <a 
              href="tel:01027773462" 
              className="text-[11px] font-bold tracking-[0.2em] opacity-40 uppercase hover:opacity-100 group-hover:text-[#05D920] group-hover:opacity-100 transition-all"
            >
              010 2777 3462
            </a>
          </div>
        </div>
      </motion.section>
    </div>
  );
};