import { supabase } from "@/lib/supabase/client";

// 추억 생성
export async function createMemories() {
  const data = await supabase
    .from("memories")
    .insert("title, description, memory_date, image_url, user_id");
}

// 추억 조회
export async function getMemories(userId: string) {
  const data = await supabase
    .from("memories")
    .select("id, title, description, memory_date, image_url, created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false }); //최신순 정렬

  console.log(data);
}
