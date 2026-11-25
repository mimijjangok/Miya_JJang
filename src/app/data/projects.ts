// ─────────────────────────────────────────────
// WORKS 데이터
// 1단계: categories (WORKS 페이지 배너 6개)
// 2단계: 배너를 누르면 그 분류의 works 썸네일 목록
// 3단계: 썸네일을 누르면 작업 상세 페이지
// 새 작업은 아래 works 배열에 하나씩 추가하면 됩니다.
// ─────────────────────────────────────────────

export interface Category {
  slug: string;
  title: string;
  category: string;
  image: string;
  subtitle: string;
  description: string;
  challenge: string;
  solution: string;
}

export interface WorkInfo {
  client?: string;
  year?: string;
  role?: string;
  target?: string;      // 타겟층
  expression?: string;  // 표현방법
  concept?: string;     // 디자인 컨셉
  colors?: { name: string; hex: string }[]; // 주색상
  tools?: string;
}

export interface Work {
  slug: string;
  category: string;     // Category.slug
  name: string;
  desc?: string;
  thumb: string;
  link?: { label: string; url: string };
  info?: WorkInfo;
  overview?: string;
  challenge?: string;
  solution?: string;
  // "pc-mobile"이면 첫 이미지는 PC(넓게), 둘째는 모바일(좁게)로 나란히
  layout?: "pc-mobile";
  images: { src: string; alt: string }[];
  // 고객사 소개 (로고 시트 아래에 표시)
  about?: { title: string; lead: string; body: string[]; facts?: { label: string; value: string }[] };
  // 특별 컴포넌트로 그리는 시트 (선명한 벡터 로고 등)
  custom?: "goest-brand";
  // 이미지 아래 추가 섹션 (작은 원본은 원래 크기로 선명하게)
  extras?: { title: string; desc?: string; images: { src: string; alt: string; caption?: string }[] }[];
  // 컬러 시스템 (이미지 아래에 색상 칩으로 표시)
  palette?: { group: string; colors: { name: string; hex: string }[] }[];
}

