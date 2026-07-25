"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { Camera, ImagePlus, X } from "lucide-react";
import AlertModal from "@/app/components/alertModal";
import { uploadMemoryImage } from "@/hooks/uploadMemoryImage";
import { MemoryItem } from "@/app/types/memory";

interface EditMemoryModalProps {
  memory: MemoryItem;
  onClose: () => void;
  onSave: (updatedMemory: MemoryItem) => void | Promise<void>;
}

export default function EditMemoryModal({
  memory,
  onClose,
  onSave,
}: EditMemoryModalProps) {
  const [title, setTitle] = useState(memory.title);
  const [description, setDescription] = useState(memory.description ?? "");
  const [date, setDate] = useState(memory.memory_date || "");
  const [imageUrl, setImageUrl] = useState(memory.image_url || "");
  const [showAlert, setShowAlert] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);

    const preview = URL.createObjectURL(file);
    setImageUrl(preview);
  };

  const isChanged =
    title !== memory.title ||
    description !== (memory.description ?? "") ||
    date !== (memory.memory_date ?? "") ||
    selectedFile !== null;

  const handleSave = async () => {
    try {
      let finalImageUrl = memory.image_url || "";

      if (selectedFile) {
        finalImageUrl = await uploadMemoryImage(selectedFile, memory.user_id);
      }

      await onSave({
        ...memory,
        title: title.trim(),
        description: description.trim(),
        memory_date: date || null,
        image_url: finalImageUrl || null,
      });

      setShowAlert(true);

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
            <div className="space-y-6">
              <div>
                {/* <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="relative mx-auto block h-[210px] w-full max-w-[260px] overflow-hidden rounded-[20px] border border-[#f3bfd5] bg-[#fff5f9]"
                  aria-label="추억 이미지 변경"
                > */}
                <div className="relative mx-auto w-full max-w-[260px]">
                  <div className="relative h-[210px] w-full overflow-hidden rounded-[20px] border border-[#f3bfd5] bg-[#fff5f9]">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt="추억 이미지 미리보기"
                        fill
                        sizes="260px"
                        onContextMenu={(e) => e.preventDefault()}
                        className="object-contain p-3"
                      />
                    ) : (
                      <div className="flex h-full flex-col items-center justify-center gap-2 text-[#c18da3]">
                        <ImagePlus className="h-8 w-8" />
                        <span className="text-sm">사진을 추가해 주세요</span>
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    aria-label="이미지 변경"
                    className="absolute bottom-3 right-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#ef78a8] shadow-md transition active:scale-95"
                  >
                    <Camera className="h-5 w-5" />
                  </button>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#9c7d8d]">
                  추억 이름을 입력해주세요.
                </label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  autoFocus
                  placeholder="제목을 입력하세요."
                  className="w-full rounded-[18px] border border-[#f3bfd5] bg-white px-4 py-3 text-[16px] outline-none transition focus:border-[#f78db8] focus:ring-4 focus:ring-pink-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#9c7d8d]">
                  추억을 기록해보세요.
                </label>
                <input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="설명을 입력하세요."
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
                disabled={!isChanged}
                className={`rounded-[18px] py-3 text-[16px] font-semibold transition ${
                  isChanged
                    ? "bg-[#f78db8] text-white active:scale-95"
                    : "cursor-not-allowed bg-gray-200 text-gray-400"
                }`}
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
