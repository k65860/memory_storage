import { supabase } from "@/lib/supabase/client";
import { MemoryItem } from "@/app/types/memory";

// 추억 생성
export async function createMemories() {
  return supabase.from("memories").insert({
    title: "...",
    description: "...",
  });
}

// 추억 조회
export async function getMemories(userId: string) {
  return supabase
    .from("memories")
    .select(
      "id, title, description, memory_date, image_url, created_at, user_id",
    )
    .eq("user_id", userId)
    .order("created_at", { ascending: false }); //최신순 정렬
}

// 추억 수정
export async function updateMemories(
  updatedMemories: MemoryItem,
  userId: string,
) {
  return supabase
    .from("memories")
    .update({
      title: updatedMemories.title,
      description: updatedMemories.description,
      memory_date: updatedMemories.memory_date?.replaceAll(".", "-") ?? null,
    })
    .eq("id", updatedMemories.id)
    .eq("user_id", userId);
}

// 추억 삭제
export async function deleteMemories(id: string, userId: string) {
  return supabase.from("memories").delete().eq("id", id);
}
