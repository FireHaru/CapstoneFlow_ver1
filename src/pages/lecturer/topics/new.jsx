import { useRouter } from "next/router";
import { toast } from "sonner";
import { PageHeader } from "@/components/lecturer/PageHeader";
import { emptyTopic, TopicForm } from "@/components/lecturer/TopicForm";
import { useStore } from "@/lib/store";
export default function NewTopic() {
  const { createTopic } = useStore();
  const router = useRouter();
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Đề tài mới"
        title="Tạo đề tài"
        description="Thông tin rõ ràng giúp sinh viên phù hợp tìm đến bạn."
      />
      <TopicForm
        initial={emptyTopic}
        submitLabel="Đăng đề tài"
        onSubmit={(input) => {
          createTopic(input);
          toast.success("Đã tạo đề tài");
          router.push("/lecturer/topics");
        }}
      />
    </div>
  );
}
