type Props = {
  epicsCount: number;
  competitionsCount: number;
  activeTab: "epics" | "competitions";
  onTabChange: (tab: "epics" | "competitions") => void;
};

export default function TabsPills({
  epicsCount,
  competitionsCount,
  activeTab,
  onTabChange,
}: Props) {
  return (
    <section className="mt-6 flex items-center gap-3">
      <button
        onClick={() => onTabChange("epics")}
        className={`px-5 py-2 rounded-full font-medium transition-colors ${
          activeTab === "epics"
            ? "bg-primary text-primary-foreground"
            : "bg-secondary hover:bg-secondary/80"
        }`}
      >
        Epics{" "}
        <span
          className={`ml-2 text-xs rounded-full px-2 py-0.5 ${
            activeTab === "epics"
              ? "bg-primary-foreground/20"
              : "bg-foreground/10"
          }`}
        >
          {epicsCount}
        </span>
      </button>
      <button
        onClick={() => onTabChange("competitions")}
        className={`px-5 py-2 rounded-full font-medium transition-colors ${
          activeTab === "competitions"
            ? "bg-primary text-primary-foreground"
            : "bg-secondary hover:bg-secondary/80"
        }`}
      >
        Competitions{" "}
        <span
          className={`ml-2 text-xs rounded-full px-2 py-0.5 ${
            activeTab === "competitions"
              ? "bg-primary-foreground/20"
              : "bg-foreground/10"
          }`}
        >
          {competitionsCount}
        </span>
      </button>
      <span className="text-muted-foreground text-sm">i</span>
      <button className="ml-auto text-sm text-primary underline underline-offset-4">
        View All
      </button>
    </section>
  );
}
