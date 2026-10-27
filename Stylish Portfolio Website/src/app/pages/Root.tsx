import React from 'react';
import { Outlet } from 'react-router';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ViewportIndicator } from '../components/ViewportIndicator';
import { motion, AnimatePresence } from 'motion/react';

export const Root = () => {
  return (
    <div className="min-h-screen bg-white text-black selection:bg-[#05D920] selection:text-white flex flex-col font-sans">
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
