export interface ProjectBanner {
  title: string;
  desc: string;
  bg: string;
  number: string;
  text: string;
}

export interface ProjectDetail {
  subtitle: string;
  description: string;
  challenge: string;
  solution: string;
  banners: ProjectBanner[];
  // 실제 사이트 주소 (있을 때만 버튼 표시)
  link?: { label: string; url: string };
}

export interface Project {
  slug: string;
  title: string;
  category: string;
  image: string;
}

// 작업 목록 (WORKS 페이지 순서)
export const projects: Project[] = [
  { slug: "brand-identity", title: "Brand Identity System", category: "기업브랜딩 CIBI", image: "https://images.unsplash.com/photo-1586830746542-19b25c53497f" },
  { slug: "web-platform", title: "Web Platform Design", category: "웹 홈페이지", image: "https://images.unsplash.com/photo-1761792654327-b32d0be2a96b" },
  { slug: "mobile-ux", title: "Mobile User Experience", category: "앱 디자인 UIUX", image: "https://images.unsplash.com/photo-1622212993957-6d4631a0ba8b" },
  { slug: "strategic-documentation", title: "Strategic Documentation", category: "제안문서", image: "https://images.unsplash.com/photo-1693045181676-57199422ee66" },
  { slug: "design-leadership", title: "Design Leadership", category: "PMPL 리딩", image: "https://images.unsplash.com/photo-1765405016361-5881d4f8982b" },
  { slug: "ai-dx", title: "AI & Digital Transformation", category: "AI UX 전략 및 DX", image: "https://images.unsplash.com/photo-1622631407413-bfb7d4aec3b0" }
];

