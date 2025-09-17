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
          <div className="flex flex-col sm:flex-row">
            {/* Left rail with color */}
            <div
              className="w-full sm:w-1 h-1 sm:h-auto"
              style={{ backgroundColor: competition.color || "#3b82f6" }}
            />
            <CardContent className="flex-1 p-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 gap-2">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-base sm:text-lg break-words">
                    {competition.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {competition.organization}
                  </p>
                </div>
                {competition.position && (
                  <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs sm:text-sm font-medium self-start">
                    {competition.position}
                  </span>
                )}
              </div>

              <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground mb-3">
                <span>{competition.dateRange}</span>
                <span className="hidden sm:inline">•</span>
                <span>{competition.category}</span>
                {competition.participants && (
                  <>
                    <span className="hidden sm:inline">•</span>
                    <span>{competition.participants} participants</span>
                  </>
                )}
                {competition.rounds && (
                  <>
                    <span className="hidden sm:inline">•</span>
                    <span>{competition.rounds} rounds</span>
                  </>
                )}
                {competition.judges && (
                  <>
                    <span className="hidden sm:inline">•</span>
                    <span>{competition.judges} judges</span>
                  </>
                )}
              </div>

              {competition.prize && (
                <div className="text-xs sm:text-sm">
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
