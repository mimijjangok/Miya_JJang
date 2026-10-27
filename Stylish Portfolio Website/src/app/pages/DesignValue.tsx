import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, TrendingUp, Zap, Target } from 'lucide-react';

const revealVariants = {
  hidden: { opacity: 0, y: 50 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } 
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const valuePoints = [
  {
    icon: <TrendingUp size={40} strokeWidth={1} />,
    title: "Market Impact",
    desc: "단순 심미성을 넘어 비즈니스의 지표를 바꾸는 디자인. 사용자 유지율(Retention) 40% 향상과 전환율 최적화를 증명해왔습니다."
  },
  {
    icon: <Zap size={40} strokeWidth={1} />,
    title: "AI Efficiency",
    desc: "20년의 설계 노하우와 AI 자동화 기술의 결합. 작업 리드타임을 60% 단축하면서도 퀄리티의 일관성을 유지합니다."
  },
  {
    icon: <Target size={40} strokeWidth={1} />,
    title: "UX Strategy",
    desc: "데이터 기반의 의사결정과 인간 중심의 인터페이스 설계. 1억 명 이상의 사용자가 경험한 대규모 플랫폼 리딩 노하우를 제공합니다."
  },
  {
    icon: <CheckCircle2 size={40} strokeWidth={1} />,
    title: "Scalability",
    desc: "성장하는 서비스를 위한 유연한 디자인 시스템. 브랜드의 본질을 잃지 않으면서도 수평적으로 확장 가능한 구조를 설계합니다."
  }
];

export const DesignValue = () => {
  return (
    <div className="pt-40 pb-32 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
      {/* Header */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={staggerContainer}
        className="mb-32"
      >
        <motion.span variants={revealVariants} className="text-[#05D920] font-black tracking-[0.4em] uppercase text-xs block mb-8">
          Design Verification / Value Assessment
        </motion.span>
        <div className="overflow-hidden">
          <motion.h1 variants={revealVariants} className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-[0.9] text-black mb-12">
            THE VALUE OF <br />
            <span className="text-[#05D920]">PURE DESIGN</span>
          </motion.h1>
        </div>
        <motion.div variants={revealVariants} className="max-w-3xl">
          <p className="text-xl md:text-3xl font-medium leading-relaxed break-keep text-zinc-600">
            20년의 경험이 증명하는 디자인의 가치는 단순한 '미학'에 머물지 않습니다. 
            기술과 비즈니스, 그리고 인간의 경험이 만나는 지점에서 발생하는 
            <span className="text-black font-black underline decoration-[#05D920] decoration-4 underline-offset-8"> 실질적인 임팩트</span>를 확인하십시오.
          </p>
        </motion.div>
      </motion.div>

      {/* Grid of Values */}
      <motion.div 
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="grid grid-cols-1 md:grid-cols-2 gap-px bg-black border border-black mb-40"
      >
        {valuePoints.map((point, idx) => (
          <motion.div 
            key={idx}
            variants={revealVariants}
            className="bg-white p-12 md:p-20 hover:bg-black hover:text-white transition-colors duration-700 group"
          >
            <div className="mb-12 text-[#05D920] group-hover:text-white transition-colors">
              {point.icon}
            </div>
            <h3 className="text-3xl font-black uppercase tracking-tighter mb-6 leading-none">
              {point.title}
            </h3>
            <p className="text-lg opacity-70 leading-relaxed font-medium break-keep">
              {point.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Proof Section */}
      <motion.section 
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-40"
      >
        <motion.div variants={revealVariants} className="relative">
          <div className="aspect-square bg-zinc-100 flex items-center justify-center relative overflow-hidden">
             <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#05D920_1px,transparent_1px)] [background-size:20px_20px]" />
             <div className="text-[12rem] font-black text-black/5 select-none uppercase tracking-tighter">VALUE</div>
             <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute w-40 h-40 border border-black/10 flex items-center justify-center"
             >
                <div className="w-2 h-2 bg-[#05D920]" />
             </motion.div>
          </div>
          <div className="absolute -bottom-10 -right-10 bg-black text-white p-10 hidden md:block">
            <p className="text-5xl font-black tracking-tighter">20Y+</p>
            <p className="text-xs font-bold uppercase tracking-widest mt-2 opacity-50">Proven Experience</p>
          </div>
        </motion.div>

        <motion.div variants={revealVariants} className="space-y-12">
          <h2 className="text-5xl font-black tracking-tighter uppercase leading-[0.9] text-black">
            STRATEGIC <br />
            REASONING
          </h2>
          <div className="space-y-8">
            <div className="border-l-4 border-black pl-8 space-y-2">
              <h4 className="font-black text-lg uppercase tracking-tighter">01. 분석적 접근</h4>
              <p className="text-zinc-600 break-keep">단순한 감이 아닌, 정밀한 리서치와 데이터를 기반으로 디자인의 당위성을 확보합니다.</p>
            </div>
            <div className="border-l-4 border-black pl-8 space-y-2">
              <h4 className="font-black text-lg uppercase tracking-tighter">02. 본질적 미니멀리즘</h4>
              <p className="text-zinc-600 break-keep">불필요한 요소를 걷어내고 브랜드의 핵심 가치만을 남겨 사용자의 집중도를 극대화합니다.</p>
            </div>
            <div className="border-l-4 border-black pl-8 space-y-2">
              <h4 className="font-black text-lg uppercase tracking-tighter">03. 미래지향적 리더십</h4>
              <p className="text-zinc-600 break-keep">AI 시대에 걸맞은 새로운 디자인 문법을 제시하며 팀의 성장을 견인합니다.</p>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* Bottom Action */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="text-center border-t border-black pt-20"
      >
        <p className="text-zinc-400 font-bold tracking-[0.4em] uppercase text-xs mb-10">Verification Complete</p>
        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-16">READY TO SCALE YOUR VISION?</h2>
        <div className="flex flex-wrap justify-center gap-6">
            <Link to="/contact">
              <motion.button 
                whileHover={{ scale: 1.05, backgroundColor: '#05D920', borderColor: '#05D920', color: '#000' }}
                className="px-12 py-6 border-2 border-black font-black text-lg tracking-tighter transition-all uppercase"
              >
                HIRE A LEADER
              </motion.button>
            </Link>
            <motion.button 
               onClick={() => window.history.back()}
              whileHover={{ scale: 1.05, backgroundColor: '#000', color: '#fff' }}
              className="px-12 py-6 border-2 border-transparent bg-zinc-100 font-black text-lg tracking-tighter transition-all"
            >
              BACK TO HOME
            </motion.button>
        </div>
      </motion.div>
    </div>
  );
};
