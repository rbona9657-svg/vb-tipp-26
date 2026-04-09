"use client";

import { useState } from "react";
import { Trophy, Medal, Users, Flag, CheckCircle2, Lock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LiveDot } from "@/components/ui/live-dot";
import { TEAMS, GROUPS } from "@/lib/data";
import { cn } from "@/lib/utils";

type PredictionType =
  | "champion"
  | "finalist"
  | "semifinalist"
  | "golden_boot";

interface Section {
  type: PredictionType;
  title: string;
  icon: React.ReactNode;
  description: string;
  points: number;
  pointsLabel: string;
  max: number;
}

const SECTIONS: Section[] = [
  {
    type: "champion",
    title: "Világbajnok",
    icon: <Trophy className="w-5 h-5" />,
    description: "Válaszd ki a 2026-os világbajnokot",
    points: 25,
    pointsLabel: "25 pont",
    max: 1,
  },
  {
    type: "finalist",
    title: "Döntős (vesztes)",
    icon: <Medal className="w-5 h-5" />,
    description: "Ki lesz a döntő vesztese?",
    points: 15,
    pointsLabel: "15 pont",
    max: 1,
  },
  {
    type: "semifinalist",
    title: "Elődöntősök",
    icon: <Users className="w-5 h-5" />,
    description: "Válassz 2 elődöntőst",
    points: 20,
    pointsLabel: "10 pont / csapat",
    max: 2,
  },
  {
    type: "golden_boot",
    title: "Gólkirály nemzete",
    icon: <Flag className="w-5 h-5" />,
    description: "Melyik nemzet játékosa lesz a gólkirály?",
    points: 10,
    pointsLabel: "10 pont",
    max: 1,
  },
];

interface TeamTileProps {
  code: string;
  flag: string;
  selected: boolean;
  onClick: () => void;
}

function TeamTile({ code, flag, selected, onClick }: TeamTileProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative flex flex-col items-center justify-center gap-1.5",
        "min-h-[68px] py-2.5 px-1 rounded-[var(--radius-md)]",
        "transition-all duration-150 ease-out cursor-pointer",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-0",
        selected
          ? "bg-yellow-500 text-green-950 shadow-[0_0_0_1px_var(--yellow-500),_0_0_20px_var(--yellow-glow)] scale-[1.02]"
          : "bg-surface-2 border border-border-default text-text-secondary hover:bg-surface-3 hover:border-border-strong"
      )}
      aria-pressed={selected}
    >
      {selected && (
        <CheckCircle2 className="absolute top-1 right-1 w-3 h-3 text-green-950" />
      )}
      <span className="text-[22px] leading-none">{flag}</span>
      <span
        className={cn(
          "font-mono font-extrabold text-[10px] tracking-wider",
          selected ? "text-green-950" : "text-text-primary"
        )}
      >
        {code}
      </span>
    </button>
  );
}

