"use client";

import { useEffect, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Heart } from "lucide-react";
import { supabase } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const checkExistingSession = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        router.replace("/");
      }
    };

    checkExistingSession();
  }, [router]);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !password) {
      setMessage("이메일과 비밀번호를 입력해 주세요.");
      return;
    }

    try {
      setIsSubmitting(true);

      const { error } = await supabase.auth.signInWithPassword({
        email: normalizedEmail,
        password,
      });

      if (error) {
        throw error;
      }

      router.replace("/");
      router.refresh();
    } catch (error) {
      console.error("로그인 실패:", error);

      setMessage(
        error instanceof Error
          ? error.message
          : "로그인 중 오류가 발생했습니다.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-dvh items-center justify-center bg-[#fff7fb] px-5 py-10">
      <section className="w-full max-w-[390px] rounded-[28px] border border-[#f4cade] bg-white px-5 py-7 shadow-sm">
        <div className="flex flex-col items-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#f8d4e3]">
            <Heart className="h-7 w-7 fill-[#f28db1] text-[#f28db1]" />
          </div>

          <h1 className="mt-4 text-[26px] font-bold text-[#ea79a7]">
            추억저장소
          </h1>

          <p className="mt-2 text-center text-[14px] text-[#9c7d8d]">
            소중한 순간을 다시 만나보세요.
          </p>
        </div>

        <form onSubmit={handleLogin} className="mt-7 space-y-4">
          <div>
            <label
              htmlFor="login-email"
              className="mb-2 block text-[14px] font-medium text-[#8f7281]"
            >
              이메일
            </label>

            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              inputMode="email"
              placeholder="example@email.com"
              className="w-full rounded-[18px] border border-[#f3bfd5] bg-white px-4 py-3 text-[16px] outline-none transition focus:border-[#f78db8] focus:ring-4 focus:ring-pink-100"
            />
          </div>

          <div>
            <label
              htmlFor="login-password"
              className="mb-2 block text-[14px] font-medium text-[#8f7281]"
            >
              비밀번호
            </label>

            <div className="flex items-center rounded-[18px] border border-[#f3bfd5] bg-white pr-3 focus-within:border-[#f78db8] focus-within:ring-4 focus-within:ring-pink-100">
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                placeholder="비밀번호 입력"
                className="min-w-0 flex-1 rounded-[18px] bg-transparent px-4 py-3 text-[16px] outline-none"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={
                  showPassword ? "비밀번호 숨기기" : "비밀번호 표시하기"
                }
                className="flex h-9 w-9 shrink-0 items-center justify-center text-[#b78ca0]"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {message && (
            <p
              role="alert"
              className="rounded-[16px] bg-[#fff0f5] px-4 py-3 text-[14px] leading-relaxed text-[#c55f89]"
            >
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-[18px] bg-[#f78db8] py-3.5 text-[16px] font-semibold text-white transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "로그인 중..." : "로그인"}
          </button>
        </form>

        <div className="mt-5 text-center">
          <span className="text-[14px] text-[#9c7d8d]">
            아직 계정이 없으신가요?
          </span>

          <button
            type="button"
            onClick={() => router.push("/auth/signup")}
            className="ml-2 text-[14px] font-semibold text-[#e76f9f]"
          >
            회원가입
          </button>
        </div>
      </section>
    </main>
  );
}
