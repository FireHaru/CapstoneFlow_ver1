import Link from "next/link";
import { useRouter } from "next/router";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";
const nav = [
  { to: "/", label: "Trang chủ" },
  { to: "/topics", label: "Kho đề tài" },
  { to: "/about", label: "Giới thiệu" },
];
export function PublicHeader() {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
        <Logo />
        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              href={item.to}
              aria-current={router.asPath === item.to ? "page" : undefined}
              className={`rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground ${
                router.asPath === item.to ? "bg-secondary text-foreground" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Button asChild variant="ink" className="rounded-full">
          <Link href="/lecturer/login">
            Cổng giảng viên <ArrowUpRight />
          </Link>
        </Button>
      </div>
      <nav className="flex gap-1 overflow-x-auto px-4 pb-2 md:hidden">
        {nav.map((item) => (
          <Link
            key={item.to}
            href={item.to}
            aria-current={router.asPath === item.to ? "page" : undefined}
            className={`shrink-0 rounded-full px-3 py-1.5 text-sm text-muted-foreground ${
              router.asPath === item.to ? "bg-secondary text-foreground" : ""
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
