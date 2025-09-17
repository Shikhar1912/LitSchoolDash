import type { Competition } from "@/api/types";
import { Card, CardContent } from "@/components/ui/card";

type Props = {
  competitions: Competition[];
};

export default function CompetitionsList({ competitions }: Props) {
  if (!competitions || competitions.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>No competitions participated in yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 pt-6">
      {competitions.map((competition) => (
        <Card key={competition.id} className="overflow-hidden">
          <div className="flex">
            {/* Left rail with color */}
            <div
              className="w-1"
              style={{ backgroundColor: competition.color || "#3b82f6" }}
            />
            <CardContent className="flex-1 p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-lg">{competition.title}</h3>
                  <p className="text-muted-foreground">
                    {competition.organization}
                  </p>
                </div>
                {competition.position && (
                  <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-sm font-medium">
                    {competition.position}
                  </span>
                )}
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
                <span>{competition.dateRange}</span>
                <span>•</span>
                <span>{competition.category}</span>
                {competition.participants && (
                  <>
                    <span>•</span>
                    <span>{competition.participants} participants</span>
                  </>
                )}
                {competition.rounds && (
                  <>
                    <span>•</span>
                    <span>{competition.rounds} rounds</span>
                  </>
                )}
                {competition.judges && (
                  <>
                    <span>•</span>
                    <span>{competition.judges} judges</span>
                  </>
                )}
              </div>

              {competition.prize && (
                <div className="text-sm">
                  <span className="font-medium">Prize: </span>
                  <span className="text-muted-foreground">
                    {competition.prize}
                  </span>
                </div>
              )}
            </CardContent>
          </div>
        </Card>
      ))}
    </div>
  );
}
