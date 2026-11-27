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
  // true면 목록에 썸네일만 보이고 상세 페이지는 없음
  noDetail?: boolean;
  // 목록 썸네일을 로고/이름 글자로 보여 줄 때 (logo 이미지가 있으면 로고, 없으면 text)
  // border: 연한 회색 테두리
  thumbCard?: { bg: string; color?: string; logo?: string; text?: string; sub?: string; border?: boolean };
  // textOnly: 사이트가 열리지 않을 때 주소만 글자로 표시 (클릭·바로가기 버튼 없음)
  link?: { label: string; url: string; textOnly?: boolean };
  // 상세 페이지 "목록으로" 위에 보이는 실행 버튼 (note: 버튼 아래 작은 안내)
  cta?: { label: string; url: string; note?: string };
  info?: WorkInfo;
  overview?: string;
  // 특징 몇 가지 (오른쪽 정보 패널, Design Concept 아래)
  features?: { title: string; desc?: string }[];
  // 저작권 안내 (본문 맨 아래 아주 작고 연하게)
  copyright?: string;
  challenge?: string;
  solution?: string;
  // "pc-mobile"이면 첫 이미지는 PC(넓게), 둘째는 모바일(좁게)로 나란히
  // "pc-mobile": PC(넓게)+모바일(좁게) / "phones": 앱 화면 여러 장을 나란히
  // "cover-grid": 표지만 크게, 나머지 페이지는 그 아래 작게 한 줄로
  layout?: "pc-mobile" | "phones" | "cover-grid";
  // 이미지 위에 크게 보여 줄 대표 이미지 (로고 등)
  // small: 로고를 작게 가운데 표시
  hero?: { src: string; alt: string; small?: boolean; medium?: boolean };
  images: { src: string; alt: string }[];
  // 고객사 소개 (로고 시트 아래에 표시)
  about?: { title: string; lead: string; body: string[]; facts?: { label: string; value: string }[] };
  // 특별 컴포넌트로 그리는 시트 (선명한 벡터 로고 등)
  custom?: "goest-brand";
  // 이미지 아래 추가 섹션 (작은 원본은 원래 크기로 선명하게)
  // withFeatures: 이미지 옆 빈칸에 특징(features) 텍스트 표시
  extras?: { title: string; desc?: string; withFeatures?: boolean; cols?: 3 | 4; square?: "cover" | "contain"; uniform?: boolean; bordered?: boolean; images: { src: string; alt: string; caption?: string }[] }[];
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
    title: "Web & App UIUX",
    category: "웹 · 앱 UIUX",
    image: "https://images.unsplash.com/photo-1761792654327-b32d0be2a96b",
    subtitle: "Section 02 / Web & App UI/UX Design",
    description: "사용자 중심의 정보 구조(IA) 설계와 미니멀한 UI를 결합한 반응형 웹 플랫폼과, 모바일 환경에 최적화된 앱 경험을 함께 설계했습니다.",
    challenge: "복잡한 콘텐츠와 기능을 웹과 모바일 어디서든 직관적으로 탐색할 수 있도록 단순화하고, 다양한 화면 비율에서도 일관된 경험을 제공해야 했습니다.",
    solution: "여백을 살린 레이아웃과 부드러운 마이크로 인터랙션, 엄지 동선을 고려한 모바일 UI 배치로 정보 전달력과 사용성을 함께 높였습니다.",
  },
  {
    slug: "character",
    title: "Character Design",
    category: "캐릭터",
    image: "/works/character/goods-collection.jpg",
    subtitle: "Section 03 / Original Character & Goods",
    description: "MODUVA 크리에이티브 스튜디오의 오리지널 캐릭터 아기별·모루·모디와 디자이너 캐릭터 MIYA를 기획하고, 굿즈와 홈페이지까지 이어지게 디자인했습니다.",
    challenge: "캐릭터마다 성격과 컬러를 분명히 나누면서도, 한 스튜디오의 캐릭터 가족으로 보이도록 통일된 분위기를 만드는 것이 과제였습니다.",
    solution: "둥근 실루엣과 3D 질감, 헤드폰·M 후드티 같은 공통 요소로 세계관을 묶고, 노랑·파랑·오렌지 대표색으로 캐릭터를 구분해 굿즈와 웹 배너에 바로 쓸 수 있게 정리했습니다.",
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
    slug: "ai-dx",
    title: "AI & Digital Transformation",
    category: "AI UX 전략 및 DX",
    image: "https://images.unsplash.com/photo-1622631407413-bfb7d4aec3b0",
    subtitle: "Section 05 / AI UX Strategy & DX",
    description: "최신 생성형 인공지능 기술과 디자인 프로세스를 융합하여, 복잡한 데이터와 워크플로우를 직관적이고 아름다운 사용자 경험으로 재정의한 프로젝트입니다.",
    challenge: "기존의 경직된 업무 환경에서 인공지능 솔루션을 도입할 때 사용자가 느끼는 진입 장벽을 낮추고, 시각적인 거부감 없이 자연스럽게 업무에 스며들도록 하는 것이 가장 큰 과제였습니다.",
    solution: "미니멀리즘 인터페이스와 고도화된 타이포그래피 시스템을 적용하여 복잡한 알고리즘 결과를 한눈에 파악할 수 있도록 설계하고, 핵심 포인트 컬러로 시인성을 극대화했습니다.",
  }
];

