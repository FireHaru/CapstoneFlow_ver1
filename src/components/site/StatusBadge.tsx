import { Badge } from "@/components/ui/badge";
import type { RegistrationStatus, TopicStatus } from "@/lib/types";

export function TopicStatusBadge({ status }: { status: TopicStatus }) {
  return status === "OPEN" ? (
    <Badge variant="open" className="gap-1.5 rounded-full">
      <span className="h-1.5 w-1.5 rounded-full bg-success" /> Đang nhận
    </Badge>
  ) : (
    <Badge variant="closed" className="rounded-full">Đã đóng</Badge>
  );
}

export function RegistrationStatusBadge({ status }: { status: RegistrationStatus }) {
  return status === "NEW" ? (
    <Badge variant="new" className="rounded-full">Mới</Badge>
  ) : (
    <Badge variant="contacted" className="rounded-full">Đã liên hệ</Badge>
  );
}
