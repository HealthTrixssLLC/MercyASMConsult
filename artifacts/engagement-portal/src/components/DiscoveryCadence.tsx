import { CalendarClock, ClipboardList } from "lucide-react";
import { WORKING_MODEL, WORKING_ASSUMPTIONS, type CadenceItem } from "@/data/discoveryCadence";

function CadenceCard({
  title,
  accent,
  icon: HeaderIcon,
  items,
}: {
  title: string;
  accent: string;
  icon: typeof CalendarClock;
  items: CadenceItem[];
}) {
  return (
    <div className="rounded-lg border border-border bg-card shadow-sm overflow-hidden">
      <div className="flex items-center gap-3 px-5 py-4 text-white" style={{ backgroundColor: accent }}>
        <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center shrink-0">
          <HeaderIcon className="w-5 h-5" />
        </div>
        <h3 className="font-serif text-lg uppercase tracking-wide">{title}</h3>
      </div>
      <ul className="divide-y divide-border">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.id} data-trace-id={item.id} className="flex items-start gap-4 px-5 py-4">
              <span
                className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${accent}14`, color: accent }}
              >
                <Icon className="w-4 h-4" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="font-semibold text-foreground leading-snug">{item.label}</div>
                {item.detail ? (
                  <div
                    className={`text-sm leading-snug mt-0.5 ${
                      item.highlight ? "font-medium" : "text-muted-foreground"
                    }`}
                    style={item.highlight ? { color: accent } : undefined}
                  >
                    {item.detail}
                  </div>
                ) : null}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function DiscoveryCadence() {
  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <CadenceCard
        title="Proposed Working Model"
        accent="#15294d"
        icon={CalendarClock}
        items={WORKING_MODEL}
      />
      <CadenceCard
        title="Working Assumptions"
        accent="#e2701b"
        icon={ClipboardList}
        items={WORKING_ASSUMPTIONS}
      />
    </div>
  );
}
