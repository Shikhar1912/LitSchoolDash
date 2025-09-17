type Props = {
  epicsCount: number;
  competitionsCount: number;
};

export default function TabsPills({ epicsCount, competitionsCount }: Props) {
  return (
    <section className="mt-6 flex items-center gap-3">
      <button className="px-5 py-2 rounded-full bg-primary text-primary-foreground font-medium">
        Epics{" "}
        <span className="ml-2 text-xs rounded-full bg-primary-foreground/20 px-2 py-0.5">
          {epicsCount}
        </span>
      </button>
      <button className="px-5 py-2 rounded-full bg-secondary">
        Competitions{" "}
        <span className="ml-2 text-xs rounded-full bg-foreground/10 px-2 py-0.5">
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
