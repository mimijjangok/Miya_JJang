import React from 'react';
import { NavLink } from 'react-router';
import { motion } from 'motion/react';

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-6 md:px-12 bg-white border-b-[1px] border-black/10">
      <NavLink to="/" className="text-2xl font-black tracking-tighter text-black uppercase">
        MI3<span className="text-[#05D920]">___</span>Lee
      </NavLink>
      <div className="flex gap-10 items-center">
        <NavLink 
          to="/" 
          className={({ isActive }) => 
            `text-[11px] font-black tracking-[0.2em] transition-colors hover:text-[#05D920] ${isActive ? 'text-[#05D920]' : 'text-black'}`
          }
        >
          HOME
        </NavLink>
        <NavLink 
          to="/works" 
          className={({ isActive }) => 
            `text-[11px] font-black tracking-[0.2em] transition-colors hover:text-[#05D920] ${isActive ? 'text-[#05D920]' : 'text-black'}`
          }
        >
          WORKS
        </NavLink>
        <NavLink 
          to="/about" 
          className={({ isActive }) => 
            `text-[11px] font-black tracking-[0.2em] transition-colors hover:text-[#05D920] ${isActive ? 'text-[#05D920]' : 'text-black'}`
          }
        >
          ABOUT
        </NavLink>
      </div>
    </nav>
  );
};
