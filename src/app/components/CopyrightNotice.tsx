import React from "react";

// 저작권 안내 (모든 작업 목록·상세 페이지 하단)
export const CopyrightNotice = ({ subject = "디자인·이미지", className = "" }: { subject?: string; className?: string }) => (
  <div className={`border-t border-zinc-200 pt-6 text-[11px] leading-relaxed text-gray-400 ${className}`}>
    <p className="font-bold text-gray-500 mb-1">COPYRIGHT NOTICE</p>
    <p>이 페이지의 모든 {subject}은 MI3___LEE(김미례)가 디자인한 작업물로, 각 작업의 저작권은 디자이너 또는 해당 기업·기관에 있습니다.</p>
    <p>포트폴리오 열람 목적으로만 게시하며, 무단 복제·캡처·다운로드·배포 및 상업적 이용을 금지합니다. 무단 복제·사용 시 법적 문제가 발생할 수 있습니다.</p>
  </div>
);
