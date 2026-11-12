import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, GraduationCap, Presentation } from "lucide-react";

import { PublicLayout } from "@/components/site/PublicLayout";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Cách hoạt động — CapstoneFlow" },
      {
        name: "description",
        content:
          "Tìm hiểu cách sinh viên và giảng viên sử dụng CapstoneFlow để kết nối qua đề tài đồ án tốt nghiệp.",
      },
      { property: "og:title", content: "Cách hoạt động — CapstoneFlow" },
      {
        property: "og:description",
        content: "Quy trình kết nối sinh viên và giảng viên trên CapstoneFlow.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

const roles = [
  {
    icon: GraduationCap,
    title: "Sinh viên",
    items: [
      "Xem danh sách đề tài",
      "Tìm kiếm và lọc theo công nghệ, giảng viên",
      "Xem chi tiết mục tiêu và yêu cầu",
      "Gửi thông tin liên hệ để bày tỏ quan tâm",
    ],
  },
  {
    icon: Presentation,
    title: "Giảng viên",
    items: [
      "Đăng nhập và xem bảng điều khiển",
      "Tạo, sửa, xóa đề tài",
      "Mở hoặc đóng nhận đăng ký",
      "Xem lượt quan tâm và cập nhật đã liên hệ",
    ],
  },
];

function About() {
  return (
    <PublicLayout>
      <section className="mx-auto max-w-4xl px-5 pb-12 pt-20 text-center">
        <p className="eyebrow text-gold">Cách hoạt động</p>
        <h1 className="mt-4 text-5xl font-bold md:text-6xl">
          Một nơi, <span className="text-gradient">hai vai trò</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          CapstoneFlow là kho đề tài đồ án tốt nghiệp giúp sinh viên tìm hướng nghiên cứu và giảng
          viên tìm được nhóm sinh viên phù hợp.
        </p>
      </section>

      <section className="mx-auto grid max-w-5xl gap-6 px-5 pb-16 md:grid-cols-2">
        {roles.map((r) => (
          <div key={r.title} className="rounded-2xl border border-border bg-card p-8 shadow-soft">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-gold-soft text-accent-foreground">
              <r.icon className="h-5 w-5" />
            </span>
            <h2 className="mt-6 text-3xl font-bold">{r.title}</h2>
            <ul className="mt-6 space-y-3">
              {r.items.map((i) => (
                <li key={i} className="flex gap-3 text-sm leading-relaxed text-foreground/85">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> {i}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-5xl px-5 pb-24">
        <div className="rounded-2xl border border-gold/40 bg-gold-soft/50 p-8">
          <h3 className="text-2xl font-bold">Lưu ý quan trọng</h3>
          <p className="mt-3 leading-relaxed text-foreground/80">
            Việc gửi thông tin chỉ thể hiện sự quan tâm, không đồng nghĩa đã được nhận vào đề tài.
            Mỗi email chỉ gửi được một lần cho cùng một đề tài, và đề tài đã đóng sẽ không nhận thêm
            đăng ký. Thông tin cá nhân của sinh viên chỉ hiển thị cho giảng viên phụ trách đề tài.
          </p>
          <Button asChild variant="ink" className="mt-6 rounded-full">
            <Link to="/topics">
              Bắt đầu khám phá <ArrowRight />
            </Link>
          </Button>
        </div>
      </section>
    </PublicLayout>
  );
}
