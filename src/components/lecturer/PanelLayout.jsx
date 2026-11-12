import Link from "next/link";
import { useRouter } from "next/router";
import { ExternalLink, FileText, KeyRound, LayoutDashboard, LogOut, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Logo } from "@/components/site/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getLecturer, useStore } from "@/lib/store";
const nav = [
  { to: "/lecturer/dashboard", label: "Tổng quan", icon: LayoutDashboard },
  { to: "/lecturer/topics", label: "Đề tài của tôi", icon: FileText },
  { to: "/lecturer/registrations", label: "Lượt quan tâm", icon: Users },
];
export function PanelLayout({ children }) {
  const {
    hydrated,
    lecturerId,
    passwordPromptDismissed,
    dismissPasswordPrompt,
    changePassword,
    logout,
  } = useStore();
  const router = useRouter();
  const lecturer = getLecturer(lecturerId);
  const [passwordDialog, setPasswordDialog] = useState(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const showInitialPrompt = lecturerId !== null && !passwordPromptDismissed[lecturerId];
  const showPasswordDialog = passwordDialog === "change" || showInitialPrompt;
  const resetPasswordForm = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setPasswordError("");
  };
  const submitPasswordChange = (event) => {
    event.preventDefault();
    if (newPassword.length < 8) {
      setPasswordError("Mật khẩu mới cần có ít nhất 8 ký tự.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("Mật khẩu xác nhận không khớp.");
      return;
    }
    if (!changePassword(currentPassword, newPassword)) {
      setPasswordError("Mật khẩu hiện tại không đúng.");
      return;
    }
    resetPasswordForm();
    setPasswordDialog(null);
    toast.success("Đổi mật khẩu thành công.");
  };
  useEffect(() => {
    if (hydrated && !lecturerId) router.push("/lecturer/login");
  }, [hydrated, lecturerId, router]);
  if (!hydrated || !lecturer) {
    return (
      <div className="grid min-h-screen place-items-center text-muted-foreground">Đang tải…</div>
    );
  }
  return (
    <div className="min-h-screen bg-background lg:grid lg:grid-cols-[260px_1fr]">
      <aside className="hidden flex-col bg-sidebar p-5 text-sidebar-foreground lg:sticky lg:top-0 lg:flex lg:h-screen">
        <div className="px-2 py-2">
          <Logo tone="light" />
        </div>
        <p className="eyebrow mt-10 px-3 text-ink-muted">Quản lý</p>
        <nav className="mt-3 space-y-1">
          {nav.map((item) => (
            <Link
              key={item.to}
              href={item.to}
              data-status={router.asPath === item.to ? "active" : undefined}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-ink-muted transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground ${
                router.asPath === item.to ? "bg-sidebar-accent text-sidebar-foreground" : ""
              }`}
            >
              <item.icon className="h-4 w-4" /> {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/topics"
          className="mt-6 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-ink-muted hover:text-sidebar-foreground"
        >
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
          <Button
            variant="ink-outline"
            size="sm"
            className="mt-4 w-full"
            onClick={() => {
              resetPasswordForm();
              setPasswordDialog("change");
            }}
          >
            <KeyRound /> Đổi mật khẩu
          </Button>
          <Button
            variant="ink-outline"
            size="sm"
            className="mt-2 w-full"
            onClick={() => {
              logout();
              router.push("/lecturer/login");
            }}
          >
            <LogOut /> Đăng xuất
          </Button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="sticky top-0 z-30 bg-sidebar text-sidebar-foreground lg:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <Logo tone="light" />
          <div className="flex gap-2">
            <Button
              variant="ink-outline"
              size="sm"
              aria-label="Đổi mật khẩu"
              onClick={() => {
                resetPasswordForm();
                setPasswordDialog("change");
              }}
            >
              <KeyRound />
            </Button>
            <Button
              variant="ink-outline"
              size="sm"
              aria-label="Đăng xuất"
              onClick={() => {
                logout();
                router.push("/lecturer/login");
              }}
            >
              <LogOut />
            </Button>
          </div>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-3 pb-3">
          {nav.map((item) => (
            <Link
              key={item.to}
              href={item.to}
              data-status={router.asPath === item.to ? "active" : undefined}
              className={`shrink-0 rounded-full px-3 py-1.5 text-sm text-ink-muted ${
                router.asPath === item.to ? "bg-sidebar-accent text-sidebar-foreground" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <main className="min-w-0">
        <div className="mx-auto max-w-6xl px-5 py-10 md:px-10">{children}</div>
      </main>

      {showPasswordDialog && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-foreground/40 p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="password-dialog-title"
            className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-elegant"
          >
            {passwordDialog !== "change" ? (
              <>
                <h2 id="password-dialog-title" className="text-2xl">
                  Đổi mật khẩu?
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Đây là lần đăng nhập đầu tiên của bạn. Bạn có thể đổi mật khẩu khởi tạo ngay bây
                  giờ hoặc để sau.
                </p>
                <div className="mt-6 flex flex-wrap justify-end gap-3">
                  <Button
                    variant="outline"
                    onClick={() => {
                      dismissPasswordPrompt();
                      toast("Bạn có thể đổi mật khẩu bất cứ lúc nào trong thanh bên.");
                    }}
                  >
                    Để sau
                  </Button>
                  <Button
                    variant="gold"
                    onClick={() => {
                      resetPasswordForm();
                      setPasswordDialog("change");
                    }}
                  >
                    Đổi mật khẩu
                  </Button>
                </div>
              </>
            ) : (
              <>
                <h2 id="password-dialog-title" className="text-2xl">
                  Đổi mật khẩu
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Mật khẩu mới cần có ít nhất 8 ký tự.
                </p>
                <form onSubmit={submitPasswordChange} className="mt-6 space-y-4">
                  <div>
                    <Label htmlFor="current-password">Mật khẩu hiện tại</Label>
                    <Input
                      id="current-password"
                      type="password"
                      autoComplete="current-password"
                      value={currentPassword}
                      onChange={(event) => setCurrentPassword(event.target.value)}
                      className="mt-1.5"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="new-password">Mật khẩu mới</Label>
                    <Input
                      id="new-password"
                      type="password"
                      autoComplete="new-password"
                      value={newPassword}
                      onChange={(event) => setNewPassword(event.target.value)}
                      className="mt-1.5"
                      minLength={8}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="confirm-password">Nhập lại mật khẩu mới</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      autoComplete="new-password"
                      value={confirmPassword}
                      onChange={(event) => setConfirmPassword(event.target.value)}
                      className="mt-1.5"
                      minLength={8}
                      required
                    />
                  </div>
                  {passwordError && (
                    <p role="alert" className="text-sm text-destructive">
                      {passwordError}
                    </p>
                  )}
                  <div className="flex justify-end gap-3 pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        resetPasswordForm();
                        setPasswordDialog(null);
                      }}
                    >
                      {showInitialPrompt ? "Quay lại" : "Hủy"}
                    </Button>
                    <Button type="submit" variant="gold">
                      Cập nhật mật khẩu
                    </Button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
