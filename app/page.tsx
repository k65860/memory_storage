"use client";

import { useEffect, useMemo, useState } from "react";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import SearchSection from "@/app/home/searchSection";
import MemoryCard from "@/app/home/memoryCard";
import SideBar from "@/app/components/sideBar";
import EditMemoryModal, { MemoryItem } from "@/app/home/editMemoryModal";
import { supabase } from "@/lib/supabase/client";

export default function HomePage() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [memories, setMemories] = useState<MemoryItem[]>([]);
  const [selectedMemory, setSelectedMemory] = useState<MemoryItem | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMemories = async () => {
      try {
        setIsLoading(true);
        setError("");

        const { data, error: supabaseError } = await supabase
          .from("memories")
          .select("id, title, description, memory_date, image_url")
          .order("created_at", { ascending: false });

        if (supabaseError) {
          console.error("추억 불러오기 실패:", supabaseError);
          setError("추억을 불러오지 못했습니다.");
          return;
        }

        const mappedMemories: MemoryItem[] = (data || []).map((item) => ({
          id: item.id,
          title: item.title,
          description: item.description ?? "",
          date: item.memory_date
            ? String(item.memory_date).replaceAll("-", ".")
            : "",
          imageUrl: item.image_url || "",
        }));
        setMemories(mappedMemories);
      } catch (error) {
        console.error("추억 불러오기 중 예상치 못한 오류:", error);
        setError("알 수 없는 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchMemories();
  }, []);

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

  const handleSaveMemory = async (updatedMemory: MemoryItem) => {
    try {
      const { error } = await supabase
        .from("memories")
        .update({
          title: updatedMemory.title,
          description: updatedMemory.description,
          memory_date: updatedMemory.date.replaceAll(".", "-"),
          image_url: updatedMemory.imageUrl || null,
        })
        .eq("id", updatedMemory.id);

      if (error) throw error;

      setMemories((prev) =>
        prev.map((item) =>
          item.id === updatedMemory.id ? updatedMemory : item,
        ),
      );
    } catch (error) {
      console.error("DB 저장 실패:", error);
    }
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
          {isLoading ? (
            <div className="flex h-full items-start justify-center pt-16">
              <p className="text-[16px] font-medium text-[#b79bab]">
                추억을 불러오는 중입니다.
              </p>
            </div>
          ) : filteredMemories.length > 0 ? (
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
