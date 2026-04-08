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
} from "lucide-react";
import { Countdown } from "@/components/ui/countdown";
import { TEAMS } from "@/lib/data";

const FLAG_LOOP = Object.values(TEAMS)
  .map((t) => t.flag)
  .slice(0, 24);

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
      <nav className="sticky top-0 z-50 bg-bg-primary/95 backdrop-blur-sm border-b border-border-subtle" style={{ paddingTop: 60 }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between px-5 h-14">
          <div className="flex items-center gap-2">
            <Image
              src="/icon-48x48.png"
              alt="VB Tipp '26"
              width={32}
              height={32}
              className="rounded-[6px]"
            />
            <span className="font-mono text-[15px] font-bold text-brand-gold">
              VB Tipp &apos;26
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="text-[13px] font-medium text-text-secondary hover:text-text-primary transition-colors"
            >
              Bejelentkezés
            </Link>
            <a
              href="#register"
              className="inline-flex items-center gap-1.5 h-9 px-4 rounded-[var(--radius-sm)] bg-brand-gold text-white text-[13px] font-semibold hover:bg-brand-gold-hover transition-colors"
            >
              Regisztráció
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </nav>

      {/* ─── Hero Section ─── */}
      <section className="relative overflow-hidden">
        {/* Dark FIFA hero background */}
        <div className="bg-gradient-to-b from-[#0b0d17] via-[#141729] to-[#0b0d17] text-white">
          <div className="absolute inset-0 opacity-[0.04]">
            <div className="flex flex-wrap justify-center gap-4 pt-20 px-8 text-4xl select-none">
              {FLAG_LOOP.map((f, i) => (
                <span key={i} className="animate-pulse" style={{ animationDelay: `${i * 200}ms` }}>
                  {f}
                </span>
              ))}
            </div>
          </div>

          <div className="relative max-w-4xl mx-auto px-5 pt-16 pb-20 text-center">
            <Image
              src="/images/logo.jpg"
              alt="Original TrollFoci"
              width={320}
              height={140}
              className="mx-auto mb-6 rounded-[var(--radius-lg)]"
              priority
            />

            <div className="inline-flex items-center gap-2 bg-white/8 border border-white/10 rounded-full px-4 py-1.5 mb-6">
              <Zap className="w-3.5 h-3.5 text-brand-gold-light" />
              <span className="text-[12px] font-medium text-white/70">
                48 csapat &middot; 12 csoport &middot; 104 meccs
              </span>
            </div>

            <h1 className="text-[36px] sm:text-[48px] font-bold leading-[1.1] tracking-tight mb-4">
              Tippelj a barátaiddal a{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4a843] to-[#f2d06b]">
                Világbajnokságra
              </span>
            </h1>

            <p className="text-[16px] sm:text-[18px] text-white/60 max-w-xl mx-auto mb-8 leading-relaxed">
              Hozd létre a csapatodat, hívd meg a barátaidat, és versenyezzetek
              egymás között. A legjobb 3 játékosotok eredményeivel nevezhettek a
              csapatversenybe is.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
              <a
                href="#register"
                className="inline-flex items-center gap-2 h-12 px-7 rounded-[var(--radius-sm)] bg-brand-gold text-white text-[15px] font-semibold hover:bg-brand-gold-hover transition-all active:scale-[0.97]"
              >
                Csapat létrehozása
                <ChevronRight className="w-4 h-4" />
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 h-12 px-7 rounded-[var(--radius-sm)] bg-white/8 text-white/80 text-[15px] font-medium border border-white/10 hover:bg-white/12 transition-all"
              >
                Hogyan működik?
              </a>
            </div>

            <Countdown />
            <p className="text-[11px] text-white/30 mt-3">a nyitómeccsig</p>
          </div>
        </div>
      </section>

      {/* ─── How It Works ─── */}
      <section id="how-it-works" className="max-w-5xl mx-auto px-5 py-20">
        <div className="text-center mb-14">
          <h2 className="text-[28px] font-bold text-text-primary mb-3">Hogyan működik?</h2>
          <p className="text-[15px] text-text-secondary max-w-lg mx-auto">
            Három lépés és már tippelhetsz is a meccsekre
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {[
            {
              icon: <UserPlus className="w-6 h-6" />,
              title: "1. Regisztrálj",
              desc: "Hozd létre a fiókodat és alapítsd meg a csapatodat. Te leszel az admin, aki meghívhatja a többieket.",
            },
            {
              icon: <Mail className="w-6 h-6" />,
              title: "2. Hívd meg a barátaidat",
              desc: "E-mail címmel hívd meg a csapattagokat. Ők egy linkre kattintva csatlakozhatnak a csapatodhoz.",
            },
            {
              icon: <Trophy className="w-6 h-6" />,
              title: "3. Tippeljetek és versenyezzetek",
              desc: "Tippeljetek a meccsekre, gyűjtsetek pontokat. A legjobb 3 eredményetekkel nevezhettek a csapatversenybe.",
            },
          ].map((step, i) => (
            <div
              key={i}
              className="relative bg-bg-primary rounded-[var(--radius-xl)] shadow-card p-6 text-center hover:shadow-hover transition-shadow"
            >
              <div className="w-12 h-12 rounded-full bg-brand-gold-bg flex items-center justify-center text-brand-gold mx-auto mb-4">
                {step.icon}
              </div>
              <h3 className="text-[16px] font-bold text-text-primary mb-2">{step.title}</h3>
              <p className="text-[13px] text-text-secondary leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Team Feature Section ─── */}
      <section className="bg-bg-secondary">
        <div className="max-w-5xl mx-auto px-5 py-20">
          <div className="text-center mb-14">
            <h2 className="text-[28px] font-bold text-text-primary mb-3">A csapatod, a szabályaid</h2>
            <p className="text-[15px] text-text-secondary max-w-lg mx-auto">
              Minden csapatnak van egy admin, egy egyedi neve és logója
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Left: Interactive team card preview */}
            <div className="bg-bg-primary rounded-[var(--radius-xl)] shadow-card overflow-hidden">
              {/* Team header with logo upload area */}
              <div className="bg-gradient-to-br from-[#0b0d17] to-[#1c2038] p-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-[var(--radius-lg)] bg-white/10 border-2 border-dashed border-white/20 flex flex-col items-center justify-center cursor-pointer hover:bg-white/15 transition-colors">
                    <Upload className="w-5 h-5 text-white/40 mb-0.5" />
                    <span className="text-[8px] text-white/30 font-medium">Logó</span>
                  </div>
                  <div>
                    <p className="text-[11px] text-white/40 font-medium uppercase tracking-wider mb-0.5">
                      Csapatnév
                    </p>
                    <p className="text-[20px] font-bold text-white">powered by AI Hungary</p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="text-[10px]">⚡</span>
                      <span className="text-[11px] text-white/50">6 tag &middot; Admin: Richard</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Team members preview */}
              <div className="p-5">
                <p className="text-[11px] font-semibold text-text-tertiary uppercase tracking-wider mb-3">
                  Csapattagok
                </p>
                {[
                  { name: "Richard", role: "Admin", pts: 847, avatar: "R", isAdmin: true },
                  { name: "Balázs", role: "Tag", pts: 812, avatar: "B", isAdmin: false },
                  { name: "Ádám", role: "Tag", pts: 798, avatar: "Á", isAdmin: false },
                  { name: "Petra", role: "Tag", pts: 775, avatar: "P", isAdmin: false },
                ].map((m, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 py-2.5 border-b border-border-subtle last:border-b-0"
                  >
                    <div className="w-8 h-8 rounded-full bg-bg-tertiary flex items-center justify-center text-[12px] font-bold text-text-secondary">
                      {m.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[13px] font-semibold text-text-primary">{m.name}</span>
                        {m.isAdmin && (
                          <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-brand-gold-bg text-brand-gold text-[9px] font-bold uppercase">
                            <Shield className="w-2.5 h-2.5" />
                            Admin
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="font-mono text-[13px] font-bold text-text-primary">{m.pts}</span>
                    <span className="text-[11px] text-text-tertiary">pont</span>
                  </div>
                ))}

                {/* Invite button */}
                <button className="mt-3 w-full flex items-center justify-center gap-2 py-2.5 rounded-[var(--radius-sm)] border border-dashed border-border-strong text-text-secondary text-[13px] font-medium hover:bg-surface-hover transition-colors cursor-pointer">
                  <Mail className="w-4 h-4" />
                  Tag meghívása e-maillel
                </button>
              </div>
            </div>

            {/* Right: Feature list */}
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
                  desc: "Válassz egyedi csapatnevet és tölts fel egy logót, ami megjelenik a csapatversenyek ranglistáján is. Így mindenki felismeri a csapatotokat.",
                },
                {
                  icon: <Users className="w-5 h-5" />,
                  title: "Csapaton belüli verseny",
                  desc: "A csapat tagjai egymás között versenyeznek. A ranglistán a logó, a név és minden tag pontszáma látható a csapaton belül.",
                },
                {
                  icon: <Star className="w-5 h-5" />,
                  title: "Csapatok közötti verseny",
                  desc: "A legjobb 3 játékos összesített pontszáma számít a csapatversenyben. A ranglistán a csapatlogó és a csapatnév jelenik meg.",
                },
                {
                  icon: <BarChart3 className="w-5 h-5" />,
                  title: "Top 3 stratégia",
                  desc: "Nem a létszám a lényeg, hanem a minőség. A 3 legjobb tippelőtök pontjai döntik el, hol áll a csapatotok az összetett versenyben.",
                },
              ].map((f, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-10 h-10 rounded-[var(--radius-md)] bg-brand-gold-bg flex items-center justify-center text-brand-gold shrink-0">
                    {f.icon}
                  </div>
                  <div>
                    <h4 className="text-[14px] font-bold text-text-primary mb-1">{f.title}</h4>
                    <p className="text-[13px] text-text-secondary leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Team Competition Preview ─── */}
      <section className="max-w-5xl mx-auto px-5 py-20">
        <div className="text-center mb-10">
          <h2 className="text-[28px] font-bold text-text-primary mb-3">Csapatverseny ranglista</h2>
          <p className="text-[15px] text-text-secondary max-w-lg mx-auto">
            A csapatok logója és neve jelenik meg &mdash; a top 3 játékos pontjai számítanak
          </p>
        </div>

        <div className="max-w-lg mx-auto">
          <div className="bg-bg-primary rounded-[var(--radius-xl)] shadow-card overflow-hidden">
            {/* Header */}
            <div className="flex items-center px-5 py-3 border-b border-border-subtle text-[11px] font-semibold text-text-tertiary uppercase tracking-wide">
              <span className="w-8 text-center">#</span>
              <span className="flex-1 ml-3">Csapat</span>
              <span>Top 3 pont</span>
            </div>

            {[
              { rank: 1, name: "powered by AI Hungary", logo: "⚡", top3: "2,457", color: "text-medal-gold" },
              { rank: 2, name: "Passport Pub XI", logo: "🍺", top3: "2,380", color: "text-medal-silver" },
              { rank: 3, name: "Debuggerek", logo: "🐛", top3: "2,312", color: "text-medal-bronze" },
              { rank: 4, name: "DevOps United", logo: "🚀", top3: "2,201", color: "text-text-tertiary" },
              { rank: 5, name: "React Rangers", logo: "⚛️", top3: "2,156", color: "text-text-tertiary" },
            ].map((squad) => (
              <div
                key={squad.rank}
                className={`flex items-center gap-3 px-5 py-3.5 border-b border-border-subtle last:border-b-0 ${
                  squad.rank <= 3 ? "bg-brand-gold-bg" : ""
                }`}
              >
                <span className={`w-8 text-center font-mono font-bold text-[15px] ${squad.color}`}>
                  {squad.rank}
                </span>
                <div className="w-10 h-10 rounded-full bg-bg-tertiary flex items-center justify-center text-[18px] shrink-0">
                  {squad.logo}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-semibold text-text-primary truncate">{squad.name}</p>
                </div>
                <span className="font-mono font-bold text-[15px] text-text-primary">{squad.top3}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA / Register Section ─── */}
      <section id="register" className="bg-gradient-to-b from-[#0b0d17] to-[#141729] text-white">
        <div className="max-w-3xl mx-auto px-5 py-20 text-center">
          <Trophy className="w-10 h-10 text-brand-gold-light mx-auto mb-4" />
          <h2 className="text-[28px] sm:text-[36px] font-bold mb-4">
            Készen állsz?
          </h2>
          <p className="text-[16px] text-white/60 max-w-md mx-auto mb-8 leading-relaxed">
            Hozd létre a csapatodat, hívd meg a barátaidat és kezdjetek el
            tippelni a 2026-os Világbajnokságra.
          </p>

          {/* Registration form */}
          {result?.success ? (
            <div className="max-w-sm mx-auto animate-scale-in">
              <div className="bg-white/8 border border-white/12 rounded-[var(--radius-xl)] p-6 space-y-4">
                <div className="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center mx-auto">
                  <Trophy className="w-6 h-6 text-success" />
                </div>
                <h3 className="text-[18px] font-bold">Csapat létrehozva!</h3>
                <p className="text-[14px] text-white/60">
                  <strong className="text-white">{result.squad?.name}</strong> sikeresen regisztrálva.
                </p>
                <div className="bg-white/5 rounded-[var(--radius-sm)] p-4">
                  <p className="text-[11px] text-white/40 uppercase tracking-wider mb-1">Meghívó kód</p>
                  <p className="font-mono text-[24px] font-bold text-brand-gold-light tracking-[4px]">
                    {result.squad?.inviteCode}
                  </p>
                  <p className="text-[11px] text-white/40 mt-2">
                    Oszd meg ezt a kódot a barátaiddal, hogy csatlakozhassanak
                  </p>
                </div>
                <button
                  onClick={() => router.push("/dashboard")}
                  className="w-full h-12 rounded-[var(--radius-sm)] bg-brand-gold text-white text-[15px] font-semibold hover:bg-brand-gold-hover transition-all active:scale-[0.97] cursor-pointer"
                >
                  Tovább a tippeléshez
                </button>
              </div>
            </div>
          ) : (
            <div className="max-w-sm mx-auto space-y-3">
              <input
                type="text"
                placeholder="Csapatnév"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                className="w-full h-12 px-4 rounded-[var(--radius-sm)] bg-white/8 border border-white/12 text-white placeholder:text-white/30 text-[14px] outline-none focus:border-brand-gold transition-colors"
              />
              <input
                type="email"
                placeholder="Admin e-mail cím"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 px-4 rounded-[var(--radius-sm)] bg-white/8 border border-white/12 text-white placeholder:text-white/30 text-[14px] outline-none focus:border-brand-gold transition-colors"
              />
              <input
                type="text"
                placeholder="Neved"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-12 px-4 rounded-[var(--radius-sm)] bg-white/8 border border-white/12 text-white placeholder:text-white/30 text-[14px] outline-none focus:border-brand-gold transition-colors"
              />
              <button
                onClick={handleRegister}
                disabled={loading || !teamName.trim() || !email.trim() || !name.trim()}
                className="w-full h-12 rounded-[var(--radius-sm)] bg-brand-gold text-white text-[15px] font-semibold hover:bg-brand-gold-hover transition-all active:scale-[0.97] cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {loading ? "Létrehozás..." : "Csapat létrehozása"}
              </button>
              {result?.error && (
                <p className="text-[13px] text-red-400 animate-fade-in">{result.error}</p>
              )}
              <p className="text-[11px] text-white/30">
                A regisztráció után e-maillel hívhatod meg a csapattagokat
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t border-border-subtle">
        <div className="max-w-6xl mx-auto px-5 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Image
              src="/icon-32x32.png"
              alt="VB Tipp '26"
              width={20}
              height={20}
              className="rounded-[3px]"
            />
            <span className="text-[12px] font-bold tracking-[1.5px] text-text-tertiary">
              VB TIPP &apos;26
            </span>
          </div>
          <p className="text-[12px] text-text-tertiary">
            FIFA World Cup 2026 &middot; USA &middot; Mexikó &middot; Kanada
          </p>
        </div>
      </footer>
    </div>
  );
}
