"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { MemoryItem } from "@/app/types/memory";
import { updateMemory } from "@/lib/api/memories";
import EditMemoryModal from "@/app/home/editMemoryModal";

export default function MemoryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const [memory, setMemory] = useState<MemoryItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const fetchMemory = async () => {
      const resolvedParams = await params;

      const { data, error } = await supabase
        .from("memories")
        .select(
          "id, title, description, memory_date, image_url, created_at, user_id",
        )
        .eq("id", resolvedParams.id)
        .eq("user_id", (await supabase.auth.getUser()).data.user?.id)
        .single();

      if (error) {
        console.error("추억 상세 조회 실패:", error);
        setIsLoading(false);
        return;
      }
      setMemory(data);
      setIsLoading(false);
    };

    fetchMemory();
  }, [params]);

  const handleSaveMemory = async (updatedMemory: MemoryItem) => {
    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      // 로그인한 사용자가 없으면 홈으로 이동
      if (userError || !user) {
        router.replace("/auth/login");
        return;
      }

      const { data, error } = await updateMemory(updatedMemory, user.id);

      if (error) throw error;

      setMemory(data);
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("DB 저장 실패:", error);
    }
  };

  if (isLoading) {
    return (
      <main className="flex min-h-dvh items-center justify-center bg-[#fff7fb] px-5">
        <p className="text-[16px] font-medium text-[#b79bab]">
          추억을 불러오는 중입니다.
        </p>
      </main>
    );
  }

  if (!memory) {
    return (
      <main className="flex min-h-dvh items-center justify-center bg-[#fff7fb] px-5">
        <div className="text-center">
          <p className="text-[18px] font-semibold text-[#9c7d8d]">
            추억을 찾을 수 없습니다.
          </p>

          <button
            type="button"
            onClick={() => router.push("/")}
            className="mt-4 rounded-[18px] bg-[#f78db8] px-5 py-3 text-[15px] font-semibold text-white"
          >
            홈으로 돌아가기
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-dvh bg-[#fff7fb] px-5 pb-10 pt-6">
      <div className="mb-5 flex items-center justify-between">
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-[16px] border border-[#f3bfd5] bg-white px-4 py-2 text-[14px] font-medium text-[#9c7d8d]"
        >
          뒤로가기
        </button>

        <button
          type="button"
          onClick={() => setIsEditModalOpen(true)}
          className="rounded-[16px] bg-[#f78db8] px-4 py-2 text-[14px] font-semibold text-white"
        >
          수정
        </button>
        {isEditModalOpen && memory && (
          <EditMemoryModal
            key={memory.id}
            memory={memory}
            onClose={() => setIsEditModalOpen(false)}
            onSave={handleSaveMemory}
          />
        )}
      </div>

      <section className="overflow-hidden rounded-[28px] border border-[#f4cade] bg-white shadow-sm">
        <div className="relative aspect-square w-full bg-[#f6cddd]">
          {memory.image_url ? (
            <Image
              src={memory.image_url}
              alt={memory.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <div className="relative h-[45%] w-[45%] overflow-hidden rounded-[24px] bg-[#f4a6c3]">
                <div className="absolute bottom-0 left-0 h-16 w-16 rotate-45 bg-[#ec8eb3]" />
                <div className="absolute bottom-0 right-0 h-12 w-12 rotate-45 bg-[#e57ea9]" />
                <div className="absolute right-3 top-3 text-xl text-white">
                  ♡
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-5 px-5 py-6">
          <div>
            <p className="text-[13px] font-medium text-[#b79bab]">제목</p>
            <h1 className="mt-1 text-[28px] font-bold leading-tight text-[#f0629a]">
              {memory.title}
            </h1>
          </div>

          <div>
            <p className="text-[13px] font-medium text-[#b79bab]">설명</p>
            <p className="mt-1 text-[18px] leading-relaxed text-[#7f6170]">
              {memory.description || "설명이 없습니다."}
            </p>
          </div>

          <div>
            <p className="text-[13px] font-medium text-[#b79bab]">날짜</p>
            <p className="mt-1 text-[16px] font-semibold text-[#f28db1]">
              {memory.memory_date
                ? String(memory.memory_date).replaceAll("-", ".")
                : "날짜 없음"}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
