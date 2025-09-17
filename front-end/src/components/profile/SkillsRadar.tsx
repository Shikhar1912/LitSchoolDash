import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Card2 } from "../ui/card2";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";
import type { SkillStat } from "@/api/types";
import { useEffect, useState } from "react";

interface SkillData {
  skill: string;
  individual: number;
  average: number;
  topPerformer: number;
}

interface Props {
  title?: string;
  skills?: SkillStat[];
}

// Transform SkillStat data to radar chart format
const transformSkillsData = (skills: SkillStat[]): SkillData[] => {
  return skills.map((skill) => ({
    skill: skill.name,
    individual: skill.value,
    // Generate mock average and top performer values based on individual score
    average: Math.max(0, skill.value - Math.random() * 20 + 5),
    topPerformer: Math.min(100, skill.value + Math.random() * 15 + 5),
  }));
};

export default function SkillsRadar({ title = "Top Skills", skills }: Props) {
  const [data, setData] = useState<SkillData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (skills && skills.length > 0) {
      const transformedData = transformSkillsData(skills);
      setData(transformedData);
      setLoading(false);
    } else {
      setData([]);
      setLoading(false);
    }
  }, [skills]);

  if (loading) {
    return (
      <section className="w-full">
        <Card>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] w-full flex items-center justify-center">
              <div className="text-muted-foreground">Loading...</div>
            </div>
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section className="w-full">
      <Card2 className="border-0 shadow-none">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart
                data={data}
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              >
                <PolarGrid
                  stroke="#e5e7eb"
                  strokeWidth={0.5}
                  radialLines={true}
                />
                <PolarAngleAxis
                  dataKey="skill"
                  tick={{
                    fill: "#374151",
                    fontSize: 12,
                    fontWeight: 500,
                  }}
                  axisLine={false}
                  tickLine={false}
                />
                <Radar
                  name="Individual"
                  dataKey="individual"
                  stroke="#8b5cf6"
                  fill="rgba(139, 92, 246, 0.1)"
                  strokeWidth={1}
                  dot={false}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Bottom Legend */}
          <div className="flex justify-center gap-3 items-center mt-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-purple-500"></div>
              <span>Skills</span>
            </div>
          </div>
        </CardContent>
      </Card2>
    </section>
  );
}
