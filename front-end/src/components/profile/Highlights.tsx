import type { Highlight } from "@/api";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Props = { highlights: Highlight[] };

const getTypeColor = (type: Highlight["type"]) => {
  switch (type) {
    case "achievement":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "skill":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "experience":
      return "bg-green-100 text-green-800 border-green-200";
    case "endorsement":
      return "bg-purple-100 text-purple-800 border-purple-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export default function Highlights({ highlights }: Props) {
  if (!highlights || highlights.length === 0) return null;

  return (
    <section className="mt-6 px-0 sm:px-0">
      <h2 className="text-lg font-semibold mb-3">Highlights</h2>
      <div className="grid gap-3">
        {highlights.map((h) => (
          <Card key={h.id} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="text-xl sm:text-2xl flex-shrink-0">
                  {h.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                    <h3 className="font-medium text-sm sm:text-base break-words">
                      {h.title}
                    </h3>
                    <Badge
                      className={`text-xs ${getTypeColor(h.type)} self-start`}
                    >
                      {h.type}
                    </Badge>
                  </div>
                  {h.description ? (
                    <p className="text-xs sm:text-sm text-muted-foreground mb-2 break-words">
                      {h.description}
                    </p>
                  ) : null}
                  {h.date ? (
                    <span className="text-xs text-muted-foreground">
                      {h.date}
                    </span>
                  ) : null}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
