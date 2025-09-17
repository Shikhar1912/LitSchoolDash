import type { Endorsement } from "@/api";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

type Props = { endorsements: Endorsement[] };

export default function Endorsements({ endorsements }: Props) {
  if (!endorsements || endorsements.length === 0) return null;
  return (
    <section className="mt-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold">
          Endorsements ({endorsements.length})
        </h2>
      </div>
      <div className="flex flex-col gap-3">
        {endorsements.map((e) => (
          <Card key={e.id}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={e.avatarUrl} alt={e.name} />
                  <AvatarFallback className="w-12 h-12">
                    {e.name?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{e.name}</div>
                  {e.title ? (
                    <div className="text-sm text-muted-foreground truncate">
                      {e.title}
                    </div>
                  ) : null}
                </div>
              </div>
              <p className="text-sm mt-3">{e.text}</p>
              {e.keywords && e.keywords.length > 0 ? (
                <div className="flex flex-wrap gap-2 mt-3">
                  {e.keywords.map((k) => (
                    <Badge key={k}>{k}</Badge>
                  ))}
                </div>
              ) : null}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
