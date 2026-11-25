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
  // 목록 썸네일을 로고/이름 글자로 보여 줄 때 (logo 이미지가 있으면 로고, 없으면 text)
  thumbCard?: { bg: string; color?: string; logo?: string; text?: string; sub?: string };
  // textOnly: 사이트가 열리지 않을 때 주소만 글자로 표시 (클릭·바로가기 버튼 없음)
  link?: { label: string; url: string; textOnly?: boolean };
  info?: WorkInfo;
  overview?: string;
  challenge?: string;
  solution?: string;
  // "pc-mobile"이면 첫 이미지는 PC(넓게), 둘째는 모바일(좁게)로 나란히
  // "pc-mobile": PC(넓게)+모바일(좁게) / "phones": 앱 화면 여러 장을 나란히
  // "cover-grid": 표지만 크게, 나머지 페이지는 그 아래 작게 한 줄로
  layout?: "pc-mobile" | "phones" | "cover-grid";
  // 이미지 위에 크게 보여 줄 대표 이미지 (로고 등)
  hero?: { src: string; alt: string };
  images: { src: string; alt: string }[];
  // 고객사 소개 (로고 시트 아래에 표시)
  about?: { title: string; lead: string; body: string[]; facts?: { label: string; value: string }[] };
  // 특별 컴포넌트로 그리는 시트 (선명한 벡터 로고 등)
  custom?: "goest-brand";
  // 이미지 아래 추가 섹션 (작은 원본은 원래 크기로 선명하게)
  extras?: { title: string; desc?: string; images: { src: string; alt: string; caption?: string }[] }[];
  // 컬러 시스템 (이미지 아래에 색상 칩으로 표시)
  // 앱 아이콘 (제목 왼쪽에 작게 표시)
  icon?: string;
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
    thumbCard: { bg: "#F1F1F1", logo: "/works/brand/woosung-logo-trim.png" },
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
    thumb: "/works/brand/goest-thumb.jpg",
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
    slug: "absr",
    category: "brand-identity",
    name: "지오이스트 ABSR · AI 솔루션 로고",
    desc: "AI 보안 솔루션 ABSR(Anti-Bot Security Resource) 제품 로고 · 가로형/세로형, 다크/라이트 버전",
    thumb: "/works/brand/absr-thumb.jpg",
    info: {
      client: "지오이스트 (GOEST)",
      role: "제품 로고 디자인",
      target: "기업 보안 담당자 · B2B 고객",
      expression: "심볼마크 · 로고타입 · 그라데이션",
      concept: "흩어진 데이터가 이어지는 유기적 형태의 심볼과 블루→퍼플 그라데이션, 오렌지 점으로 '탐지되는 봇'을 표현한 AI 보안 솔루션 로고",
      colors: [
        { name: "BLUE", hex: "#0A6CFF" },
        { name: "PURPLE", hex: "#7A12C8" },
        { name: "ORANGE", hex: "#FF4B2B" },
        { name: "NAVY", hex: "#1A0B78" },
      ],
      tools: "Illustrator",
    },
    overview: "지오이스트의 AI 기반 크롤러 트래픽 탐지·차단 솔루션 ABSR(Anti-Bot Security Resource)의 제품 로고입니다. 가로형·세로형 조합과 다크·라이트 배경 버전, 슬로건 포함·미포함 버전까지 정리했습니다.",
    images: [
      { src: "/works/brand/absr-logo-v1.jpg", alt: "ABSR 로고 · 슬로건 포함 버전" },
      { src: "/works/brand/absr-logo-v2.jpg", alt: "ABSR 로고 · 심볼+로고타입 버전" },
    ],
    extras: [
      {
        title: "PPT · ABSR 제품소개서",
        desc: "로고의 블루·퍼플 그라데이션과 원형 그래픽을 적용한 제품소개 프레젠테이션",
        images: [
          { src: "/works/brand/absr-ppt-cover.png", alt: "ABSR 제품소개서 표지", caption: "표지" },
          { src: "/works/brand/absr-ppt-p1.png", alt: "ABSR 제품소개서 Product Overview · 보안장비간 로그 상관관계 분석", caption: "Product Overview 01" },
          { src: "/works/brand/absr-ppt-p2.png", alt: "ABSR 제품소개서 Product Overview · Bot 트래픽 비율 증가", caption: "Product Overview 01" },
          { src: "/works/brand/absr-ppt-thanks.png", alt: "ABSR 제품소개서 마지막 장 · 감사합니다", caption: "Closing" },
        ],
      },
    ],
  },
  {
    slug: "sechan",
    category: "brand-identity",
    name: "(주)세찬아이앤씨 · SECHAN I&C",
    desc: "공공기관 유지보수 및 웹/앱 사이트 제작·개발 기업 CI 로고 · 국문/영문, 가로형/세로형, 컬러 배경 버전",
    thumb: "/works/brand/sechan-thumb.jpg",
    link: { label: "www.sechaninc.co.kr", url: "https://www.sechaninc.co.kr/", textOnly: true },
    info: {
      client: "(주)세찬아이앤씨 (Sechan I&C Corp.)",
      role: "CI 로고 디자인",
      target: "공공기관 · B2G/B2B 고객",
      expression: "심볼마크 · 로고타입 · 컬러 시스템",
      concept: "육각형 안에서 맞물리는 S 이니셜과 바이올렛·시안·오렌지 띠로 공공 시스템을 안정적으로 잇고 만드는 IT 기업을 표현",
      colors: [
        { name: "VIOLET", hex: "#2B02BC" },
        { name: "BLUE", hex: "#2424C7" },
        { name: "CYAN", hex: "#00D0FF" },
        { name: "ORANGE", hex: "#FF4800" },
      ],
      tools: "Illustrator",
    },
    overview: "공공기관 유지보수와 웹/앱 사이트 제작·개발을 하는 (주)세찬아이앤씨의 CI 로고입니다. 국문·영문 로고타입, 가로형·세로형 조합, 화이트·컬러 배경 버전까지 정리했습니다.",
    images: [
      { src: "/works/brand/sechan-logo.png", alt: "(주)세찬아이앤씨 국문·영문 로고" },
      { src: "/works/brand/sechan-versions.png", alt: "SECHAN 로고 · 화이트/컬러 배경, 세로형 버전" },
    ],
    palette: [
      {
        group: "Brand Colors",
        colors: [
          { name: "VIOLET", hex: "#2B02BC" },
          { name: "BLUE", hex: "#2424C7" },
          { name: "CYAN", hex: "#00D0FF" },
          { name: "ORANGE", hex: "#FF4800" },
        ],
      },
    ],
    extras: [
      {
        title: "PPT · 재난관리자원 통합관리 시스템 제안서",
        desc: "2025년 한국지역정보개발원(KLID) 재난관리자원 통합관리 시스템 유지관리 및 기술지원 제안 프레젠테이션",
        images: [
          { src: "/works/brand/sechan-ppt-cover.png", alt: "재난관리자원 통합관리 시스템 제안서 표지", caption: "표지" },
          { src: "/works/brand/sechan-ppt-toc.png", alt: "재난관리자원 통합관리 시스템 제안서 목차", caption: "목차" },
          { src: "/works/brand/sechan-ppt-p1.png", alt: "재난관리자원 통합관리 시스템 제안서 · 사업 범위에 대한 이해", caption: "사업 범위에 대한 이해" },
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
    thumbCard: { bg: "#3B4AF0", color: "#FFFFFF", text: "GOEST", sub: "지오이스트 홈페이지" },
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
    slug: "hana-hics",
    category: "web-platform",
    name: "하나은행 · 준법시스템 HiCS",
    desc: "하나은행 내부통제 준법시스템(Hana Internal Control System) 대시보드형 웹 UI 디자인 · WebSquare 기반",
    thumb: "/works/web/hics-banner.jpg",
    thumbCard: { bg: "#18A084", color: "#FFFFFF", text: "하나은행 준법시스템", sub: "HiCS · Hana Internal Control System" },
    info: {
      client: "하나은행",
      year: "2024",
      role: "대시보드 UI 디자인 · 오픈 홍보 배너",
      target: "하나은행 임직원 · 준법·내부통제 담당자",
      expression: "대시보드 위젯 · 카드 UI · 배경 테마 설정",
      concept: "풍경 사진 위에 TO-DO LIST·공지·결재 위젯을 띄운 대시보드로, 매일 쓰는 내부 시스템을 '빠르고 편리하게' 바꾼 경험",
      colors: [
        { name: "GREEN", hex: "#18A084" },
        { name: "RED", hex: "#D5002B" },
        { name: "CHARCOAL", hex: "#2C2C2C" },
      ],
      tools: "WebSquare · Photoshop",
    },
    overview: "하나은행 임직원이 사용하는 준법시스템 HiCS(Hana Internal Control System)를 대시보드 형태로 고도화한 작업입니다. WebSquare를 사용해 메인 대시보드와 배경 설정 화면을 만들었고, 2024년 1월 오픈을 알리는 홍보 배너도 함께 디자인했습니다.",
    hero: { src: "/works/web/hics-logo.png", alt: "HiCS 하나은행 준법시스템 로고" },
    images: [
      { src: "/works/web/hics-banner.jpg", alt: "HiCS 오픈 홍보 배너 · 빠르고 편리해진 준법시스템" },
      { src: "/works/web/hics-main-day.jpg", alt: "HiCS 메인 대시보드 · 일몰 배경 테마" },
      { src: "/works/web/hics-main-night.jpg", alt: "HiCS 메인 대시보드 · 야경 배경 테마" },
      { src: "/works/web/hics-bg-setting.jpg", alt: "HiCS 배경 설정 팝업" },
    ],
  },
  {
    slug: "lg-thinq-voice",
    category: "web-platform",
    name: "LG전자 · ThinQ Voice 신규 페이지",
    desc: "LG ThinQ Voice Command Book 모바일웹 신규 제작 및 LG전자 반응형 신규 페이지 디자인",
    thumb: "/works/web/lg-thumb.jpg",
    thumbCard: { bg: "#A50034", color: "#FFFFFF", text: "LG ThinQ", sub: "Voice Command Book" },
    info: {
      client: "LG전자",
      role: "모바일웹 · 반응형 웹 UI 디자인",
      target: "LG ThinQ 사용자 · 글로벌 LG전자 고객",
      expression: "반응형 레이아웃 · 카드 UI · 아이콘",
      concept: "LG 레드 포인트와 간결한 화이트 카드로, 리모컨·핸즈프리·AI 스피커별 음성 명령을 누구나 쉽게 찾아보는 디지털 보이스 커맨드북",
      colors: [
        { name: "LG RED", hex: "#A50034" },
        { name: "CHARCOAL", hex: "#2F3237" },
        { name: "WHITE", hex: "#FFFFFF" },
      ],
      tools: "Sketch",
    },
    overview: "LG ThinQ 음성 명령을 기기와 기능별로 찾아볼 수 있는 Digital Voice Command Book 모바일웹을 새로 만들고, 그 밖에 개발되는 LG전자 신규 페이지를 반응형으로 디자인했습니다.",
    layout: "phones",
    images: [
      { src: "/works/web/lg-thinq-start.jpg", alt: "ThinQ 시작 화면" },
      { src: "/works/web/lg-thinq-controller.jpg", alt: "ThinQ 컨트롤러 선택 화면" },
      { src: "/works/web/lg-thinq-function.jpg", alt: "ThinQ 기능별 음성 명령 화면" },
    ],
    extras: [
      {
        title: "반응형 · LG전자 신규 페이지",
        desc: "모바일웹 외에 개발된 LG전자 메인·OLED 제품 상세 신규 페이지 (반응형)",
        images: [
          { src: "/works/web/lg-main.jpg", alt: "LG전자 메인 신규 페이지", caption: "메인" },
          { src: "/works/web/lg-oled.jpg", alt: "LG OLED 제품 상세 신규 페이지", caption: "OLED 제품 상세" },
        ],
      },
    ],
  },
  {
    slug: "nec-platform",
    category: "web-platform",
    name: "국가교육위원회 · 국민의견플랫폼",
    desc: "국민 참여형 공공 플랫폼 PC·모바일 반응형 디자인",
    thumb: "/works/web/nec-thumb.jpg",
    thumbCard: { bg: "#17C3B2", color: "#FFFFFF", text: "국민의견플랫폼", sub: "국가교육위원회" },
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
  {
    slug: "moduva",
    category: "web-platform",
    name: "MODUVA · 모두바 공식 홈페이지",
    desc: "캐릭터·로고·웹앱 디자인 스튜디오 모바일 퍼스트 홈페이지 · 기획부터 디자인·퍼블리싱·배포까지",
    thumb: "/works/web/moduva-og.jpg",
    thumbCard: { bg: "#F7667A", color: "#FFFFFF", text: "MODUVA", sub: "모두바 공식 홈페이지" },
    link: { label: "moduva.pages.dev", url: "https://moduva.pages.dev" },
    info: {
      client: "MODUVA (자체 브랜드)",
      year: "2026",
      role: "기획 · 브랜드 · UI 디자인 · 퍼블리싱",
      target: "캐릭터·로고·홈페이지가 필요한 소상공인 · 스타트업",
      expression: "3D 캐릭터 · 카드형 UI · 모바일 퍼스트",
      concept: "'모두 볼 수 있다'는 이름처럼 누구나 아이디어를 말하고 완성할 수 있는 스튜디오. 3D 캐릭터와 부드러운 파스텔 카드, 핑크 포인트로 친근하고 쉽게 의뢰할 수 있는 경험을 표현",
      colors: [
        { name: "PINK", hex: "#F7667A" },
        { name: "INK", hex: "#111111" },
        { name: "LAVENDER", hex: "#E6E4FF" },
      ],
      tools: "Figma · Photoshop · AI Claude",
    },
    overview: "캐릭터부터 로고, 웹·앱까지 한곳에서 만드는 크리에이티브 스튜디오 MODUVA의 공식 홈페이지입니다. 브랜드 기획과 캐릭터 활용, 화면 디자인부터 퍼블리싱·배포까지 직접 진행했고, 개발은 AI Claude와 협업해 빠르게 제작했습니다.",
    challenge: "캐릭터 굿즈, 로고 브랜딩, 홈페이지·앱이라는 서로 다른 서비스를 한 사이트 안에서 헷갈리지 않게 보여 주고, 처음 온 방문자도 부담 없이 의뢰까지 이어지게 하는 것이 과제였습니다.",
    solution: "첫 화면에 방문자의 고민을 체크하는 인트로를 두어 공감에서 시작하고, 서비스를 Character·LOGO·WEB/APP 세 카드로 단순하게 나눴습니다. 모디·모루·아기별 캐릭터를 배너와 상담 버튼에 활용해 친근함을 더하고, 어디서든 '디자인 의뢰하기' 버튼으로 바로 문의할 수 있게 했습니다.",
    hero: { src: "/works/web/moduva-og.jpg", alt: "MODUVA 대표 이미지 · 캐릭터부터 로고, 웹·앱까지 한곳에서" },
    layout: "phones",
    images: [
      { src: "/works/web/moduva-intro.jpg", alt: "MODUVA 인트로 화면" },
      { src: "/works/web/moduva-home.jpg", alt: "MODUVA 메인 화면" },
      { src: "/works/web/moduva-shop.jpg", alt: "MODUVA 캐릭터샵 화면" },
      { src: "/works/web/moduva-about.jpg", alt: "MODUVA 소개 화면" },
      { src: "/works/web/moduva-webapp.jpg", alt: "MODUVA 홈페이지·앱 서비스 화면" },
    ],
  },
  {
    slug: "barocheck",
    category: "mobile-ux",
    name: "바로Check · 출퇴근 체크 앱",
    desc: "BAROCHECK가맹점 출퇴근시스템",
    thumb: "/works/app/barocheck-logo.jpg",
    thumbCard: { bg: "#111111", logo: "/works/app/barocheck-logo.jpg" },
    info: {
      client: "세찬아이앤씨 (Sechan I&C)",
      year: "2025",
      role: "로고 디자인 · 앱 UI/UX 디자인",
      target: "매장 아르바이트생 · 매장 대표",
      expression: "심볼마크 · 모바일 UI",
      concept: "원형 시계와 체크 표시를 합친 심볼, 강렬한 오렌지로 '바로 찍고 바로 확인하는' 출퇴근 경험을 표현",
      colors: [
        { name: "ORANGE", hex: "#FF4800" },
        { name: "NAVY", hex: "#24243E" },
        { name: "BLACK", hex: "#111111" },
      ],
      tools: "Figma · Illustrator",
    },
    overview: "바로Check는 매장 아르바이트생이 휴대폰으로 출근·퇴근을 바로 기록하고, 대표는 근무 시간을 한눈에 확인하는 출퇴근 관리 앱입니다. 로고부터 앱 화면까지 디자인했습니다.",
    challenge: "앱 사용에 익숙하지 않은 근로자도 바쁜 출근 시간에 망설임 없이 쓸 수 있어야 했고, 근로자와 대표 두 사용자의 진입 경로를 헷갈리지 않게 나누는 것이 과제였습니다.",
    solution: "첫 화면에서 근로자·대표 로그인을 색으로 구분하고, 출퇴근 화면은 큰 시계와 출근·퇴근 버튼 두 개만 남겨 한 번의 터치로 끝나도록 단순화했습니다. 메뉴는 오렌지 하이라이트로 현재 위치를 분명히 했습니다.",
    hero: { src: "/works/app/barocheck-logo.jpg", alt: "바로Check 로고" },
    layout: "phones",
    images: [
      { src: "/works/app/barocheck-splash.png", alt: "바로Check 스플래시 화면" },
      { src: "/works/app/barocheck-login.png", alt: "바로Check 로그인 선택 화면" },
      { src: "/works/app/barocheck-check.png", alt: "바로Check 출퇴근 체크 화면" },
      { src: "/works/app/barocheck-menu.png", alt: "바로Check 메뉴 화면" },
    ],
  },
  {
    slug: "nh-onong",
    category: "mobile-ux",
    name: "NH 오늘농사 · 네이티브 앱 4차 고도화",
    desc: "농협 영농 지원 앱 '오늘농사' 네이티브 앱 4차 고도화 · 앱 UI 디자인",
    thumb: "/works/app/nh-onong-thumb.jpg",
    thumbCard: { bg: "#426DD7", color: "#FFFFFF", text: "오늘농사", sub: "NH 네이티브 앱 4차 고도화" },
    info: {
      client: "NH농협 · 오늘농사 (NH오늘의농업)",
      year: "2025",
      role: "앱 UI 디자인",
      target: "농업인 · 귀농·귀촌 희망자",
      expression: "모바일 UI · 카드형 바로가기 · 일러스트 아이콘",
      concept: "블루와 그린을 중심으로 시세·영농일지·혜택 등 농업인의 일상 서비스를 카드형 바로가기로 정돈한 영농 지원 앱",
      colors: [
        { name: "BLUE", hex: "#426DD7" },
        { name: "GREEN", hex: "#A0D046" },
        { name: "WHITE", hex: "#FFFFFF" },
      ],
      tools: "Figma",
    },
    overview: "NH농협의 영농 지원 앱 '오늘농사(NH오늘의농업)' 네이티브 앱 4차 고도화 작업입니다. 스플래시·홈·시세정보 등 실제 서비스 화면을 디자인했습니다.",
    challenge: "날씨·시세·영농일지·혜택 등 성격이 다른 서비스가 많아, 스마트폰 사용이 익숙하지 않은 농업인도 원하는 기능을 빠르게 찾을 수 있도록 홈과 메뉴 구조를 정리하는 것이 과제였습니다.",
    solution: "홈 상단에 이벤트 배너와 지역 날씨를 두고, 주요 서비스는 큰 글씨와 일러스트 아이콘을 쓴 카드형 바로가기로 배치했습니다. 시세정보는 내 작물 탭과 경락정보·출하물량·가격전망 탭으로 나눠 필요한 정보를 한눈에 확인하도록 구성했습니다.",
    icon: "/works/app/nh-onong-icon.png",
    layout: "phones",
    images: [
      { src: "/works/app/nh-onong-splash.png", alt: "오늘농사 스플래시 화면" },
      { src: "/works/app/nh-onong-home.png", alt: "오늘농사 홈 화면" },
      { src: "/works/app/nh-onong-price.png", alt: "오늘농사 시세/정보 화면" },
    ],
  },
  {
    slug: "nh-onong-proposal",
    category: "mobile-ux",
    name: "NH 오늘농사 · UXUI 제안서",
    desc: "오늘농사 앱 4차 고도화를 위한 UXUI 제안 · 벤치마킹, 홈·전체메뉴 구성안",
    thumb: "/works/app/nh-onong-proposal-thumb.jpg",
    thumbCard: { bg: "#4DAB76", color: "#FFFFFF", text: "오늘농사 UXUI 제안", sub: "2025 NH오늘의농업" },
    info: {
      client: "NH농협 · 오늘농사 (NH오늘의농업)",
      year: "2025",
      role: "UXUI 제안 · 벤치마킹 분석",
      target: "농업인 · 귀농·귀촌 희망자",
      expression: "벤치마킹 · 화면 구성 제안",
      concept: "국내 뱅킹·PAY 앱과 생활 서비스 앱을 분석해 오늘농사 홈과 전체메뉴의 방향을 제안",
      colors: [
        { name: "GREEN", hex: "#4DAB76" },
        { name: "BLUE", hex: "#426DD7" },
        { name: "WHITE", hex: "#FFFFFF" },
      ],
      tools: "Figma",
    },
    overview: "오늘농사 네이티브 앱 4차 고도화에 앞서 작성한 UXUI 제안서입니다. 뱅킹/PAY 앱과 기타 생활 서비스 앱을 벤치마킹하고, 홈 구성(배너상단 중심 / 바로가기 중심·큰글씨)과 전체메뉴 구조를 비교·제안했습니다.",
    challenge: "다양한 연령의 농업인이 쓰는 앱인 만큼, 최신 앱의 사용 패턴을 따르면서도 큰 글씨와 단순한 구조로 누구나 쉽게 쓸 수 있는 방향을 찾는 것이 과제였습니다.",
    solution: "NH 콕뱅크·KB STAR·신한 쏠 등 뱅킹 앱과 맘모스커피·점신 등 생활 앱의 홈·메뉴 패턴을 정리하고, 배너 중심안과 큰글씨 바로가기 중심안을 나란히 제시해 의사결정을 돕도록 구성했습니다.",
    layout: "cover-grid",
    images: [
      { src: "/works/app/nh-onong-p1.jpg", alt: "2025 NH오늘의농업 UXUI 제안 표지" },
      { src: "/works/app/nh-onong-p2.jpg", alt: "벤치마킹 A 뱅킹/PAY 1" },
      { src: "/works/app/nh-onong-p3.jpg", alt: "벤치마킹 A 뱅킹/PAY 2" },
      { src: "/works/app/nh-onong-p4.jpg", alt: "벤치마킹 B 기타 서비스" },
      { src: "/works/app/nh-onong-p5.jpg", alt: "홈 구성 제안 · 배너상단 중심" },
      { src: "/works/app/nh-onong-p6.jpg", alt: "홈 구성 제안 · 바로가기 중심(큰글씨)" },
      { src: "/works/app/nh-onong-p7.jpg", alt: "전체메뉴 구성 제안" },
    ],
  },
  {
    slug: "woori-won",
    category: "mobile-ux",
    name: "우리은행 · 우리WON뱅킹",
    desc: "우리WON뱅킹 앱 시작 온보딩과 적금 상품 가입·예상금리 화면 UI 디자인",
    thumb: "/works/app/woori-thumb.jpg",
    thumbCard: { bg: "#E8F1FD", color: "#0032A0", text: "우리WON뱅킹", sub: "우리은행" },
    info: {
      client: "우리은행",
      role: "앱 UI/UX 디자인",
      target: "우리은행 개인 고객 · 신규 앱 사용자",
      expression: "일러스트 온보딩 · 카드 UI · 금리 그래프",
      concept: "밝은 블루와 가벼운 3D 일러스트로 결제·디지털OTP·오픈뱅킹 기능을 쉽게 소개하고, 우대금리를 막대 그래프로 한눈에 보여 주는 친근한 금융 경험",
      colors: [
        { name: "BLUE", hex: "#1E8FEB" },
        { name: "NAVY", hex: "#0B3A8F" },
        { name: "SKY", hex: "#7BC4EA" },
      ],
    },
    overview: "우리은행 모바일 앱 우리WON뱅킹의 시작 온보딩 화면과 적금 상품 가입 페이지, 예상금리 안내 UI를 디자인했습니다.",
    icon: "/works/app/woori-won-icon.png",
    layout: "phones",
    images: [
      { src: "/works/app/woori-onboard-pay.jpg", alt: "우리WON뱅킹 온보딩 · 우리페이 간편결제" },
      { src: "/works/app/woori-onboard-otp.jpg", alt: "우리WON뱅킹 온보딩 · 디지털OTP" },
      { src: "/works/app/woori-onboard-start.jpg", alt: "우리WON뱅킹 온보딩 · 시작하기" },
      { src: "/works/app/woori-onboard-openbanking.jpg", alt: "우리WON뱅킹 온보딩 · 다른기관 계좌 연결" },
    ],
    extras: [
      {
        title: "상품 가입 · 예상금리 UI",
        desc: "롯데카드 제휴 적금 상품 상세 페이지와 고객 유형별 우대금리를 그래프로 보여 주는 예상금리 컴포넌트",
        images: [
          { src: "/works/app/woori-product.png", alt: "적금 상품 상세 페이지", caption: "상품 상세" },
          { src: "/works/app/woori-rate.png", alt: "예상금리 우대금리 그래프", caption: "예상금리" },
        ],
      },
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
