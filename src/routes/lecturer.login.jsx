import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, KeyRound } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import heroImg from "@/assets/hero-library.jpg";
import { Logo } from "@/components/site/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DEMO_LOGIN } from "@/lib/mock-data";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/lecturer/login")({
  head: () => ({
    meta: [
      { title: "Đăng nhập giảng viên — CapstoneFlow" },
      {
        name: "description",
        content:
          "Đăng nhập cổng giảng viên CapstoneFlow để quản lý đề tài và lượt quan tâm của sinh viên.",
      },
      { property: "og:title", content: "Đăng nhập giảng viên — CapstoneFlow" },
      { property: "og:description", content: "Cổng quản lý đề tài dành cho giảng viên." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { login } = useStore();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (login(email, password)) {
      toast.success("Chào mừng trở lại!");
      navigate({ to: "/lecturer/dashboard" });
    } else {
      setError("Email hoặc mật khẩu không đúng.");
    }
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-ink lg:block">
        <img
          src={heroImg}
          alt=""
          width={1600}
          height={1104}
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative flex h-full flex-col justify-between p-12">
          <Logo tone="light" />
          <div>
            <p className="eyebrow text-gold">Cổng giảng viên</p>
            <h1 className="mt-4 max-w-md text-5xl font-normal leading-tight text-ink-foreground">
              Đề tài của bạn, <span className="italic text-gold">đúng người</span> tìm đến.
            </h1>
          </div>
        </div>
      </div>

      <div className="flex flex-col px-6 py-10 sm:px-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Về trang chủ
        </Link>
        <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center py-12">
          <div className="lg:hidden">
            <Logo />
          </div>
          <h2 className="mt-8 text-4xl font-normal lg:mt-0">Đăng nhập</h2>
          <p className="mt-2 text-muted-foreground">Quản lý đề tài và sinh viên quan tâm.</p>

          <form onSubmit={onSubmit} className="mt-10 space-y-5">
            <div>
              <Label htmlFor="email" className="text-xs text-muted-foreground">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ten@capstoneflow.edu.vn"
                className="mt-1.5 h-12 rounded-lg"
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-xs text-muted-foreground">
                Mật khẩu
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-1.5 h-12 rounded-lg"
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" variant="ink" size="xl" className="w-full">
              Đăng nhập
            </Button>
          </form>

          <div className="mt-8 rounded-xl border border-gold/40 bg-gold-soft/50 p-4 text-sm">
            <p className="flex items-center gap-2 font-medium">
              <KeyRound className="h-4 w-4 text-gold" /> Tài khoản dùng thử
            </p>
            <p className="mt-2 text-muted-foreground">
              {DEMO_LOGIN.email}
              <br />
              Mật khẩu: {DEMO_LOGIN.password}
            </p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-3 rounded-full"
              onClick={() => {
                setEmail(DEMO_LOGIN.email);
                setPassword(DEMO_LOGIN.password);
                setError("");
              }}
            >
              Điền sẵn
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
