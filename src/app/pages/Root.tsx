import React, { useEffect } from 'react';
import { Outlet } from 'react-router';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ViewportIndicator } from '../components/ViewportIndicator';
import { motion, AnimatePresence } from 'motion/react';

export const Root = () => {
  // 사이트 전체 이미지 보호: 우클릭 메뉴·이미지 끌기·저장(Ctrl/Cmd+S)·인쇄(Ctrl/Cmd+P)·Print Screen 막기
  useEffect(() => {
    const isField = (t: EventTarget | null) => !!(t as HTMLElement | null)?.closest?.('input, textarea, select, [contenteditable="true"]');
    const onMenu = (e: MouseEvent) => { if (!isField(e.target)) e.preventDefault(); };
    const onDrag = (e: DragEvent) => { if ((e.target as HTMLElement | null)?.tagName === 'IMG') e.preventDefault(); };
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if ((e.ctrlKey || e.metaKey) && (k === 's' || k === 'p')) e.preventDefault();
      if (e.key === 'PrintScreen') { navigator.clipboard?.writeText('').catch(() => {}); }
    };
    document.addEventListener('contextmenu', onMenu);
    document.addEventListener('dragstart', onDrag);
    document.addEventListener('keydown', onKey);
    document.addEventListener('keyup', onKey);
    return () => {
      document.removeEventListener('contextmenu', onMenu);
      document.removeEventListener('dragstart', onDrag);
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('keyup', onKey);
    };
  }, []);

  return (
    <div className="img-protect min-h-screen bg-white text-black selection:bg-[#05D920] selection:text-white flex flex-col font-sans">
      <ViewportIndicator />
      <Navbar />
      <main className="flex-1 subpixel-antialiased">
        <AnimatePresence mode="wait">
          <Outlet />
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
};
