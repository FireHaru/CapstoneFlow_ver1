import { Link } from "@tanstack/react-router";
import { ArrowRight, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { getLecturer } from "@/lib/store";
import type { Topic } from "@/lib/types";
import { TopicStatusBadge } from "./StatusBadge";

export function TopicCard({ topic }: { topic: Topic }) {
  const lecturer = getLecturer(topic.lecturerId);
  return (
    <Link
      to="/topics/$id"
      params={{ id: String(topic.id) }}
      className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-elegant"
    >
      <div className="flex items-center justify-between gap-3">
        <TopicStatusBadge status={topic.status} />
        <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
          <Users className="h-3.5 w-3.5" /> {topic.maxStudents} SV
        </span>
      </div>
      <h3 className="mt-5 text-xl font-medium leading-snug text-foreground">{topic.title}</h3>
      <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{topic.description}</p>
      <div className="mt-5 flex flex-wrap gap-1.5">
        {topic.technologies.slice(0, 4).map((t) => (
          <Badge key={t} variant="tech" className="rounded-full">{t}</Badge>
        ))}
      </div>
      <div className="mt-auto flex items-center justify-between border-t border-border pt-5 mt-6">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-foreground">{lecturer?.fullName}</p>
          <p className="truncate text-xs text-muted-foreground">{lecturer?.department}</p>
        </div>
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border text-foreground transition-colors group-hover:border-gold group-hover:bg-gold-gradient">
          <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
