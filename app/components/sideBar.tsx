"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { getProfile } from "@/lib/api/profile";
import {
  Bell,
  ChevronRight,
  CircleHelp,
  Heart,
  House,
  LogOut,
  Mail,
  Palette,
  Share2,
  UserRound,
  X,
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

export default function SideBar({ open, onClose }: SideBarProps) {
  const router = useRouter();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [isProfileLoading, setIsProfileLoading] = useState(false);

  useEffect(() => {
    if (!open || profile) return;

    const fetchProfile = async () => {
      setIsProfileLoading(true);

      try {
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
      } finally {
        setIsProfileLoading(false);
      }
    };

    fetchProfile();
  }, [open, profile]);

  const handleNavigate = (path: string) => {
    onClose();
    router.push(path);
  };

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
      {/* 배경 오버레이 */}
      <button
        type="button"
        aria-label="사이드바 닫기"
        onClick={onClose}
        className={`absolute inset-0 z-40 bg-[#513743]/35 backdrop-blur-[2px] transition-all duration-300 ease-out ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      {/* 사이드바 */}
      <aside
        aria-hidden={!open}
        className={`absolute right-0 top-0 z-50 flex h-full w-[82%] max-w-[340px] flex-col border-l border-white/60 bg-[#fffafb] shadow-[-14px_0_40px_rgba(91,54,72,0.14)] transition-all duration-300 ease-out ${
          open
            ? "pointer-events-auto translate-x-0 opacity-100"
            : "pointer-events-none translate-x-full opacity-90"
        }`}
      >
        {/* 상단 영역 */}
        <div className="flex shrink-0 items-center justify-between px-5 pb-2 pt-[calc(18px+env(safe-area-inset-top))]">
          <div>
            <p className="text-[12px] font-medium tracking-[0.08em] text-[#c79bac]">
              MY MEMORY
            </p>

            <h2 className="mt-0.5 text-[21px] font-bold tracking-[-0.03em] text-[#795d69]">
              나의 추억저장소
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="사이드바 닫기"
            className="flex h-11 w-11 items-center justify-center rounded-[16px] border border-[#f2d4df] bg-white text-[#df779f] shadow-sm transition active:scale-90 active:bg-[#fff0f5]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* 프로필 영역 */}
        <div className="px-5 pb-4 pt-4">
          {isProfileLoading ? (
            <div className="flex animate-pulse items-center gap-4 rounded-[24px] border border-[#f2d8e2] bg-white px-4 py-4 shadow-[0_8px_24px_rgba(131,82,103,0.08)]">
              <div className="h-16 w-16 shrink-0 rounded-[20px] bg-[#f5dce6]" />

              <div className="flex-1">
                <div className="h-5 w-24 rounded-md bg-[#f5dce6]" />
                <div className="mt-2 h-4 w-36 rounded-md bg-[#f8e8ee]" />
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => handleNavigate("/mypage")}
              className="group flex w-full items-center gap-4 rounded-[24px] border border-[#f2d8e2] bg-white px-4 py-4 text-left shadow-[0_8px_24px_rgba(131,82,103,0.08)] transition duration-200 active:scale-[0.98] active:bg-[#fff5f8]"
            >
              {/* 프로필 이미지 */}
              <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-[20px] bg-gradient-to-br from-[#ffd9e8] to-[#f8a8c7] shadow-[0_6px_16px_rgba(238,123,167,0.22)]">
                {profile?.profile_image_url ? (
                  <Image
                    src={profile.profile_image_url}
                    alt="프로필 이미지"
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                ) : (
                  <Heart className="h-7 w-7 fill-white text-white" />
                )}
              </div>

              {/* 프로필 내용 */}
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-medium text-[#b58f9f]">
                  오늘도 반가워요
                </p>

                <p className="mt-1 truncate text-[20px] font-bold tracking-[-0.02em] text-[#e86f9f]">
                  {profile?.name ?? "이름 없음"}
                </p>

                <p className="mt-1 text-[12px] text-[#c4a5b2]">
                  내 정보 확인 및 수정
                </p>
              </div>

              <ChevronRight className="h-5 w-5 shrink-0 text-[#dab5c4] transition-transform duration-200 group-active:translate-x-1" />
            </button>
          )}
        </div>

        {/* 메뉴 영역 */}
        <nav className="flex-1 overflow-y-auto px-5 pb-6">
          <MenuGroup title="추억 메뉴">
            <MenuItem
              icon={<House className="h-5 w-5" />}
              label="홈"
              description="내 추억 목록 보기"
              onClick={() => handleNavigate("/")}
            />

            <MenuItem
              icon={<Share2 className="h-5 w-5" />}
              label="공유한 추억"
              description="함께 나눈 추억 보기"
              onClick={() => handleNavigate("/memories/shared")}
            />

            <MenuItem
              icon={<UserRound className="h-5 w-5" />}
              label="내 정보"
              description="프로필 관리"
              onClick={() => handleNavigate("/mypage")}
            />

            <MenuItem
              icon={<CircleHelp className="h-5 w-5" />}
              label="서비스 안내"
              description="추억저장소 사용 방법"
              onClick={() => handleNavigate("/guide")}
            />
          </MenuGroup>

          <MenuGroup title="설정">
            <MenuItem
              icon={<Bell className="h-5 w-5" />}
              label="알림 설정"
              description="알림 수신 관리"
              onClick={() => handleNavigate("/settings/notifications")}
            />

            <MenuItem
              icon={<Palette className="h-5 w-5" />}
              label="앱 테마"
              description="화면 스타일 설정"
              onClick={() => handleNavigate("/settings/theme")}
            />

            <MenuItem
              icon={<Mail className="h-5 w-5" />}
              label="문의하기"
              description="도움이 필요할 때"
              onClick={() => handleNavigate("/contact")}
            />
          </MenuGroup>

          {/* 로그아웃 */}
          <div className="mt-4 border-t border-[#f0dce4] pt-4">
            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center gap-4 rounded-[20px] border border-[#f2d8df] bg-white px-4 py-4 text-left text-[#d86676] shadow-sm transition duration-200 active:scale-[0.98] active:bg-[#fff0f2]"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] bg-[#fff0f2] text-[#df6979]">
                <LogOut className="h-5 w-5" />
              </span>

              <span className="flex-1 text-[16px] font-semibold">로그아웃</span>

              <ChevronRight className="h-5 w-5 text-[#e5b3ba]" />
            </button>
          </div>
        </nav>
      </aside>
    </>
  );
}

function MenuGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-5">
      <h3 className="mb-2 px-1 text-[12px] font-semibold tracking-[0.08em] text-[#b895a4]">
        {title}
      </h3>

      <div className="space-y-2">{children}</div>
    </section>
  );
}

function MenuItem({
  icon,
  label,
  description,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex w-full items-center gap-3 rounded-[20px] border border-[#f1dce4] bg-white px-3.5 py-3 text-left shadow-[0_3px_12px_rgba(124,79,98,0.05)] transition duration-200 active:scale-[0.98] active:bg-[#fff3f7]"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] bg-[#fff0f5] text-[#e576a2] transition group-active:bg-[#fbdce8]">
        {icon}
      </span>

      <span className="min-w-0 flex-1">
        <span className="block text-[15px] font-semibold text-[#785e6a]">
          {label}
        </span>

        <span className="mt-0.5 block truncate text-[12px] text-[#baa0ab]">
          {description}
        </span>
      </span>

      <ChevronRight className="h-4 w-4 shrink-0 text-[#d9b9c5] transition-transform duration-200 group-active:translate-x-1" />
    </button>
  );
}
