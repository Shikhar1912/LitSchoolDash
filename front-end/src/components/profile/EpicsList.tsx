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
          <Card key={e.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col sm:flex-row">
                <div
                  className="w-full sm:w-28 h-2 sm:h-auto sm:rounded-l-xl"
                  style={{ background: e.color ?? "#e5e7eb" }}
                />
                <div className="flex-1 p-4">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="text-base sm:text-lg font-medium break-words">
                        {e.title}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {e.dateRange}
                      </div>
                    </div>
                    {e.badge ? (
                      <Badge className="bg-amber-100 text-amber-900 border-amber-200 self-start">
                        {e.badge}
                      </Badge>
                    ) : null}
                  </div>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-3">
                    <Badge className="text-xs">{e.theme}</Badge>
                    {typeof e.teams === "number" ? (
                      <span className="text-xs sm:text-sm text-muted-foreground">
                        {e.teams} Teams
                      </span>
                    ) : null}
                    {typeof e.rounds === "number" ? (
                      <span className="text-xs sm:text-sm text-muted-foreground">
                        {e.rounds} Rounds
                      </span>
                    ) : null}
                    {typeof e.judges === "number" ? (
                      <span className="text-xs sm:text-sm text-muted-foreground">
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
