import type { Registration, Topic } from "./types";

export type RuleResult = { ok: true } | { ok: false; reason: string };

/** Students may only express interest in OPEN topics, once per email per topic. */
export function canRegister(
  topic: Topic | undefined,
  registrations: Registration[],
  studentEmail: string,
): RuleResult {
  if (!topic) return { ok: false, reason: "Không tìm thấy đề tài." };
  if (topic.status === "CLOSED") {
    return { ok: false, reason: "Đề tài đã đóng nhận đăng ký." };
  }
  const email = studentEmail.trim().toLowerCase();
  const duplicate = registrations.some(
    (r) => r.topicId === topic.id && r.studentEmail.trim().toLowerCase() === email,
  );
  if (duplicate) {
    return { ok: false, reason: "Email này đã gửi quan tâm cho đề tài này rồi." };
  }
  return { ok: true };
}

/** A lecturer may only view or change topics they own. */
export function isOwner(topic: Topic | undefined, lecturerId: number | null): boolean {
  return !!topic && lecturerId !== null && topic.lecturerId === lecturerId;
}

/** Registrations visible to a lecturer: only those on their own topics. */
export function registrationsForLecturer(
  topics: Topic[],
  registrations: Registration[],
  lecturerId: number | null,
): Registration[] {
  if (lecturerId === null) return [];
  const own = new Set(topics.filter((t) => t.lecturerId === lecturerId).map((t) => t.id));
  return registrations.filter((r) => own.has(r.topicId));
}