// 각 프로젝트 상세 페이지 내용
export const projectDetails: Record<string, ProjectDetail> = {
  "Brand Identity System": {
    subtitle: "Section 01 / Brand Architecture & CIBI",
    description: "기업의 고유한 철학과 비전을 시각적 언어로 체계화하여, 일관된 아이덴티티와 강력한 브랜드 인지도를 구축한 프로젝트입니다.",
    challenge: "다양한 매체와 디지털 환경에서 브랜드의 통일성을 유지하면서도, 기업의 미래지향적 가치를 세련되게 전달하는 것이 핵심 과제였습니다.",
    solution: "정교한 그리드 시스템과 모던한 타이포그래피를 기반으로 CIBI 가이드라인을 재정립하고, 온·오프라인 전반에 걸친 통합 디자인 시스템을 구축했습니다.",
    banners: [
      { title: "LOGOTYPE SYSTEM", desc: "미니멀리즘 워드마크 및 그리드 가이드", bg: "bg-[#0B132B]", number: "00", text: "자정" },
      { title: "COLOR ARCHITECTURE", desc: "브랜드 시그니처 컬러 및 톤앤매너", bg: "bg-[#1C2541]", number: "02", text: "꿈" },
      { title: "STATIONERY APPLIANCE", desc: "오프라인 어플리케이션 시스템", bg: "bg-[#3A506B]", number: "04", text: "새벽" }
    ]
  },
  "Web Platform Design": {
    subtitle: "Section 02 / Web Homepage Renewal",
    link: { label: "www.goest.co.kr", url: "https://www.goest.co.kr" },
    description: "사용자 중심의 정보 구조(IA) 설계와 미니멀한 UI를 결합하여, 브랜드 경험을 극대화한 반응형 웹 플랫폼 디자인입니다.",
    challenge: "복잡하게 얽혀 있던 방대한 콘텐츠를 사용자가 직관적으로 탐색할 수 있도록 단순화하고, 로딩 속도와 시각적 몰입감을 동시에 잡아야 했습니다.",
    solution: "여백의 미를 살린 레이아웃과 부드러운 마이크로 인터랙션을 도입하여 정보 전달력을 높이고 사용자의 체류 시간을 극대화했습니다.",
    banners: [
      { title: "MAIN LANDING", desc: "임팩트 있는 첫인상을 주는 메인 화면", bg: "bg-[#0B132B]", number: "00", text: "자정" },
      { title: "RESPONSIVE GRID", desc: "모바일과 데스크톱 대응 그리드 시스템", bg: "bg-[#1C2541]", number: "02", text: "꿈" },
      { title: "INTERACTION FLOW", desc: "사용자 경험을 높이는 마이크로 인터랙션", bg: "bg-[#3A506B]", number: "04", text: "새벽" }
    ]
  },
  "Mobile User Experience": {
    subtitle: "Section 03 / App UI/UX Design",
    description: "모바일 환경에 최적화된 제스처와 직관적인 네비게이션으로 사용자의 일상에 자연스럽게 스며드는 모바일 앱 경험을 설계했습니다.",
    challenge: "다양한 모바일 화면 비율에서도 일관된 조작감을 제공하고, 복잡한 기능들을 가벼운 터치 한 번에 접근할 수 있도록 하는 UX 설계가 필요했습니다.",
    solution: "엄지손가락의 움직임 반경을 고려한 히트맵 기반 UI 배치를 적용하고, 직관적인 피드백 애니메이션으로 사용성(Usability)을 대폭 개선했습니다.",
    banners: [
      { title: "ONBOARDING FLOW", desc: "직관적이고 매끄러운 첫 진입 경험", bg: "bg-[#0B132B]", number: "00", text: "자정" },
      { title: "DARK MODE UI", desc: "야간 및 고몰입 환경 최적화 화면", bg: "bg-[#1C2541]", number: "02", text: "꿈" },
      { title: "GESTURE NAVIGATION", desc: "빠르고 유연한 터치 제스처 시스템", bg: "bg-[#3A506B]", number: "04", text: "새벽" }
    ]
  },
  "Strategic Documentation": {
    subtitle: "Section 04 / Proposal & Strategy",
    description: "비즈니스의 핵심 가치와 실행 전략을 설득력 있는 스토리텔링과 구조화된 시각 자료로 풀어낸 제안서 디자인입니다.",
    challenge: "방대한 비즈니스 로직과 기술적 내용을 클라이언트가 한눈에 이해하고 공감할 수 있도록 시각적으로 명쾌하게 압축하는 것이 과제였습니다.",
    solution: "인포그래픽과 다이어그램 중심의 레이아웃을 구성하고, 핵심 메시지가 강조되는 타이포그래피 위계(Hierarchy)를 적용해 설득력을 극대화했습니다.",
    banners: [
      { title: "STRATEGY OVERVIEW", desc: "핵심 비즈니스 모델 구조화", bg: "bg-[#0B132B]", number: "00", text: "자정" },
      { title: "INFOGRAPHIC ARCH", desc: "복잡한 데이터의 시각적 도식화", bg: "bg-[#1C2541]", number: "02", text: "꿈" },
      { title: "EXECUTIVE SUMMARY", desc: "의사결정자를 위한 핵심 요약 페이지", bg: "bg-[#3A506B]", number: "04", text: "새벽" }
    ]
  },
  "Design Leadership": {
    subtitle: "Section 05 / PMPL Leading & Management",
    description: "프로젝트 전반의 디자인 방향성을 리딩하고, 크로스펑셔널 팀과의 유기적인 협업을 이끌어낸 디자인 리더십 케이스입니다.",
    challenge: "다양한 직군의 팀원들과 일관된 목표를 공유하고, 타이트한 일정 속에서도 최상의 크리에이티브 퀄리티를 타협 없이 유지하는 것이 도전이었습니다.",
    solution: "체계적인 디자인 스프린트 프로세스를 도입하고 원활한 커뮤니케이션 허브 역할을 수행하여 프로젝트를 성공적으로 완수했습니다.",
    banners: [
      { title: "DESIGN SYSTEM OPS", desc: "멀티 팀 협업을 위한 디자인 시스템 운영", bg: "bg-[#0B132B]", number: "00", text: "자정" },
      { title: "SPRINT WORKSHOP", desc: "크로스펑셔널 애자일 워크숍 운영", bg: "bg-[#1C2541]", number: "02", text: "꿈" },
      { title: "ROADMAP ALIGNMENT", desc: "제품 출시 로드맵 수립 및 조율", bg: "bg-[#3A506B]", number: "04", text: "새벽" }
    ]
  },
  "AI & Digital Transformation": {
    subtitle: "Section 06 / AI UX Strategy & DX",
    description: "최신 생성형 인공지능 기술과 디자인 프로세스를 융합하여, 복잡한 데이터와 워크플로우를 직관적이고 아름다운 사용자 경험으로 재정의한 프로젝트입니다.",
    challenge: "기존의 경직된 업무 환경에서 인공지능 솔루션을 도입할 때 사용자가 느끼는 진입 장벽을 낮추고, 시각적인 거부감 없이 자연스럽게 업무에 스며들도록 하는 것이 가장 큰 과제였습니다.",
    solution: "미니멀리즘 인터페이스와 고도화된 타이포그래피 시스템을 적용하여 복잡한 알고리즘 결과를 한눈에 파악할 수 있도록 설계하고, 핵심 포인트 컬러로 시인성을 극대화했습니다.",
    banners: [
      { title: "MIDNIGHT ARCHITECTURE", desc: "시간의 흐름에 따른 몰입감 있는 첫 번째 시각 레이어", bg: "bg-[#0B132B]", number: "00", text: "자정" },
      { title: "DREAM SEQUENCE", desc: "직관적인 타이포그래피와 깊이감 있는 톤앤매너", bg: "bg-[#1C2541]", number: "02", text: "꿈" },
      { title: "DAWN TRANSITION", desc: "흐름에 따라 유기적으로 전환되는 인터랙션 디자인", bg: "bg-[#3A506B]", number: "04", text: "새벽" }
    ]
  }
};

export const getProjectByTitle = (title: string) =>
  projects.find((p) => p.title === title);

export const getProjectBySlug = (slug?: string) =>
  projects.find((p) => p.slug === slug);
