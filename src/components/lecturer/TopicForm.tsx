import { Link } from "@tanstack/react-router";
import { X } from "lucide-react";
import { useState, type FormEvent, type KeyboardEvent } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import type { TopicInput } from "@/lib/types";
import { fieldErrors, topicSchema } from "@/lib/validations";

export const emptyTopic: TopicInput = {
  title: "",
  description: "",
  objectives: "",
  requirements: "",
  technologies: [],
  maxStudents: 2,
  status: "OPEN",
};

export function TopicForm({ initial, submitLabel, onSubmit }: { initial: TopicInput; submitLabel: string; onSubmit: (input: TopicInput) => void }) {
  const [values, setValues] = useState<TopicInput>(initial);
  const [techDraft, setTechDraft] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = <K extends keyof TopicInput>(k: K, v: TopicInput[K]) => setValues((s) => ({ ...s, [k]: v }));

  const addTech = () => {
    const parts = techDraft.split(",").map((p) => p.trim()).filter(Boolean);
    if (parts.length) set("technologies", [...new Set([...values.technologies, ...parts])]);
    setTechDraft("");
  };

  const onTechKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTech();
    }
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const parsed = topicSchema.safeParse(values);
    if (!parsed.success) {
      setErrors(fieldErrors(parsed.error));
      return;
    }
    setErrors({});
    onSubmit(parsed.data);
  };

  const err = (k: string) => errors[k] && <p className="mt-1 text-xs text-destructive">{errors[k]}</p>;

  return (
    <form onSubmit={submit} noValidate className="grid gap-8 lg:grid-cols-[1fr_320px]">
      <div className="space-y-6 rounded-2xl border border-border bg-card p-7 shadow-soft">
        <div>
          <Label htmlFor="title">Tên đề tài</Label>
          <Input id="title" value={values.title} onChange={(e) => set("title", e.target.value)} className="mt-2 h-11" placeholder="Ví dụ: Hệ thống gợi ý khóa học…" />
          {err("title")}
        </div>
        <div>
          <Label htmlFor="description">Mô tả</Label>
          <Textarea id="description" rows={5} value={values.description} onChange={(e) => set("description", e.target.value)} className="mt-2" placeholder="Bối cảnh, bài toán và phạm vi đề tài" />
          {err("description")}
        </div>
        <div>
          <Label htmlFor="objectives">Mục tiêu</Label>
          <Textarea id="objectives" rows={4} value={values.objectives} onChange={(e) => set("objectives", e.target.value)} className="mt-2" placeholder="Mỗi dòng một mục tiêu" />
        </div>
        <div>
          <Label htmlFor="requirements">Yêu cầu với sinh viên</Label>
          <Textarea id="requirements" rows={4} value={values.requirements} onChange={(e) => set("requirements", e.target.value)} className="mt-2" placeholder="Mỗi dòng một yêu cầu" />
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-6 rounded-2xl border border-border bg-card p-7 shadow-soft">
          <div className="flex items-center justify-between">
            <div>
              <Label>Nhận đăng ký</Label>
              <p className="mt-1 text-xs text-muted-foreground">{values.status === "OPEN" ? "Sinh viên có thể gửi quan tâm" : "Đang đóng"}</p>
            </div>
            <Switch checked={values.status === "OPEN"} onCheckedChange={(c) => set("status", c ? "OPEN" : "CLOSED")} />
          </div>
          <div>
            <Label htmlFor="maxStudents">Số sinh viên dự kiến</Label>
            <Input id="maxStudents" type="number" min={1} max={10} value={values.maxStudents} onChange={(e) => set("maxStudents", Number(e.target.value))} className="mt-2 h-11" />
            {err("maxStudents")}
          </div>
          <div>
            <Label htmlFor="tech">Công nghệ</Label>
            <Input id="tech" value={techDraft} onChange={(e) => setTechDraft(e.target.value)} onKeyDown={onTechKey} onBlur={addTech} className="mt-2 h-11" placeholder="Gõ rồi nhấn Enter" />
            <div className="mt-3 flex flex-wrap gap-2">
              {values.technologies.map((t) => (
                <Badge key={t} variant="tech" className="gap-1 rounded-full pr-1.5">
                  {t}
                  <button type="button" onClick={() => set("technologies", values.technologies.filter((x) => x !== t))} aria-label={`Bỏ ${t}`} className="rounded-full p-0.5 hover:bg-muted">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button type="submit" variant="gold" size="xl" className="flex-1">{submitLabel}</Button>
          <Button asChild type="button" variant="outline" size="xl">
            <Link to="/lecturer/topics">Hủy</Link>
          </Button>
        </div>
      </div>
    </form>
  );
}
