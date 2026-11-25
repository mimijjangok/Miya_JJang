import React from "react";

// 지오이스트 로고 시트 — goest.co.kr의 실제 벡터 심볼 + Pretendard Bold로 다시 그려
// 어떤 화면 크기에서도 선명하게 보이도록 한 버전입니다.
const BLUE = "#0D67FD";

const Symbol = ({ color = BLUE, size = 32 }: { color?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
    <path
      d="M28.1044 7.92848C25.5032 4.34187 21.2149 2 16.3654 2C8.43161 2 2 8.26801 2 16C2 23.732 8.43161 30 16.3654 30C22.5808 30 27.8743 26.1531 29.8758 20.7691M19.281 20.8755C17.9475 21.6815 16.2885 21.9692 14.6532 21.5422C11.5125 20.722 9.6486 17.5758 10.4902 14.515C11.3317 11.4541 14.56 9.63764 17.7008 10.4578C18.6647 10.7095 19.5084 11.1803 20.1905 11.8006L30 20.4407"
      stroke={color}
      strokeWidth="4"
      strokeLinecap="round"
    />
  </svg>
);

const Wordmark = ({
  text,
  color = "#111",
  symbolColor = BLUE,
  size = 1,
}: {
  text: string;
  color?: string;
  symbolColor?: string;
  size?: number;
}) => (
  <div className="flex items-center" style={{ gap: 8 * size }}>
    <Symbol color={symbolColor} size={30 * size} />
    <span
      style={{
        fontFamily: "Pretendard, sans-serif",
        fontWeight: 700,
        fontSize: 28 * size,
        letterSpacing: "-0.5px",
        color,
        lineHeight: 1,
      }}
    >
      {text}
    </span>
  </div>
);

export const GoestBrandSheet = () => (
  <div className="bg-white border border-zinc-200 p-6 md:p-10">
    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6">Logo System</div>

    {/* 1줄: 심볼 + 컬러 로고 */}
    <div className="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-6 md:gap-10 items-center">
      <div className="w-[120px] h-[120px] bg-zinc-100 flex items-center justify-center">
        <Symbol size={64} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6">
        <Wordmark text="지오이스트" size={1.1} />
        <Wordmark text="OEST" size={1.1} color="#14143C" />
        <Wordmark text="지오이스트" size={0.8} />
        <Wordmark text="OEST" size={0.8} color="#14143C" />
      </div>
    </div>

    {/* 2줄: 앱 아이콘 + 반전 로고 */}
    <div className="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-6 md:gap-10 items-center mt-10">
      <div className="w-[120px] h-[120px] rounded-[26px] flex items-center justify-center" style={{ background: BLUE }}>
        <Symbol color="#fff" size={64} />
      </div>
      <div className="bg-black px-8 py-8 flex flex-wrap items-center gap-x-12 gap-y-6">
        <Wordmark text="지오이스트" size={1.1} color="#fff" />
        <Wordmark text="OEST" size={1.1} color="#fff" />
      </div>
    </div>
  </div>
);
