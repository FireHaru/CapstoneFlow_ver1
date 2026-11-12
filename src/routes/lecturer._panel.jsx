import { createFileRoute, Link, Outlet, useNavigate } from "@tanstack/react-router";
import { ExternalLink, FileText, LayoutDashboard, LogOut, Users } from "lucide-react";
import { useEffect } from "react";

import { Logo } from "@/components/site/Logo";
import { Button } from "@/components/ui/button";
import { getLecturer, useStore } from "@/lib/store";

export const Route = createFileRoute("/lecturer/_panel")({
  component: PanelLayout,
});

const nav = [
  { to: "/lecturer/dashboard", label: "Tổng quan", icon: LayoutDashboard },
  { to: "/lecturer/topics", label: "Đề tài của tôi", icon: FileText },
  { to: "/lecturer/registrations", label: "Lượt quan tâm", icon: Users },
]         ;

function PanelLayout() {
  const { hydrated, lecturerId, logout } = useStore();
  const navigate = useNavigate();
  const lecturer = getLecturer(lecturerId);

  useEffect(() => {
    if (hydrated && !lecturerId) navigate({ to: "/lecturer/login" });
  }, [hydrated, lecturerId, navigate]);

  if (!hydrated || !lecturer) {
    return <div className="grid min-h-screen place-items-center text-muted-foreground">Đang tải…</div>;
  }

  return (
    <div className="min-h-screen bg-background lg:grid lg:grid-cols-[260px_1fr]">
      <aside className="hidden flex-col bg-sidebar p-5 text-sidebar-foreground lg:sticky lg:top-0 lg:flex lg:h-screen">
        <div className="px-2 py-2"><Logo tone="light" /></div>
        <p className="eyebrow mt-10 px-3 text-ink-muted">Quản lý</p>
        <nav className="mt-3 space-y-1">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-ink-muted transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground data-[status=active]:bg-sidebar-accent data-[status=active]:text-sidebar-foreground"
            >
              <item.icon className="h-4 w-4" /> {item.label}
            </Link>
          ))}
        </nav>
        <Link to="/topics" className="mt-6 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-ink-muted hover:text-sidebar-foreground">
          <ExternalLink className="h-4 w-4" /> Xem trang sinh viên
        </Link>
        <div className="mt-auto rounded-xl border border-sidebar-border p-4">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gold-gradient font-display text-gold-foreground">
              {lecturer.fullName.split(" ").pop()?.[0]}
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{lecturer.fullName}</p>
              <p className="truncate text-xs text-ink-muted">{lecturer.department}</p>
            </div>
          </div>
          <Button variant="ink-outline" size="sm" className="mt-4 w-full" onClick={() => { logout(); navigate({ to: "/lecturer/login" }); }}>
            <LogOut /> Đăng xuất
          </Button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="sticky top-0 z-30 bg-sidebar text-sidebar-foreground lg:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <Logo tone="light" />
          <Button variant="ink-outline" size="sm" onClick={() => { logout(); navigate({ to: "/lecturer/login" }); }}>
            <LogOut />
          </Button>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-3 pb-3">
          {nav.map((item) => (
            <Link key={item.to} to={item.to} className="shrink-0 rounded-full px-3 py-1.5 text-sm text-ink-muted data-[status=active]:bg-sidebar-accent data-[status=active]:text-sidebar-foreground">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <main className="min-w-0">
        <div className="mx-auto max-w-6xl px-5 py-10 md:px-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
