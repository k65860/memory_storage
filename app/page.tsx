"use client";

import { useMemo, useState } from "react";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import SearchSection from "@/app/home/searchSection";
import MemoryCard from "@/app/home/memoryCard";
import SideBar from "@/app/components/sideBar";
import EditMemoryModal, { MemoryItem } from "@/app/home/editMemoryModal";

const initialMemories: MemoryItem[] = [
  {
    id: 1,
    title: "우리의 첫 인생네컷",
    description: "안국역에서 데이트",
    date: "2025.05.16",
    imageUrl: "/images/ganadi_profile.png",
  },
  {
    id: 2,
    title: "첫 데이트",
    description: "우리의 첫 만남",
    date: "2023.05.01",
    imageUrl: "/images/ganadi2.png",
  },
  {
    id: 3,
    title: "기념일 케이크",
    description: "기념일에 먹었던 케이크",
    date: "2023.02.14",
    imageUrl: "",
  },
  {
    id: 4,
    title: "벚꽃 데이트",
    description: "여의도에서 벚꽃 구경",
    date: "2024.04.07",
    imageUrl: "",
  },
  {
    id: 5,
    title: "여름 바다",
    description: "강릉 바다 보러 간 날",
    date: "2024.08.11",
    imageUrl: "",
  },
  {
    id: 6,
    title: "크리스마스",
    description: "케이크랑 선물 교환",
    date: "2024.12.25",
    imageUrl: "",
  },
];

export default function HomePage() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [memories, setMemories] = useState(initialMemories);
  const [selectedMemory, setSelectedMemory] = useState<MemoryItem | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMemories = useMemo(() => {
    const normalizedSearchTerm = searchTerm.trim().toLowerCase();

    if (!normalizedSearchTerm) return memories;

    return memories.filter((memory) =>
      memory.title.toLowerCase().includes(normalizedSearchTerm),
    );
  }, [memories, searchTerm]);

  const handleOpenEditModal = (memory: MemoryItem) => {
    setSelectedMemory(memory);
    setOpenModal(true);
  };

  const handleSaveMemory = (updatedMemory: MemoryItem) => {
    setMemories((prev) =>
      prev.map((item) => (item.id === updatedMemory.id ? updatedMemory : item)),
    );
  };

  return (
    <div className="relative h-[100dvh] overflow-hidden">
      <main className="flex h-full flex-col bg-[#fff7fb]">
        <Header onMenuClick={() => setOpenDrawer(true)} />

        <div className="shrink-0">
          <SearchSection
            searchTerm={searchTerm}
            onChangeSearchTerm={setSearchTerm}
          />
        </div>

        <section className="flex-1 overflow-y-auto px-5 pb-32">
          {filteredMemories.length > 0 ? (
            <div className="space-y-4">
              {filteredMemories.map((memory) => (
                <MemoryCard
                  key={memory.id}
                  memory={memory}
                  onTitleClick={handleOpenEditModal}
                />
              ))}
            </div>
          ) : (
            <div className="flex h-full items-start justify-center pt-16">
              <p className="text-[16px] font-medium text-[#b79bab]">
                추억이 없습니다.
              </p>
            </div>
          )}
        </section>

        <Footer />
      </main>

      <SideBar open={openDrawer} onClose={() => setOpenDrawer(false)} />

      <EditMemoryModal
        open={openModal}
        memory={selectedMemory}
        onClose={() => setOpenModal(false)}
        onSave={handleSaveMemory}
      />
    </div>
  );
}
