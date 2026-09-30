import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { StudioShell } from "@/components/studio-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/studio/agente")({
  head: () => ({
    meta: [
      { title: "Agente · Studio OS" },
      {
        name: "description",
        content:
          "Converse com o agente de código do Studio OS direto no app: ele lê e escreve arquivos do projeto.",
      },
      { property: "og:title", content: "Agente · Studio OS" },
      {
        property: "og:description",
        content:
          "Chat do agente de código embutido no Studio OS, com acesso real aos arquivos do projeto.",
      },
    ],
  }),
  component: AgentePage,
});

type Status = "checking" | "online" | "offline";

function AgentePage() {
  const [status, setStatus] = useState<Status>("checking");
  const [reloadKey, setReloadKey] = useState(0);
  const frameRef = useRef<HTMLIFrameElement>(null);

  const check = useCallback(async () => {
    setStatus("checking");
    try {
      const res = await fetch("/api/health", { cache: "no-store" });
      setStatus(res.ok ? "online" : "offline");
    } catch {
      setStatus("offline");
    }
  }, []);

  useEffect(() => {
    void check();
  }, [check]);

  return (
    <StudioShell>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <Badge variant={status === "online" ? "secondary" : "destructive"}>
            {status === "online"
              ? "Agente online"
              : status === "checking"
                ? "Verificando agente…"
                : "Agente desligado"}
          </Badge>
          <h1 className="font-display mt-3 text-3xl font-bold md:text-4xl">
            Agente de <span className="font-serif-accent font-normal text-primary">código</span>
          </h1>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            Peça mudanças em português: o agente lê e escreve os arquivos deste projeto e mostra cada
            passo. Funciona apenas aqui na pré-visualização.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => {
              void check();
              setReloadKey((k) => k + 1);
            }}
          >
            Recarregar
          </Button>
          <Button asChild variant="secondary">
            <a href="/oc" target="_blank" rel="noreferrer">
              Abrir em nova aba
            </a>
          </Button>
        </div>
      </div>

      {status === "offline" ? (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="font-display">O agente não está respondendo</CardTitle>
            <CardDescription>
              Ele roda dentro deste ambiente de trabalho. Se o ambiente reiniciou, o agente precisa
              ser ligado de novo — me peça “ligar o agente” no chat do Lovable.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => void check()}>Tentar novamente</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="mt-8 overflow-hidden rounded-xl border border-border bg-card">
          <iframe
            key={reloadKey}
            ref={frameRef}
            src="/oc"
            title="Agente de código"
            className="h-[calc(100dvh-14rem)] min-h-[520px] w-full"
          />
        </div>
      )}
    </StudioShell>
  );
}
