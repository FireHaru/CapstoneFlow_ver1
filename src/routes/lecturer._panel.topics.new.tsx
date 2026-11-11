import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

import { PageHeader } from "@/components/lecturer/PageHeader";
import { emptyTopic, TopicForm } from "@/components/lecturer/TopicForm";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/lecturer/_panel/topics/new")({
  head: () => ({
    meta: [
      { title: "Tạo đề tài — Cổng giảng viên CapstoneFlow" },
      { name: "description", content: "Tạo đề tài đồ án mới để sinh viên tìm và gửi quan tâm." },
      { property: "og:title", content: "Tạo đề tài — Cổng giảng viên CapstoneFlow" },
      { property: "og:description", content: "Tạo đề tài đồ án mới trên CapstoneFlow." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: NewTopic,
});

function NewTopic() {
  const { createTopic } = useStore();
  const navigate = useNavigate();
  return (
    <div className="space-y-8">
      <PageHeader eyebrow="Đề tài mới" title="Tạo đề tài" description="Thông tin rõ ràng giúp sinh viên phù hợp tìm đến bạn." />
      <TopicForm
        initial={emptyTopic}
        submitLabel="Đăng đề tài"
        onSubmit={(input) => {
          createTopic(input);
          toast.success("Đã tạo đề tài");
          navigate({ to: "/lecturer/topics" });
        }}
      />
    </div>
  );
}
