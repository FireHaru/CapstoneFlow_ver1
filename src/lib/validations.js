import { z } from "zod";
export const registrationSchema = z.object({
  studentName: z.string().trim().min(2, "Vui lòng nhập họ tên").max(150),
  studentCode: z.string().trim().min(3, "Vui lòng nhập mã số sinh viên").max(30),
  studentEmail: z.string().trim().email("Email không hợp lệ").max(255),
  studentPhone: z
    .string()
    .trim()
    .regex(/^[0-9+\s]{9,15}$/, "Số điện thoại không hợp lệ"),
  studentClass: z.string().trim().min(2, "Vui lòng nhập lớp").max(50),
  message: z.string().trim().max(1000, "Tối đa 1000 ký tự").default(""),
});
export const topicSchema = z.object({
  title: z.string().trim().min(10, "Tên đề tài tối thiểu 10 ký tự").max(255),
  description: z.string().trim().min(30, "Mô tả tối thiểu 30 ký tự"),
  objectives: z.string().trim().default(""),
  requirements: z.string().trim().default(""),
  technologies: z.array(z.string().trim().min(1)).default([]),
  maxStudents: z.coerce.number().int().min(1, "Tối thiểu 1").max(10, "Tối đa 10"),
  status: z.enum(["OPEN", "CLOSED"]),
});
export function fieldErrors(error) {
  const out = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
