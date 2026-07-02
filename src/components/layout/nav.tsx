import Link from "next/link";
import { FileText } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { site } from "@/lib/site";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MobileMenu } from "./mobile-menu";

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/70 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6 md:px-8">
        <Link
          href="/"
          className="text-[15px] font-medium tracking-tight text-fg transition-opacity hover:opacity-80"
        >
          Reebal<span className="text-accent">.</span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-fg-muted transition-colors hover:text-fg"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          <a
            href={site.links.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="grid h-9 w-9 place-items-center rounded-full text-fg-muted transition-colors hover:bg-surface hover:text-fg"
          >
            <FaGithub className="h-[18px] w-[18px]" />
          </a>
          <a
            href={site.links.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="grid h-9 w-9 place-items-center rounded-full text-fg-muted transition-colors hover:bg-surface hover:text-fg"
          >
            <FaLinkedinIn className="h-[18px] w-[18px]" />
          </a>
          <a
            href={site.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className={cn(buttonVariants({ variant: "outline", size: "sm" }), "ml-1.5 hidden sm:inline-flex")}
          >
            <FileText className="h-4 w-4" />
            Resume
          </a>
          <MobileMenu />
        </div>
      </nav>
    </header>
  );
}