export const categories: Category[] = [
  {
    slug: "brand-identity",
    title: "Brand Identity System",
    category: "기업브랜딩 CIBI",
    image: "https://images.unsplash.com/photo-1586830746542-19b25c53497f",
    subtitle: "Section 01 / Brand Architecture & CIBI",
    description: "기업의 고유한 철학과 비전을 시각적 언어로 체계화하여, 일관된 아이덴티티와 강력한 브랜드 인지도를 구축한 프로젝트입니다.",
    challenge: "다양한 매체와 디지털 환경에서 브랜드의 통일성을 유지하면서도, 기업의 미래지향적 가치를 세련되게 전달하는 것이 핵심 과제였습니다.",
    solution: "정교한 그리드 시스템과 모던한 타이포그래피를 기반으로 CIBI 가이드라인을 재정립하고, 온·오프라인 전반에 걸친 통합 디자인 시스템을 구축했습니다.",
  },
  {
    slug: "web-platform",
    title: "Web Platform Design",
    category: "웹 홈페이지",
    image: "https://images.unsplash.com/photo-1761792654327-b32d0be2a96b",
    subtitle: "Section 02 / Web Homepage Renewal",
    description: "사용자 중심의 정보 구조(IA) 설계와 미니멀한 UI를 결합하여, 브랜드 경험을 극대화한 반응형 웹 플랫폼 디자인입니다.",
    challenge: "복잡하게 얽혀 있던 방대한 콘텐츠를 사용자가 직관적으로 탐색할 수 있도록 단순화하고, 로딩 속도와 시각적 몰입감을 동시에 잡아야 했습니다.",
    solution: "여백의 미를 살린 레이아웃과 부드러운 마이크로 인터랙션을 도입하여 정보 전달력을 높이고 사용자의 체류 시간을 극대화했습니다.",
  },
  {
    slug: "mobile-ux",
    title: "Mobile User Experience",
    category: "앱 디자인 UIUX",
    image: "https://images.unsplash.com/photo-1622212993957-6d4631a0ba8b",
    subtitle: "Section 03 / App UI/UX Design",
    description: "모바일 환경에 최적화된 제스처와 직관적인 네비게이션으로 사용자의 일상에 자연스럽게 스며드는 모바일 앱 경험을 설계했습니다.",
    challenge: "다양한 모바일 화면 비율에서도 일관된 조작감을 제공하고, 복잡한 기능들을 가벼운 터치 한 번에 접근할 수 있도록 하는 UX 설계가 필요했습니다.",
    solution: "엄지손가락의 움직임 반경을 고려한 히트맵 기반 UI 배치를 적용하고, 직관적인 피드백 애니메이션으로 사용성(Usability)을 대폭 개선했습니다.",
  },
  {
    slug: "strategic-documentation",
    title: "Strategic Documentation",
    category: "제안문서",
    image: "https://images.unsplash.com/photo-1693045181676-57199422ee66",
    subtitle: "Section 04 / Proposal & Strategy",
    description: "비즈니스의 핵심 가치와 실행 전략을 설득력 있는 스토리텔링과 구조화된 시각 자료로 풀어낸 제안서 디자인입니다.",
    challenge: "방대한 비즈니스 로직과 기술적 내용을 클라이언트가 한눈에 이해하고 공감할 수 있도록 시각적으로 명쾌하게 압축하는 것이 과제였습니다.",
    solution: "인포그래픽과 다이어그램 중심의 레이아웃을 구성하고, 핵심 메시지가 강조되는 타이포그래피 위계(Hierarchy)를 적용해 설득력을 극대화했습니다.",
  },
  {
    slug: "design-leadership",
    title: "Design Leadership",
    category: "PMPL 리딩",
    image: "https://images.unsplash.com/photo-1765405016361-5881d4f8982b",
    subtitle: "Section 05 / PMPL Leading & Management",
    description: "프로젝트 전반의 디자인 방향성을 리딩하고, 크로스펑셔널 팀과의 유기적인 협업을 이끌어낸 디자인 리더십 케이스입니다.",
    challenge: "다양한 직군의 팀원들과 일관된 목표를 공유하고, 타이트한 일정 속에서도 최상의 크리에이티브 퀄리티를 타협 없이 유지하는 것이 도전이었습니다.",
    solution: "체계적인 디자인 스프린트 프로세스를 도입하고 원활한 커뮤니케이션 허브 역할을 수행하여 프로젝트를 성공적으로 완수했습니다.",
  },
  {
    slug: "ai-dx",
    title: "AI & Digital Transformation",
    category: "AI UX 전략 및 DX",
    image: "https://images.unsplash.com/photo-1622631407413-bfb7d4aec3b0",
    subtitle: "Section 06 / AI UX Strategy & DX",
    description: "최신 생성형 인공지능 기술과 디자인 프로세스를 융합하여, 복잡한 데이터와 워크플로우를 직관적이고 아름다운 사용자 경험으로 재정의한 프로젝트입니다.",
    challenge: "기존의 경직된 업무 환경에서 인공지능 솔루션을 도입할 때 사용자가 느끼는 진입 장벽을 낮추고, 시각적인 거부감 없이 자연스럽게 업무에 스며들도록 하는 것이 가장 큰 과제였습니다.",
    solution: "미니멀리즘 인터페이스와 고도화된 타이포그래피 시스템을 적용하여 복잡한 알고리즘 결과를 한눈에 파악할 수 있도록 설계하고, 핵심 포인트 컬러로 시인성을 극대화했습니다.",
  }
];

