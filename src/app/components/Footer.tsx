import React from 'react';

export const Footer = () => {
  return (
    <footer className="py-16 border-t-[1px] border-black/10 px-6 md:px-12 mt-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-10">
        <div className="space-y-4">
          <p className="text-2xl font-black tracking-tighter uppercase">
            MI3<span className="text-[#05D920]">___</span>Lee
          </p>
          <p className="text-black text-xs font-bold tracking-widest leading-relaxed max-w-xs">
            20 YEARS OF STRATEGIC DESIGN LEADERSHIP. <br />
            INTEGRATING INTELLIGENCE INTO AESTHETICS.
          </p>
        </div>
        
        <div className="flex flex-col md:items-end gap-6">
          <div className="flex gap-10 text-[10px] font-black text-black tracking-[0.3em] uppercase">
            <a href="#" className="hover:text-[#05D920] transition-colors">BEHANCE</a>
            <a href="#" className="hover:text-[#05D920] transition-colors">DRIBBBLE</a>
            <a href="#" className="hover:text-[#05D920] transition-colors">LINKEDIN</a>
          </div>
          <p className="text-black/40 text-[10px] font-bold tracking-[0.1em]">
            © 2026 MI3___Lee PORTFOLIO. ALL RIGHTS RESERVED.
          </p>
          <p className="text-black/40 text-[10px] font-medium mt-1">
            사이트의 모든 디자인·이미지는 무단 복제·캡처·다운로드·배포를 금지하며, 무단 복제·사용 시 법적 문제가 발생할 수 있습니다.
          </p>
        </div>
      </div>
    </footer>
  );
};
