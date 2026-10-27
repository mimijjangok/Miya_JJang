import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProjectCardProps {
  title: string;
  category: string;
  image: string;
  index: number;
}

// 각 프로젝트별 상세 내용 (AI 프로젝트에는 보내주신 자정/꿈/새벽 배너 소스를 적용했습니다)
const projectDetails: Record<string, { 
  subtitle: string; 
  description: string; 
  challenge: string; 
  solution: string;
  banners: { title: string; desc: string; bg: string; number: string; text: string; subtext: string }[];
}> = {
  "Brand Identity System": {
    subtitle: "Section 01 / Brand Architecture & CIBI",
    description: "기업의 고유한 철학과 비전을 시각적 언어로 체계화하여, 일관된 아이덴티티와 강력한 브랜드 인지도를 구축한 프로젝트입니다.",
    challenge: "다양한 매체와 디지털 환경에서 브랜드의 통일성을 유지하면서도, 기업의 미래지향적 가치를 세련되게 전달하는 것이 핵심 과제였습니다.",
    solution: "정교한 그리드 시스템과 모던한 타이포그래피를 기반으로 CIBI 가이드라인을 재정립하고, 온·오프라인 전반에 걸친 통합 디자인 시스템을 구축했습니다.",
    banners: [
      { title: "LOGOTYPE SYSTEM", desc: "미니멀리즘 워드마크 및 그리드 가이드", bg: "bg-[#0B132B]", number: "00", text: "자정", subtext: "미니멀리즘 워드마크" },
      { title: "COLOR ARCHITECTURE", desc: "브랜드 시그니처 컬러 및 톤앤매너", bg: "bg-[#1C2541]", number: "02", text: "꿈", subtext: "시그니처 컬러" },
      { title: "STATIONERY APPLIANCE", desc: "오프라인 어플리케이션 시스템", bg: "bg-[#3A506B]", number: "04", text: "새벽", subtext: "어플리케이션 시스템" }
    ]
  },
  "Web Platform Design": {
    subtitle: "Section 02 / Web Homepage Renewal",
    description: "사용자 중심의 정보 구조(IA) 설계와 미니멀한 UI를 결합하여, 브랜드 경험을 극대화한 반응형 웹 플랫폼 디자인입니다.",
    challenge: "복잡하게 얽혀 있던 방대한 콘텐츠를 사용자가 직관적으로 탐색할 수 있도록 단순화하고, 로딩 속도와 시각적 몰입감을 동시에 잡아야 했습니다.",
    solution: "여백의 미를 살린 레이아웃과 부드러운 마이크로 인터랙션을 도입하여 정보 전달력을 높이고 사용자의 체류 시간을 극대화했습니다.",
    banners: [
      { title: "MAIN LANDING", desc: "임팩트 있는 첫인상을 주는 메인 화면", bg: "bg-[#0B132B]", number: "00", text: "자정", subtext: "메인 랜딩" },
      { title: "RESPONSIVE GRID", desc: "모바일과 데스크톱 대응 그리드 시스템", bg: "bg-[#1C2541]", number: "02", text: "꿈", subtext: "그리드 시스템" },
      { title: "INTERACTION FLOW", desc: "사용자 경험을 높이는 마이크로 인터랙션", bg: "bg-[#3A506B]", number: "04", text: "새벽", subtext: "인터랙션 플로우" }
    ]
  },
  "Mobile User Experience": {
    subtitle: "Section 03 / App UI/UX Design",
    description: "모바일 환경에 최적화된 제스처와 직관적인 네비게이션으로 사용자의 일상에 자연스럽게 스며드는 모바일 앱 경험을 설계했습니다.",
    challenge: "다양한 모바일 화면 비율에서도 일관된 조작감을 제공하고, 복잡한 기능들을 가벼운 터치 한 번에 접근할 수 있도록 하는 UX 설계가 필요했습니다.",
    solution: "엄지손가락의 움직임 반경을 고려한 히트맵 기반 UI 배치를 적용하고, 직관적인 피드백 애니메이션으로 사용성(Usability)을 대폭 개선했습니다.",
    banners: [
      { title: "ONBOARDING FLOW", desc: "직관적이고 매끄러운 첫 진입 경험", bg: "bg-[#0B132B]", number: "00", text: "자정", subtext: "온보딩 플로우" },
      { title: "DARK MODE UI", desc: "야간 및 고몰입 환경 최적화 화면", bg: "bg-[#1C2541]", number: "02", text: "꿈", subtext: "다크모드 UI" },
      { title: "GESTURE NAVIGATION", desc: "빠르고 유연한 터치 제스처 시스템", bg: "bg-[#3A506B]", number: "04", text: "새벽", subtext: "제스처 네비게이션" }
    ]
  },
  "Strategic Documentation": {
    subtitle: "Section 04 / Proposal & Strategy",
    description: "비즈니스의 핵심 가치와 실행 전략을 설득력 있는 스토리텔링과 구조화된 시각 자료로 풀어낸 제안서 디자인입니다.",
    challenge: "방대한 비즈니스 로직과 기술적 내용을 클라이언트가 한눈에 이해하고 공감할 수 있도록 시각적으로 명쾌하게 압축하는 것이 과제였습니다.",
    solution: "인포그래픽과 다이어그램 중심의 레이아웃을 구성하고, 핵심 메시지가 강조되는 타이포그래피 위계(Hierarchy)를 적용해 설득력을 극대화했습니다.",
    banners: [
      { title: "STRATEGY OVERVIEW", desc: "핵심 비즈니스 모델 구조화", bg: "bg-[#0B132B]", number: "00", text: "자정", subtext: "전략 개요" },
      { title: "INFOGRAPHIC ARCH", desc: "복잡한 데이터의 시각적 도식화", bg: "bg-[#1C2541]", number: "02", text: "꿈", subtext: "인포그래픽 구조" },
      { title: "EXECUTIVE SUMMARY", desc: "의사결정자를 위한 핵심 요약 페이지", bg: "bg-[#3A506B]", number: "04", text: "새벽", subtext: "핵심 요약" }
    ]
  },
  "Design Leadership": {
    subtitle: "Section 05 / PMPL Leading & Management",
    description: "프로젝트 전반의 디자인 방향성을 리딩하고, 크로스펑셔널 팀과의 유기적인 협업을 이끌어낸 디자인 리더십 케이스입니다.",
    challenge: "다양한 직군의 팀원들과 일관된 목표를 공유하고, 타이트한 일정 속에서도 최상의 크리에이티브 퀄리티를 타협 없이 유지하는 것이 도전이었습니다.",
    solution: "체계적인 디자인 스프린트 프로세스를 도입하고 원활한 커뮤니케이션 허브 역할을 수행하여 프로젝트를 성공적으로 완수했습니다.",
    banners: [
      { title: "DESIGN SYSTEM OPS", desc: "멀티 팀 협업을 위한 디자인 시스템 운영", bg: "bg-[#0B132B]", number: "00", text: "자정", subtext: "디자인 시스템" },
      { title: "SPRINT WORKSHOP", desc: "크로스펑셔널 애자일 워크숍 운영", bg: "bg-[#1C2541]", number: "02", text: "꿈", subtext: "스프린트 워크숍" },
      { title: "ROADMAP ALIGNMENT", desc: "제품 출시 로드맵 수립 및 조율", bg: "bg-[#3A506B]", number: "04", text: "새벽", subtext: "로드맵 정렬" }
    ]
  },
  "AI & Digital Transformation": {
    subtitle: "Section 06 / AI UX Strategy & DX",
    description: "최신 생성형 인공지능 기술과 디자인 프로세스를 융합하여, 복잡한 데이터와 워크플로우를 직관적이고 아름다운 사용자 경험으로 재정의한 프로젝트입니다.",
    challenge: "기존의 경직된 업무 환경에서 인공지능 솔루션을 도입할 때 사용자가 느끼는 진입 장벽을 낮추고, 시각적인 거부감 없이 자연스럽게 업무에 스며들도록 하는 것이 가장 큰 과제였습니다.",
    solution: "미니멀리즘 인터페이스와 고도화된 타이포그래피 시스템을 적용하여 복잡한 알고리즘 결과를 한눈에 파악할 수 있도록 설계하고, 핵심 포인트 컬러로 시인성을 극대화했습니다.",
    banners: [
      { title: "MIDNIGHT ARCHITECTURE", desc: "시간의 흐름에 따른 몰입감 있는 첫 번째 시각 레이어", bg: "bg-[#0B132B]", number: "00", text: "자정", subtext: "MIDNIGHT" },
      { title: "DREAM SEQUENCE", desc: "직관적인 타이포그래피와 깊이감 있는 톤앤매너", bg: "bg-[#1C2541]", number: "02", text: "꿈", subtext: "DREAM" },
      { title: "DAWN TRANSITION", desc: "흐름에 따라 유기적으로 전환되는 인터랙션 디자인", bg: "bg-[#3A506B]", number: "04", text: "새벽", subtext: "DAWN" }
    ]
  }
};

