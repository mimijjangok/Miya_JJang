import React from 'react';

export default function AiTransformation() {
  return (
    <div className="min-h-screen bg-white text-black font-sans px-6 md:px-16 py-12">
      {/* 네비게이션 헤더 */}
      <header className="flex justify-between items-center mb-16 border-b border-black pb-4">
        <a href="/" className="font-bold tracking-widest text-lg">MI3 &nbsp;___&nbsp; LEE</a>
        <nav className="flex gap-6 text-sm font-medium">
          <a href="/" className="hover:opacity-50">HOME</a>
          <a href="/works" className="text-green-500 font-semibold">WORKS</a>
          <a href="/about" className="hover:opacity-50">ABOUT</a>
        </nav>
      </header>

      {/* 프로젝트 상세 히어로 섹션 */}
      <main className="max-w-4xl mx-auto">
        <div className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-3">
          Section 01 / Detailed Project Case
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
          AI & DIGITAL TRANSFORMATION
        </h1>
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-12">
          최신 생성형 인공지능 기술과 디자인 프로세스를 융합하여, 복잡한 데이터와 워크플로우를 직관적이고 아름다운 사용자 경험으로 재정의한 프로젝트입니다.
        </p>

        {/* 비주얼 배너 영역 */}
        <div className="w-full h-96 bg-black flex items-center justify-center text-white mb-16 relative overflow-hidden rounded-none shadow-lg">
          <div className="absolute inset-0 bg-[radial-gradient(#22c55e_1px,transparent_1px)] [background-size:16px_16px] opacity-20"></div>
          <span className="text-2xl md:text-3xl font-bold tracking-wider text-green-400 border border-green-400 px-6 py-3">
            AI DRIVEN AESTHETICS
          </span>
        </div>

        {/* 상세 설명 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="text-xl font-bold mb-3">01 / Challenge</h3>
            <p className="text-gray-600 leading-relaxed">
              기존의 경직된 업무 환경에서 인공지능 솔루션을 도입할 때 사용자가 느끼는 진입 장벽을 낮추고, 시각적인 거부감 없이 자연스럽게 업무에 스며들도록 하는 것이 가장 큰 과제였습니다.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-3">02 / Solution</h3>
            <p className="text-gray-600 leading-relaxed">
              미니멀리즘 인터페이스와 고도화된 타이포그래피 시스템을 적용하여 복잡한 알고리즘 결과를 한눈에 파악할 수 있도록 설계하고, 핵심 포인트 컬러로 시인성을 극대화했습니다.
            </p>
          </div>
        </div>

        {/* 하단 네비게이션 */}
        <div className="border-t border-black pt-8 flex justify-between items-center">
          <a href="/works" className="text-sm font-bold flex items-center gap-2 hover:opacity-60">
            ← BACK TO WORKS
          </a>
          <a href="/" className="text-sm font-bold bg-black text-white px-6 py-3 hover:bg-green-500 hover:text-black transition-colors">
            START A PROJECT
          </a>
        </div>
      </main>

      {/* 푸터 */}
      <footer className="mt-24 border-t border-black pt-8 flex flex-col md:flex-row justify-between text-xs text-gray-500">
        <p>© 2026 MI3___Lee PORTFOLIO. ALL RIGHTS RESERVED.</p>
        <div className="flex gap-4 mt-4 md:mt-0 font-bold text-black">
          <a href="#behance">BEHANCE</a>
          <a href="#dribbble">DRIBBBLE</a>
          <a href="#linkedin">LINKEDIN</a>
        </div>
      </footer>
    </div>
  );
}
