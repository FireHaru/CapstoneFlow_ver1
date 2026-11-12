import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PanelLayout } from "@/components/lecturer/PanelLayout";
import { Toaster } from "@/components/ui/sonner";
import { StoreProvider } from "@/lib/store";
import "../styles.css";

const pageMetadata = {
  "/": {
    title: "CapstoneFlow — Tìm đề tài đồ án, kết nối giảng viên",
    description:
      "Khám phá kho đề tài đồ án tốt nghiệp, xem chi tiết yêu cầu và gửi thông tin quan tâm tới giảng viên hướng dẫn.",
  },
  "/about": {
    title: "Giới thiệu — CapstoneFlow",
    description:
      "Tìm hiểu cách sinh viên và giảng viên sử dụng CapstoneFlow để kết nối qua đề tài đồ án tốt nghiệp.",
  },
  "/topics": {
    title: "Kho đề tài đồ án — CapstoneFlow",
    description:
      "Tìm kiếm và lọc đề tài đồ án tốt nghiệp theo công nghệ, giảng viên và trạng thái nhận đăng ký.",
  },
  "/topics/[id]": {
    title: "Chi tiết đề tài — CapstoneFlow",
    description:
      "Xem mô tả, mục tiêu, yêu cầu của đề tài đồ án và gửi thông tin quan tâm tới giảng viên.",
  },
  "/lecturer/login": {
    title: "Đăng nhập giảng viên — CapstoneFlow",
    description:
      "Đăng nhập cổng giảng viên CapstoneFlow để quản lý đề tài và lượt quan tâm của sinh viên.",
  },
  "/lecturer/dashboard": {
    title: "Tổng quan — Cổng giảng viên CapstoneFlow",
    description: "Tổng quan đề tài và lượt quan tâm của sinh viên dành cho giảng viên.",
  },
  "/lecturer/registrations": {
    title: "Lượt quan tâm — Cổng giảng viên CapstoneFlow",
    description: "Xem sinh viên quan tâm đề tài và cập nhật trạng thái đã liên hệ.",
  },
  "/lecturer/topics": {
    title: "Đề tài của tôi — Cổng giảng viên CapstoneFlow",
    description: "Quản lý, mở hoặc đóng nhận đăng ký các đề tài đồ án của bạn.",
  },
  "/lecturer/topics/new": {
    title: "Tạo đề tài — Cổng giảng viên CapstoneFlow",
    description: "Tạo đề tài đồ án mới để sinh viên tìm và gửi quan tâm.",
  },
  "/lecturer/topics/[id]/edit": {
    title: "Sửa đề tài — Cổng giảng viên CapstoneFlow",
    description: "Cập nhật thông tin đề tài đồ án.",
  },
};

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [queryClient] = useState(() => new QueryClient());
  const metadata = pageMetadata[router.pathname] ?? {
    title: "CapstoneFlow — Kho đề tài đồ án tốt nghiệp",
    description: "CapstoneFlow kết nối sinh viên với giảng viên qua kho đề tài đồ án tốt nghiệp.",
  };
  const isLecturerPage =
    router.pathname.startsWith("/lecturer/") && router.pathname !== "/lecturer/login";
  const page = <Component {...pageProps} />;

  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700&family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;1,9..144,400;1,9..144,500&family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500&display=swap"
        />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <StoreProvider>
          {isLecturerPage ? <PanelLayout>{page}</PanelLayout> : page}
          <Toaster position="top-center" />
        </StoreProvider>
      </QueryClientProvider>
    </>
  );
}
