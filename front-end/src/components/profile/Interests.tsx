import { Badge } from "@/components/ui/badge";

type Props = { interests: string[] };

export default function Interests({ interests }: Props) {
  if (!interests || interests.length === 0) return null;
  return (
    <section className="mt-6">
      <h2 className="text-lg font-semibold mb-3">Interests</h2>
      <div className="flex flex-wrap gap-2">
        {interests.map((i) => (
          <Badge key={i}>{i}</Badge>
        ))}
      </div>
    </section>
  );
}
