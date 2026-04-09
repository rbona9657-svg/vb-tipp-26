"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Trophy,
  Users,
  Mail,
  Upload,
  Shield,
  ChevronRight,
  Star,
  BarChart3,
  Image as ImageIcon,
  UserPlus,
  Crown,
  Zap,
  Sparkles,
} from "lucide-react";
import { FlipCountdown } from "@/components/ui/flip-countdown";
import { LiveDot } from "@/components/ui/live-dot";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TEAMS } from "@/lib/data";
import { cn } from "@/lib/utils";

const KICKOFF = new Date("2026-06-11T19:00:00Z");

// All 48 team flags for the marquee strip
const ALL_FLAGS = Object.values(TEAMS);

export default function LandingPage() {
  const [teamName, setTeamName] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    squad?: { name: string; inviteCode: string };
    error?: string;
  } | null>(null);
  const router = useRouter();

  async function handleRegister() {
    if (!teamName.trim() || !email.trim() || !name.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ teamName, email, name }),
      });
      const data = await res.json();
      if (!res.ok) {
        setResult({ success: false, error: data.error });
      } else {
        setResult({ success: true, squad: data.squad });
      }
    } catch {
      setResult({ success: false, error: "Hálózati hiba történt" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-dvh bg-bg-primary text-text-primary">
      {/* ─── Navbar ─── */}
      <nav
        className="sticky top-0 z-50 bg-bg-primary/90 backdrop-blur-md border-b border-border-subtle"
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between px-5 h-14">
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <Image
              src="/icon-192x192.png?v=ziccer3"
              alt="Ziccer Tipper"
              width={32}
              height={32}
              className="rounded-[6px]"
              unoptimized
            />
            <span className="hidden sm:inline font-display font-extrabold text-[15px] text-text-primary tracking-tight whitespace-nowrap">
              ZICCER <span className="text-yellow-400">TIPPER</span>
            </span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/dashboard"
              className="text-[12px] font-bold uppercase tracking-[0.5px] text-text-secondary hover:text-text-primary transition-colors px-3 py-2"
            >
              Bejelentkezés
            </Link>
            <a href="#register">
              <Button size="sm" variant="primary">
                Regisztráció
                <ChevronRight className="w-3.5 h-3.5" />
              </Button>
            </a>
          </div>
        </div>
      </nav>

      {/* ─── Hero Section ─── */}
      <section className="relative overflow-hidden">
        {/* Noise + radial gradient backdrop */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 20% 20%, rgba(16, 184, 110, 0.12), transparent 50%), radial-gradient(circle at 80% 80%, rgba(255, 204, 0, 0.10), transparent 55%), linear-gradient(180deg, #021912 0%, #032B1E 50%, #021912 100%)",
          }}
        />
        {/* Subtle dot grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="relative max-w-5xl mx-auto px-5 pt-14 pb-16 sm:pt-20 sm:pb-24 text-center">
          {/* Live badge */}
          <div className="inline-flex items-center gap-2 bg-surface-1 border border-border-default rounded-full px-4 py-1.5 mb-8">
            <LiveDot variant="yellow" size="xs" />
            <span className="font-display font-bold text-[11px] uppercase tracking-[1px] text-text-secondary">
              48 csapat
            </span>
            <span className="text-text-tertiary">·</span>
            <span className="font-display font-bold text-[11px] uppercase tracking-[1px] text-text-secondary">
              12 csoport
            </span>
            <span className="text-text-tertiary">·</span>
            <span className="font-display font-bold text-[11px] uppercase tracking-[1px] text-yellow-400">
              104 meccs
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display font-black leading-[0.95] tracking-[-2px] mb-6">
            <span className="block text-[48px] sm:text-[72px] lg:text-[92px] text-text-primary">
              TIPPELJ.
            </span>
            <span className="block text-[48px] sm:text-[72px] lg:text-[92px] text-text-primary">
              NYERJ.
            </span>
            <span className="block text-[48px] sm:text-[72px] lg:text-[92px] text-yellow-400 [text-shadow:0_0_40px_var(--yellow-glow)]">
              TAROLJ.
            </span>
          </h1>

          <p className="text-[15px] sm:text-[17px] text-text-secondary max-w-xl mx-auto mb-10 leading-relaxed font-medium">
            Hozd létre a csapatodat, hívd meg a barátaidat, és versenyezzetek
            egymás között. A legjobb 3 játékosotok eredményeivel nevezhettek a
            csapatversenybe is.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-14">
            <a href="#register">
              <Button size="lg" variant="primary" glow>
                Csapat létrehozása
                <ChevronRight className="w-4 h-4" />
              </Button>
            </a>
            <a href="#how-it-works">
              <Button size="lg" variant="outline">
                Hogyan működik?
              </Button>
            </a>
          </div>

          {/* Countdown */}
          <div className="flex flex-col items-center gap-3">
            <span className="font-display font-bold text-[10px] uppercase tracking-[2px] text-text-tertiary">
              Nyitómeccs visszaszámláló
            </span>
            <FlipCountdown target={KICKOFF} showSeconds />
          </div>
        </div>

        {/* Marquee strip: all 48 team flags */}
        <div className="relative border-y border-border-default bg-surface-0/80 backdrop-blur overflow-hidden py-4">
          <div className="flex items-center gap-10 animate-marquee will-change-transform">
            {[...ALL_FLAGS, ...ALL_FLAGS].map((team, i) => (
              <div
                key={`${team.code}-${i}`}
                className="flex items-center gap-2 shrink-0"
              >
                <span className="text-[28px]">{team.flag}</span>
                <span className="font-mono font-bold text-[13px] text-text-secondary">
                  {team.code}
                </span>
              </div>
            ))}
          </div>
          {/* Fade edges */}
          <div
            className="absolute top-0 bottom-0 left-0 w-24 pointer-events-none"
            style={{
              background: "linear-gradient(90deg, var(--surface-0), transparent)",
            }}
          />
          <div
            className="absolute top-0 bottom-0 right-0 w-24 pointer-events-none"
            style={{
              background: "linear-gradient(-90deg, var(--surface-0), transparent)",
            }}
          />
        </div>
      </section>

      {/* ─── How It Works ─── */}
      <section id="how-it-works" className="max-w-5xl mx-auto px-5 py-20 sm:py-28">
        <div className="text-center mb-14">
          <p className="font-display font-bold text-[11px] uppercase tracking-[2px] text-yellow-400 mb-3">
            3 lépés
          </p>
          <h2 className="font-display font-black text-[36px] sm:text-[48px] tracking-tight text-text-primary leading-tight">
            Hogyan működik?
          </h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 stagger-children">
          {[
            {
              step: "01",
              icon: <UserPlus className="w-6 h-6" />,
              title: "Regisztrálj",
              desc: "Hozd létre a fiókodat és alapítsd meg a csapatodat. Te leszel az admin, aki meghívhatja a többieket.",
            },
            {
              step: "02",
              icon: <Mail className="w-6 h-6" />,
              title: "Hívd meg",
              desc: "E-mail címmel hívd meg a csapattagokat. Ők egy linkre kattintva csatlakozhatnak a csapatodhoz.",
            },
            {
              step: "03",
              icon: <Trophy className="w-6 h-6" />,
              title: "Versenyezz",
              desc: "Tippeljetek a meccsekre, gyűjtsetek pontokat. A legjobb 3 eredményetekkel nevezhettek a csapatversenybe.",
            },
          ].map((item, i) => (
            <Card
              key={i}
              variant="default"
              padding="lg"
              className="relative overflow-visible hover:-translate-y-[2px] hover:shadow-hover transition-transform"
            >
              <div className="absolute top-4 right-4 font-mono font-black text-[40px] text-text-tertiary/20 leading-none select-none">
                {item.step}
              </div>
              <div className="w-12 h-12 rounded-[var(--radius-md)] bg-yellow-bg border border-yellow-500/30 text-yellow-400 flex items-center justify-center mb-5 relative">
                {item.icon}
              </div>
              <h3 className="font-display font-extrabold text-[18px] text-text-primary mb-2 relative">
                {item.title}
              </h3>
              <p className="text-[13px] text-text-secondary leading-relaxed relative">
                {item.desc}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* ─── Team Feature Section ─── */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, var(--green-900) 50%, transparent 100%)",
          }}
        />
        <div className="relative max-w-5xl mx-auto px-5 py-20 sm:py-28">
          <div className="text-center mb-14">
            <p className="font-display font-bold text-[11px] uppercase tracking-[2px] text-yellow-400 mb-3">
              A csapatod, a szabályaid
            </p>
            <h2 className="font-display font-black text-[36px] sm:text-[48px] tracking-tight text-text-primary leading-tight">
              Admin. Logó. Verseny.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Left: Live-preview team card */}
            <Card variant="glow-yellow" padding="none">
              <div className="p-6 border-b border-border-default">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-[var(--radius-md)] bg-surface-0 border-2 border-dashed border-yellow-500/40 flex flex-col items-center justify-center cursor-pointer hover:bg-surface-2 hover:border-yellow-500/60 transition-colors">
                    <Upload className="w-5 h-5 text-yellow-400 mb-0.5" />
                    <span className="text-[8px] text-text-tertiary font-bold uppercase tracking-wider">
                      Logó
                    </span>
                  </div>
                  <div>
                    <p className="text-[10px] text-text-tertiary font-bold uppercase tracking-[1px] mb-1">
                      Csapatnév
                    </p>
                    <p className="font-display font-extrabold text-[20px] text-text-primary leading-tight">
                      powered by AI Hungary
                    </p>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <span className="text-[11px]">⚡</span>
                      <span className="text-[11px] text-text-tertiary font-medium">
                        6 tag &middot; Admin: Richard
                      </span>
                      <LiveDot variant="green" size="xs" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5">
                <p className="text-[10px] font-bold text-text-tertiary uppercase tracking-[0.8px] mb-3">
                  Csapattagok
                </p>
                {[
                  { name: "Richard", pts: 847, avatar: "R", isAdmin: true },
                  { name: "Balázs", pts: 812, avatar: "B", isAdmin: false },
                  { name: "Ádám", pts: 798, avatar: "Á", isAdmin: false },
                  { name: "Petra", pts: 775, avatar: "P", isAdmin: false },
                ].map((m, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 py-2.5 border-b border-border-subtle last:border-b-0"
                  >
                    <div className="w-8 h-8 rounded-full bg-bg-tertiary border border-border-default flex items-center justify-center font-display font-bold text-[12px] text-text-primary">
                      {m.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-display font-bold text-[13px] text-text-primary">
                          {m.name}
                        </span>
                        {m.isAdmin && (
                          <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-yellow-bg border border-yellow-500/30 text-yellow-400 text-[9px] font-black uppercase tracking-wide">
                            <Shield className="w-2.5 h-2.5" />
                            Admin
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="font-mono font-black text-[14px] text-text-primary tabular-nums">
                      {m.pts}
                    </span>
                    <span className="text-[10px] text-text-tertiary font-bold uppercase">
                      pt
                    </span>
                  </div>
                ))}

                <button className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 rounded-[var(--radius-sm)] border border-dashed border-border-strong text-text-secondary text-[11px] font-bold uppercase tracking-[0.6px] hover:bg-surface-2 hover:text-yellow-400 hover:border-yellow-500/40 transition-all cursor-pointer">
                  <Mail className="w-3.5 h-3.5" />
                  Tag meghívása e-maillel
                </button>
              </div>
            </Card>

            {/* Right: Features */}
            <div className="space-y-5">
              {[
                {
                  icon: <Crown className="w-5 h-5" />,
                  title: "Admin rendszer",
                  desc: "Minden csapatnak kell egy admin, aki létrehozza a csapatot és e-mail címmel meghívja a tagokat. Az admin kezeli a csapat beállításait.",
                },
                {
                  icon: <ImageIcon className="w-5 h-5" />,
                  title: "Csapat logó és név",
                  desc: "Válassz egyedi csapatnevet és tölts fel egy logót, ami megjelenik a csapatversenyek ranglistáján is.",
                },
                {
                  icon: <Users className="w-5 h-5" />,
                  title: "Csapaton belüli verseny",
                  desc: "A csapat tagjai egymás között versenyeznek. A ranglistán a logó, név és pontszámok láthatóak.",
                },
                {
                  icon: <Star className="w-5 h-5" />,
                  title: "Csapatok közötti verseny",
                  desc: "A legjobb 3 játékos összesített pontszáma számít a csapatversenyben.",
                },
                {
                  icon: <BarChart3 className="w-5 h-5" />,
                  title: "Top 3 stratégia",
                  desc: "Nem a létszám a lényeg, hanem a minőség. A 3 legjobb tippelőtök pontjai döntik el.",
                },
              ].map((f, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-10 h-10 rounded-[var(--radius-md)] bg-yellow-bg border border-yellow-500/30 text-yellow-400 flex items-center justify-center shrink-0">
                    {f.icon}
                  </div>
                  <div>
                    <h4 className="font-display font-extrabold text-[15px] text-text-primary mb-1">
                      {f.title}
                    </h4>
                    <p className="text-[13px] text-text-secondary leading-relaxed">
                      {f.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Team Competition Preview ─── */}
      <section className="max-w-5xl mx-auto px-5 py-20 sm:py-28">
        <div className="text-center mb-10">
          <p className="font-display font-bold text-[11px] uppercase tracking-[2px] text-yellow-400 mb-3">
            Csapatverseny
          </p>
          <h2 className="font-display font-black text-[36px] sm:text-[48px] tracking-tight text-text-primary leading-tight mb-3">
            A top 3 pontjai számítanak.
          </h2>
          <p className="text-[14px] text-text-tertiary max-w-lg mx-auto">
            Minden csapat logója és neve megjelenik a ranglistán
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card variant="default" padding="none">
            <div className="flex items-center px-5 py-3 border-b border-border-default">
              <span className="w-8 text-center text-[10px] font-bold text-text-tertiary uppercase tracking-[0.8px]">
                #
              </span>
              <span className="ml-4 flex-1 text-[10px] font-bold text-text-tertiary uppercase tracking-[0.8px]">
                Csapat
              </span>
              <span className="text-[10px] font-bold text-text-tertiary uppercase tracking-[0.8px]">
                Top 3 pont
              </span>
            </div>

            {[
              {
                rank: 1,
                name: "powered by AI Hungary",
                logo: "⚡",
                pts: "2,457",
              },
              {
                rank: 2,
                name: "Passport Pub XI",
                logo: "🍺",
                pts: "2,380",
              },
              {
                rank: 3,
                name: "Debuggerek",
                logo: "🐛",
                pts: "2,312",
              },
              {
                rank: 4,
                name: "DevOps United",
                logo: "🚀",
                pts: "2,201",
              },
              {
                rank: 5,
                name: "React Rangers",
                logo: "⚛️",
                pts: "2,156",
              },
            ].map((squad) => {
              const isTop = squad.rank <= 3;
              const rankColors: Record<number, string> = {
                1: "text-yellow-400",
                2: "text-[#E8E8E8]",
                3: "text-[#E8B07C]",
              };
              return (
                <div
                  key={squad.rank}
                  className={cn(
                    "flex items-center gap-3 px-5 py-3.5 border-b border-border-subtle last:border-b-0",
                    squad.rank === 1 && "bg-yellow-bg"
                  )}
                >
                  <span
                    className={cn(
                      "w-8 text-center font-mono font-black text-[16px] tabular-nums",
                      isTop ? rankColors[squad.rank] : "text-text-tertiary"
                    )}
                  >
                    {squad.rank}
                  </span>
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full bg-bg-tertiary border flex items-center justify-center text-[18px] shrink-0",
                      squad.rank === 1 &&
                        "border-yellow-500 shadow-[0_0_16px_var(--yellow-glow)]",
                      squad.rank === 2 && "border-[#C0C0C0]",
                      squad.rank === 3 && "border-[#CD7F32]",
                      squad.rank > 3 && "border-border-default"
                    )}
                  >
                    {squad.logo}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-display font-bold text-[14px] text-text-primary truncate">
                      {squad.name}
                    </p>
                  </div>
                  <span
                    className={cn(
                      "font-mono font-black text-[16px] tabular-nums",
                      squad.rank === 1 ? "text-yellow-400" : "text-text-primary"
                    )}
                  >
                    {squad.pts}
                  </span>
                </div>
              );
            })}
          </Card>
        </div>
      </section>

      {/* ─── CTA / Register Section ─── */}
      <section
        id="register"
        className="relative overflow-hidden border-y border-border-default"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 0%, rgba(255,204,0,0.12), transparent 60%), linear-gradient(180deg, #021912, #032B1E)",
          }}
        />
        <div className="relative max-w-3xl mx-auto px-5 py-20 sm:py-24 text-center">
          <div className="inline-flex items-center gap-1.5 mb-6 px-3 py-1.5 rounded-full border border-yellow-500/40 bg-yellow-bg">
            <Sparkles className="w-3 h-3 text-yellow-400" />
            <span className="font-display font-bold text-[10px] uppercase tracking-[1.5px] text-yellow-400">
              Ingyenes · Azonnali
            </span>
          </div>
          <h2 className="font-display font-black text-[40px] sm:text-[56px] tracking-tight mb-5 text-text-primary leading-none">
            Készen állsz?
          </h2>
          <p className="text-[15px] text-text-secondary max-w-md mx-auto mb-10 leading-relaxed">
            Hozd létre a csapatodat, hívd meg a barátaidat és kezdjetek el
            tippelni a 2026-os Világbajnokságra.
          </p>

          {/* Registration form */}
          {result?.success ? (
            <div className="max-w-sm mx-auto animate-scale-in">
              <Card variant="glow-yellow" padding="lg">
                <div className="w-14 h-14 rounded-full bg-yellow-bg border border-yellow-500 flex items-center justify-center mx-auto mb-4 shadow-[0_0_24px_var(--yellow-glow)]">
                  <Trophy className="w-7 h-7 text-yellow-400" />
                </div>
                <h3 className="font-display font-black text-[22px] text-text-primary mb-2">
                  Csapat létrehozva!
                </h3>
                <p className="text-[14px] text-text-secondary mb-5">
                  <strong className="text-text-primary font-bold">
                    {result.squad?.name}
                  </strong>{" "}
                  sikeresen regisztrálva.
                </p>
                <div className="bg-surface-0 border border-border-default rounded-[var(--radius-md)] p-4 mb-5">
                  <p className="text-[10px] text-text-tertiary font-bold uppercase tracking-[1px] mb-1">
                    Meghívó kód
                  </p>
                  <p className="font-mono font-black text-[32px] text-yellow-400 tabular-nums tracking-[4px] [text-shadow:0_0_16px_var(--yellow-glow)]">
                    {result.squad?.inviteCode}
                  </p>
                  <p className="text-[11px] text-text-tertiary mt-2">
                    Oszd meg ezt a kódot a barátaiddal, hogy csatlakozhassanak
                  </p>
                </div>
                <Button
                  onClick={() => router.push("/dashboard")}
                  size="lg"
                  variant="primary"
                  glow
                  className="w-full"
                >
                  Tovább a tippeléshez
                </Button>
              </Card>
            </div>
          ) : (
            <div className="max-w-sm mx-auto space-y-3">
              <input
                type="text"
                placeholder="Csapatnév"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                className={cn(
                  "w-full h-12 px-4 rounded-[var(--radius-sm)]",
                  "bg-surface-1 border border-border-default",
                  "text-text-primary placeholder:text-text-tertiary text-[14px] font-medium",
                  "outline-none focus:border-yellow-500 focus:shadow-[0_0_0_1px_var(--yellow-500)]",
                  "transition-all"
                )}
              />
              <input
                type="email"
                placeholder="Admin e-mail cím"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={cn(
                  "w-full h-12 px-4 rounded-[var(--radius-sm)]",
                  "bg-surface-1 border border-border-default",
                  "text-text-primary placeholder:text-text-tertiary text-[14px] font-medium",
                  "outline-none focus:border-yellow-500 focus:shadow-[0_0_0_1px_var(--yellow-500)]",
                  "transition-all"
                )}
              />
              <input
                type="text"
                placeholder="Neved"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={cn(
                  "w-full h-12 px-4 rounded-[var(--radius-sm)]",
                  "bg-surface-1 border border-border-default",
                  "text-text-primary placeholder:text-text-tertiary text-[14px] font-medium",
                  "outline-none focus:border-yellow-500 focus:shadow-[0_0_0_1px_var(--yellow-500)]",
                  "transition-all"
                )}
              />
              <Button
                onClick={handleRegister}
                disabled={
                  loading || !teamName.trim() || !email.trim() || !name.trim()
                }
                size="lg"
                variant="primary"
                glow={!loading}
                className="w-full"
              >
                {loading ? "Létrehozás..." : "Csapat létrehozása →"}
              </Button>
              {result?.error && (
                <p className="text-[12px] text-live-red animate-fade-in font-medium">
                  {result.error}
                </p>
              )}
              <p className="text-[11px] text-text-tertiary">
                A regisztráció után e-maillel hívhatod meg a csapattagokat
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t border-border-subtle">
        <div className="max-w-6xl mx-auto px-5 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <Image
              src="/icon-192x192.png?v=ziccer3"
              alt="Ziccer Tipper"
              width={24}
              height={24}
              className="rounded-[4px]"
              unoptimized
            />
            <span className="font-display font-black text-[12px] tracking-[1.5px] text-text-tertiary">
              ZICCER TIPPER
            </span>
            <span className="text-text-tertiary mx-1">·</span>
            <span className="text-[11px] text-text-tertiary font-medium">
              powered by AI Hungary
            </span>
          </div>
          <p className="text-[11px] text-text-tertiary font-medium">
            FIFA World Cup 2026 &middot; USA &middot; Mexikó &middot; Kanada
          </p>
        </div>
      </footer>
    </div>
  );
}
