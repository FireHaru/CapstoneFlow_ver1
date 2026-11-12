import { Link } from "@tanstack/react-router";

import { Logo } from "./Logo";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-4">
          <Logo tone="light" />
          <p className="max-w-sm text-sm leading-relaxed text-ink-muted">
            Kho đề tài đồ án tốt nghiệp — nơi sinh viên tìm đúng hướng nghiên cứu và giảng viên gặp
            đúng người cộng sự.
          </p>
        </div>
        <div className="space-y-3 text-sm">
          <p className="eyebrow text-gold">Sinh viên</p>
          <Link to="/topics" className="block text-ink-muted hover:text-ink-foreground">
            Kho đề tài
          </Link>
          <Link to="/about" className="block text-ink-muted hover:text-ink-foreground">
            Cách hoạt động
          </Link>
        </div>
        <div className="space-y-3 text-sm">
          <p className="eyebrow text-gold">Giảng viên</p>
          <Link to="/lecturer/login" className="block text-ink-muted hover:text-ink-foreground">
            Đăng nhập
          </Link>
          <Link to="/lecturer/dashboard" className="block text-ink-muted hover:text-ink-foreground">
            Bảng điều khiển
          </Link>
        </div>
      </div>
      <div className="border-t border-ink-foreground/10">
        <p className="mx-auto max-w-6xl px-5 py-5 text-xs text-ink-muted">
          © 2026 CapstoneFlow · Bản giao diện mẫu, dữ liệu minh họa.
        </p>
      </div>
    </footer>
  );
}