export default function TournamentPage() {
  const [selections, setSelections] = useState<Record<string, string[]>>({
    champion: [],
    finalist: [],
    semifinalist: [],
    golden_boot: [],
  });

  const toggleSelection = (key: string, code: string, max: number) => {
    setSelections((prev) => {
      const current = prev[key] || [];
      if (current.includes(code)) {
        return { ...prev, [key]: current.filter((c) => c !== code) };
      }
      if (current.length >= max) {
        return { ...prev, [key]: [...current.slice(1), code] };
      }
      return { ...prev, [key]: [...current, code] };
    });
  };

  const allTeamCodes = Object.keys(TEAMS);

  // Compute progress across all sections + group winners
  const totalSlots =
    SECTIONS.reduce((sum, s) => sum + s.max, 0) + Object.keys(GROUPS).length;
  const filledSlots =
    SECTIONS.reduce((sum, s) => sum + (selections[s.type]?.length ?? 0), 0) +
    Object.keys(GROUPS).reduce(
      (sum, g) => sum + (selections[`group_${g}`]?.length ?? 0),
      0
    );
  const progressPct = Math.round((filledSlots / totalSlots) * 100);

  // Compute potential max points
  const maxPoints =
    SECTIONS.reduce((sum, s) => sum + s.points, 0) +
    Object.keys(GROUPS).length * 5;

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 pb-32 space-y-6">
      {/* ─── Header ─── */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-display font-bold text-[11px] uppercase tracking-[2px] text-yellow-400 mb-1">
            Torna tippek
          </p>
          <h1 className="font-display font-black text-[32px] sm:text-[40px] tracking-tight text-text-primary leading-none">
            Válassz előre.
          </h1>
          <div className="flex items-center gap-2 mt-2">
            <Lock className="w-3 h-3 text-text-tertiary" />
            <p className="text-[11px] text-text-tertiary font-medium uppercase tracking-[0.6px]">
              Zárolás: 2026. jún 11.
            </p>
          </div>
        </div>
        <Badge variant="gold" className="text-[11px] shrink-0">
          Max {maxPoints} pt
        </Badge>
      </div>

      {/* ─── Progress bar ─── */}
      <Card padding="md" variant="default">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <LiveDot variant="yellow" size="xs" />
            <span className="font-display font-extrabold text-[11px] uppercase tracking-[0.8px] text-text-secondary">
              Kitöltöttség
            </span>
          </div>
          <span className="font-mono font-black text-[14px] text-yellow-400 tabular-nums">
            {filledSlots}/{totalSlots}
          </span>
        </div>
        <div className="h-2 bg-surface-0 rounded-full overflow-hidden border border-border-subtle">
          <div
            className={cn(
              "h-full bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full transition-all duration-500 ease-out",
              progressPct > 0 && "shadow-[0_0_12px_var(--yellow-glow)]"
            )}
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </Card>

      {/* ─── Main prediction sections ─── */}
      {SECTIONS.map(({ type, title, icon, description, pointsLabel, max }) => {
        const selected = selections[type] || [];
        const complete = selected.length === max;
        return (
          <Card
            key={type}
            variant={complete ? "glow-yellow" : "default"}
            padding="none"
          >
            <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-border-subtle">
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "w-10 h-10 rounded-[var(--radius-md)] flex items-center justify-center shrink-0",
                    "bg-yellow-bg border border-yellow-500/30 text-yellow-400",
                    complete && "bg-yellow-500/20 text-yellow-400"
                  )}
                >
                  {icon}
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-[16px] text-text-primary">
                    {title}
                  </h3>
                  <p className="text-[11px] text-text-tertiary font-medium">
                    {description}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <Badge variant="gold">{pointsLabel}</Badge>
                <span className="font-mono text-[10px] font-bold text-text-tertiary">
                  {selected.length}/{max}
                </span>
              </div>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-6 sm:grid-cols-8 gap-2">
                {allTeamCodes.map((code) => (
                  <TeamTile
                    key={code}
                    code={code}
                    flag={TEAMS[code].flag}
                    selected={selected.includes(code)}
                    onClick={() => toggleSelection(type, code, max)}
                  />
                ))}
              </div>
            </div>
          </Card>
        );
      })}

      {/* ─── Group winners ─── */}
      <Card variant="default" padding="none">
        <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-border-subtle">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[var(--radius-md)] bg-yellow-bg border border-yellow-500/30 text-yellow-400 flex items-center justify-center shrink-0 text-[18px]">
              📊
            </div>
            <div>
              <h3 className="font-display font-extrabold text-[16px] text-text-primary">
                Csoportgyőztesek
              </h3>
              <p className="text-[11px] text-text-tertiary font-medium">
                Tippeld meg minden csoport győztesét
              </p>
            </div>
          </div>
          <Badge variant="gold">5 pt / csoport</Badge>
        </div>
        <div className="p-4 space-y-5">
          {Object.entries(GROUPS).map(([group, teams]) => {
            const key = `group_${group}`;
            const selectedCode = (selections[key] || [])[0];
            return (
              <div key={group}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-display font-black text-[13px] text-yellow-400">
                    {group}
                  </span>
                  <span className="text-[10px] font-bold text-text-tertiary uppercase tracking-[0.6px]">
                    csoport
                  </span>
                  {selectedCode && (
                    <CheckCircle2 className="w-3 h-3 text-yellow-400 ml-auto" />
                  )}
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {teams.map((code) => (
                    <TeamTile
                      key={code}
                      code={code}
                      flag={TEAMS[code].flag}
                      selected={selectedCode === code}
                      onClick={() => toggleSelection(key, code, 1)}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* ─── Sticky submit CTA ─── */}
      <div
        className="fixed bottom-20 left-0 right-0 z-40 px-4 py-3 pointer-events-none"
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 80px)" }}
      >
        <div className="max-w-2xl mx-auto pointer-events-auto">
          <Button
            size="lg"
            variant="primary"
            glow={progressPct > 0}
            disabled={filledSlots === 0}
            className="w-full shadow-elevated"
          >
            {filledSlots === 0
              ? "Válassz csapatokat"
              : `Tippek mentése · ${filledSlots}/${totalSlots}`}
          </Button>
        </div>
      </div>
    </div>
  );
}
