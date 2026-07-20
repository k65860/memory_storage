import { supabase } from "@/lib/supabase/client";

// 프로필 이미지 생성
export async function saveProfile(
  userId: string,
  name: string,
  imageUrl: string | null,
) {
  return supabase.from("profiles").upsert({
    id: userId,
    name: name,
    profile_image_url: imageUrl,
  });
}

// 프로필 이미지 조회
export async function getProfile(userId: string) {
  return supabase
    .from("profiles")
    .select("id, name, profile_image_url")
    .eq("id", userId)
    .maybeSingle(); // 결과가 0 또는 1개 일때 객체 하나나 null을 반환
}
