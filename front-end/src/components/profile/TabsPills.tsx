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
    <section className="mt-6 flex items-center gap-2 sm:gap-3">
      <button
        onClick={() => onTabChange("epics")}
        className={`px-3 sm:px-5 py-2 rounded-full font-medium transition-colors text-sm sm:text-base ${
          activeTab === "epics"
            ? "bg-primary text-primary-foreground"
            : "bg-secondary hover:bg-secondary/80"
        }`}
      >
        Epics{" "}
        <span
          className={`ml-1 sm:ml-2 text-xs rounded-full px-1.5 sm:px-2 py-0.5 hidden sm:inline ${
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
        className={`px-3 sm:px-5 py-2 rounded-full font-medium transition-colors text-sm sm:text-base ${
          activeTab === "competitions"
            ? "bg-primary text-primary-foreground"
            : "bg-secondary hover:bg-secondary/80"
        }`}
      >
        Competitions{" "}
        <span
          className={`ml-1 sm:ml-2 text-xs rounded-full px-1.5 sm:px-2 py-0.5 hidden sm:inline ${
            activeTab === "competitions"
              ? "bg-primary-foreground/20"
              : "bg-foreground/10"
          }`}
        >
          {competitionsCount}
        </span>
      </button>
      <span className="text-muted-foreground text-sm hidden sm:inline">i</span>
      <button className="ml-auto text-xs sm:text-sm text-primary underline underline-offset-4">
        View All
      </button>
    </section>
  );
}
