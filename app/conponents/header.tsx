export default function Header() {
  return (
    <header className="sticky top-0 z-10 bg-[#f78db8] px-5 py-4 text-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/25 text-xl">
            ♡
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight">추억저장소</h1>
        </div>

        <button
          type="button"
          aria-label="메뉴"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-2xl"
        >
          ☰
        </button>
      </div>
    </header>
  );
}
