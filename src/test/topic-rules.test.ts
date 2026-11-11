import { describe, expect, it } from "vitest";

import { seedRegistrations, seedTopics } from "@/lib/mock-data";
import { canRegister, registrationsForLecturer } from "@/lib/topic-rules";

describe("topic rules", () => {
  it("rejects interest in a CLOSED topic", () => {
    const closed = seedTopics.find((t) => t.status === "CLOSED")!;
    expect(canRegister(closed, [], "a@b.com").ok).toBe(false);
  });
  it("rejects the same email twice on one topic", () => {
    const topic = seedTopics.find((t) => t.id === 1)!;
    expect(canRegister(topic, seedRegistrations, "HUY.PG@student.edu.vn").ok).toBe(false);
    expect(canRegister(topic, seedRegistrations, "new@student.edu.vn").ok).toBe(true);
  });
  it("shows lecturers only registrations on their own topics", () => {
    const regs = registrationsForLecturer(seedTopics, seedRegistrations, 1);
    expect(regs.every((r) => seedTopics.find((t) => t.id === r.topicId)?.lecturerId === 1)).toBe(true);
    expect(regs.length).toBe(5);
  });
});
