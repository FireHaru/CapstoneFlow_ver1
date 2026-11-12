import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpenCheck, Handshake, Search, Send, Sparkles } from "lucide-react";

import heroImg from "@/assets/hero-library.jpg";
import { PublicLayout } from "@/components/site/PublicLayout";
import { TopicCard } from "@/components/site/TopicCard";
import { Button } from "@/components/ui/button";
import { lecturers } from "@/lib/mock-data";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CapstoneFlow — Tìm đề tài đồ án, kết nối giảng viên" },
      { name: "description", content: "Khám phá kho đề tài đồ án tốt nghiệp, xem chi tiết yêu cầu và gửi thông tin quan tâm tới giảng viên hướng dẫn." },
      { property: "og:title", content: "CapstoneFlow — Tìm đề tài đồ án, kết nối giảng viên" },
      { property: "og:description", content: "Kho đề tài đồ án tốt nghiệp kết nối sinh viên với giảng viên hướng dẫn." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const steps = [
  { icon: Search, title: "Khám phá", text: "Tìm kiếm và lọc đề tài theo công nghệ, giảng viên hoặc trạng thái." },
  { icon: BookOpenCheck, title: "Tìm hiểu", text: "Đọc kỹ mô tả, mục tiêu và yêu cầu trước khi quyết định." },
  { icon: Send, title: "Gửi quan tâm", text: "Để lại thông tin liên hệ chỉ trong một phút, không cần tài khoản." },
  { icon: Handshake, title: "Trao đổi", text: "Giảng viên chủ động liên hệ để trao đổi và chốt nhóm." },
];

function Index() {
  const { topics } = useStore();
  const open = topics.filter((t) => t.status === "OPEN");
  const featured = [...open].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)).slice(0, 3);
  const techCount = new Set(topics.flatMap((t) => t.technologies)).size;

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-ink">
        <img
          src={heroImg}
          alt="Thư viện đại học trong ánh nắng chiều"
          width={1600}
          height={1104}
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-hero-overlay" />
        <div className="mx-auto max-w-6xl px-5 pb-28 pt-24 md:pb-36 md:pt-32">
          <div className="max-w-2xl animate-rise">
            <p className="eyebrow inline-flex items-center gap-2 text-gold">
              <Sparkles className="h-3.5 w-3.5" /> Mùa đồ án 2026
            </p>
            <h1 className="mt-6 text-5xl font-normal leading-[1.05] text-ink-foreground md:text-7xl">
              Đề tài phù hợp,
              <br />
              <span className="italic text-gold">người hướng dẫn</span> đúng.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted">
              CapstoneFlow tập hợp đề tài đồ án tốt nghiệp từ giảng viên trong khoa — giúp bạn tìm hướng đi và kết nối
              nhanh, rõ ràng, không giấy tờ.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild variant="gold" size="xl">
                <Link to="/topics">
                  Khám phá đề tài <ArrowRight />
                </Link>
              </Button>
              <Button asChild variant="ink-outline" size="xl">
                <Link to="/lecturer/login">Tôi là giảng viên</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative z-10 mx-auto -mt-14 max-w-5xl px-5">
        <div className="grid grid-cols-3 divide-x divide-border rounded-2xl border border-border bg-card shadow-elegant">
          {[
            { value: open.length, label: "Đề tài đang nhận" },
            { value: lecturers.length, label: "Giảng viên" },
            { value: techCount, label: "Công nghệ" },
          ].map((s) => (
            <div key={s.label} className="px-4 py-7 text-center md:py-9">
              <p className="font-display text-4xl font-medium text-foreground md:text-5xl">{s.value}</p>
              <p className="mt-2 text-xs text-muted-foreground md:text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-6xl px-5 py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow text-gold">Mới cập nhật</p>
            <h2 className="mt-3 text-4xl font-normal md:text-5xl">Đề tài nổi bật</h2>
          </div>
          <Button asChild variant="outline" className="rounded-full">
            <Link to="/topics">
              Xem tất cả <ArrowRight />
            </Link>
          </Button>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {featured.map((t) => (
            <TopicCard key={t.id} topic={t} />
          ))}
        </div>
      </section>

      {/* Steps */}
      <section className="border-y border-border bg-secondary/60">
        <div className="mx-auto max-w-6xl px-5 py-24">
          <div className="max-w-xl">
            <p className="eyebrow text-gold">Bốn bước</p>
            <h2 className="mt-3 text-4xl font-normal md:text-5xl">Từ ý tưởng đến cuộc trò chuyện</h2>
          </div>
          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-4">
            {steps.map((s, i) => (
              <div key={s.title} className="bg-card p-7">
                <div className="flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-gold-soft text-accent-foreground">
                    <s.icon className="h-5 w-5" />
                  </span>
                  <span className="font-display text-3xl italic text-border">0{i + 1}</span>
                </div>
                <h3 className="mt-6 text-xl font-medium">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-2xl border-l-2 border-gold pl-4 text-sm leading-relaxed text-muted-foreground">
            Gửi thông tin chỉ thể hiện sự quan tâm, không đồng nghĩa bạn đã được nhận vào đề tài. Giảng viên sẽ chủ động
            liên hệ để trao đổi thêm.
          </p>
        </div>
      </section>

      {/* Lecturer CTA */}
      <section className="mx-auto max-w-6xl px-5 py-24">
        <div className="relative overflow-hidden rounded-3xl bg-ink px-8 py-14 md:px-14">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold-gradient opacity-20 blur-3xl" />
          <div className="relative grid items-center gap-8 md:grid-cols-[1.5fr_1fr]">
            <div>
              <p className="eyebrow text-gold">Dành cho giảng viên</p>
              <h2 className="mt-3 text-3xl font-normal text-ink-foreground md:text-4xl">
                Đăng đề tài, mở – đóng nhận đăng ký và theo dõi sinh viên quan tâm ở một nơi.
              </h2>
            </div>
            <div className="md:text-right">
              <Button asChild variant="gold" size="xl">
                <Link to="/lecturer/login">
                  Vào cổng giảng viên <ArrowRight />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
