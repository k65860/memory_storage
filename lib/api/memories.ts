import { supabase } from "@/lib/supabase/client";
import { MemoryItem } from "@/app/types/memory";

// 추억 생성
export async function createMemory() {
  return supabase.from("memories").insert({
    title: "...",
    description: "...",
    memory_date: null,
    image_url: null,
  });
}
// 로그인한 사용자의 모든 추억 조회
export async function getMemories(userId: string) {
  return supabase
    .from("memories")
    .select(
      "id, title, description, memory_date, image_url, created_at, user_id",
    )
    .eq("user_id", userId)
    .order("memory_date", { ascending: false }); //최신순 정렬
}

// 특정 추억 조회
export async function getMemoryById(id: string, userId: string) {
  return supabase
    .from("memories")
    .select(
      "id, title, description, memory_date, image_url, created_at, user_id",
    )
    .eq("id", id)
    .eq("user_id", userId)
    .single(); // 결과가 배열이 아니라 객체 하나로 옴
}

// 특정 추억 수정
export async function updateMemory(updatedMemory: MemoryItem, userId: string) {
  return supabase
    .from("memories")
    .update({
      title: updatedMemory.title,
      description: updatedMemory.description,
      memory_date: updatedMemory.memory_date,
      image_url: updatedMemory.image_url,
    })
    .eq("id", updatedMemory.id) // 해당 추억 ID이면서
    .eq("user_id", userId) // 현재 로그인한 사용자의 추억인 경우
    .select(
      // supabse는 update 후에 수정된 데이터를 반환하지 않기 때문에 select를 통해 수정된 데이터를 가져옴
      "id, title, description, memory_date, image_url, created_at, user_id",
    )
    .single();
}

// 특정 추억 삭제
export async function deleteMemory(id: string, userId: string) {
  return supabase.from("memories").delete().eq("id", id).eq("user_id", userId);
}
