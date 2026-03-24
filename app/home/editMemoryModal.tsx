"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import AlertModal from "@/app/components/alertModal";

export interface MemoryItem {
  id: number;
  title: string;
  description: string;
  date: string;
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
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (memory) {
      setTitle(memory.title);
      setDescription(memory.description);
      setDate(memory.date.replaceAll(".", "-"));
    }
  }, [memory]);

  if (!open || !memory) return null;

  const handleSave = () => {
    onSave({
      ...memory,
      title,
      description,
      date: date.replaceAll("-", "."),
    });

    setShowAlert(true);
  };

  return (
    <>
      <div onClick={onClose} className="absolute inset-0 z-[70] bg-black/35" />

      <div className="absolute inset-x-0 bottom-0 z-[80] px-4 pb-[calc(16px+env(safe-area-inset-bottom))]">
        <div className="mx-auto flex max-h-[85dvh] w-full max-w-[430px] flex-col rounded-t-[28px] rounded-b-[24px] bg-[#fffafb] shadow-2xl">
          <div className="shrink-0 p-5 pb-4">
            <div className="mb-4 flex justify-center">
              <div className="h-1.5 w-12 rounded-full bg-pink-100" />
            </div>

            <div className="flex items-center justify-between">
              <h2 className="text-[20px] font-bold text-[#ea79a7]">
                추억 수정
              </h2>

              <button
                type="button"
                onClick={onClose}
                aria-label="모달 닫기"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-50 text-[#e486ab]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-5">
            <div className="space-y-4 pb-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-[#9c7d8d]">
                  제목
                </label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-[18px] border border-[#f3bfd5] bg-white px-4 py-3 text-[16px] outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#9c7d8d]">
                  설명
                </label>
                <input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full rounded-[18px] border border-[#f3bfd5] bg-white px-4 py-3 text-[16px] outline-none"
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
                  className="w-full rounded-[18px] border border-[#f3bfd5] bg-white px-4 py-3 text-[16px] outline-none"
                />
              </div>
            </div>
          </div>

          <div className="shrink-0 px-5 pb-5 pt-3">
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-[18px] border border-[#f3bfd5] bg-white py-3 text-[16px] font-medium text-[#9c7d8d]"
              >
                취소
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="rounded-[18px] bg-[#f78db8] py-3 text-[16px] font-semibold text-white"
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
