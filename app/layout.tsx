import type { Metadata } from "next";
import { preconnect } from "react-dom";
import "./globals.css";

//웹페이지 정보
export const metadata: Metadata = {
  title: "추억저장소",
  description: "추억 기록 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 로그인 확인과 추억 조회 요청이 나가기 전에 Supabase 서버와 미리 연결해 둠
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (supabaseUrl) {
    preconnect(supabaseUrl, { crossOrigin: "anonymous" });
  }

  return (
    <html lang="ko">
      <body className="min-h-dvh bg-[#f6f2f5]">
        <div className="mx-auto min-h-dvh w-full max-w-[430px] bg-white shadow-sm md:min-h-[calc(100dvh-32px)] md:overflow-hidden md:rounded-[32px] md:border md:border-pink-100 md:shadow-xl">
          {children}
        </div>
      </body>
    </html>
  );
}
