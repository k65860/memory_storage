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
    <section className="px-5 py-5">
      <div className="flex items-center gap-3 rounded-[20px] border border-[#f3bfd5] bg-white px-4 py-3">
        <Search className="h-5 w-5 shrink-0 text-[#b87a95]" />

        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onChangeSearchTerm(e.target.value)}
          placeholder="추억을 검색하세요"
          className="w-full bg-transparent text-[15px] outline-none placeholder:text-[#b79bab]"
        />

        {searchTerm && (
          <button
            type="button"
            onClick={() => onChangeSearchTerm("")}
            aria-label="검색어 지우기"
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-pink-50 text-[#b87a95]"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </section>
  );
}
