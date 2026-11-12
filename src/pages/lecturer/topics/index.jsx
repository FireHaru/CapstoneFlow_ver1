import Link from "next/link";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/lecturer/PageHeader";
import { TopicStatusBadge } from "@/components/site/StatusBadge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { formatDate } from "@/lib/format";
import { useStore } from "@/lib/store";
export default function MyTopics() {
  const { topics, registrations, lecturerId, toggleTopicStatus, deleteTopic } = useStore();
  const mine = topics
    .filter((t) => t.lecturerId === lecturerId)
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Quản lý"
        title="Đề tài của tôi"
        description={`${mine.length} đề tài`}
        actions={
          <Button asChild variant="gold" className="rounded-full">
            <Link href="/lecturer/topics/new">
              <Plus /> Tạo đề tài
            </Link>
          </Button>
        }
      />
      <div className="space-y-4">
        {mine.map((t) => {
          const count = registrations.filter((r) => r.topicId === t.id).length;
          return (
            <div
              key={t.id}
              className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-soft md:flex-row md:items-center"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-3">
                  <TopicStatusBadge status={t.status} />
                  <span className="text-xs text-muted-foreground">
                    Cập nhật {formatDate(t.updatedAt)}
                  </span>
                </div>
                <p className="mt-3 text-lg font-medium">{t.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {count} lượt quan tâm · dự kiến {t.maxStudents} SV
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={t.status === "OPEN"}
                  onCheckedChange={() => toggleTopicStatus(t.id)}
                  aria-label="Mở/đóng nhận đăng ký"
                />
                <Button asChild variant="outline" size="sm" className="rounded-full">
                  <Link href={`/lecturer/topics/${t.id}/edit`}>
                    <Pencil /> Sửa
                  </Link>
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="rounded-full text-destructive">
                      <Trash2 />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Xóa đề tài này?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Đề tài và {count} lượt quan tâm liên quan sẽ bị xóa.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Hủy</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => {
                          deleteTopic(t.id);
                          toast.success("Đã xóa đề tài");
                        }}
                      >
                        Xóa
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          );
        })}
        {mine.length === 0 && (
          <p className="rounded-2xl border border-dashed border-border p-12 text-center text-muted-foreground">
            Bạn chưa có đề tài nào.
          </p>
        )}
      </div>
    </div>
  );
}