export const works: Work[] = [
  {
    slug: "woosung",
    category: "brand-identity",
    name: "(주)우성산업기술 · WOOSUNG Industries",
    desc: "CI 로고 디자인과 회사 서식(폴더·명함) 어플리케이션",
    thumb: "/works/brand/woosung-folder.jpg",
    info: {
      client: "(주)우성산업기술",
      role: "CI 디자인 · 어플리케이션 디자인",
      target: "B2B 거래처 · 협력사",
      expression: "로고타입 · 서식 어플리케이션",
      concept: "겹쳐진 W 이니셜과 오렌지·네이비 대비로 신뢰감 있는 산업기술 기업 이미지",
      colors: [
        { name: "ORANGE", hex: "#F7941D" },
        { name: "NAVY", hex: "#2E3192" },
      ],
      tools: "Illustrator · Photoshop",
    },
    images: [
      { src: "/works/brand/woosung-logo.jpg", alt: "WOOSUNG Industries 로고" },
      { src: "/works/brand/woosung-folder.jpg", alt: "WOOSUNG Industries 폴더 디자인" },
      { src: "/works/brand/woosung-card.jpg", alt: "(주)우성산업기술 명함 디자인" },
    ],
  },
  {
    slug: "goest-brand",
    category: "brand-identity",
    name: "지오이스트 · GOEST",
    desc: "로고 및 브랜딩 (심볼·국문·영문 로고, 앱 아이콘, PPT)",
    thumb: "/works/brand/goest-logo.png",
    link: { label: "www.goest.co.kr", url: "https://www.goest.co.kr" },
    info: {
      client: "지오이스트 (GOEST)",
      role: "로고 디자인 · 브랜드 아이덴티티",
      target: "기업 IT 담당자 · B2B 고객",
      expression: "심볼마크 · 로고타입 · 컬러 시스템 · PPT",
      concept: "G 이니셜을 원형 흐름으로 감싼 심볼과 선명한 블루로 AI·SI 기술 기업의 연결과 신뢰를 표현",
      colors: [
        { name: "BLUE", hex: "#3268F4" },
        { name: "BLACK", hex: "#0A0A0A" },
        { name: "WHITE", hex: "#FFFFFF" },
      ],
      tools: "Illustrator · Figma · PowerPoint",
    },
    about: {
      title: "About GOEST",
      lead: "AI 보안 솔루션과 SI를 함께하는 IT 인프라 전문 기업",
      body: [
        "지오이스트는 첨단 AI 기술로 새로운 가치를 만들고, 검증된 SI 역량으로 안정적인 IT 인프라를 구축하는 기업입니다. '창의와 혁신, 도전'을 바탕으로 고객과 함께 성장하는 파트너를 지향합니다.",
        "대표 제품 ABSR(Anti-Bot Security Resource)은 AI가 만든 크롤러 트래픽을 탐지·차단하는 L7 레벨 보안 솔루션입니다. 여기에 네트워크 설계·구축, IT 인프라 통합, 다층 보안, 빅데이터 기반 위협 분석까지 함께 제공합니다.",
        "2026년 이노비즈 A등급 인증, '혁신 프리미어 1000' 선정, ABSR V1.0 보안기능확인서 발급 등으로 기술력을 인정받고 있으며, 대학·공공기관·병원 등 다양한 고객의 인프라를 맡고 있습니다.",
      ],
      facts: [
        { label: "Business", value: "AI Solution · SI Service" },
        { label: "Product", value: "ABSR (AI 방화벽 · L7 보안)" },
        { label: "Expertise", value: "Zero Trust · Network Security · DDoS Protection · XDR" },
        { label: "Clients", value: "국민대학교 · 서울대학교병원 · 방송통신위원회 등" },
      ],
    },
    custom: "goest-brand",
    images: [],
    extras: [
      {
        title: "PPT · 회사소개서 / 제품소개서",
        desc: "브랜드 컬러와 심볼을 적용한 회사소개·제품소개 프레젠테이션 표지",
        images: [
          { src: "/works/brand/goest-ppt-company.png", alt: "지오이스트 회사소개서 표지", caption: "회사소개서" },
          { src: "/works/brand/goest-ppt-product.png", alt: "지오이스트 제품소개서(ABSR) 표지", caption: "제품소개서 · ABSR" },
        ],
      },
    ],
  },
  {
    slug: "goest",
    category: "web-platform",
    name: "지오이스트 · GOEST",
    desc: "AI 솔루션·SI 기업 홈페이지 디자인",
    thumb: "/works/web/goest-hero.jpg",
    link: { label: "www.goest.co.kr", url: "https://www.goest.co.kr" },
    info: {
      client: "지오이스트 (GOEST)",
      role: "웹 디자인 · UI 디자인",
      target: "기업 IT 담당자 · B2B 고객",
      expression: "타이포그래피 · 그래픽",
      concept: "큰 영문 타이포와 선명한 블루로 AI·SI 기술 기업의 혁신과 신뢰를 표현",
      colors: [
        { name: "BLUE", hex: "#3B4AF0" },
        { name: "WHITE", hex: "#FFFFFF" },
        { name: "NAVY", hex: "#0B0F3B" },
      ],
      tools: "Figma · Photoshop",
    },
    images: [
      { src: "/works/web/goest-hero.jpg", alt: "지오이스트 홈페이지 메인 화면" },
      { src: "/works/web/goest-solution.jpg", alt: "지오이스트 홈페이지 솔루션 섹션" },
    ],
  },
  {
    slug: "nec-platform",
    category: "web-platform",
    name: "국가교육위원회 · 국민의견플랫폼",
    desc: "국민 참여형 공공 플랫폼 PC·모바일 반응형 디자인",
    thumb: "/works/web/nec-thumb.jpg",
    info: {
      client: "국가교육위원회",
      role: "웹·모바일 UI 디자인",
      target: "국민 누구나 (학생·학부모·교육 관계자)",
      expression: "인물 사진 · 카드 UI · 반응형",
      concept: "따뜻한 가족 사진과 청록·블루 카드로 누구나 쉽게 참여하는 열린 소통 공간",
      colors: [
        { name: "TEAL", hex: "#17C3B2" },
        { name: "BLUE", hex: "#2F6BE6" },
        { name: "CORAL", hex: "#F25C5C" },
      ],
      tools: "Figma · Photoshop",
    },
    overview: "국민이 국가교육과정과 교육정책에 대한 의견을 제시하고 동의할 수 있도록 만든 국가교육위원회 국민의견플랫폼의 PC·모바일 반응형 디자인입니다.",
    challenge: "학생·학부모부터 교육 관계자까지 연령과 디지털 숙련도가 다른 모든 국민이 복잡한 요청·동의 절차를 어렵지 않게 이해하고 참여하도록 하는 것이 핵심 과제였습니다.",
    solution: "따뜻한 인물 사진으로 공공 사이트의 딱딱함을 덜고, 요청 유형별로 컬러를 나눈 카드 UI에 요청 주제·대상·제출 방법을 한눈에 정리해 참여 동선을 단순화했습니다.",
    layout: "pc-mobile",
    images: [
      { src: "/works/web/nec-pc.jpg", alt: "국민의견플랫폼 PC 메인 화면" },
      { src: "/works/web/nec-mobile.jpg", alt: "국민의견플랫폼 모바일 메인 화면" },
    ],
  },
];

