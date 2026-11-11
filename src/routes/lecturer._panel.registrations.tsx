import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone } from "lucide-react";
import { useState } from "react";

import { PageHeader } from "@/components/lecturer/PageHeader";
import { RegistrationStatusBadge } from "@/components/site/StatusBadge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatDateTime } from "@/lib/format";
import { useStore } from "@/lib/store";
import { registrationsForLecturer } from "@/lib/topic-rules";

export const Route = createFileRoute("/lecturer/_panel/registrations")({
  head: () => ({
    meta: [
      { title: "Lượt quan tâm — Cổng giảng viên CapstoneFlow" },
      { name: "description", content: "Xem sinh viên quan tâm đề tài và cập nhật trạng thái đã liên hệ." },
      { property: "og:title", content: "Lượt quan tâm — Cổng giảng viên CapstoneFlow" },
      { property: "og:description", content: "Danh sách sinh viên quan tâm đề tài của bạn." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Registrations,
});

function Registrations() {
  const { topics, registrations, lecturerId, setRegistrationStatus } = useStore();
  const [topicId, setTopicId] = useState("all");
  const [status, setStatus] = useState("all");
  const mine = topics.filter((t) => t.lecturerId === lecturerId);
  const list = registrationsForLecturer(topics, registrations, lecturerId)
    .filter((r) => topicId === "all" || String(r.topicId) === topicId)
    .filter((r) => status === "all" || r.status === status)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return (
    <div className="space-y-8">
      <PageHeader eyebrow="Sinh viên" title="Lượt quan tâm" description="Chỉ hiển thị sinh viên quan tâm các đề tài của bạn." />
      <div className="flex flex-col gap-3 md:flex-row">
        <Select value={topicId} onValueChange={setTopicId}>
          <SelectTrigger className="h-11 md:w-96"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả đề tài</SelectItem>
            {mine.map((t) => <SelectItem key={t.id} value={String(t.id)}>{t.title}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="h-11 md:w-48"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Mọi trạng thái</SelectItem>
            <SelectItem value="NEW">Mới</SelectItem>
            <SelectItem value="CONTACTED">Đã liên hệ</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-4">
        {list.map((r) => {
          const topic = topics.find((t) => t.id === r.topicId);
          return (
            <div key={r.id} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3"><p className="text-lg font-medium">{r.studentName}</p><RegistrationStatusBadge status={r.status} /></div>
                  <p className="mt-1 text-sm text-muted-foreground">{r.studentCode} · {r.studentClass} · {formatDateTime(r.createdAt)}</p>
                  <p className="mt-1 text-sm text-gold">{topic?.title}</p>
                </div>
                <Button
                  variant={r.status === "NEW" ? "ink" : "outline"}
                  size="sm"
                  className="rounded-full"
                  onClick={() => setRegistrationStatus(r.id, r.status === "NEW" ? "CONTACTED" : "NEW")}
                >
                  {r.status === "NEW" ? "Đánh dấu đã liên hệ" : "Chuyển về mới"}
                </Button>
              </div>
              <div className="mt-4 flex flex-wrap gap-6 text-sm">
                <a href={`mailto:${r.studentEmail}`} className="inline-flex items-center gap-2 text-foreground/80 hover:text-foreground"><Mail className="h-4 w-4 text-gold" />{r.studentEmail}</a>
                <a href={`tel:${r.studentPhone}`} className="inline-flex items-center gap-2 text-foreground/80 hover:text-foreground"><Phone className="h-4 w-4 text-gold" />{r.studentPhone}</a>
              </div>
              {r.message && <p className="mt-4 border-l-2 border-gold pl-4 text-sm italic text-foreground/75">{r.message}</p>}
            </div>
          );
        })}
        {list.length === 0 && <p className="rounded-2xl border border-dashed border-border p-12 text-center text-muted-foreground">Chưa có lượt quan tâm nào.</p>}
      </div>
    </div>
  );
}
