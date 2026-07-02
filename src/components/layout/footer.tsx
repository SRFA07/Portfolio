import Link from "next/link";
import { Mail } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { site } from "@/lib/site";
import { Container } from "./container";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <Container className="py-14">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div className="max-w-sm">
            <div className="text-[15px] font-medium tracking-tight text-fg">
              Reebal<span className="text-accent">.</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-fg-muted">{site.tagline}</p>
          </div>

          <div className="flex gap-16">
            <div>
              <div className="font-mono text-xs uppercase tracking-[0.16em] text-fg-subtle">
                Navigate
              </div>
              <ul className="mt-4 space-y-2.5">
                {site.nav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-fg-muted transition-colors hover:text-fg"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="font-mono text-xs uppercase tracking-[0.16em] text-fg-subtle">
                Connect
              </div>
              <ul className="mt-4 space-y-2.5">
                <li>
                  <a
                    href={site.links.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg"
                  >
                    <FaGithub className="h-4 w-4" /> GitHub
                  </a>
                </li>
                <li>
                  <a
                    href={site.links.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg"
                  >
                    <FaLinkedinIn className="h-4 w-4" /> LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${site.email}`}
                    className="inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg"
                  >
                    <Mail className="h-4 w-4" /> Email
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col justify-between gap-3 border-t border-line pt-6 text-xs text-fg-subtle sm:flex-row">
          <span>© {new Date().getFullYear()} {site.name}. All rights reserved.</span>
          <span>Built with Next.js, TypeScript & Tailwind.</span>
        </div>
      </Container>
    </footer>
  );
}
