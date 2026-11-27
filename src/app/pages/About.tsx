import React from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Mail, Instagram, Linkedin, Palette, MessageCircle, FileText, Download } from 'lucide-react';

// 디자이너 연락·채널 목록
// 아이콘만 표시. 주소(href)를 채우면 클릭해서 이동, 비워 두면 아이콘만 보임.
const socials = [
  { label: 'Email', href: 'mailto:mimijjangok@naver.com', Icon: Mail, external: false },
  { label: 'Project Inquiry', href: '/contact', Icon: MessageCircle, external: false },
  { label: 'Portfolio PDF', href: '/portfolio.pdf', Icon: FileText, external: true },
  { label: 'Instagram', href: '', Icon: Instagram, external: true },   // 예: https://instagram.com/아이디
  { label: 'Behance', href: '', Icon: Palette, external: true },       // 예: https://behance.net/아이디 (노트폴리오도 가능)
  { label: 'LinkedIn', href: '', Icon: Linkedin, external: true },     // 예: https://linkedin.com/in/아이디
];

export const About = () => {
  return (
    <div className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative aspect-[3/4] rounded-none overflow-hidden border-2 border-black"
        >
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1647892842753-01ee3cafd42e" 
            alt="Minimalist Graphic Layout" 
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
          />
        </motion.div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="space-y-12"
        >
          <div>
            <h1 className="text-5xl font-black uppercase mb-6 tracking-tight">
              DESIGN <span className="text-[#05D920]">LEADERSHIP</span>
            </h1>
            <p className="text-xl text-black leading-relaxed mb-6 font-medium">
              20년의 세월 동안 웹과 앱의 진화 과정을 최전선에서 경험하며, 
              단순한 디자인을 넘어 비즈니스 성공을 리딩하는 UXUI 전략가로 성장했습니다.
            </p>
            <p className="text-lg text-black/60 leading-relaxed font-normal">
              수많은 대규모 프로젝트의 PM과 PL로서 팀의 방향성을 제시하고 리드해왔으며, 
              이제는 AI 기술을 온·오프라인 디자인에 접목하여 더욱 지능적이고 입체적인 
              사용자 경험을 설계하는 데 주력하고 있습니다.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 border-t-2 border-black pt-12">
            <div>
              <h3 className="text-[#05D920] font-bold mb-4 uppercase text-xs tracking-[0.2em]">Experience</h3>
              <ul className="space-y-3 text-black text-sm font-medium break-keep">
                <li>KB국민은행 웹·앱·모바일웹<br /><span className="text-black/50 text-xs">2017 웹어워드 금융 부문 대상</span></li>
                <li>NH투자증권 나무증권<br /><span className="text-black/50 text-xs">앱 UXUI · 운영 리더</span></li>
                <li>신한금융투자 웹/앱<br /><span className="text-black/50 text-xs">사이트 운영 PL</span></li>
                <li>NH 오늘농사 네이티브 앱<br /><span className="text-black/50 text-xs">4차 고도화 디자인 100%</span></li>
                <li>하나은행 · 우리은행 · POSCO DX · 삼성SDS · 국가교육위원회</li>
                <li>지오이스트 AI 홈페이지 · 대시보드</li>
              </ul>
            </div>
                        <div>
              <h3 className="text-black font-bold mb-4 uppercase text-xs tracking-[0.2em]">Tool Stack</h3>
              <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400 mb-2">Design</div>
              <ul className="space-y-3 text-black text-sm font-medium mb-6">
                <li>Figma</li>
                <li>Photoshop · Illustrator</li>
                <li>ProtoPie</li>
                <li>Zeplin</li>
                <li>Sketch</li>
                <li>Adobe XD</li>
              </ul>
              <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#05D920] mb-2">AI</div>
              <ul className="space-y-3 text-black text-sm font-medium">
                <li>Claude · Claude Code</li>
                <li>ChatGPT</li>
                <li>Cursor (AI Code Editor)</li>
                <li>Midjourney</li>
              </ul>
            </div>
          </div>

          <div className="pt-12 border-t-2 border-black flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div>
              <h3 className="text-black font-bold mb-6 uppercase text-xs tracking-[0.2em]">Contact & Social</h3>
              <div className="flex flex-wrap gap-8">
                {socials.map(({ label, href, Icon, external }) =>
                  href ? (
                    <motion.a
                      key={label}
                      whileHover={{ scale: 1.2, color: '#05D920' }}
                      href={href}
                      aria-label={label}
                      title={label}
                      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="text-black transition-colors"
                    >
                      <Icon size={20} />
                    </motion.a>
                  ) : (
                    // 주소가 아직 없는 채널: 아이콘만 표시 (클릭되지 않음)
                    <span key={label} title={label} aria-label={label} className="text-black">
                      <Icon size={20} />
                    </span>
                  )
                )}
              </div>
            </div>

            <div className="flex flex-col items-start md:items-end gap-3">
              <a 
                href="/resume.pdf"
                download
                className="inline-flex items-center gap-3 whitespace-nowrap px-8 py-4 bg-black text-white hover:bg-[#05D920] hover:text-black transition-all font-black uppercase text-xs tracking-widest"
              >
                Download Resume <Download size={14} />
              </a>
              <p className="text-[10px] font-bold text-black/30 tracking-[0.2em] uppercase">Last Update: Nov 2026</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
