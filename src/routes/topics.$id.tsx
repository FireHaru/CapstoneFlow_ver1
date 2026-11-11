import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CalendarDays, Mail, Users } from "lucide-react";

import { InterestForm } from "@/components/site/InterestForm";
import { PublicLayout } from "@/components/site/PublicLayout";
import { TopicStatusBadge } from "@/components/site/StatusBadge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/format";
import { getLecturer, useStore } from "@/lib/store";

export const Route = createFileRoute("/topics/$id")({
  head: () => ({
    meta: [
      { title: "Chi tiết đề tài — CapstoneFlow" },
      { name: "description", content: "Xem mô tả, mục tiêu, yêu cầu của đề tài đồ án và gửi thông tin quan tâm tới giảng viên." },
      { property: "og:title", content: "Chi tiết đề tài — CapstoneFlow" },
      { property: "og:description", content: "Mô tả, mục tiêu và yêu cầu của đề tài đồ án tốt nghiệp." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TopicDetail,
});

function Lines({ text }: { text: string }) {
  const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);
  if (lines.length === 0) return <p className="text-muted-foreground">Chưa cập nhật.</p>;
  return (
    <ul className="space-y-3">
      {lines.map((l) => (
        <li key={l} className="flex gap-3 leading-relaxed text-foreground/85">
          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
          {l}
        </li>
      ))}
    </ul>
  );
}

function TopicDetail() {
  const { id } = Route.useParams();
  const { topics, hydrated } = useStore();
  const topic = topics.find((t) => String(t.id) === id);
  const lecturer = getLecturer(topic?.lecturerId);

  if (!topic) {
    return (
      <PublicLayout>
        <div className="mx-auto max-w-xl px-5 py-32 text-center">
          <h1 className="text-4xl font-normal">{hydrated ? "Không tìm thấy đề tài" : "Đang tải…"}</h1>
          {hydrated && (
            <Button asChild variant="ink" className="mt-8 rounded-full">
              <Link to="/topics">Về kho đề tài</Link>
            </Button>
          )}
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <section className="border-b border-border bg-secondary/50">
        <div className="mx-auto max-w-6xl px-5 pb-14 pt-10">
          <Link to="/topics" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Kho đề tài
          </Link>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <TopicStatusBadge status={topic.status} />
            {topic.technologies.map((t) => (
              <Badge key={t} variant="tech" className="rounded-full">{t}</Badge>
            ))}
          </div>
          <h1 className="mt-6 max-w-4xl text-4xl font-normal leading-tight md:text-5xl">{topic.title}</h1>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2"><Users className="h-4 w-4 text-gold" /> Dự kiến {topic.maxStudents} sinh viên</span>
            <span className="inline-flex items-center gap-2"><CalendarDays className="h-4 w-4 text-gold" /> Cập nhật {formatDate(topic.updatedAt)}</span>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-14 lg:grid-cols-[1fr_400px]">
        <div className="space-y-12">
          <div>
            <h2 className="text-2xl font-normal">Mô tả</h2>
            <div className="gold-rule mt-3" />
            <p className="mt-5 text-lg leading-relaxed text-foreground/85">{topic.description}</p>
          </div>
          <div>
            <h2 className="text-2xl font-normal">Mục tiêu</h2>
            <div className="gold-rule mt-3" />
            <div className="mt-5"><Lines text={topic.objectives} /></div>
          </div>
          <div>
            <h2 className="text-2xl font-normal">Yêu cầu</h2>
            <div className="gold-rule mt-3" />
            <div className="mt-5"><Lines text={topic.requirements} /></div>
          </div>
          {lecturer && (
            <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-6">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-ink font-display text-xl text-gold">
                {lecturer.fullName.split(" ").pop()?.[0]}
              </span>
              <div className="min-w-0">
                <p className="eyebrow text-muted-foreground">Giảng viên hướng dẫn</p>
                <p className="mt-1 text-lg font-medium">{lecturer.fullName}</p>
                <p className="text-sm text-muted-foreground">{lecturer.department}</p>
              </div>
              <Mail className="ml-auto hidden h-5 w-5 text-muted-foreground sm:block" />
            </div>
          )}
        </div>
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <InterestForm topic={topic} />
        </aside>
      </section>
    </PublicLayout>
  );
}
