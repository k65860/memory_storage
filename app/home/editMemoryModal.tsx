"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { X, ImagePlus } from "lucide-react";
import AlertModal from "@/app/components/alertModal";
import { uploadMemoryImage } from "@/lib/uploadMemoryImage";

export interface MemoryItem {
  id: number;
  title: string;
  description: string;
  date: string;
  imageUrl?: string;
}

interface EditMemoryModalProps {
  open: boolean;
  memory: MemoryItem | null;
  onClose: () => void;
  onSave: (updatedMemory: MemoryItem) => void;
}

export default function EditMemoryModal({
  open,
  memory,
  onClose,
  onSave,
}: EditMemoryModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (memory) {
      setTitle(memory.title);
      setDescription(memory.description);
      setDate(memory.date.replaceAll(".", "-"));
      setImageUrl(memory.imageUrl || "");
    }
  }, [memory]);

  if (!open || !memory) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);

    const preview = URL.createObjectURL(file);
    setImageUrl(preview);
  };

  const handleSave = async () => {
    try {
      let finalImageUrl = memory.imageUrl || "";

      if (selectedFile) {
        finalImageUrl = await uploadMemoryImage(selectedFile, "temp-user"); // 나중에 user.id로 변경
      }

      onSave({
        ...memory,
        title,
        description,
        date: date.replaceAll("-", "."),
        imageUrl: finalImageUrl,
      });

      setShowAlert(true);
    } catch (e) {
      console.error(e);
      alert("업로드 실패");
    }
  };

  return (
    <>
      <div
        onClick={onClose}
        className="absolute inset-0 z-[70] bg-black/30 backdrop-blur-[2px]"
      />

      <div className="absolute inset-0 z-[80] flex items-center justify-center p-5">
        <div className="flex max-h-[78dvh] w-full max-w-[380px] flex-col overflow-hidden rounded-[28px] border border-white/40 bg-[#fffafb]/95 shadow-[0_20px_50px_rgba(0,0,0,0.16)] backdrop-blur-xl">
          <div className="shrink-0 border-b border-[#f3d6e2] px-5 py-4">
            <div className="flex items-center justify-between">
              <h2 className="text-[20px] font-bold text-[#ea79a7]">
                추억 수정
              </h2>

              <button
                type="button"
                onClick={onClose}
                aria-label="모달 닫기"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-50 text-[#e486ab] transition active:scale-95"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-5">
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-[#9c7d8d]">
                  대표 이미지
                </label>

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
                  이미지 변경
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
                  autoFocus
                  className="w-full rounded-[18px] border border-[#f3bfd5] bg-white px-4 py-3 text-[16px] outline-none transition focus:border-[#f78db8] focus:ring-4 focus:ring-pink-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#9c7d8d]">
                  설명
                </label>
                <input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full rounded-[18px] border border-[#f3bfd5] bg-white px-4 py-3 text-[16px] outline-none transition focus:border-[#f78db8] focus:ring-4 focus:ring-pink-100"
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
                  className="w-full rounded-[18px] border border-[#f3bfd5] bg-white px-4 py-3 text-[16px] outline-none transition focus:border-[#f78db8] focus:ring-4 focus:ring-pink-100"
                />
              </div>
            </div>
          </div>

          <div className="shrink-0 border-t border-[#f3d6e2] bg-[#fffafb]/95 px-5 pb-[calc(16px+env(safe-area-inset-bottom))] pt-4 backdrop-blur-xl">
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-[18px] border border-[#f3bfd5] bg-white py-3 text-[16px] font-medium text-[#9c7d8d] transition active:scale-95"
              >
                취소
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="rounded-[18px] bg-[#f78db8] py-3 text-[16px] font-semibold text-white transition active:scale-95"
              >
                저장
              </button>
            </div>
          </div>
        </div>
      </div>

      <AlertModal
        open={showAlert}
        message="수정되었습니다!"
        onClose={() => {
          setShowAlert(false);
          onClose();
        }}
      />
    </>
  );
}
