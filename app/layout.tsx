import type { Metadata } from "next";
import "./globals.css";
import "@fontsource/pretendard";

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
