import { Link, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const items = [{ to: "/studio/agente", label: "Agente" }];

export function StudioShell({ children }: { children: ReactNode }) {
  const { location } = useRouterState();

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <a
        href="#studio-conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-sm focus:text-primary-foreground"
      >
        Pular para o conteúdo
      </a>
      <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <Link
            to="/studio/agente"
            className="font-display text-sm font-bold tracking-tight"
            aria-label="Studio OS — início"
          >
            STUDIO<span className="text-primary">·OS</span>
          </Link>
          <nav aria-label="Navegação do studio">
            <ul className="flex items-center gap-1">
              {items.map((item) => {
                const active = location.pathname.startsWith(item.to);
                return (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "rounded-md px-3 py-2 text-sm transition-colors",
                        active
                          ? "bg-primary text-primary-foreground font-medium"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </header>
      <main id="studio-conteudo" className="mx-auto w-full max-w-6xl px-4 py-8">
        {children}
      </main>
    </div>
  );
}
