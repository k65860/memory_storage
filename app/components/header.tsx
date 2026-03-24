"use client";

import { Menu, Heart } from "lucide-react";

interface HeaderProps {
  onMenuClick?: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="relative z-20 bg-[#f78db8] px-5 py-4 text-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/25">
            <Heart className="h-5 w-5 fill-white text-white" />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight">추억저장소</h1>
        </div>

        <button
          type="button"
          aria-label="메뉴"
          onClick={onMenuClick}
          className="flex h-10 w-10 items-center justify-center"
        >
          <Menu className="pointer-events-none h-6 w-6" />
        </button>
      </div>
    </header>
  );
}
