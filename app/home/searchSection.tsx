import Link from "next/link";

export default function SearchSection() {
  return (
    <section className="px-5 py-5">
      <div className="rounded-[28px] border border-[#f6c8db] bg-[#fffafb] px-4 py-4 shadow-sm">
        <div className="flex items-center gap-3 rounded-[20px] border border-[#f3bfd5] bg-white px-4 py-3 text-[#b87a95]">
          <span className="text-2xl leading-none">⌕</span>
          <input
            type="text"
            placeholder="추억을 검색하세요"
            className="w-full bg-transparent text-md outline-none placeholder:text-[#b79bab]"
          />
        </div>

        <Link
          href="/memories/new"
          className="mt-4 flex h-14 w-full items-center justify-center rounded-[22px] bg-[#f78db8] text-lg font-bold text-white shadow-[inset_0_-3px_0_rgba(0,0,0,0.08)]"
        >
          + 추억 작성
        </Link>
      </div>
    </section>
  );
}
