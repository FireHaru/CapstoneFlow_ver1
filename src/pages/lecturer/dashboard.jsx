import Link from "next/link";
import { ArrowRight, BellDot, FileText, FolderOpen, Plus, Users } from "lucide-react";
import { PageHeader } from "@/components/lecturer/PageHeader";
import { RegistrationStatusBadge, TopicStatusBadge } from "@/components/site/StatusBadge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { formatDateTime } from "@/lib/format";
import { getLecturer, useStore } from "@/lib/store";
import { registrationsForLecturer } from "@/lib/topic-rules";
export default function Dashboard() {
  const { topics, registrations, lecturerId, toggleTopicStatus } = useStore();
  const lecturer = getLecturer(lecturerId);
  const mine = topics.filter((t) => t.lecturerId === lecturerId);
  const regs = registrationsForLecturer(topics, registrations, lecturerId).sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt),
  );
  const stats = [
    { label: "Tổng đề tài", value: mine.length, icon: FileText },
    { label: "Đang nhận", value: mine.filter((t) => t.status === "OPEN").length, icon: FolderOpen },
    { label: "Lượt quan tâm", value: regs.length, icon: Users },
    {
      label: "Chưa liên hệ",
      value: regs.filter((r) => r.status === "NEW").length,
      icon: BellDot,
      highlight: true,
    },
  ];
  return (
    <div className="space-y-10">
      <PageHeader
        eyebrow="Tổng quan"
        title={`Xin chào, ${lecturer?.fullName.split(" ").slice(-1)[0]}`}
        description="Theo dõi đề tài và sinh viên quan tâm trong học kỳ này."
        actions={
          <Button asChild variant="gold" className="rounded-full">
            <Link href="/lecturer/topics/new">
              <Plus /> Tạo đề tài
            </Link>
          </Button>
        }
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className={
              s.highlight
                ? "rounded-2xl bg-ink p-6 text-ink-foreground shadow-elegant"
                : "rounded-2xl border border-border bg-card p-6 shadow-soft"
            }
          >
            <s.icon
              className={s.highlight ? "h-5 w-5 text-gold" : "h-5 w-5 text-muted-foreground"}
            />
            <p className="mt-6 font-display text-4xl">{s.value}</p>
            <p
              className={
                s.highlight ? "mt-1 text-sm text-ink-muted" : "mt-1 text-sm text-muted-foreground"
              }
            >
              {s.label}
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <section className="rounded-2xl border border-border bg-card shadow-soft">
          <div className="flex items-center justify-between border-b border-border p-6">
            <h2 className="text-xl font-medium">Lượt quan tâm gần đây</h2>
            <Link
              href="/lecturer/registrations"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
            >
              Tất cả <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <ul className="divide-y divide-border">
            {regs.slice(0, 5).map((r) => {
              const topic = topics.find((t) => t.id === r.topicId);
              return (
                <li key={r.id} className="flex items-center gap-4 p-5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-secondary font-medium text-foreground">
                    {r.studentName.split(" ").pop()?.[0]}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">
                      {r.studentName}{" "}
                      <span className="font-normal text-muted-foreground">· {r.studentClass}</span>
                    </p>
                    <p className="truncate text-xs text-muted-foreground">{topic?.title}</p>
                  </div>
                  <div className="text-right">
                    <RegistrationStatusBadge status={r.status} />
                    <p className="mt-1 text-xs text-muted-foreground">
                      {formatDateTime(r.createdAt)}
                    </p>
                  </div>
                </li>
              );
            })}
            {regs.length === 0 && (
              <li className="p-8 text-center text-sm text-muted-foreground">
                Chưa có sinh viên quan tâm.
              </li>
            )}
          </ul>
        </section>

        <section className="rounded-2xl border border-border bg-card shadow-soft">
          <div className="flex items-center justify-between border-b border-border p-6">
            <h2 className="text-xl font-medium">Nhận đăng ký</h2>
            <Link
              href="/lecturer/topics"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
            >
              Quản lý <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <ul className="divide-y divide-border">
            {mine.map((t) => (
              <li key={t.id} className="flex items-center gap-4 p-5">
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-1 text-sm font-medium">{t.title}</p>
                  <div className="mt-1.5">
                    <TopicStatusBadge status={t.status} />
                  </div>
                </div>
                <Switch
                  checked={t.status === "OPEN"}
                  onCheckedChange={() => toggleTopicStatus(t.id)}
                  aria-label="Mở/đóng nhận đăng ký"
                />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
