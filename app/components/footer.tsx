import Link from "next/link";
import { House, Plus, User } from "lucide-react";

export default function Bottom() {
  return (
    <nav className="fixed bottom-0 left-1/2 z-20 w-full max-w-[430px] -translate-x-1/2 border-t border-[#f3c8da] bg-[#fffafb]">
      <div className="grid h-20 grid-cols-3 items-end pb-3">
        <Link
          href="/"
          className="flex flex-col items-center justify-center gap-1 text-[#f28db1]"
        >
          <House size={24} strokeWidth={2} />
          <span className="text-[14px] font-semibold">홈</span>
        </Link>

        <Link
          href="/memories/new"
          className="flex h-full items-end justify-center text-[#f28db1]"
        >
          <span className="text-[14px] font-semibold">추가</span>
        </Link>

        <Link
          href="/mypage"
          className="flex flex-col items-center justify-center gap-1 text-[#f28db1]"
        >
          <User size={24} strokeWidth={2} />
          <span className="text-[14px] font-semibold">마이페이지</span>
        </Link>
      </div>

      <Link
        href="/memories/new"
        aria-label="새 추억 추가"
        className="absolute left-1/2 top-2 z-30 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#f472a7] text-white shadow-[0_8px_20px_rgba(244,114,167,0.35)] transition active:scale-95"
      >
        <Plus size={24} strokeWidth={3} />
      </Link>
    </nav>
  );
}
