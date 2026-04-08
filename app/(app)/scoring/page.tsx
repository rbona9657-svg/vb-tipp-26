import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MATCH_SCORING, TOURNAMENT_SCORING, MULTIPLIERS } from "@/lib/data";

export default function ScoringPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      <div>
        <h1 className="text-[22px] font-bold text-text-primary">Pontrendszer</h1>
        <p className="text-[13px] text-text-tertiary mt-1">
          Így számítjuk a pontjaidat minden meccsnél és a torna tippjeknél
        </p>
      </div>

      {/* Match points */}
      <Card>
        <CardHeader>
          <h2 className="text-[16px] font-bold text-text-primary">Meccs pontok</h2>
          <p className="text-[12px] text-text-tertiary">Maximum 14 pont / meccs</p>
        </CardHeader>
        <CardContent className="p-0">
          {MATCH_SCORING.map((rule, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-5 py-3 border-b border-border-subtle last:border-b-0"
            >
              <span className="text-[16px] w-7 text-center shrink-0">{rule.icon}</span>
              <span className="flex-1 text-[14px] text-text-primary">{rule.label}</span>
              <Badge variant="gold">{rule.pts} pt</Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Tournament points */}
      <Card>
        <CardHeader>
          <h2 className="text-[16px] font-bold text-text-primary">Torna tippek</h2>
          <p className="text-[12px] text-text-tertiary">Zárolás a torna kezdetéig</p>
        </CardHeader>
        <CardContent className="p-0">
          {TOURNAMENT_SCORING.map((rule, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-5 py-3 border-b border-border-subtle last:border-b-0"
            >
              <span className="text-[16px] w-7 text-center shrink-0">{rule.icon}</span>
              <span className="flex-1 text-[14px] text-text-primary">{rule.label}</span>
              <Badge variant="info">{rule.pts} pt</Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Multipliers */}
      <Card>
        <CardHeader>
          <h2 className="text-[16px] font-bold text-text-primary">Szorzók</h2>
          <p className="text-[12px] text-text-tertiary">A kieséses szakaszban nő a tét</p>
        </CardHeader>
        <CardContent className="p-0">
          {MULTIPLIERS.map((m, i) => (
            <div
              key={i}
              className="flex items-center justify-between px-5 py-3 border-b border-border-subtle last:border-b-0"
            >
              <span className="text-[14px] text-text-primary">{m.label}</span>
              <span className="font-mono font-bold text-[15px] text-brand-gold">{m.mult}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
