import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Novo app — em construção" },
      { name: "description", content: "Ponto de partida do novo app." },
      { property: "og:title", content: "Novo app — em construção" },
      { property: "og:description", content: "Ponto de partida do novo app." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <h1 className="text-2xl font-semibold text-foreground">Novo app — em branco</h1>
    </main>
  );
}
