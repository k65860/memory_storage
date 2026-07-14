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
      <div className="flex items-center gap-3 rounded-[16px] border-2 border-[#f78db8] bg-[#fffdf7] px-4 py-3 shadow-[3px_3px_0_#b7d9e8]">
        <Search className="h-5 w-5 shrink-0 text-[#5aa8c8]" />

        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onChangeSearchTerm(e.target.value)}
          placeholder="추억을 검색하세요"
          className="w-full bg-transparent text-[15px] text-[#4b4b4b] outline-none placeholder:text-[#8fa6ad]"
        />

        {searchTerm && (
          <button
            type="button"
            onClick={() => onChangeSearchTerm("")}
            className="flex h-6 w-6 items-center justify-center rounded-full bg-[#d9eef8] text-[#5aa8c8]"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </section>
  );
}