export const ProjectCard = ({ title, category, image, index }: ProjectCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const detail = projectDetails[title] || projectDetails["AI & Digital Transformation"];

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        onClick={() => setIsOpen(true)}
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

      {/* 모달 팝업 창 */}
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
              className="bg-white text-black w-full max-w-5xl max-h-[90vh] overflow-y-auto p-8 md:p-16 relative shadow-2xl"
            >
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 text-xl font-bold bg-black text-white w-10 h-10 flex items-center justify-center hover:bg-[#05D920] hover:text-black transition-colors"
              >
                ✕
              </button>

              <div className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-3">
                {detail.subtitle}
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 uppercase">
                {title}
              </h1>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-12">
                {detail.description}
              </p>

              {/* ✨ 배너 3개 영역 (보내주신 자정/꿈/새벽 소스 적용) */}
              <div className="mb-12">
                <h3 className="text-sm font-mono tracking-widest uppercase text-gray-500 mb-6 border-b border-gray-200 pb-2">
                  Featured Key Visuals & Examples (3 Cases)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {detail.banners.map((banner, bIdx) => (
                    <div key={bIdx} className="bg-zinc-50 border border-zinc-200 p-4 flex flex-col justify-between group">
                      <div className={`w-full h-64 ${banner.bg} mb-4 overflow-hidden relative flex flex-col justify-between p-6`}>
                        <div className="absolute top-3 left-3 bg-white text-black text-[10px] font-mono px-2 py-0.5 font-bold">
                          0{bIdx + 1}
                        </div>
                        <div className="text-white text-5xl font-black tracking-tighter mt-6">{banner.number}</div>
                        <div className="text-white text-2xl font-bold tracking-widest">{banner.text}</div>
                      </div>
                      <div>
                        <h4 className="font-bold text-base mb-1 uppercase tracking-tight">{banner.title}</h4>
                        <p className="text-xs text-gray-600 leading-relaxed">{banner.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Challenge & Solution */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 bg-zinc-50 p-8 border border-zinc-200">
                <div>
                  <h3 className="text-lg font-bold mb-2 uppercase text-[#05D920]">01 / Challenge</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {detail.challenge}
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2 uppercase text-[#05D920]">02 / Solution</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {detail.solution}
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
