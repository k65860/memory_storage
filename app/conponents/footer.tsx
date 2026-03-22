import Link from "next/link";

export default function Bottom() {
  return (
    <nav className="fixed bottom-0 left-1/2 z-20 w-full max-w-[430px] -translate-x-1/2 border-t border-[#f3c8da] bg-[#fffafb]">
      <div className="grid h-24 grid-cols-3 items-center">
        <Link
          href="/"
          className="flex flex-col items-center justify-center gap-1 text-[#f28db1]"
        >
          <span className="text-2xl">⌂</span>
          <span className="text-md font-semibold">홈</span>
        </Link>

        <Link
          href="/memories/new"
          className="flex flex-col items-center justify-center"
        >
          <div className="-mt-8 flex h-16 w-16 items-center justify-center rounded-full bg-[#f472a7] text-3xl leading-none text-white shadow-lg">
            +
          </div>
          <span className="mt-1 text-md font-semibold text-[#f28db1]">
            추가
          </span>
        </Link>

        <Link
          href="/mypage"
          className="flex flex-col items-center justify-center gap-1 text-[#f28db1]"
        >
          <span className="text-2xl">◠</span>
          <span className="text-md font-semibold">마이페이지</span>
        </Link>
      </div>
    </nav>
  );
}
