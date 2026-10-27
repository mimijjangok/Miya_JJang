import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import { 
  ArrowRight, 
  Award, 
  Users, 
  Briefcase, 
  TrendingUp,
  Sparkles,
  Globe
} from 'lucide-react';

const revealVariants = {
  hidden: { opacity: 0, y: 60 },
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
    transition: { staggerChildren: 0.12 }
  }
};

const lineReveal = {
  hidden: { scaleX: 0 },
  show: { 
    scaleX: 1, 
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } 
  }
};

// Timeline Data
const timeline = [
  { year: "1999-2010", role: "UI Designer", company: "Digital Agency", desc: "브랜드 아이덴티티 및 초기 웹 플랫폼 디자인 경험 축적" },
  { year: "2010-2015", role: "Senior UX Designer", company: "Tech Startup", desc: "모바일 앱 디자인 리드 및 디자인 시스템 구축" },
  { year: "2015-2020", role: "Design Lead", company: "Enterprise", desc: "대규모 플랫폼 디자인 총괄 및 크로스펑셔널 팀 리더십" },
  { year: "2020-2025", role: "AI UX Strategist", company: "Innovation Lab", desc: "생성형 AI 기반 디자인 워크플로우 및 DX 전략 수립" },
];

// Expertise Areas
const expertise = [
  { 
    title: "기업브랜딩 CIBI", 
    count: "4+", 
    desc: "기업 정체성 수립부터 VI 시스템 구축까지 종합적인 브랜드 설계",
    icon: <Award strokeWidth={1} />
  },
  { 
    title: "웹 홈페이지", 
    count: "50+", 
    desc: "반응형 웹사이트부터 대규모 포털까지 전방위 웹 경험 디자인",
    icon: <Globe strokeWidth={1} />
  },
  { 
    title: "앱 디자인 UIUX", 
    count: "80+", 
    desc: "iOS/Android 네이티브 앱 및 하이브리드 앱의 UI/UX 설계 및 최적화",
    icon: <Sparkles strokeWidth={1} />
  },
  { 
    title: "제안문서", 
    count: "20+", 
    desc: "비즈니스 가치를 설득력 있게 전달하는 전략적 프레젠테이션 디자인",
    icon: <Briefcase strokeWidth={1} />
  },
  { 
    title: "PM/PL", 
    count: "10+", 
    desc: "프로젝트 전체 라이프사이클 관리 및 크로스펑셔널 팀 리딩",
    icon: <Users strokeWidth={1} />
  },
  { 
    title: "AI UX & DX", 
    count: "5+", 
    desc: "AI 시대의 새로운 사용자 경험 설계 및 디지털 트랜스포메이션 전략",
    icon: <TrendingUp strokeWidth={1} />
  },
];

// Key Achievements
const achievements = [
  { number: "100+", label: "Total Projects", desc: "완료한 전체 프로젝트 수" },
  { number: "50+", label: "Enterprise Clients", desc: "협업한 기업 고객사" },
  { number: "1B+", label: "User Reach", desc: "디자인한 제품의 누적 사용자" },
  { number: "20Y", label: "Experience", desc: "검증된 전문 경력" },
];

