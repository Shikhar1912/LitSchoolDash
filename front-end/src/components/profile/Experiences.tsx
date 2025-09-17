import type { Experience } from "@/api";
import { Card, CardContent } from "@/components/ui/card";

type Props = { experiences: Experience[] };

const formatRange = (start: string, end?: string) => {
  const fmt = (d: string) =>
    new Date(d).toLocaleString(undefined, { month: "short", year: "numeric" });
  return `${fmt(start)}${end ? ` – ${fmt(end)}` : " – Present"}`;
};

export default function Experiences({ experiences }: Props) {
  return (
    <section className="mt-6">
      <h2 className="text-lg font-semibold mb-3">Experiences</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {experiences.map((e) => (
          <Card key={e.id} className="p-4">
            <CardContent>
              <div className="flex items-center gap-3">
                {e.logoUrl ? (
                  <img
                    src={e.logoUrl}
                    alt={e.organization}
                    className="w-12 h-12 rounded-lg object-cover bg-muted"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-lg bg-muted" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{e.title}</div>
                  <div className="text-sm text-muted-foreground truncate">
                    {e.organization}
                    {e.location ? `, ${e.location}` : ""}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {formatRange(e.start, e.end)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
