"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { getProfile } from "@/lib/api/profile";
import Image from "next/image";
import {
  X,
  House,
  Share2,
  UserRound,
  CircleHelp,
  LogOut,
  Heart,
  Bell,
  Palette,
  Mail,
} from "lucide-react";

interface SideBarProps {
  open: boolean;
  onClose: () => void;
}

interface Profile {
  id: string;
  name: string;
  profile_image_url: string | null;
}

//임시 프로필 데이터
// const profile = {
//   name: "로그인/회원가입하기",
//   introduction: "우리의 추억을 기록해요",
//   profile_url: "",
// };

export default function SideBar({ open, onClose }: SideBarProps) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!open) return;

    const fetchProfile = async () => {
      // 로그인한 사용자 정보 가져옴
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error("사용자 조회 실패:", userError);
        return;
      }

      const { data, error: profileError } = await getProfile(user.id);

      if (profileError) {
        console.error("프로필 조회 실패:", profileError);
        return;
      }

      setProfile(data);
    };

    fetchProfile();
  }, [open]);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("로그아웃 실패:", error);
      return;
    }

    onClose();
    router.replace("/auth/login");
    router.refresh();
  };
  return (
    <>
      <div
        onClick={onClose}
        className={`absolute inset-0 z-40 bg-black/35 transition-opacity duration-300 ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        className={`absolute right-0 top-0 z-50 flex h-full w-[78%] max-w-[320px] flex-col bg-[#fffafb] shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-end px-5 pt-5">
          <button
            type="button"
            onClick={onClose}
            aria-label="사이드바 닫기"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-50 text-[#e486ab]"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="px-5 pt-3">
          <div className="rounded-[20px] bg-white px-4 py-4 shadow-sm">
            <div className="flex items-center gap-3">
              {/* <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-[#f8d4e3]"> */}
              {profile?.profile_image_url ? (
                <Image
                  src={profile?.profile_image_url}
                  alt="프로필 이미지"
                  width={64}
                  height={64}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div>
                  <Heart className="h-7 w-7 fill-[#f28db1] text-[#f28db1]" />
                  {/* <input type="image">이미지</input> */}
                </div>
              )}
            </div>

            <div>
              <p className="text-[24px] font-bold leading-none text-[#ea79a7]">
                {profile?.name ?? "사용자"}
              </p>
              {/* <p className="mt-2 text-md text-[#9c7d8d]">
                {profile.introduction}
              </p> */}
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-5 pb-5 pt-5">
          <div>
            <MenuItem icon={<House className="h-5 w-5" />} label="홈" active />
            <MenuItem
              icon={<Share2 className="h-5 w-5" />}
              label="공유한 추억"
            />
            <MenuItem
              icon={<UserRound className="h-5 w-5" />}
              label="내 정보"
            />
            <MenuItem
              icon={<CircleHelp className="h-5 w-5" />}
              label="서비스 안내"
            />
          </div>

          <div className="my-5 h-px bg-[#f3d6e2]" />

          <div>
            <MenuItem icon={<Bell className="h-5 w-5" />} label="알림 설정" />
            <MenuItem icon={<Palette className="h-5 w-5" />} label="앱 테마" />
            <MenuItem icon={<Mail className="h-5 w-5" />} label="문의하기" />
          </div>

          <div className="my-5 h-px bg-[#f3d6e2]" />

          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-4 rounded-[20px] px-4 py-4 text-[#e17aa4] transition hover:bg-pink-50"
          >
            <LogOut className="h-5 w-5" />
            <span className="text-[18px] font-semibold">로그아웃</span>
          </button>
        </nav>
      </aside>
    </>
  );
}

function MenuItem({
  icon,
  label,
  active = false,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <button
      className={`flex w-full items-center gap-4 rounded-[20px] px-4 py-4 text-left transition ${
        active
          ? "bg-[#fbe3ec] text-[#e17aa4]"
          : "text-[#967787] hover:bg-pink-50"
      }`}
    >
      {icon}
      <span className="text-[18px] font-medium">{label}</span>
    </button>
  );
}
