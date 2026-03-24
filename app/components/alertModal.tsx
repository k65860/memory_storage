"use client";

interface AlertModalProps {
  open: boolean;
  message: string;
  onClose: () => void;
}

export default function AlertModal({
  open,
  message,
  onClose,
}: AlertModalProps) {
  if (!open) return null;

  return (
    <>
      <div onClick={onClose} className="absolute inset-0 z-[90] bg-black/30" />

      <div className="absolute inset-0 z-[100] flex items-center justify-center px-5">
        <div className="w-full max-w-[320px] rounded-[24px] bg-white p-6 shadow-xl">
          <p className="text-center text-[16px] font-medium text-[#7f6170]">
            {message}
          </p>

          <button
            type="button"
            onClick={onClose}
            className="mt-6 w-full rounded-[18px] bg-[#f78db8] py-3 text-[16px] font-semibold text-white"
          >
            완료
          </button>
        </div>
      </div>
    </>
  );
}
