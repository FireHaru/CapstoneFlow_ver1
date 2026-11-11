import { createFileRoute } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";

import { PublicLayout } from "@/components/site/PublicLayout";
import { TopicCard } from "@/components/site/TopicCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { lecturers } from "@/lib/mock-data";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/topics/")({
  head: () => ({
    meta: [
      { title: "Kho đề tài đồ án — CapstoneFlow" },
      { name: "description", content: "Tìm kiếm và lọc đề tài đồ án tốt nghiệp theo công nghệ, giảng viên và trạng thái nhận đăng ký." },
      { property: "og:title", content: "Kho đề tài đồ án — CapstoneFlow" },
      { property: "og:description", content: "Danh sách đề tài đồ án tốt nghiệp đang mở nhận sinh viên." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TopicsPage,
});

type StatusFilter = "ALL" | "OPEN" | "CLOSED";

function TopicsPage() {
  const { topics } = useStore();
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<StatusFilter>("OPEN");
  const [tech, setTech] = useState("all");
  const [lecturer, setLecturer] = useState("all");

  const techs = useMemo(() => [...new Set(topics.flatMap((t) => t.technologies))].sort(), [topics]);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return topics
      .filter((t) => status === "ALL" || t.status === status)
      .filter((t) => tech === "all" || t.technologies.includes(tech))
      .filter((t) => lecturer === "all" || String(t.lecturerId) === lecturer)
      .filter(
        (t) =>
          !query ||
          t.title.toLowerCase().includes(query) ||
          t.description.toLowerCase().includes(query) ||
          t.technologies.some((x) => x.toLowerCase().includes(query)),
      )
      .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  }, [topics, q, status, tech, lecturer]);

  const hasFilters = q || status !== "OPEN" || tech !== "all" || lecturer !== "all";

  return (
    <PublicLayout>
      <section className="border-b border-border bg-secondary/50">
        <div className="mx-auto max-w-6xl px-5 pb-10 pt-16">
          <p className="eyebrow text-gold">Kho đề tài</p>
          <h1 className="mt-3 text-5xl font-normal md:text-6xl">Tìm hướng đi cho đồ án</h1>
          <p className="mt-4 max-w-xl text-muted-foreground">
            {topics.filter((t) => t.status === "OPEN").length} đề tài đang nhận sinh viên quan tâm.
          </p>

          <div className="mt-10 rounded-2xl border border-border bg-card p-3 shadow-soft">
            <div className="flex flex-col gap-3 md:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Tìm theo tên đề tài, mô tả hoặc công nghệ…"
                  className="h-12 rounded-xl border-transparent bg-muted/60 pl-11 shadow-none"
                />
              </div>
              <Select value={tech} onValueChange={setTech}>
                <SelectTrigger className="h-12 rounded-xl md:w-48">
                  <SelectValue placeholder="Công nghệ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Mọi công nghệ</SelectItem>
                  {techs.map((t) => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={lecturer} onValueChange={setLecturer}>
                <SelectTrigger className="h-12 rounded-xl md:w-60">
                  <SelectValue placeholder="Giảng viên" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Mọi giảng viên</SelectItem>
                  {lecturers.map((l) => (
                    <SelectItem key={l.id} value={String(l.id)}>{l.fullName}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            {(
              [
                ["OPEN", "Đang nhận"],
                ["CLOSED", "Đã đóng"],
                ["ALL", "Tất cả"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                onClick={() => setStatus(value)}
                className={cn(
                  "rounded-full border px-4 py-1.5 text-sm transition-colors",
                  status === value
                    ? "border-ink bg-ink text-ink-foreground"
                    : "border-border bg-card text-muted-foreground hover:text-foreground",
                )}
              >
                {label}
              </button>
            ))}
            {hasFilters && (
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full text-muted-foreground"
                onClick={() => {
                  setQ("");
                  setStatus("OPEN");
                  setTech("all");
                  setLecturer("all");
                }}
              >
                <X /> Xóa bộ lọc
              </Button>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14">
        <p className="mb-6 text-sm text-muted-foreground">{filtered.length} kết quả</p>
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card p-16 text-center">
            <h2 className="text-2xl font-normal">Chưa có đề tài phù hợp</h2>
            <p className="mt-2 text-sm text-muted-foreground">Thử bỏ bớt bộ lọc hoặc tìm với từ khóa khác.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((t) => (
              <TopicCard key={t.id} topic={t} />
            ))}
          </div>
        )}
      </section>
    </PublicLayout>
  );
}