export const ExperienceValue = () => {
  return (
    <div className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
      
      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate="show"
        variants={staggerContainer}
        className="mb-40"
      >
        <motion.div variants={revealVariants} className="mb-8">
          <span className="text-[#05D920] font-black tracking-[0.4em] uppercase text-xs border-l-2 border-[#05D920] pl-4">
            20 Years Journey / Professional Portfolio
          </span>
        </motion.div>
        
        <div className="overflow-hidden mb-16">
          <motion.h1 
            variants={revealVariants}
            className="text-6xl md:text-[10rem] font-black uppercase tracking-tighter leading-[0.85] text-black"
          >
            EXPERIENCE<br />
            <span className="text-[#05D920]">VALUE</span>
          </motion.h1>
        </div>

        <motion.div variants={revealVariants} className="max-w-4xl">
          <p className="text-xl md:text-3xl font-medium leading-relaxed text-zinc-600 break-keep mb-12">
            1999년부터 2025년까지, 20여년간 축적된 디자인 경험은 단순한 시간의 나열이 아닙니다. 
            <span className="text-black font-black"> 100개 이상의 프로젝트</span>와 
            <span className="text-black font-black"> 10억 명 이상의 사용자</span>가 증명하는 
            실질적인 가치의 결정체입니다.
          </p>
        </motion.div>

        <motion.div variants={revealVariants}>
          <motion.div 
            variants={lineReveal}
            className="h-[1px] w-full bg-black/10 origin-left"
          />
        </motion.div>
      </motion.section>

      {/* Key Achievements Grid */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="mb-52"
      >
        <motion.div variants={revealVariants} className="mb-16">
          <h2 className="text-4xl font-black uppercase tracking-tighter text-black mb-4">
            KEY ACHIEVEMENTS
          </h2>
          <p className="text-zinc-500 font-medium">20년의 여정이 만들어낸 검증된 수치</p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-1 border border-black">
          {achievements.map((item, idx) => (
            <motion.div
              key={idx}
              variants={revealVariants}
              className="bg-white p-8 md:p-12 hover:bg-black hover:text-white transition-colors duration-700 group relative"
            >
              <div className="absolute top-0 left-0 w-full h-[1px] bg-black/5 group-hover:bg-[#05D920]/50 transition-colors" />
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-black/5 group-hover:bg-[#05D920]/50 transition-colors" />
              
              <p className="text-5xl md:text-6xl font-black tracking-tighter mb-4 text-[#05D920] group-hover:text-white transition-colors">
                {item.number}
              </p>
              <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-3 opacity-50 group-hover:opacity-100 transition-opacity">
                {item.label}
              </h3>
              <p className="text-xs leading-relaxed opacity-60 group-hover:opacity-90 transition-opacity break-keep">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Timeline Section */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="mb-52"
      >
        <motion.div variants={revealVariants} className="mb-20">
          <h2 className="text-4xl font-black uppercase tracking-tighter text-black mb-4">
            CAREER TIMELINE
          </h2>
          <p className="text-zinc-500 font-medium">진화하는 디자인 리더십의 궤적</p>
        </motion.div>

        <div className="space-y-1">
          {timeline.map((item, idx) => (
            <motion.div
              key={idx}
              variants={revealVariants}
              whileHover={{ x: 20 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-8 border border-black p-8 md:p-12 bg-white hover:bg-black hover:text-white transition-all duration-700 group"
            >
              <div className="md:col-span-2">
                <span className="text-2xl font-black tracking-tighter text-[#05D920] group-hover:text-white transition-colors">
                  {item.year}
                </span>
              </div>
              <div className="md:col-span-3">
                <h3 className="text-xl font-black uppercase tracking-tighter mb-1">
                  {item.role}
                </h3>
                <p className="text-sm opacity-50 font-bold uppercase tracking-wider">
                  {item.company}
                </p>
              </div>
              <div className="md:col-span-7">
                <p className="text-base leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity break-keep">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Expertise Grid */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="mb-52"
      >
        <motion.div variants={revealVariants} className="mb-20">
          <h2 className="text-4xl font-black uppercase tracking-tighter text-black mb-4">
            EXPERTISE AREAS
          </h2>
          <p className="text-zinc-500 font-medium">6개 전문 분야별 경험과 실적</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 border border-black">
          {expertise.map((area, idx) => (
            <motion.div
              key={idx}
              variants={revealVariants}
              className="bg-white p-10 hover:bg-black hover:text-white transition-colors duration-700 group relative"
            >
              <div className="absolute top-0 right-0 w-16 h-[1px] bg-black/10 group-hover:bg-[#05D920] transition-colors" />
              <div className="absolute top-0 right-0 w-[1px] h-16 bg-black/10 group-hover:bg-[#05D920] transition-colors" />
              
              <div className="mb-8 text-[#05D920] group-hover:text-white transition-colors">
                <div className="w-12 h-12 flex items-center justify-center border border-current">
                  {area.icon}
                </div>
              </div>
              
              <div className="flex items-baseline gap-4 mb-6">
                <h3 className="text-2xl font-black uppercase tracking-tighter flex-1">
                  {area.title}
                </h3>
                <span className="text-3xl font-black text-[#05D920] group-hover:text-white transition-colors">
                  {area.count}
                </span>
              </div>
              
              <p className="text-sm leading-relaxed opacity-60 group-hover:opacity-100 transition-opacity break-keep">
                {area.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Value Statement */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="mb-52 relative"
      >
        <motion.div 
          variants={revealVariants}
          className="border border-black p-16 md:p-24 bg-white relative overflow-hidden group hover:bg-black transition-colors duration-700"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#05D920_1px,transparent_1px)] [background-size:30px_30px]" />
          
          <div className="relative z-10">
            <span className="text-xs font-black tracking-[0.4em] uppercase text-[#05D920] group-hover:text-white transition-colors mb-8 block">
              Core Philosophy
            </span>
            
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[1.1] mb-12 text-black group-hover:text-white transition-colors break-keep">
              경험은 단순히 시간이 아니라,<br />
              <span className="text-[#05D920] group-hover:text-white">문제를 해결해온 횟수</span>입니다.
            </h2>
            
            <p className="text-lg md:text-2xl leading-relaxed text-zinc-600 group-hover:text-white/80 transition-colors max-w-4xl break-keep">
              20년간 마주한 수많은 도전과 실패, 그리고 성공의 서이 
              오늘의 저를 만들었습니다. 이제 그 경험을 여러분의 프로젝트에 
              적용할 준비가 되어 있습니다.
            </p>
          </div>
        </motion.div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={revealVariants}
        className="text-center border-t border-black pt-20"
      >
        <p className="text-[#05D920] font-black tracking-[0.4em] uppercase text-xs mb-12">
          Next Step
        </p>
        
        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-16 break-keep">
          이 경험을 여러분의<br />
          프로젝트에 적용하세요
        </h2>
        
        <div className="flex flex-col md:flex-row justify-center gap-6">
          <Link to="/works">
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: '#05D920', borderColor: '#05D920' }}
              className="px-12 py-6 border-2 border-black bg-transparent text-black font-black text-lg tracking-tighter transition-all uppercase flex items-center gap-3 mx-auto"
            >
              VIEW PORTFOLIO <ArrowRight size={20} />
            </motion.button>
          </Link>
          
          <Link to="/contact">
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: '#000', color: '#fff' }}
              className="px-12 py-6 border-2 border-black bg-white text-black font-black text-lg tracking-tighter transition-all uppercase"
            >
              START PROJECT
            </motion.button>
          </Link>
        </div>
      </motion.section>
      
    </div>
  );
};