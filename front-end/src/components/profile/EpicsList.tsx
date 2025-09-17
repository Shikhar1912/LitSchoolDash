import type { Epic } from "@/api";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Props = { epics: Epic[] };

export default function EpicsList({ epics }: Props) {
  if (!epics || epics.length === 0) return null;
  return (
    <section className="mt-6">
      <div className="flex flex-col gap-4">
        {epics.map((e) => (
          <Card key={e.id}>
            <CardContent className="p-0">
              <div className="flex">
                <div
                  className="w-28 rounded-l-xl"
                  style={{ background: e.color ?? "#e5e7eb" }}
                />
                <div className="flex-1 p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-lg font-medium">{e.title}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {e.dateRange}
                      </div>
                    </div>
                    {e.badge ? (
                      <Badge className="bg-amber-100 text-amber-900 border-amber-200">
                        {e.badge}
                      </Badge>
                    ) : null}
                  </div>
                  <div className="flex items-center gap-3 mt-3">
                    <Badge>{e.theme}</Badge>
                    {typeof e.teams === "number" ? (
                      <span className="text-sm text-muted-foreground">
                        {e.teams} Teams
                      </span>
                    ) : null}
                    {typeof e.rounds === "number" ? (
                      <span className="text-sm text-muted-foreground">
                        {e.rounds} Rounds
                      </span>
                    ) : null}
                    {typeof e.judges === "number" ? (
                      <span className="text-sm text-muted-foreground">
                        {e.judges} Judges
                      </span>
                    ) : null}
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
