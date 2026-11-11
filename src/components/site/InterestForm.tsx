import { CheckCircle2, Lock } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useStore } from "@/lib/store";
import type { RegistrationInput, Topic } from "@/lib/types";
import { fieldErrors, registrationSchema } from "@/lib/validations";

const empty: RegistrationInput = {
  studentName: "",
  studentCode: "",
  studentEmail: "",
  studentPhone: "",
  studentClass: "",
  message: "",
};

const fields: { name: keyof RegistrationInput; label: string; placeholder: string; type?: string; half?: boolean }[] = [
  { name: "studentName", label: "Họ và tên", placeholder: "Nguyễn Văn A" },
  { name: "studentCode", label: "Mã số sinh viên", placeholder: "SE170000", half: true },
  { name: "studentClass", label: "Lớp", placeholder: "SE1701", half: true },
  { name: "studentEmail", label: "Email", placeholder: "ban@student.edu.vn", type: "email" },
  { name: "studentPhone", label: "Số điện thoại", placeholder: "0901 234 567", type: "tel" },
];

export function InterestForm({ topic }: { topic: Topic }) {
  const { submitRegistration } = useStore();
  const [values, setValues] = useState<RegistrationInput>(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  if (topic.status === "CLOSED") {
    return (
      <div className="rounded-2xl border border-border bg-muted/50 p-7 text-center">
        <Lock className="mx-auto h-6 w-6 text-muted-foreground" />
        <h3 className="mt-4 text-xl font-medium">Đề tài đã đóng</h3>
        <p className="mt-2 text-sm text-muted-foreground">Giảng viên hiện không nhận thêm đăng ký cho đề tài này.</p>
      </div>
    );
  }

  if (done) {
    return (
      <div className="rounded-2xl border border-success/30 bg-success-soft p-7 text-center">
        <CheckCircle2 className="mx-auto h-8 w-8 text-success" />
        <h3 className="mt-4 text-xl font-medium">Đã gửi thông tin!</h3>
        <p className="mt-2 text-sm leading-relaxed text-foreground/75">
          Giảng viên sẽ xem và chủ động liên hệ với bạn. Lưu ý: đây chỉ là bày tỏ quan tâm, chưa phải xác nhận nhận đề tài.
        </p>
        <Button variant="outline" className="mt-5 rounded-full" onClick={() => { setValues(empty); setDone(false); }}>
          Gửi cho bạn khác
        </Button>
      </div>
    );
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const parsed = registrationSchema.safeParse(values);
    if (!parsed.success) {
      setErrors(fieldErrors(parsed.error));
      return;
    }
    const result = submitRegistration(topic.id, parsed.data);
    if (!result.ok) {
      setErrors({ studentEmail: result.reason });
      toast.error(result.reason);
      return;
    }
    setErrors({});
    setDone(true);
    toast.success("Đã gửi thông tin quan tâm tới giảng viên");
  };

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-2xl border border-border bg-card p-7 shadow-elegant">
      <p className="eyebrow text-gold">Bày tỏ quan tâm</p>
      <h3 className="mt-2 text-2xl font-normal">Gửi thông tin liên hệ</h3>
      <div className="mt-6 grid grid-cols-2 gap-4">
        {fields.map((f) => (
          <div key={f.name} className={f.half ? "col-span-1" : "col-span-2"}>
            <Label htmlFor={f.name} className="text-xs font-medium text-muted-foreground">{f.label}</Label>
            <Input
              id={f.name}
              type={f.type ?? "text"}
              placeholder={f.placeholder}
              value={values[f.name]}
              onChange={(e) => setValues((v) => ({ ...v, [f.name]: e.target.value }))}
              aria-invalid={!!errors[f.name]}
              className="mt-1.5 h-11 rounded-lg bg-background"
            />
            {errors[f.name] && <p className="mt-1 text-xs text-destructive">{errors[f.name]}</p>}
          </div>
        ))}
        <div className="col-span-2">
          <Label htmlFor="message" className="text-xs font-medium text-muted-foreground">Lời nhắn (không bắt buộc)</Label>
          <Textarea
            id="message"
            rows={3}
            placeholder="Kinh nghiệm, lý do bạn quan tâm…"
            value={values.message}
            onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
            className="mt-1.5 rounded-lg bg-background"
          />
          {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
        </div>
      </div>
      <Button type="submit" variant="gold" size="xl" className="mt-6 w-full">
        Gửi thông tin
      </Button>
      <p className="mt-4 text-center text-xs leading-relaxed text-muted-foreground">
        Gửi thông tin chỉ thể hiện sự quan tâm, không đồng nghĩa đã được nhận vào đề tài.
      </p>
    </form>
  );
}
