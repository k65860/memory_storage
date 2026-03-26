"use client";

import Image from "next/image";

export interface MemoryItem {
  id: number;
  title: string;
  description: string;
  date: string;
  imageUrl?: string;
}

interface MemoryCardProps {
  memory: MemoryItem;
  onTitleClick: (memory: MemoryItem) => void;
}

export default function MemoryCard({ memory, onTitleClick }: MemoryCardProps) {
  return (
    <article className="rounded-[24px] border border-[#f4cade] bg-[#fffafb] p-4 shadow-sm">
      <div className="flex gap-4">
        {memory.imageUrl ? (
          <div className="relative h-[92px] w-[92px] shrink-0 overflow-hidden rounded-[18px]">
            <Image
              src={memory.imageUrl}
              alt={`${memory.title} 이미지`}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="flex h-[92px] w-[92px] shrink-0 items-center justify-center rounded-[18px] bg-[#f6cddd]">
            <div className="relative h-[70px] w-[70px] overflow-hidden rounded-[12px] bg-[#f4a6c3]">
              <div className="absolute bottom-0 left-0 h-10 w-10 rotate-45 bg-[#ec8eb3]" />
              <div className="absolute bottom-0 right-0 h-8 w-8 rotate-45 bg-[#e57ea9]" />
              <div className="absolute right-2 top-2 text-sm text-white">♡</div>
            </div>
          </div>
        )}

        <div className="min-w-0 flex-1">
          <button
            type="button"
            onClick={() => onTitleClick(memory)}
            className="cursor-pointer truncate text-left text-[20px] font-bold leading-none text-[#f0629a]"
          >
            {memory.title}
          </button>

          <p className="mt-3 text-lg text-[#7f6170]">{memory.description}</p>

          <p className="mt-3 text-sm font-medium text-[#f28db1]">
            {memory.date}
          </p>
        </div>
      </div>
    </article>
  );
}
