"use client";

import { Search, X } from "lucide-react";

interface SearchSectionProps {
  searchTerm: string;
  onChangeSearchTerm: (value: string) => void;
}

export default function SearchSection({
  searchTerm,
  onChangeSearchTerm,
}: SearchSectionProps) {
  return (
    <section className="px-5 py-4">
      <div className="group flex h-14 items-center gap-3 rounded-[20px] border border-[#f2cfdd] bg-white/95 px-4 shadow-[0_6px_20px_rgba(151,91,116,0.08)] transition focus-within:border-[#f58bb5] focus-within:shadow-[0_8px_24px_rgba(244,114,167,0.16)]">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[13px] bg-[#fff0f6] text-[#ec78a6] transition group-focus-within:bg-[#fce3ed]">
          <Search className="h-[18px] w-[18px]" />
        </div>

        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onChangeSearchTerm(e.target.value)}
          placeholder="기억하고 싶은 추억을 검색해 보세요."
          aria-label="추억 검색"
          className="min-w-0 flex-1 bg-transparent text-[15px] font-medium text-[#6f5662] outline-none placeholder:font-normal placeholder:text-[#bea6b1]"
        />

        {searchTerm && (
          <button
            type="button"
            onClick={() => onChangeSearchTerm("")}
            aria-label="검색어 지우기"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f8e8ef] text-[#bd8299] transition hover:bg-[#f4d8e4] hover:text-[#e66f9f] active:scale-95"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </section>
  );
}
