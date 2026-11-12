import { Badge } from "@/components/ui/badge";

export function TopicStatusBadge({ status }) {
  return status === "OPEN" ? (
    <Badge variant="open" className="gap-1.5 rounded-full">
      <span className="h-1.5 w-1.5 rounded-full bg-success" /> Đang nhận
    </Badge>
  ) : (
    <Badge variant="closed" className="rounded-full">
      Đã đóng
    </Badge>
  );
}

export function RegistrationStatusBadge({ status }) {
  return status === "NEW" ? (
    <Badge variant="new" className="rounded-full">
      Mới
    </Badge>
  ) : (
    <Badge variant="contacted" className="rounded-full">
      Đã liên hệ
    </Badge>
  );
}
