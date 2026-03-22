import { Search } from "lucide-react";

export default function SearchSection() {
  return (
    <section className="px-5 py-5">
      <div className="flex items-center gap-3 rounded-[20px] border border-[#f3bfd5] bg-white px-4 py-3">
        <Search className="h-5 w-5 text-[#b87a95]" />

        <input
          type="text"
          placeholder="추억을 검색하세요"
          className="w-full bg-transparent text-[15px] outline-none placeholder:text-[#b79bab]"
        />
      </div>
    </section>
  );
}