export const getCategory = (slug?: string) => categories.find((c) => c.slug === slug);
export const getCategoryByTitle = (title: string) => categories.find((c) => c.title === title);
export const getWorksByCategory = (slug: string) => works.filter((w) => w.category === slug);
export const getWork = (cat?: string, slug?: string) =>
  works.find((w) => w.category === cat && w.slug === slug);

// ─────────────────────────────────────────────
// 무료 템플릿 (제안문서 목록 위 FREE TEMPLATES 코너)
// 파일은 public/templates 폴더에 넣고 여기에 한 줄씩 추가
// ─────────────────────────────────────────────
export interface FreeTemplate {
  slug: string;
  category: string; // 보여 줄 분류 (Category.slug)
  name: string;
  desc: string;
  pages: string;
  format: string;
  cover: string;
  preview: string;
  file: string;
}

export const freeTemplates: FreeTemplate[] = [
  {
    slug: "proposal",
    category: "strategic-documentation",
    name: "프로젝트 제안서 템플릿",
    desc: "표지·목차·개요·현황 분석·전략·일정·예산·기대 효과·마무리까지 제안서 흐름을 그대로 담은 템플릿",
    pages: "10p",
    format: "PPTX · 16:9",
    cover: "/templates/proposal-cover.jpg",
    preview: "/templates/proposal-pages.jpg",
    file: "/templates/MI3_Free_Proposal_Template.pptx",
  },
  {
    slug: "company",
    category: "strategic-documentation",
    name: "회사소개서 템플릿",
    desc: "회사 소개·비전·핵심 가치·사업 영역·성과·연혁·고객사·연락처로 구성한 회사소개서 템플릿",
    pages: "10p",
    format: "PPTX · 16:9",
    cover: "/templates/company-cover.jpg",
    preview: "/templates/company-pages.jpg",
    file: "/templates/MI3_Free_Company_Profile_Template.pptx",
  },
];
