"use client";

import { Heart, Menu } from "lucide-react";

interface HeaderProps {
  onMenuClick?: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="relative z-20 border-b border-[#f4d5e1] bg-[#fffafb]/95 px-5 py-3.5 backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[16px] bg-gradient-to-br from-[#ff9fc4] to-[#f472a7] shadow-[0_6px_16px_rgba(244,114,167,0.28)]">
            <Heart className="h-5 w-5 fill-white text-white" />
          </div>

          <div className="min-w-0">
            <p className="text-[12px] font-medium tracking-[0.08em] text-[#c699aa]">
              MEMORY ARCHIVE
            </p>

            <h1 className="truncate text-[20px] font-extrabold tracking-[-0.03em] text-[#f0629a]">
              추억저장소
            </h1>
          </div>
        </div>

        <button
          type="button"
          aria-label="메뉴 열기"
          onClick={onMenuClick}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[16px] border border-[#f4c9d9] bg-white text-[#e978a4] shadow-sm transition hover:bg-[#fff3f8] active:scale-95"
        >
          <Menu className="pointer-events-none h-5 w-5" />
        </button>
      </div>
    </header>
  );
}
