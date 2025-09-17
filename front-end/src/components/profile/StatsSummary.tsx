import { Card, CardContent } from "@/components/ui/card";
import { Card2 } from "../ui/card2";
type Props = {
  endorsements: number;
  feedbacks: number;
  placements: number;
  topRated: number;
};

const Item = ({
  value,
  label,
  emoji,
}: {
  value: number;
  label: string;
  emoji: string;
}) => (
  <Card2>
    <CardContent className=" text-center">
      <div className="text-2xl font-semibold flex items-center justify-center gap-2">
        <span>{emoji}</span>
        {String(value).padStart(2, "0")}
      </div>
      <div className="text-sm text-muted-foreground mt-1">{label}</div>
    </CardContent>
  </Card2>
);

export default function StatsSummary({
  endorsements,
  feedbacks,
  placements,
  topRated,
}: Props) {
  return (
    <section className="mt-6">
      <Card>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-10">
          <Item value={endorsements} label="Endorsements" emoji="🔵" />
          <Item value={feedbacks} label="Feedbacks" emoji="💬" />
          <Item value={placements} label="Placements" emoji="⭐" />
          <Item value={topRated} label="Top Rated" emoji="😍" />
        </CardContent>
      </Card>
    </section>
  );
}
