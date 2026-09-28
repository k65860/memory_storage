"use client";

import { useEffect, useMemo, useState } from "react";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import SearchSection from "@/app/home/searchSection";
import MemoryCard from "@/app/home/memoryCard";
import SideBar from "@/app/components/sideBar";
import { MemoryItem } from "@/app/types/memory";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { getMemories } from "@/lib/api/memories";

export default function HomePage() {
  const router = useRouter();

  const [openDrawer, setOpenDrawer] = useState(false);
  const [memories, setMemories] = useState<MemoryItem[]>([]);
  const [selectedMemory, setSelectedMemory] = useState<MemoryItem | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthChecking, setIsAuthChecking] = useState(true);

  // 로그인 확인 + 내 추억 조회
  useEffect(() => {
    const fetchMyMemories = async () => {
      setIsAuthChecking(true); //로그인 확인
      setIsLoading(true); //추억 불러오기

      // getUser()는 매번 Supabase Auth 서버에 요청을 보내 첫 화면이 그만큼 늦어짐
      // getSession()은 브라우저에 저장된 세션을 읽으므로 네트워크 왕복이 없음
      // 데이터 접근 권한은 RLS(auth.uid() = user_id)가 서버에서 계속 검증함
      const {
        data: { session },
        error: userError,
      } = await supabase.auth.getSession();
      const user = session?.user;

      if (userError || !user) {
        router.replace("/auth/login");
        return;
      }

      const { data, error: memoryError } = await getMemories(user.id);
      if (memoryError) {
        console.error("추억 불러오기 실패:", memoryError);
        setMemories([]);
        setIsAuthChecking(false);
        setIsLoading(false);
        return;
      }

      setMemories(data || []);
      setIsAuthChecking(false);
      setIsLoading(false);
    };

    fetchMyMemories();
  }, [router]);

  //추억 제목 필터링
  const filteredMemories = useMemo(() => {
    //memories가 바뀌거나 searchTerm이 바뀔때만 다시 계산
    const normalizedSearchTerm = searchTerm.trim().toLowerCase();

    if (!normalizedSearchTerm) return memories;

    return memories.filter((memory) =>
      memory.title.toLowerCase().includes(normalizedSearchTerm),
    );
  }, [memories, searchTerm]);

  // 첫 화면(모바일 기준 카드 3장)에 보이는 이미지는 lazy 없이 바로 요청
  const aboveTheFoldImageIds = new Set(
    memories
      .filter((memory) => memory.image_url)
      .slice(0, 3)
      .map((memory) => memory.id),
  );

  const handleOpenEditModal = (memory: MemoryItem) => {
    setSelectedMemory(memory);
    setOpenModal(true);
  };

  // const handleSaveMemory = async (updatedMemory: MemoryItem) => {
  //   try {
  //     const {
  //       data: { user },
  //     } = await supabase.auth.getUser();

  //     if (!user) {
  //       router.replace("/auth/login");
  //       return;
  //     }

  //     //api함수로 분리하기2
  //     const { error } = await supabase
  //       .from("memories")
  //       .update({
  //         title: updatedMemory.title,
  //         description: updatedMemory.description,
  //         memory_date: updatedMemory.memory_date?.replaceAll(".", "-") || null,
  //         image_url: updatedMemory.image_url || null,
  //       })
  //       .eq("id", updatedMemory.id)
  //       .eq("user_id", user.id);

  //     if (error) throw error;

  //     setMemories((prev) =>
  //       prev.map((item) =>
  //         item.id === updatedMemory.id ? updatedMemory : item,
  //       ),
  //     );
  //   } catch (error) {
  //     console.error("DB 저장 실패:", error);
  //   }
  // };

  // if (isAuthChecking) {
  //   return (
  //     <main className="flex min-h-dvh items-center justify-center bg-[#fff7fb]">
  //       <p className="text-[15px] font-medium text-[#b79bab]">
  //         로그인 정보를 확인하고 있습니다.
  //       </p>
  //     </main>
  //   );
  // }

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
                  isLcpCandidate={aboveTheFoldImageIds.has(memory.id)}
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

      {/* <EditMemoryModal
        open={openModal}
        memory={selectedMemory}
        onClose={() => setOpenModal(false)}
        onSave={handleSaveMemory}
      /> */}
    </div>
  );
}
