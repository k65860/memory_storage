"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ImagePlus } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { uploadMemoryImage } from "@/lib/uploadMemoryImage";

export default function NewMemoryPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("이미지 파일만 업로드할 수 있습니다.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("이미지는 5MB 이하만 업로드할 수 있습니다.");
      return;
    }

    setSelectedFile(file);

    const previewUrl = URL.createObjectURL(file);
    setImageUrl(previewUrl);
  };

  const handleSave = async () => {
    if (!title.trim()) {
      alert("제목을 입력해 주세요.");
      return;
    }

    if (!date) {
      alert("날짜를 선택해 주세요.");
      return;
    }

    try {
      setIsSaving(true);

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        alert("로그인이 필요합니다.");
        router.replace("/auth/login");
        return;
      }

      let finalImageUrl = "";

      if (selectedFile) {
        finalImageUrl = await uploadMemoryImage(selectedFile, user.id);
      }

      const { error: insertError } = await supabase.from("memories").insert({
        user_id: user.id,
        title: title.trim(),
        description: description.trim(),
        memory_date: date,
        image_url: finalImageUrl || null,
      });

      if (insertError) {
        throw insertError;
      }

      alert("추억이 저장되었습니다.");
      router.replace("/");
      router.refresh();
    } catch (error) {
      console.error("추억 추가 실패:", error);

      alert(
        error instanceof Error
          ? `추억 저장 실패: ${error.message}`
          : "추억 저장 중 오류가 발생했습니다.",
      );
    } finally {
      setIsSaving(false);
    }
  };

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

        <h1 className="text-[20px] font-bold text-[#ea79a7]">추억 추가</h1>

        <div className="w-[72px]" />
      </div>

      <section className="overflow-hidden rounded-[28px] border border-[#f4cade] bg-white shadow-sm">
        <div className="space-y-5 px-5 py-6">
          <div>
            {/* <label className="mb-2 block text-sm font-medium text-[#9c7d8d]">
              대표 이미지
            </label> */}

            <div className="mb-3 flex w-full items-center justify-center">
              <div className="relative w-full max-w-[260px] aspect-square overflow-hidden rounded-[20px] border border-[#f3bfd5] bg-white">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt="추억 이미지 미리보기"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-[#f6cddd]">
                    <div className="relative h-[70%] w-[70%] overflow-hidden rounded-[18px] bg-[#f4a6c3]">
                      <div className="absolute bottom-0 left-0 h-10 w-10 rotate-45 bg-[#ec8eb3]" />
                      <div className="absolute bottom-0 right-0 h-8 w-8 rotate-45 bg-[#e57ea9]" />
                      <div className="absolute right-2 top-2 text-lg text-white">
                        ♡
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <label className="flex cursor-pointer items-center justify-center gap-2 rounded-[18px] border border-[#f3bfd5] bg-white px-4 py-3 text-[15px] font-medium text-[#9c7d8d] transition active:scale-95">
              <ImagePlus className="h-4 w-4" />
              이미지 추가
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#9c7d8d]">
              제목
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="ex: 우리의 첫 인생네컷"
              className="w-full rounded-[18px] border border-[#f3bfd5] bg-white px-4 py-3 text-[16px] outline-none transition focus:border-[#f78db8] focus:ring-4 focus:ring-pink-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#9c7d8d]">
              추억 내용
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="ex: 안국역에서 데이트하고 찍은 사진"
              rows={4}
              className="w-full resize-none rounded-[18px] border border-[#f3bfd5] bg-white px-4 py-3 text-[16px] outline-none transition focus:border-[#f78db8] focus:ring-4 focus:ring-pink-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#9c7d8d]">
              날짜
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-[18px] border border-[#f3bfd5] cursor-pointer bg-white px-4 py-3 text-[16px] outline-none transition focus:border-[#f78db8] focus:ring-4 focus:ring-pink-100"
            />
          </div>
        </div>

        <div className="border-t border-[#f3d6e2] bg-[#fffafb] px-5 pb-[calc(16px+env(safe-area-inset-bottom))] pt-4">
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => router.back()}
              disabled={isSaving}
              className="rounded-[18px] border border-[#f3bfd5] cursor-pointer bg-white py-3 text-[16px] font-medium text-[#9c7d8d] transition active:scale-95 disabled:opacity-50"
            >
              취소
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="rounded-[18px] bg-[#f78db8] py-3 text-[16px] cursor-pointer font-semibold text-white transition active:scale-95 disabled:opacity-50"
            >
              {isSaving ? "저장 중..." : "저장"}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
