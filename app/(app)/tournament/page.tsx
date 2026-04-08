"use client";

import { useState } from "react";
import { Trophy, Medal, Users, Flag } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TEAMS, GROUPS } from "@/lib/data";
import { cn } from "@/lib/utils";

type PredictionType = "champion" | "finalist" | "semifinalist" | "group_winner" | "golden_boot";

const SECTIONS: { type: PredictionType; title: string; icon: React.ReactNode; description: string; pts: string }[] = [
  { type: "champion", title: "Világbajnok", icon: <Trophy className="w-5 h-5" />, description: "Válaszd ki a 2026-os világbajnokot", pts: "25 pont" },
  { type: "finalist", title: "Döntős (vesztes)", icon: <Medal className="w-5 h-5" />, description: "Ki lesz a döntő vesztese?", pts: "15 pont" },
  { type: "semifinalist", title: "Elődöntősök", icon: <Users className="w-5 h-5" />, description: "Válassz 2 elődöntőst", pts: "10 pont / csapat" },
  { type: "golden_boot", title: "Gólkirály nemzete", icon: <Flag className="w-5 h-5" />, description: "Melyik nemzet játékosa lesz a gólkirály?", pts: "10 pont" },
];

export default function TournamentPage() {
  const [selections, setSelections] = useState<Record<string, string[]>>({
    champion: [],
    finalist: [],
    semifinalist: [],
    golden_boot: [],
    group_winner: [],
  });

  const toggleSelection = (type: string, code: string, max: number) => {
    setSelections((prev) => {
      const current = prev[type] || [];
      if (current.includes(code)) {
        return { ...prev, [type]: current.filter((c) => c !== code) };
      }
      if (current.length >= max) {
        return { ...prev, [type]: [...current.slice(1), code] };
      }
      return { ...prev, [type]: [...current, code] };
    });
  };

  const allTeamCodes = Object.keys(TEAMS);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      <div>
        <h1 className="text-[22px] font-bold text-text-primary">Torna tippek</h1>
        <p className="text-[13px] text-text-tertiary mt-1">
          Zárolás: 2026. június 11. &middot; A torna indulása előtt kell leadni
        </p>
      </div>

      {/* Main predictions */}
      {SECTIONS.map(({ type, title, icon, description, pts }) => {
        const max = type === "semifinalist" ? 2 : 1;
        const selected = selections[type] || [];
        return (
          <Card key={type}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="text-brand-gold">{icon}</span>
                  <div>
                    <h3 className="text-[16px] font-bold text-text-primary">{title}</h3>
                    <p className="text-[12px] text-text-tertiary">{description}</p>
                  </div>
                </div>
                <Badge variant="gold">{pts}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {allTeamCodes.map((code) => {
                  const team = TEAMS[code];
                  const isSelected = selected.includes(code);
                  return (
                    <button
                      key={code}
                      onClick={() => toggleSelection(type, code, max)}
                      className={cn(
                        "flex flex-col items-center gap-1 py-2.5 px-1 rounded-[var(--radius-md)] transition-all duration-150 cursor-pointer",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold",
                        isSelected
                          ? "bg-brand-gold-bg border-2 border-brand-gold"
                          : "bg-bg-secondary border-2 border-transparent hover:bg-surface-active"
                      )}
                    >
                      <span className="text-[20px]">{team.flag}</span>
                      <span className={cn(
                        "text-[10px] font-semibold",
                        isSelected ? "text-brand-gold" : "text-text-secondary"
                      )}>
                        {code}
                      </span>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        );
      })}

      {/* Group winners */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="text-brand-gold text-[18px]">📊</span>
              <div>
                <h3 className="text-[16px] font-bold text-text-primary">Csoportgyőztesek</h3>
                <p className="text-[12px] text-text-tertiary">Tippelj minden csoport győztesére</p>
              </div>
            </div>
            <Badge variant="gold">5 pont / csoport</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(GROUPS).map(([group, teams]) => (
            <div key={group}>
              <p className="text-[12px] font-semibold text-text-secondary mb-2">
                {group} csoport
              </p>
              <div className="grid grid-cols-4 gap-2">
                {teams.map((code) => {
                  const team = TEAMS[code];
                  const key = `group_${group}`;
                  const isSelected = (selections[key] || []).includes(code);
                  return (
                    <button
                      key={code}
                      onClick={() => {
                        setSelections((prev) => ({
                          ...prev,
                          [key]: isSelected ? [] : [code],
                        }));
                      }}
                      className={cn(
                        "flex flex-col items-center gap-1 py-2.5 rounded-[var(--radius-md)] transition-all duration-150 cursor-pointer",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold",
                        isSelected
                          ? "bg-brand-gold-bg border-2 border-brand-gold"
                          : "bg-bg-secondary border-2 border-transparent hover:bg-surface-active"
                      )}
                    >
                      <span className="text-[18px]">{team.flag}</span>
                      <span className={cn(
                        "text-[10px] font-semibold",
                        isSelected ? "text-brand-gold" : "text-text-secondary"
                      )}>
                        {code}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Submit */}
      <Button size="lg" className="w-full">
        Torna tippek mentése
      </Button>
    </div>
  );
}