export const works: Work[] = [
  {
    slug: "woosung",
    copyright: "© MI3___LEE\n우성산업기술 CI 로고는 MI3___LEE의 오리지널 디자인으로, (주)우성산업기술에서 사용하지 않는 경우 저작권은 MI3___LEE에게 있습니다. 무단 복제·배포 및 상업적 이용을 금지합니다.",
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
    copyright: "Design by MI3___LEE · © (주)지오이스트\n무단 복제·배포 및 상업적 이용을 금지합니다.",
    category: "brand-identity",
    name: "지오이스트 · GOEST",
    desc: "로고 및 브랜딩 (심볼·국문·영문 로고, 앱 아이콘, PPT)",
    thumb: "/works/brand/goest-thumb.jpg",
    thumbCard: { bg: "#F1F1F1", logo: "/works/brand/goest-logo-trim.png" },
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
    slug: "hics-brand",
    copyright: "Design by MI3___LEE · © 하나은행\n무단 복제·배포 및 상업적 이용을 금지합니다.",
    category: "brand-identity",
    name: "하나은행 HiCS · 준법시스템 로고",
    desc: "하나은행 내부통제 준법시스템 HiCS(Hana Internal Control System) 로고타입 디자인",
    thumb: "/works/brand/hics-logo-brand.png",
    thumbCard: { bg: "#F1F1F1", logo: "/works/brand/hics-logo-brand.png" },
    info: {
      client: "하나은행",
      year: "2024",
      role: "로고타입 디자인",
      target: "하나은행 임직원 · 준법·내부통제 담당자",
      expression: "로고타입 · 포인트 컬러",
      concept: "단단한 차콜 H·S 사이에 하나 그린의 'iC'를 두어 내부통제(Internal Control)를 시스템의 중심에 놓고, i 위의 레드 점으로 놓치지 않고 짚어 주는 '준법 체크 포인트'를 표현",
      colors: [
        { name: "HANA GREEN", hex: "#509C84" },
        { name: "CHARCOAL", hex: "#303030" },
        { name: "POINT RED", hex: "#B62B3A" },
      ],
      tools: "Figma · Illustrator · Photoshop",
    },
    overview: "하나은행 준법시스템 HiCS의 로고타입을 디자인했습니다. 굵은 산세리프로 시스템의 신뢰감을 주고, 'iC'를 하나은행 그린으로 강조해 내부통제 시스템이라는 정체성을 한눈에 보이도록 했습니다. 시스템 화면 디자인은 웹 · 앱 UIUX의 하나은행 준법시스템 HiCS에서 볼 수 있어요.",
    hero: { src: "/works/brand/hics-logo-brand.png", alt: "하나은행 HiCS 로고", medium: true },
    images: [],
  },
  {
    slug: "atogrit",
    copyright: "© 아토그릿(ATOGRIT)\n본 로고·CI·BI의 권리는 아토그릿(ATOGRIT)에 있으며, 디자이너의 작업 이력 소개 목적으로만 게시합니다. 무단 복제·배포 및 사용을 금지합니다.",
    category: "brand-identity",
    name: "아토그릿 · ATOGRIT",
    desc: "ATOGRIT 로고 디자인 · THE BACKBONE OF BUSINESS",
    thumb: "/works/brand/atogrit-thumb.png",
    noDetail: true,
    thumbCard: { bg: "#000000", logo: "/works/brand/atogrit-logo.png" },
    images: [],
  },
  {
    slug: "absr",
    copyright: "Design by MI3___LEE · © (주)지오이스트\n무단 복제·배포 및 상업적 이용을 금지합니다.",
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
    slug: "barocheck-brand",
    copyright: "Design by MI3___LEE · © 바로Check\n무단 복제·배포 및 상업적 이용을 금지합니다.",
    category: "brand-identity",
    name: "바로Check · BAROCHECK",
    desc: "출퇴근 체크 앱 바로Check 로고 · 심볼 · 앱 아이콘 디자인",
    thumb: "/works/brand/barocheck-thumb.jpg",
    info: {
      client: "세찬아이앤씨 (Sechan I&C)",
      year: "2025",
      role: "로고 디자인 · 앱 아이콘 디자인",
      target: "매장 아르바이트생 · 매장 대표",
      expression: "심볼마크 · 로고타입 · 앱 아이콘",
      concept: "원형 시계와 체크 표시를 합친 심볼, 강렬한 오렌지로 '바로 찍고 바로 확인하는' 출퇴근 경험을 표현",
      colors: [
        { name: "ORANGE", hex: "#FF4800" },
        { name: "NAVY", hex: "#24243E" },
        { name: "BLACK", hex: "#111111" },
      ],
      tools: "Illustrator · Figma",
    },
    overview: "출퇴근 관리 앱 바로Check의 로고와 앱 아이콘을 디자인했습니다. 원형 시계와 체크 표시를 하나의 심볼로 합치고, '바로'를 오렌지로 강조한 로고타입을 만들었습니다.",
    hero: { src: "/works/app/barocheck-logo.jpg", alt: "바로Check 로고" },
    icon: "/works/app/barocheck-icon.png",
    images: [],
    extras: [
      {
        title: "APP ICON",
        desc: "앱 화면 디자인은 웹 · 앱 UIUX의 바로Check에서 볼 수 있어요.",
        images: [
          { src: "/works/app/barocheck-icon.png", alt: "바로Check 앱 아이콘", caption: "앱 아이콘" },
        ],
      },
    ],
  },
  {
    slug: "sechan",
    copyright: "Design by MI3___LEE\n무단 복제·배포 및 상업적 이용을 금지합니다.",
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
    extras: [
      {
        title: "APP ICON",
        desc: "세찬아이앤씨 심볼 앱 아이콘과 WIOTP · CAF LeSS 서비스 아이콘",
        uniform: true,
        images: [
          { src: "/works/brand/sechan-app-icons.jpg", alt: "세찬아이앤씨 · WIOTP · CAF LeSS 앱 아이콘" },
        ],
      },
      {
        title: "APPLICATION",
        desc: "명함 · 티셔츠 · 노트 · 봉투 어플리케이션",
        uniform: true,
        images: [
          { src: "/works/brand/sechan-card-pattern.jpg", alt: "세찬아이앤씨 패턴 명함", caption: "명함" },
          { src: "/works/brand/sechan-tshirt.jpg", alt: "세찬아이앤씨 티셔츠", caption: "티셔츠" },
        ],
      },
      {
        title: "STATIONERY",
        uniform: true,
        images: [
          { src: "/works/brand/sechan-stationery.jpg", alt: "세찬아이앤씨 노트 · 연필 · 봉투", caption: "노트 · 연필 · 봉투" },
        ],
      },
      {
        title: "PPT · 재난관리자원 통합관리 시스템 제안서",
        desc: "2025년 한국지역정보개발원(KLID) 재난관리자원 통합관리 시스템 유지관리 및 기술지원 제안 프레젠테이션",
        cols: 3,
        uniform: true,
        images: [
          { src: "/works/brand/sechan-ppt-cover.png", alt: "재난관리자원 통합관리 시스템 제안서 표지", caption: "표지" },
          { src: "/works/brand/sechan-ppt-toc.png", alt: "재난관리자원 통합관리 시스템 제안서 목차", caption: "목차" },
          { src: "/works/brand/sechan-ppt-p1.png", alt: "재난관리자원 통합관리 시스템 제안서 · 사업 범위에 대한 이해", caption: "사업 범위에 대한 이해" },
        ],
      },
    ],
  },
  {
    slug: "reels-storyboard",
    category: "ai-dx",
    name: "릴스 콘티 보드 · AI 숏폼 기획 도구",
    desc: "이미지 한 장으로 릴스 콘티, AI 영상 프롬프트, 편집 순서표까지 만드는 웹앱",
    thumb: "/works/ai/reels-board-main.jpg",
    icon: "/works/ai/reels-board-icon.png",
    cta: { label: "보드 열기", url: "https://claude.ai/artifact/ADhEUEMtYy9dZ4AcYX1125", note: "초대된 사용자 전용 · Claude 로그인 필요" },
    info: {
      client: "자체 프로젝트",
      year: "2026",
      role: "기획 · UX/UI 디자인 · AI 기능 설계",
      target: "인스타 릴스를 직접 만드는 1인 크리에이터 · 소상공인",
      expression: "웹앱 · PC 데스크톱 앱 설치 지원",
      concept: "촬영장의 슬레이트와 세로 콘티 용지를 화면으로 옮겼습니다. 장면마다 9:16 프레임 한 칸을 주고, 녹화 버튼의 빨강 하나만 포인트로 써서 지금 손댈 곳이 바로 보이게 했습니다.",
      colors: [
        { name: "SLATE BLACK", hex: "#141414" },
        { name: "PAPER", hex: "#F6F5F1" },
        { name: "REC RED", hex: "#E2412B" },
      ],
      tools: "Claude · Higgsfield · HTML/JS",
    },
    overview: "AI 영상 서비스는 장면마다 영어 프롬프트를 새로 써야 해서, 릴스 하나를 만들 때 시행착오와 크레딧 낭비가 많았습니다. 릴스 콘티 보드는 상품 사진이나 무드 이미지 한 장을 올리면 Claude가 장면 구성과 영어 프롬프트, 자막, 배경음악 제안까지 짜 주고, 사용자는 버튼으로 카메라·조명·스타일만 바꿔 다듬은 뒤 힉스필드 같은 영상 서비스에 붙여 넣으면 됩니다.",
    challenge: "AI 영상은 프롬프트 한 줄이 결과를 좌우하지만, 디자이너나 사장님이 장면마다 카메라 용어와 영어 문장을 정확히 쓰기는 어렵습니다. 생성 결과와 크레딧을 기록할 곳도 없어 같은 실수를 반복하게 됩니다.",
    solution: "이미지 → 콘티 자동 생성, 프리셋 버튼으로 다듬는 프롬프트, 장면별 생성 기록과 크레딧 합계, 캡컷 편집용 순서표를 한 화면에 묶었습니다. 데스크톱 앱으로 설치해 작업 도구처럼 쓸 수 있습니다.",
    features: [
      { title: "이미지 한 장으로 콘티", desc: "사진과 원하는 느낌 한 줄, 길이만 고르면 3~6개 장면과 프롬프트가 만들어집니다." },
      { title: "버튼으로 다듬는 프롬프트", desc: "샷 크기·카메라 움직임·조명·스타일을 한국어 버튼으로 고르면 영어 프롬프트가 바로 바뀝니다." },
      { title: "생성 기록과 편집 순서표", desc: "모델·크레딧·만족도를 장면별로 남기고, 시간·자막이 정리된 순서표로 편집 앱에서 바로 이어 붙입니다." },
    ],
    hero: { src: "/works/ai/reels-board-main.jpg", alt: "릴스 콘티 보드 메인 화면 · 릴스 정보 슬레이트와 이미지 자동 생성 영역" },
    images: [
      { src: "/works/ai/reels-board-storyboard.jpg", alt: "9:16 콘티 카드, 타임라인, 편집 순서표" },
      { src: "/works/ai/reels-board-editor.jpg", alt: "장면 편집기 · 프리셋 버튼, 완성 프롬프트, 생성 기록" },
    ],
    extras: [
      {
        title: "APP ICON",
        desc: "촬영 슬레이트 위에 릴스 비율의 빨간 세로 프레임을 올린 데스크톱 앱 아이콘",
        cols: 3,
        square: "contain",
        images: [{ src: "/works/ai/reels-board-icon.png", alt: "릴스 콘티 보드 앱 아이콘", caption: "512px · 16px에서도 형태 유지" }],
      },
    ],
  },
  {
    slug: "moduva-brand",
    copyright: "© MODUVA CREATIVE STUDIO · Design by MI3___LEE\n로고 시안 일부는 AI를 활용해 제작했습니다. 무단 복제·배포 및 상업적 이용을 금지합니다.",
    category: "brand-identity",
    name: "MODUVA · 모두바 로고",
    desc: "크리에이티브 디자인 스튜디오 MODUVA의 워드마크와 M 심볼 · 반쪽 해 O를 살린 로고 정리",
    thumb: "/works/brand/moduva-lockup.png",
    thumbCard: { bg: "#F6F5F2", logo: "/works/brand/moduva-wordmark.png" },
    link: { label: "moduva.pages.dev", url: "https://moduva.pages.dev" },
    info: {
      client: "MODUVA (자체 브랜드)",
      year: "2026",
      role: "로고 디자인 · 브랜드 컬러",
      target: "로고·캐릭터·홈페이지가 필요한 소상공인 · 스타트업",
      expression: "워드마크 · 심볼마크 · 앱 아이콘",
      concept: "O의 위쪽 절반은 코랄, 아래쪽 절반은 브라운으로 나눴습니다. 위는 떠오른 아이디어, 아래는 그 아이디어를 결과물로 만드는 작업을 뜻하고, 슬로건 'Make Your Idea Real.'을 글자 하나에 담았습니다.",
      colors: [
        { name: "CORAL", hex: "#F25C6B" },
        { name: "DEEP BROWN", hex: "#302B27" },
        { name: "WARM IVORY", hex: "#F5F2EB" },
      ],
      tools: "Illustrator · Figma · AI Claude",
    },
    overview: "MODUVA 크리에이티브 스튜디오의 로고입니다. 사이트와 굿즈에 쓰던 워드마크의 반쪽 해 O는 그대로 살리고, M·O·D·U·V·A 여섯 글자를 같은 높이와 두께, 정확한 각도로 다시 그렸습니다. 굿즈와 앱 아이콘에 쓸 M 심볼은 세 가지 방향으로 정리했습니다.",
    features: [
      { title: "반쪽 해 O", desc: "코랄과 브라운으로 나눈 O 하나로 아이디어와 그것을 만드는 작업을 함께 보여 줍니다." },
      { title: "반반 타일 심볼", desc: "O의 배색을 타일 전체로 키우고 흰 M을 올려, 16px 파비콘에서도 알아볼 수 있게 했습니다." },
      { title: "직접 그린 글자", desc: "기성 폰트를 쓰지 않고 글자를 패스로 그려 두께와 글자 사이 간격을 맞췄습니다." },
    ],
    hero: { src: "/works/brand/moduva-lockup.png", alt: "MODUVA 반반 타일 심볼과 워드마크 가로형 조합" },
    images: [
      { src: "/works/brand/moduva-wordmark.png", alt: "MODUVA 워드마크 · 반쪽 해 O" },
    ],
    extras: [
      {
        title: "SYMBOL",
        desc: "기존 M을 다시 짠 기본형, O의 배색을 옮긴 반반 타일(대표안), M과 O를 붙인 MO(모)",
        cols: 3,
        uniform: true,
        images: [
          { src: "/works/brand/moduva-symbol-a.png", alt: "MODUVA 심볼 A · 정돈한 M", caption: "A · 정돈한 M" },
          { src: "/works/brand/moduva-symbol-b.png", alt: "MODUVA 심볼 B · 반반 타일", caption: "B · 반반 타일 (대표안)" },
          { src: "/works/brand/moduva-symbol-c.png", alt: "MODUVA 심볼 C · MO", caption: "C · MO (모)" },
        ],
      },
      {
        title: "LOGO STUDY",
        desc: "M을 블록과 라인으로 풀어 본 탐색 시안 · 'Creative Design Studio'와 슬로건 'Make Your Idea Real.' 조합 (AI 활용 시안)",
        uniform: true,
        images: [
          { src: "/works/brand/moduva-logo-block.jpg", alt: "MODUVA 블록형 M 로고 시안", caption: "블록형 M" },
          { src: "/works/brand/moduva-logo-line.jpg", alt: "MODUVA 라인형 M 로고 시안", caption: "라인형 M · Make Your Idea Real." },
        ],
      },
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
    extras: [
      {
        title: "DEVICE MOCKUP",
        desc: "PC · 태블릿 · 모바일 반응형 화면",
        cols: 3,
        images: [
          { src: "/works/web/moduva-device-desktop.png", alt: "MODUVA 홈페이지 PC 화면", caption: "PC" },
          { src: "/works/web/moduva-device-tablet.png", alt: "MODUVA 홈페이지 태블릿 화면", caption: "Tablet" },
          { src: "/works/web/moduva-device-mobile.png", alt: "MODUVA 홈페이지 모바일 화면", caption: "Mobile" },
        ],
      },
      {
        title: "UI CONCEPT",
        desc: "굿즈 · 브랜딩 · 웹앱 · 패키지 서비스별 메인 화면과 디자인 의뢰 화면 시안 (AI를 활용해 제작한 컨셉 이미지)",
        uniform: true,
        images: [
          { src: "/works/web/moduva-concept-category-a.jpg", alt: "MODUVA 서비스별 메인 화면 시안 · 굿즈 브랜딩 웹앱 패키지", caption: "서비스별 메인 · A" },
          { src: "/works/web/moduva-concept-category-b.jpg", alt: "MODUVA 서비스별 메인과 포트폴리오 화면 시안", caption: "서비스별 메인 · B" },
          { src: "/works/web/moduva-concept-app-ui.jpg", alt: "MODUVA 카테고리별 앱 메인 UI 시안", caption: "카테고리별 앱 메인" },
          { src: "/works/web/moduva-concept-request.jpg", alt: "MODUVA 디자인 의뢰 상담 화면 시안", caption: "디자인 의뢰 상담" },
          { src: "/works/web/moduva-concept-app-home.jpg", alt: "MODUVA 앱 홈 화면 시안", caption: "앱 홈" },
        ],
      },
      {
        title: "BRAND GOODS",
        desc: "MODUVA 로고를 적용한 브랜드 문구 세트",
        images: [
          { src: "/works/web/moduva-brand-goods.png", alt: "MODUVA 노트·명함 박스·펜 브랜드 굿즈", caption: "노트 · 명함 · 펜" },
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
    slug: "hana-gcs",
    category: "web-platform",
    name: "하나은행 · 글로벌 준법시스템 GCS",
    desc: "하나은행 글로벌 준법시스템 GCS 웹 UI 디자인 · 2027 오픈 예정",
    thumb: "",
    noDetail: true,
    thumbCard: { bg: "#0F7A66", color: "#FFFFFF", text: "하나은행 글로벌 준법시스템", sub: "GCS · 2027 OPEN" },
    images: [],
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
    hero: { src: "/works/web/hics-logo.png", alt: "HiCS 하나은행 준법시스템 로고", small: true },
    layout: "cover-grid",
    images: [
      { src: "/works/web/hics-banner.jpg", alt: "HiCS 오픈 홍보 배너 · 빠르고 편리해진 준법시스템" },
      { src: "/works/web/hics-main-day.jpg", alt: "HiCS 메인 대시보드 · 일몰 배경 테마" },
      { src: "/works/web/hics-main-night.jpg", alt: "HiCS 메인 대시보드 · 야경 배경 테마" },
      { src: "/works/web/hics-bg-setting.jpg", alt: "HiCS 배경 설정 팝업" },
    ],
  },
  {
    slug: "nh-onong",
    category: "web-platform",
    name: "NH 오늘농사 · 네이티브 앱 4차 고도화",
    desc: "농협 영농 지원 앱 '오늘농사' 네이티브 앱 4차 고도화 · 앱 UI 디자인",
    thumb: "/works/app/nh-onong-thumb.jpg",
    thumbCard: { bg: "#426DD7", color: "#FFFFFF", text: "오늘농사", sub: "NH 네이티브 앱 4차 고도화" },
    info: {
      client: "NH농협 · 오늘농사 (NH오늘의농업)",
      year: "2025",
      role: "100% 디자인 · 아이콘 일러스트",
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
    category: "web-platform",
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
    slug: "namu",
    category: "web-platform",
    name: "NH투자증권 · 나무증권",
    desc: "나무증권 MTS 앱 MY세금 · MY연금 화면 UI 디자인",
    thumb: "/works/app/namu-icon.png",
    thumbCard: { bg: "#B0F24C", color: "#00302E", text: "나무증권", sub: "NH투자증권 MTS" },
    info: {
      client: "NH투자증권",
      role: "나무앱 UXUI · 운영 리더",
      target: "나무증권 개인 투자자 · 절세·연금 관심 고객",
      expression: "카드형 대시보드 · 진행 바 · 탭 UI",
      concept: "라임 그린 포인트와 컬러 카드로 양도소득세·금융소득세·연금 자산을 한눈에 정리하고, 절세 상품과 상담으로 자연스럽게 이어지는 자산관리 화면",
      colors: [
        { name: "LIME", hex: "#8CC63F" },
        { name: "TEAL", hex: "#5BC2C2" },
        { name: "DARK GREEN", hex: "#00302E" },
      ],
    },
    overview: "NH투자증권 나무증권 앱의 MY세금·MY연금 화면을 디자인했습니다. 소득별 세금 현황과 절세 상품, 연금 자산과 수익률을 카드와 그래프로 정리했습니다.",
    icon: "/works/app/namu-icon.png",
    layout: "phones",
    images: [
      { src: "/works/app/namu-tax.jpg", alt: "나무증권 MY세금 화면" },
      { src: "/works/app/namu-pension.jpg", alt: "나무증권 MY연금 화면" },
    ],
  },
  {
    slug: "barocheck",
    category: "web-platform",
    name: "바로Check · 출퇴근 체크 앱",
    desc: "BAROCHECK가맹점 출퇴근시스템",
    thumb: "/works/app/barocheck-logo.jpg",
    thumbCard: { bg: "#FF4800", color: "#FFFFFF", text: "바로Check", sub: "출퇴근 체크 앱" },
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
    icon: "/works/app/barocheck-icon.png",
    layout: "phones",
    images: [
      { src: "/works/app/barocheck-splash.png", alt: "바로Check 스플래시 화면" },
      { src: "/works/app/barocheck-login.png", alt: "바로Check 로그인 선택 화면" },
      { src: "/works/app/barocheck-check.png", alt: "바로Check 출퇴근 체크 화면" },
      { src: "/works/app/barocheck-menu.png", alt: "바로Check 메뉴 화면" },
    ],
  },
  {
    slug: "wiotp",
    category: "web-platform",
    name: "WIOTP · 골프 앱",
    desc: "골프모드 · 마이페이지 · 르까프 쇼핑몰을 담은 WIOTP 골프 앱 기획 · UI 디자인",
    thumb: "/works/app/wiotp-home.png",
    thumbCard: { bg: "#24282C", color: "#FFFFFF", text: "WIOTP", sub: "골프 앱 · 기획 80% · 디자인 100%" },
    info: {
      client: "세찬아이앤씨 (Sechan I&C) · CAF LeSS",
      role: "기획 80% · 디자인 100%",
      target: "골프 센서를 쓰는 골퍼",
      expression: "다크 UI · 카드형 메뉴 · 앱 아이콘",
      concept: "어두운 배경 위 청록·연두 등고선 그래픽과 카드형 메뉴로 골프 코스 느낌을 살린 골프 앱",
      colors: [
        { name: "CHARCOAL", hex: "#24282C" },
        { name: "TEAL", hex: "#1E8FA6" },
        { name: "GREEN", hex: "#5DBB2F" },
      ],
      tools: "Figma · Photoshop · Illustrator",
    },
    overview: "골프 센서와 연동되는 WIOTP 앱입니다. 실전·연습 게임을 고르는 골프모드, 프로필과 설정을 담은 마이페이지, 르까프 쇼핑몰 배너까지 한 화면에서 이어지도록 기획하고 디자인했습니다.",
    icon: "/works/app/wiotp-icon.png",
    layout: "phones",
    images: [
      { src: "/works/app/wiotp-home.png", alt: "WIOTP 앱 홈 화면 · 골프모드 · 마이페이지 · 르까프 쇼핑몰" },
    ],
  },
  {
    slug: "kb-bank",
    category: "web-platform",
    name: "KB국민은행 · 웹/앱/모바일웹",
    desc: "2017 웹어워드 금융 부문 대상 · KB국민은행 웹·앱·모바일웹 메인 디자인",
    thumb: "/works/web/kb-mockup.png",
    thumbCard: { bg: "#FFCC00", color: "#2B2B2B", text: "KB국민은행", sub: "2017 웹어워드 금융 부문 대상" },
    info: {
      client: "KB국민은행",
      year: "2017",
      role: "웹·앱·모바일웹 UI 디자인",
      target: "KB국민은행 개인 고객",
      expression: "친근한 일러스트 배너 · 심플한 메뉴",
      concept: "국민은행의 고급스럽고 친근한 이미지를 컨셉으로, 상단 배너에는 친근한 일러스트를 쓰고 메뉴는 간결하고 심플하게 표현",
      colors: [
        { name: "KB YELLOW", hex: "#FFCC00" },
        { name: "KB GRAY", hex: "#545045" },
        { name: "WHITE", hex: "#FFFFFF" },
      ],
      tools: "Photoshop · Illustrator · Zeplin",
    },
    overview: "2017 웹어워드 금융 부문 대상을 받은 KB국민은행 웹·앱·모바일웹 디자인입니다. 국민은행의 고급스럽고 친근한 이미지를 컨셉으로, 상품 배너에는 친근한 일러스트를 쓰고 메뉴는 간결하고 심플하게 정리했습니다.",
    icon: "/works/app/kb-star-icon.png",
    hero: { src: "/works/web/kb-mockup.png", alt: "KB국민은행 모바일 메인 화면 목업", medium: true },
    images: [],
    extras: [
      {
        title: "MOBILE",
        desc: "상품 배너 · 메인 전체 화면",
        cols: 4,
        images: [
          { src: "/works/web/kb-m-carloan.png", alt: "KB 매직카대출 배너 메인", caption: "KB 매직카대출" },
          { src: "/works/web/kb-m-smartphone.png", alt: "KB Smart★폰 적금 배너 메인", caption: "KB Smart★폰 적금" },
          { src: "/works/web/kb-m-full1.png", alt: "KB국민은행 메인 전체 화면 1", caption: "메인 전체 1" },
          { src: "/works/web/kb-m-full2.png", alt: "KB국민은행 메인 전체 화면 2", caption: "메인 전체 2" },
        ],
      },
    ],
  },
  {
    slug: "hana-bank",
    category: "web-platform",
    name: "KEB하나은행 · 개인뱅킹 웹/앱",
    desc: "KEB하나은행 개인뱅킹 PC 웹·모바일웹·앱 메인 화면 UI 디자인",
    thumb: "/works/web/hana-mockup.png",
    thumbCard: { bg: "#008485", color: "#FFFFFF", text: "KEB하나은행", sub: "개인뱅킹 웹 · 앱", border: true },
    info: {
      client: "KEB하나은행",
      role: "웹·모바일 UI 디자인",
      target: "하나은행 개인 고객",
      expression: "라인 일러스트 · 퀵메뉴 아이콘 · 반응형",
      concept: "가는 라인 일러스트와 하나은행 그린으로, 시간대·요일에 맞춘 인사와 자산관리(하이로보) 메시지를 따뜻하게 전하는 메인 화면",
      colors: [
        { name: "HANA GREEN", hex: "#008485" },
        { name: "MINT", hex: "#2EC4A0" },
        { name: "SLATE", hex: "#4A5866" },
      ],
    },
    overview: "KEB하나은행 개인뱅킹의 PC 웹·모바일웹·앱 메인 화면을 디자인했습니다. 계좌조회·계좌이체·신용카드 퀵메뉴를 중심으로, 시간대와 요일에 따라 바뀌는 라인 일러스트 인사 화면을 만들었습니다.",
    icon: "/works/app/hana-oneq-icon.png",
    hero: { src: "/works/web/hana-mockup.png", alt: "KEB하나은행 PC·모바일 메인 화면 목업" },
    images: [],
    extras: [
      {
        title: "WEB",
        desc: "PC 웹 메인 · 로그인 화면",
        images: [
          { src: "/works/web/hana-web-main.png", alt: "KEB하나은행 PC 메인 화면", caption: "PC 메인" },
          { src: "/works/web/hana-web-login.png", alt: "KEB하나은행 로그인 화면", caption: "로그인" },
        ],
      },
      {
        title: "APP · MOBILE WEB",
        desc: "시간대·요일에 따라 바뀌는 메인 인사 화면과 모바일웹 메인",
        cols: 3,
        uniform: true,
        images: [
          { src: "/works/web/hana-app-morning.png", alt: "앱 메인 · 좋은 아침입니다", caption: "아침 인사" },
          { src: "/works/web/hana-app-weekend.png", alt: "앱 메인 · 기다렸던 주말", caption: "주말 인사" },
          { src: "/works/web/hana-m-main.png", alt: "KEB하나은행 모바일웹 메인 화면", caption: "모바일웹 메인" },
        ],
      },
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
    slug: "libms",
    category: "web-platform",
    name: "LIBMS · 리튬이온 배터리 모니터링 대시보드",
    desc: "Lithium-ion Battery Monitoring System 대시보드 기획 · 디자인 · 반응형",
    thumb: "/works/web/libms-main.png",
    thumbCard: { bg: "#E8512D", color: "#FFFFFF", text: "LIBMS", sub: "배터리 모니터링 대시보드" },
    info: {
      client: "굿어스데이터 (GOODUSDATA)",
      year: "2022",
      role: "기획 80% · 디자인 100% · 반응형",
      target: "배터리 설비 관리자",
      expression: "대시보드 · 데이터 시각화 · 등각 라인 일러스트",
      concept: "리튬이온 배터리의 상태(SOC·전압·온도)를 셋 → 배터리 → 랙 → 모듈 → 셀 단계로 한눈에 확인하는 모니터링 대시보드",
      colors: [
        { name: "ORANGE", hex: "#E8512D" },
        { name: "CHARCOAL", hex: "#2B2B2B" },
        { name: "GRAY", hex: "#F2F2F2" },
      ],
      tools: "Figma",
    },
    overview: "리튬이온 배터리 모니터링 시스템(LIBMS)의 대시보드를 기획하고 디자인했습니다. 로그인 화면의 등각 라인 일러스트부터 SOC 게이지, 랙·모듈·셀 단위 상태 카드, 온도·전압 차트까지 반응형으로 설계했습니다.",
    hero: { src: "/works/web/libms-login.png", alt: "LIBMS 로그인 화면" },
    images: [],
    extras: [
      {
        title: "DASHBOARD",
        desc: "메인 · 배터리 · 모듈 모니터링 화면",
        cols: 3,
        uniform: true,
        bordered: true,
        images: [
          { src: "/works/web/libms-main.png", alt: "LIBMS 메인 대시보드 · SOC와 차트", caption: "메인" },
          { src: "/works/web/libms-battery.png", alt: "LIBMS 배터리 · 랙 모니터링", caption: "배터리 · 랙" },
          { src: "/works/web/libms-module.png", alt: "LIBMS 모듈 · 셀 모니터링", caption: "모듈 · 셀" },
        ],
      },
    ],
  },
  {
    slug: "posco-dx",
    category: "web-platform",
    name: "POSCO DX",
    desc: "포스코DX 앱 UI/UX 디자인",
    thumb: "",
    noDetail: true,
    thumbCard: { bg: "#05507D", color: "#FFFFFF", text: "POSCO DX", sub: "포스코DX" },
    images: [],
  },
  {
    slug: "woori-won",
    category: "web-platform",
    name: "우리은행 · 우리WON뱅킹 모바일 뱅킹 UIUX 개선 프로젝트",
    desc: "우리WON뱅킹 앱 시작 온보딩과 적금 상품 가입·예상금리 화면 UI 디자인",
    thumb: "/works/app/woori-thumb.jpg",
    thumbCard: { bg: "#E8F1FD", color: "#0032A0", text: "우리WON뱅킹", sub: "우리은행" },
    info: {
      client: "우리은행",
      role: "웹 · 앱 UI/UX 디자인",
      target: "우리은행 개인 고객 · 신규 앱 사용자",
      expression: "일러스트 온보딩 · 카드 UI · 금리 그래프",
      concept: "밝은 블루와 가벼운 3D 일러스트로 결제·디지털OTP·오픈뱅킹 기능을 쉽게 소개하고, 우대금리를 막대 그래프로 한눈에 보여 주는 친근한 금융 경험",
      colors: [
        { name: "BLUE", hex: "#1E8FEB" },
        { name: "NAVY", hex: "#0B3A8F" },
        { name: "SKY", hex: "#7BC4EA" },
      ],
      tools: "Photoshop · Illustrator · Sketch · ProtoPie · Zeplin",
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
  {
    slug: "shinhan-invest",
    category: "web-platform",
    name: "신한금융투자 · 웹/앱 사이트 운영 PL",
    desc: "2016 신한금융투자 웹·앱 사이트 운영 PL · 프로모션 · 이벤트 · 마이크로사이트 · 사이트 개선",
    thumb: "/works/web/shinhan-mockup.png",
    thumbCard: { bg: "#0046A6", color: "#FFFFFF", text: "신한금융투자", sub: "웹 · 앱 사이트 운영 PL" },
    link: { label: "www.shinhaninvest.com", url: "https://www.shinhaninvest.com/" },
    info: {
      client: "신한금융투자",
      year: "2016",
      role: "운영 PL · 웹/앱 UI 디자인",
      target: "신한금융투자 개인 투자자",
      expression: "프로모션 · 이벤트 · 마이크로사이트",
      concept: "신한금융투자 웹·앱 사이트를 운영하며 프로모션과 이벤트, 마이크로사이트 제작부터 사이트 개선까지 디자인 품질과 일정을 리딩",
      colors: [
        { name: "SHINHAN BLUE", hex: "#0046A6" },
        { name: "SKY", hex: "#3DA0E3" },
        { name: "GRAY", hex: "#D9DDE1" },
      ],
    },
    overview: "2016년 신한금융투자 웹·앱 사이트 운영 PL로 프로모션, 이벤트, 마이크로사이트, 사이트 개선 작업을 이끌었습니다. 메인 상품 배너, 시즌 이벤트, S check·신한 i smart 앱 화면, 빅데이터 주가 예측 서비스 S캐치 마이크로사이트 등을 디자인했습니다.",
    features: [
      { title: "프로모션 · 이벤트", desc: "추천상품 배너와 시즌 이벤트 페이지 디자인" },
      { title: "마이크로사이트", desc: "빅데이터 주가 예측 서비스 S캐치 등 서비스 소개 사이트" },
      { title: "사이트 개선", desc: "웹·앱 운영 중 화면 개선과 디자인 품질 관리" },
    ],
    icon: "/works/app/shinhan-scheck-icon.png",
    hero: { src: "/works/web/shinhan-mockup.png", alt: "신한금융투자 웹·모바일 화면 목업" },
    images: [],
    extras: [
      {
        title: "APP",
        desc: "S check 앱 스플래시 · 아이콘",
        withFeatures: true,
        images: [
          { src: "/works/web/shinhan-scheck.png", alt: "S check 앱 스플래시와 아이콘", caption: "S check" },
        ],
      },
      {
        title: "EVENT",
        desc: "2016 새해 · 크리스마스 시즌 인사 모바일 이벤트 페이지",
        images: [
          { src: "/works/web/shinhan-newyear.jpg", alt: "신한금융투자 2016 새해 인사 페이지", caption: "Happy New Year 2016" },
          { src: "/works/web/shinhan-christmas.jpg", alt: "신한금융투자 크리스마스 인사 페이지", caption: "Merry Christmas" },
        ],
      },
      {
        title: "MICROSITE",
        desc: "빅데이터로 주가의 흐름을 예측하는 S캐치 서비스 사이트와 신한 i smart 로그인 화면",
        images: [
          { src: "/works/web/shinhan-scatch.png", alt: "S캐치 빅데이터 추천 마이크로사이트", caption: "S캐치 · 빅데이터 추천" },
          { src: "/works/web/shinhan-ismart.png", alt: "신한 i smart 로그인 화면", caption: "신한 i smart" },
        ],
      },
    ],
  },
  {
    slug: "lg-uplus",
    category: "web-platform",
    name: "LG유플러스 · U+ 웹/모바일 광고 페이지",
    desc: "TV 광고를 웹·모바일로 새롭게 구성한 배너 광고 중심의 U+ 홈페이지와 이벤트 페이지 디자인",
    thumb: "/works/web/uplus-mockup.jpg",
    thumbCard: { bg: "#E6007E", color: "#FFFFFF", text: "LG U+", sub: "웹 · 모바일 광고 페이지" },
    info: {
      client: "LG유플러스",
      role: "웹·모바일 UI 디자인 · 광고 배너 · 이벤트 페이지 디자인",
      target: "U+ 모바일·LTE 고객",
      expression: "배너 광고 · 이벤트 페이지",
      concept: "광고를 중심으로 혁신적인 디자인 도출 — 배너 광고를 중점으로 하는 컨셉으로, TV 광고를 웹/모바일로 새롭게 구성하여 페이지를 구성",
      colors: [
        { name: "MAGENTA", hex: "#E6007E" },
        { name: "PURPLE", hex: "#4B2C6F" },
        { name: "WHITE", hex: "#FFFFFF" },
      ],
      tools: "Photoshop · Illustrator",
    },
    overview: "LG유플러스 U+ 홈페이지와 모바일 웹을 광고 중심으로 디자인했습니다. TV 광고를 웹·모바일 배너와 페이지로 새롭게 구성하고, LTE 단말 예약가입·서비스 출시·경품 증정 등 이벤트 페이지를 만들었습니다.",
    hero: { src: "/works/web/uplus-mockup.jpg", alt: "LG U+ 웹·모바일 메인 화면 목업" },
    images: [],
    extras: [
      {
        title: "EVENT",
        desc: "TV 광고를 웹·모바일로 옮긴 이벤트 페이지",
        cols: 3,
        images: [
          { src: "/works/web/uplus-lte.jpg", alt: "U+ LTE 갤럭시 S III 예약가입 페이지", caption: "U+ LTE 갤럭시 S III 예약가입" },
          { src: "/works/web/uplus-bookmarket.jpg", alt: "U+ 북마켓 출시 기념 이벤트 페이지", caption: "U+ 북마켓 출시 기념 이벤트" },
          { src: "/works/web/uplus-wifi.jpg", alt: "옵티머스 G Portable Wifi AP 증정 이벤트 페이지", caption: "Portable Wifi AP 증정 이벤트" },
        ],
      },
    ],
  },
  {
    slug: "olympus-korea",
    category: "web-platform",
    name: "올림푸스코리아 · Olympus Korea 메인",
    desc: "올림푸스코리아 메인 페이지 플래시 이미지 작업 및 모션 플래시",
    thumb: "/works/web/olympus-main.jpg",
    thumbCard: { bg: "#14208C", color: "#FFFFFF", text: "OLYMPUS", sub: "올림푸스코리아 메인" },
    info: {
      client: "올림푸스코리아 (Olympus Korea)",
      year: "2008",
      role: "플래시 이미지 작업 · 모션 플래시",
      target: "DSLR · 컴팩트 카메라 고객",
      expression: "플래시 메인 비주얼 · 모션 플래시 · 프로모션 페이지",
      concept: "카메라 제품과 인물 사진이 펼쳐지는 앨범형 메인 비주얼과 버블 모션으로 DSLR · 컴팩트 카메라를 소개",
      colors: [
        { name: "NAVY", hex: "#14208C" },
        { name: "LAVENDER", hex: "#B9A3D6" },
        { name: "PURPLE", hex: "#3A1E5C" },
      ],
      tools: "Photoshop · Flash",
    },
    overview: "올림푸스코리아 메인 페이지의 플래시 이미지와 모션 플래시를 작업했습니다. 메인 비주얼과 DSLR 버전, E-30 출시 프로모션 페이지와 이메일 뉴스레터를 디자인했습니다.",
    hero: { src: "/works/web/olympus-main.jpg", alt: "올림푸스코리아 메인 페이지 · DSLR 메인" },
    images: [],
    extras: [
      {
        title: "PROMOTION",
        desc: "E-30 출시 프로모션 페이지와 이메일 뉴스레터",
        images: [
          { src: "/works/web/olympus-e30.jpg", alt: "올림푸스 E-30 출시 프로모션 페이지", caption: "E-30 출시 프로모션" },
          { src: "/works/web/olympus-newsletter.jpg", alt: "올림푸스 E-30 이메일 뉴스레터", caption: "이메일 뉴스레터" },
        ],
      },
    ],
  },
  {
    slug: "babystar",
    category: "character",
    name: "아기별 · BABY STAR",
    desc: "MODUVA 대표 오리지널 캐릭터 · 별나라에서 온 작은 아기별",
    thumb: "/works/character/babystar-main.png",
    thumbCard: { bg: "#FFF4C2", logo: "/works/character/babystar-main.png", sub: "아기별 BABY STAR", color: "#7A5A00" },
    info: {
      client: "MODUVA (자체 브랜드)",
      year: "2026",
      role: "캐릭터 기획 · 디자인 · 굿즈 디자인",
      target: "캐릭터 굿즈를 좋아하는 10~30대",
      expression: "3D 캐릭터 · 굿즈 목업",
      concept: "'작은 별 하나가 전하는 커다란 행복' — 별나라에서 온 작은 아기별. 옐로 대표색에 크림 화이트·코랄 핑크 볼터치로 따뜻하고 사랑스러운 인상",
      colors: [
        { name: "YELLOW", hex: "#FFD23F" },
        { name: "CREAM", hex: "#FFF6E5" },
        { name: "CORAL PINK", hex: "#F58B8B" },
      ],
      tools: "AI 이미지 생성 · Photoshop",
    },
    overview: "MODUVA의 대표 캐릭터 아기별(BABY STAR)입니다. 저작권을 보유한 오리지널 캐릭터로, 홈페이지 메인과 캐릭터 페이지, 쿠션·머그·에코백 등 굿즈로 활용했습니다.",
    features: [
      { title: "별나라에서 태어난 아기별", desc: "별나라에서 가장 작은 별로 태어났지만 누구보다 환하게 반짝여요." },
      { title: "행복과 응원을 전하는 하루", desc: "사람들에게 반짝 인사를 건네고 작은 응원을 나눠 줘요." },
      { title: "친구들과 함께하는 모험", desc: "호기심이 많아 매일이 작은 모험이에요." },
    ],
    copyright: "© MODUVA CREATIVE STUDIO\n아기별(BABY STAR)은 저작권을 보유한 모두바 오리지널 캐릭터입니다. 무단 복제·배포 및 상업적 이용을 금지합니다.\n캐릭터 이미지는 AI를 활용해 제작되었습니다.",
    images: [],
    extras: [
      {
        title: "CHARACTER",
        withFeatures: true,
        images: [
          { src: "/works/character/babystar-main.png", alt: "아기별 BABY STAR 대표 이미지", caption: "아기별 BABY STAR" },
        ],
      },
      {
        title: "GOODS",
        desc: "아기별을 활용한 굿즈 디자인",
        square: "contain",
        images: [
          { src: "/works/character/babystar-face.png", alt: "아기별 기본 캐릭터", caption: "기본 캐릭터" },
          { src: "/works/character/babystar-cushion.png", alt: "아기별 쿠션", caption: "쿠션" },
          { src: "/works/character/babystar-mug.png", alt: "아기별 머그컵", caption: "머그컵" },
          { src: "/works/character/babystar-ecobag.png", alt: "아기별 에코백", caption: "에코백" },
        ],
      },
    ],
  },
  {
    slug: "moru",
    category: "character",
    name: "모루 · MORU",
    desc: "파랑과 고기를 좋아하는 게임 유튜버 캐릭터",
    thumb: "/works/character/moru-main.png",
    thumbCard: { bg: "#DDEBFF", logo: "/works/character/moru-main.png", sub: "모루 MORU", color: "#1B3FA0" },
    info: {
      client: "MODUVA (자체 브랜드)",
      year: "2026",
      role: "캐릭터 기획 · 디자인 · 굿즈 디자인",
      target: "게임·영상 콘텐츠를 좋아하는 10~20대",
      expression: "3D 캐릭터 · 2D 일러스트 · 굿즈 목업",
      concept: "영상 편집은 누구보다 자신 있는 게임 유튜버. 파랑색을 아주 좋아하고 고기 마니아인 밝은 성격을 파란 곱슬머리와 헤드폰으로 표현",
      colors: [
        { name: "BLUE", hex: "#2B4FD8" },
        { name: "MINT", hex: "#3CC6C0" },
        { name: "WHITE", hex: "#FFFFFF" },
      ],
      tools: "AI 이미지 생성 · Photoshop",
    },
    overview: "게임 유튜버 캐릭터 모루(MORU)입니다. 저작권을 보유한 오리지널 캐릭터로, 3D 캐릭터와 2D 일러스트 버전을 함께 만들어 폰케이스·키링 등 굿즈로 활용했습니다.",
    features: [
      { title: "게임 유튜버", desc: "게임을 하며 시청자와 함께 웃고 떠드는 게임 유튜버예요." },
      { title: "영상 편집 달인", desc: "컷 편집부터 자막까지, 영상 편집 실력이 아주 뛰어나요." },
      { title: "파랑 사랑, 고기 사랑", desc: "가장 좋아하는 색은 파랑, 가장 좋아하는 음식은 고기예요." },
    ],
    copyright: "© MODUVA CREATIVE STUDIO\n모루(MORU)는 저작권을 보유한 모두바 오리지널 캐릭터입니다. 무단 복제·배포 및 상업적 이용을 금지합니다.\n캐릭터 이미지는 AI를 활용해 제작되었습니다.",
    images: [],
    extras: [
      {
        title: "CHARACTER",
        withFeatures: true,
        images: [
          { src: "/works/character/moru-main.png", alt: "모루 MORU 대표 이미지", caption: "모루 MORU" },
        ],
      },
      {
        title: "GOODS",
        desc: "모루 2D 일러스트를 활용한 굿즈 디자인",
        square: "contain",
        images: [
          { src: "/works/character/moru-phonecase.png", alt: "모루 폰케이스·그립톡", caption: "폰케이스 · 그립톡" },
          { src: "/works/character/moru-keyring.png", alt: "모루 아크릴 키링", caption: "아크릴 키링" },
          { src: "/works/character/moru-goods.jpg", alt: "모루 굿즈 모음", caption: "굿즈 모음" },
        ],
      },
    ],
  },
  {
    slug: "modi",
    category: "character",
    name: "모디 · MODI",
    desc: "헤드폰을 낀 하얀 고양이 · 모두바의 안내 캐릭터",
    thumb: "/works/character/modi-main.png",
    thumbCard: { bg: "#FFE8D2", logo: "/works/character/modi-main.png", sub: "모디 MODI", color: "#B4520A" },
    info: {
      client: "MODUVA (자체 브랜드)",
      year: "2026",
      role: "캐릭터 기획 · 디자인 · 굿즈 디자인",
      target: "캐릭터 굿즈를 좋아하는 10~30대",
      expression: "3D 캐릭터 · 2D 일러스트 · 굿즈 목업",
      concept: "하얀 털에 주황 포인트 귀를 가진 고양이. 헤드폰·M 후드티·윙크를 시그니처로, 모두바의 굿즈와 브랜드를 소개하는 친근한 안내 캐릭터",
      colors: [
        { name: "ORANGE", hex: "#F7931E" },
        { name: "WHITE", hex: "#FFFFFF" },
        { name: "GRAY", hex: "#8C8C8C" },
      ],
      tools: "AI 이미지 생성 · Photoshop",
    },
    overview: "MODUVA 캐릭터샵 배너와 굿즈에 쓰인 고양이 캐릭터 모디(MODI)입니다.",
    features: [
      { title: "헤드폰", desc: "고객의 이야기에 귀 기울여요. 어떤 아이디어든 끝까지 들어요." },
      { title: "M 후드티", desc: "가슴의 M은 MODUVA의 M. 모두바의 얼굴이자 브랜드의 상징이에요." },
      { title: "윙크", desc: "언제나 밝고 친근하게, 윙크 한 번으로 분위기를 풀어 줘요." },
    ],
    copyright: "© MODUVA CREATIVE STUDIO\n캐릭터 이미지는 AI를 활용해 제작되었습니다.",
    images: [],
    extras: [
      {
        title: "CHARACTER",
        withFeatures: true,
        images: [
          { src: "/works/character/modi-main.png", alt: "모디 MODI 대표 이미지", caption: "모디 MODI" },
        ],
      },
      {
        title: "GOODS",
        desc: "모디를 활용한 굿즈 디자인",
        images: [
          { src: "/works/character/modi-goods-set.png", alt: "모디 에코백·키링·파우치 세트", caption: "에코백 · 키링 · 파우치 세트" },
        ],
      },
      {
        title: "GOODS COLLECTION",
        cols: 3,
        square: "cover",
        images: [
          { src: "/works/character/modi-m-note.png", alt: "모디 윙크 에코백", caption: "윙크 에코백" },
          { src: "/works/character/modi-wink-mug.png", alt: "모디 윙크 머그컵", caption: "윙크 머그컵" },
          { src: "/works/character/modi-wink-ecobag.png", alt: "모디 M 하드커버 노트", caption: "M 하드커버 노트" },
          { src: "/works/character/modi-ecobag.png", alt: "모디 에코백", caption: "에코백" },
          { src: "/works/character/modi-springnote.png", alt: "모디 스프링 노트", caption: "스프링 노트" },
          { src: "/works/character/modi-mug.png", alt: "모디 머그컵", caption: "머그컵" },
        ],
      },
    ],
  },
  {
    slug: "miya",
    category: "character",
    name: "MIYA · 디자이너 캐릭터",
    desc: "아기별·모루를 만든 20년 차 크리에이티브 디자이너 MIYA의 캐릭터",
    thumb: "/works/character/miya-main.png",
    thumbCard: { bg: "#FFF1DC", logo: "/works/character/miya-main.png", sub: "MIYA", color: "#7A4A12" },
    info: {
      client: "MODUVA (자체 브랜드)",
      year: "2026",
      role: "캐릭터 기획 · 디자인",
      target: "MODUVA 홈페이지 방문자",
      expression: "3D 캐릭터",
      concept: "캡모자와 멜빵 차림의 웃는 얼굴로, 의뢰인이 편하게 말을 걸 수 있는 디자이너의 모습을 표현",
      colors: [
        { name: "MUSTARD", hex: "#E9A93A" },
        { name: "DENIM", hex: "#5A6E8C" },
        { name: "BLACK", hex: "#1A1A1A" },
      ],
      tools: "AI 이미지 생성 · Photoshop",
    },
    overview: "MODUVA 홈페이지의 디자이너 소개 페이지에 쓰인 MIYA 캐릭터입니다.",
    features: [
      { title: "Creative Designer", desc: "20년 차 · 브랜딩 · 캐릭터 · UX/UI" },
      { title: "캐릭터 디자이너", desc: "모두바 오리지널 캐릭터 아기별·모루를 만들었어요." },
    ],
    copyright: "© MODUVA CREATIVE STUDIO\n캐릭터 이미지는 AI를 활용해 제작되었습니다.",
    images: [],
    extras: [
      {
        title: "CHARACTER",
        withFeatures: true,
        images: [
          { src: "/works/character/miya-main.png", alt: "MIYA 디자이너 캐릭터", caption: "MIYA" },
        ],
      },
    ],
  },
];

export const getCategory = (slug?: string) =>
  categories.find((c) => c.slug === (slug === "mobile-ux" ? "web-platform" : slug));
export const getCategoryByTitle = (title: string) => categories.find((c) => c.title === title);
export const getWorksByCategory = (slug: string) => works.filter((w) => w.category === slug);
// 앱 디자인(mobile-ux)은 웹·앱 UIUX(web-platform)로 합쳐짐 — 예전 주소도 열리게
export const getWork = (cat?: string, slug?: string) =>
  works.find((w) => w.category === (cat === "mobile-ux" ? "web-platform" : cat) && w.slug === slug);

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
