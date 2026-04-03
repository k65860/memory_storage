import { supabase } from "@/lib/supabase/client";

export async function uploadMemoryImage(file: File, userId: string) {
  const fileExt = file.name.split(".").pop()?.toLowerCase() || "png";
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;
  const filePath = `${userId}/${fileName}`;

  console.log("업로드 시작");
  console.log("bucket:", "memory-images");
  console.log("filePath:", filePath);
  console.log("file.type:", file.type);
  console.log("file.size:", file.size);

  const { data, error } = await supabase.storage
    .from("memory-images")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error("Supabase upload error:", error);
    throw new Error(error.message);
  }

  console.log("업로드 성공:", data);

  const { data: publicUrlData } = supabase.storage
    .from("memory-images")
    .getPublicUrl(filePath);

  console.log("publicUrl:", publicUrlData.publicUrl);

  return publicUrlData.publicUrl;
}

/* 파일을 storage에 저장
이미지 URL 생성
그 URL을 리턴 */
