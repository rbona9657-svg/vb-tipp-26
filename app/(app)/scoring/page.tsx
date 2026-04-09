import { Target, Trophy, Zap, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MATCH_SCORING, TOURNAMENT_SCORING, MULTIPLIERS } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function ScoringPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-8">
      {/* ─── Header ─── */}
      <div>
        <p className="font-display font-bold text-[11px] uppercase tracking-[2px] text-yellow-400 mb-1">
          Pontrendszer
        </p>
        <h1 className="font-display font-black text-[32px] sm:text-[40px] tracking-tight text-text-primary leading-none mb-2">
          Minden pont számít.
        </h1>
        <p className="text-[13px] text-text-tertiary font-medium">
          Így kalkuláljuk a pontszámodat — meccsenként és a torna tippeknél
        </p>
      </div>

      {/* ─── Max stats hero ─── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { icon: <Target className="w-4 h-4" />, value: "14", label: "MAX / MECCS" },
          { icon: <Trophy className="w-4 h-4" />, value: "25", label: "BAJNOK" },
          { icon: <Zap className="w-4 h-4" />, value: "×3", label: "DÖNTŐ SZORZÓ" },
          { icon: <TrendingUp className="w-4 h-4" />, value: "+1", label: "KORAI BÓNUSZ" },
        ].map((stat, i) => (
          <Card key={i} variant="default" padding="md">
            <div className="flex flex-col items-center text-center gap-1.5">
              <span className="text-yellow-400">{stat.icon}</span>
              <span className="font-mono font-black text-[28px] text-yellow-400 tabular-nums [text-shadow:0_0_14px_var(--yellow-glow)] leading-none">
                {stat.value}
              </span>
              <span className="text-[9px] font-bold text-text-tertiary uppercase tracking-[0.8px]">
                {stat.label}
              </span>
            </div>
          </Card>
        ))}
      </div>

      {/* ─── Match points ─── */}
      <section>
        <div className="flex items-end justify-between mb-4">
          <div>
            <h2 className="font-display font-black text-[22px] tracking-tight text-text-primary">
              Meccs pontok
            </h2>
            <p className="text-[11px] text-text-tertiary font-medium mt-0.5 uppercase tracking-[0.6px]">
              Maximum 14 pont / meccs
            </p>
          </div>
          <Badge variant="gold">Meccsenként</Badge>
        </div>
        <Card variant="default" padding="none">
          {MATCH_SCORING.map((rule, i) => (
            <div
              key={i}
              className={cn(
                "flex items-center gap-4 px-5 py-4",
                i < MATCH_SCORING.length - 1 && "border-b border-border-subtle",
                "hover:bg-surface-hover transition-colors"
              )}
            >
              <div className="w-10 h-10 rounded-[var(--radius-md)] bg-surface-2 border border-border-default flex items-center justify-center text-[18px] shrink-0">
                {rule.icon}
              </div>
              <span className="flex-1 text-[14px] text-text-primary font-medium">
                {rule.label}
              </span>
              <div className="flex items-baseline gap-1">
                <span className="font-mono font-black text-[20px] text-yellow-400 tabular-nums leading-none">
                  {rule.pts}
                </span>
                <span className="text-[10px] text-text-tertiary font-bold uppercase">
                  pt
                </span>
              </div>
            </div>
          ))}
        </Card>
      </section>

      {/* ─── Tournament points ─── */}
      <section>
        <div className="flex items-end justify-between mb-4">
          <div>
            <h2 className="font-display font-black text-[22px] tracking-tight text-text-primary">
              Torna tippek
            </h2>
            <p className="text-[11px] text-text-tertiary font-medium mt-0.5 uppercase tracking-[0.6px]">
              A torna kezdete előtt kell leadni
            </p>
          </div>
          <Badge variant="gold">Egyszer</Badge>
        </div>
        <Card variant="default" padding="none">
          {TOURNAMENT_SCORING.map((rule, i) => (
            <div
              key={i}
              className={cn(
                "flex items-center gap-4 px-5 py-4",
                i < TOURNAMENT_SCORING.length - 1 &&
                  "border-b border-border-subtle",
                "hover:bg-surface-hover transition-colors"
              )}
            >
              <div className="w-10 h-10 rounded-[var(--radius-md)] bg-surface-2 border border-border-default flex items-center justify-center text-[18px] shrink-0">
                {rule.icon}
              </div>
              <span className="flex-1 text-[14px] text-text-primary font-medium">
                {rule.label}
              </span>
              <div className="flex items-baseline gap-1">
                <span className="font-mono font-black text-[20px] text-yellow-400 tabular-nums leading-none">
                  {rule.pts}
                </span>
                <span className="text-[10px] text-text-tertiary font-bold uppercase">
                  pt
                </span>
              </div>
            </div>
          ))}
        </Card>
      </section>

      {/* ─── Multipliers (visual bar chart) ─── */}
      <section>
        <div className="flex items-end justify-between mb-4">
          <div>
            <h2 className="font-display font-black text-[22px] tracking-tight text-text-primary">
              Kieséses szorzók
            </h2>
            <p className="text-[11px] text-text-tertiary font-medium mt-0.5 uppercase tracking-[0.6px]">
              Minél közelebb a döntőhöz, annál nagyobb a tét
            </p>
          </div>
          <Badge variant="gold">Progresszív</Badge>
        </div>
        <Card variant="default" padding="md">
          <div className="space-y-3">
            {MULTIPLIERS.map((m, i) => {
              const numericMult = parseFloat(m.mult.replace("×", ""));
              const maxMult = 3;
              const pct = (numericMult / maxMult) * 100;
              const isFinal = numericMult === maxMult;
              return (
                <div key={i} className="flex items-center gap-3">
                  <span className="w-28 shrink-0 text-[12px] text-text-secondary font-semibold truncate">
                    {m.label}
                  </span>
                  <div className="flex-1 h-8 bg-surface-0 rounded-[var(--radius-sm)] border border-border-subtle relative overflow-hidden">
                    <div
                      className={cn(
                        "h-full rounded-[var(--radius-sm)] transition-all duration-500 ease-out",
                        "bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400",
                        isFinal && "shadow-[0_0_16px_var(--yellow-glow)]"
                      )}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span
                    className={cn(
                      "w-12 shrink-0 text-right font-mono font-black text-[16px] tabular-nums",
                      isFinal
                        ? "text-yellow-400 [text-shadow:0_0_10px_var(--yellow-glow)]"
                        : "text-text-primary"
                    )}
                  >
                    {m.mult}
                  </span>
                </div>
              );
            })}
          </div>
        </Card>
      </section>

      {/* ─── Example callout ─── */}
      <Card variant="glow-yellow" padding="lg">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-full bg-yellow-bg border border-yellow-500/40 flex items-center justify-center shrink-0">
            <Zap className="w-4 h-4 text-yellow-400" />
          </div>
          <div>
            <h3 className="font-display font-extrabold text-[15px] text-text-primary mb-1">
              Pontszámítás példa
            </h3>
            <p className="text-[12px] text-text-secondary leading-relaxed">
              Ha a döntőben eltalálod a pontos végeredményt (+5), az 1-X-2
              kimenetelt (+3), a gólok számát (+3), a szögleteket pontosan (+3)
              és a sárgalapokat ±1-en belül (+1), az{" "}
              <strong className="text-yellow-400 font-mono">14 × 3 = 42</strong>{" "}
              pontot ér.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
