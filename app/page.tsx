import Header from "@/app/conponents/header";
import Footer from "@/app/conponents/footer";
import SearchSection from "@/app/home/searchSection";
import MemoryCard from "@/app/home/memoryCard";

//임시데이터
const memories = [
  {
    id: 1,
    title: "우리의 첫 인생네컷",
    description: "안국역에서 데이트",
    date: "2025.05.16",
  },
  {
    id: 2,
    title: "첫 데이트",
    description: "우리의 첫 만남",
    date: "2023.05.01",
  },
  {
    id: 3,
    title: "기념일 케이크",
    description: "기념일에 먹었던 케이크",
    date: "2023.02.14",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-dvh bg-[#fff7fb]">
      <Header />

      <SearchSection />

      <section className="px-5 pb-28">
        <div className="space-y-4">
          {memories.map((memory) => (
            <MemoryCard key={memory.id} memory={memory} />
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
