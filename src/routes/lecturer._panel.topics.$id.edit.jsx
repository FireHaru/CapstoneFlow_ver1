import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

import { PageHeader } from "@/components/lecturer/PageHeader";
import { TopicForm } from "@/components/lecturer/TopicForm";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";
import { isOwner } from "@/lib/topic-rules";

export const Route = createFileRoute("/lecturer/_panel/topics/$id/edit")({
  head: () => ({
    meta: [
      { title: "Sửa đề tài — Cổng giảng viên CapstoneFlow" },
      { name: "description", content: "Cập nhật thông tin đề tài đồ án." },
      { property: "og:title", content: "Sửa đề tài — Cổng giảng viên CapstoneFlow" },
      { property: "og:description", content: "Cập nhật đề tài đồ án trên CapstoneFlow." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: EditTopic,
});

function EditTopic() {
  const { id } = Route.useParams();
  const { topics, lecturerId, updateTopic } = useStore();
  const navigate = useNavigate();
  const topic = topics.find((t) => String(t.id) === id);

  if (!topic || !isOwner(topic, lecturerId)) {
    return (
      <div className="rounded-2xl border border-dashed border-border p-16 text-center">
        <h1 className="text-3xl font-normal">Không tìm thấy đề tài</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Đề tài không tồn tại hoặc không thuộc quyền quản lý của bạn.
        </p>
        <Button asChild variant="ink" className="mt-6 rounded-full">
          <Link to="/lecturer/topics">Về danh sách</Link>
        </Button>
      </div>
    );
  }

  const { title, description, objectives, requirements, technologies, maxStudents, status } = topic;

  return (
    <div className="space-y-8">
      <PageHeader eyebrow="Chỉnh sửa" title="Sửa đề tài" description={topic.title} />
      <TopicForm
        initial={{
          title,
          description,
          objectives,
          requirements,
          technologies,
          maxStudents,
          status,
        }}
        submitLabel="Lưu thay đổi"
        onSubmit={(input) => {
          updateTopic(topic.id, input);
          toast.success("Đã lưu đề tài");
          navigate({ to: "/lecturer/topics" });
        }}
      />
    </div>
  );
}
