import { supabase } from "@/lib/supabase/client";

export async function uploadMemoryImage(file: File, userId: string) {
  const fileExt = file.name.split(".").pop() || "png";
  const fileName = `${Date.now()}-${Math.random()}.${fileExt}`;
  const filePath = `${userId}/${fileName}`;

  const { error } = await supabase.storage
    .from("memory-images")
    .upload(filePath, file);

  if (error) {
    console.error("업로드 에러:", error);
    throw new Error("이미지 업로드 실패");
  }

  const { data } = supabase.storage
    .from("memory-images")
    .getPublicUrl(filePath);

  return data.publicUrl;
}

/* 파일을 storage에 저장
이미지 URL 생성
그 URL을 리턴 */
