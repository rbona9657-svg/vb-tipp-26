import type { Team, Match, Player, Squad, ScoringRule, Multiplier } from "./types";

// ─── All 48 Teams (Real FIFA WC 2026 Data) ───────────────────────

export const TEAMS: Record<string, Team> = {
  // Group A
  MEX: { code: "MEX", name: "Mexikó", flag: "🇲🇽" },
  RSA: { code: "RSA", name: "Dél-Afrika", flag: "🇿🇦" },
  KOR: { code: "KOR", name: "Dél-Korea", flag: "🇰🇷" },
  CZE: { code: "CZE", name: "Csehország", flag: "🇨🇿" },
  // Group B
  CAN: { code: "CAN", name: "Kanada", flag: "🇨🇦" },
  BIH: { code: "BIH", name: "Bosznia-Hercegovina", flag: "🇧🇦" },
  QAT: { code: "QAT", name: "Katar", flag: "🇶🇦" },
  SUI: { code: "SUI", name: "Svájc", flag: "🇨🇭" },
  // Group C
  BRA: { code: "BRA", name: "Brazília", flag: "🇧🇷" },
  MAR: { code: "MAR", name: "Marokkó", flag: "🇲🇦" },
  HAI: { code: "HAI", name: "Haiti", flag: "🇭🇹" },
  SCO: { code: "SCO", name: "Skócia", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿" },
  // Group D
  USA: { code: "USA", name: "USA", flag: "🇺🇸" },
  PAR: { code: "PAR", name: "Paraguay", flag: "🇵🇾" },
  AUS: { code: "AUS", name: "Ausztrália", flag: "🇦🇺" },
  TUR: { code: "TUR", name: "Törökország", flag: "🇹🇷" },
  // Group E
  GER: { code: "GER", name: "Németország", flag: "🇩🇪" },
  CUW: { code: "CUW", name: "Curaçao", flag: "🇨🇼" },
  CIV: { code: "CIV", name: "Elefántcsontpart", flag: "🇨🇮" },
  ECU: { code: "ECU", name: "Ecuador", flag: "🇪🇨" },
  // Group F
  NED: { code: "NED", name: "Hollandia", flag: "🇳🇱" },
  JPN: { code: "JPN", name: "Japán", flag: "🇯🇵" },
  SWE: { code: "SWE", name: "Svédország", flag: "🇸🇪" },
  TUN: { code: "TUN", name: "Tunézia", flag: "🇹🇳" },
  // Group G
  BEL: { code: "BEL", name: "Belgium", flag: "🇧🇪" },
  EGY: { code: "EGY", name: "Egyiptom", flag: "🇪🇬" },
  IRN: { code: "IRN", name: "Irán", flag: "🇮🇷" },
  NZL: { code: "NZL", name: "Új-Zéland", flag: "🇳🇿" },
  // Group H
  ESP: { code: "ESP", name: "Spanyolország", flag: "🇪🇸" },
  CPV: { code: "CPV", name: "Zöld-foki Köztársaság", flag: "🇨🇻" },
  KSA: { code: "KSA", name: "Szaúd-Arábia", flag: "🇸🇦" },
  URU: { code: "URU", name: "Uruguay", flag: "🇺🇾" },
  // Group I
  FRA: { code: "FRA", name: "Franciaország", flag: "🇫🇷" },
  SEN: { code: "SEN", name: "Szenegál", flag: "🇸🇳" },
  IRQ: { code: "IRQ", name: "Irak", flag: "🇮🇶" },
  NOR: { code: "NOR", name: "Norvégia", flag: "🇳🇴" },
  // Group J
  ARG: { code: "ARG", name: "Argentína", flag: "🇦🇷" },
  ALG: { code: "ALG", name: "Algéria", flag: "🇩🇿" },
  AUT: { code: "AUT", name: "Ausztria", flag: "🇦🇹" },
  JOR: { code: "JOR", name: "Jordánia", flag: "🇯🇴" },
  // Group K
  POR: { code: "POR", name: "Portugália", flag: "🇵🇹" },
  COD: { code: "COD", name: "Kongói DK", flag: "🇨🇩" },
  UZB: { code: "UZB", name: "Üzbegisztán", flag: "🇺🇿" },
  COL: { code: "COL", name: "Kolumbia", flag: "🇨🇴" },
  // Group L
  ENG: { code: "ENG", name: "Anglia", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
  CRO: { code: "CRO", name: "Horvátország", flag: "🇭🇷" },
  GHA: { code: "GHA", name: "Ghána", flag: "🇬🇭" },
  PAN: { code: "PAN", name: "Panama", flag: "🇵🇦" },
};

// ─── 12 Groups ───────────────────────────────────────────────────

export const GROUPS: Record<string, string[]> = {
  A: ["MEX", "RSA", "KOR", "CZE"],
  B: ["CAN", "BIH", "QAT", "SUI"],
  C: ["BRA", "MAR", "HAI", "SCO"],
  D: ["USA", "PAR", "AUS", "TUR"],
  E: ["GER", "CUW", "CIV", "ECU"],
  F: ["NED", "JPN", "SWE", "TUN"],
  G: ["BEL", "EGY", "IRN", "NZL"],
  H: ["ESP", "CPV", "KSA", "URU"],
  I: ["FRA", "SEN", "IRQ", "NOR"],
  J: ["ARG", "ALG", "AUT", "JOR"],
  K: ["POR", "COD", "UZB", "COL"],
  L: ["ENG", "CRO", "GHA", "PAN"],
};

// ─── Sample Matches (first 12 from real schedule) ────────────────

export const MATCHES: Match[] = [
  { id: 1, home: "MEX", away: "RSA", date: "Jún 11", time: "21:00", group: "A", venue: "Estadio Azteca, Mexikóváros", round: "group", status: "scheduled" },
  { id: 2, home: "KOR", away: "CZE", date: "Jún 12", time: "04:00", group: "A", venue: "Estadio Akron, Guadalajara", round: "group", status: "scheduled" },
  { id: 3, home: "CAN", away: "BIH", date: "Jún 12", time: "21:00", group: "B", venue: "BMO Field, Toronto", round: "group", status: "scheduled" },
  { id: 4, home: "USA", away: "PAR", date: "Jún 13", time: "03:00", group: "D", venue: "SoFi Stadium, Inglewood", round: "group", status: "scheduled" },
  { id: 7, home: "QAT", away: "SUI", date: "Jún 13", time: "21:00", group: "B", venue: "Levi's Stadium, Santa Clara", round: "group", status: "scheduled" },
  { id: 8, home: "BRA", away: "MAR", date: "Jún 14", time: "00:00", group: "C", venue: "MetLife Stadium, East Rutherford", round: "group", status: "scheduled" },
  { id: 9, home: "HAI", away: "SCO", date: "Jún 14", time: "03:00", group: "C", venue: "Gillette Stadium, Foxborough", round: "group", status: "scheduled" },
  { id: 6, home: "AUS", away: "TUR", date: "Jún 14", time: "06:00", group: "D", venue: "BC Place, Vancouver", round: "group", status: "scheduled" },
  { id: 10, home: "GER", away: "CUW", date: "Jún 14", time: "19:00", group: "E", venue: "NRG Stadium, Houston", round: "group", status: "scheduled" },
  { id: 12, home: "NED", away: "JPN", date: "Jún 14", time: "22:00", group: "F", venue: "AT&T Stadium, Arlington", round: "group", status: "scheduled" },
  { id: 11, home: "CIV", away: "ECU", date: "Jún 15", time: "01:00", group: "E", venue: "Lincoln Financial Field, Philadelphia", round: "group", status: "scheduled" },
  { id: 14, home: "BEL", away: "EGY", date: "Jún 15", time: "21:00", group: "G", venue: "Lumen Field, Seattle", round: "group", status: "scheduled" },
  { id: 28, home: "ESP", away: "CPV", date: "Jún 15", time: "18:00", group: "H", venue: "Mercedes-Benz Stadium, Atlanta", round: "group", status: "scheduled" },
  { id: 29, home: "KSA", away: "URU", date: "Jún 16", time: "00:00", group: "H", venue: "Hard Rock Stadium, Miami", round: "group", status: "scheduled" },
  { id: 34, home: "FRA", away: "SEN", date: "Jún 16", time: "21:00", group: "I", venue: "MetLife Stadium, East Rutherford", round: "group", status: "scheduled" },
  { id: 36, home: "ARG", away: "ALG", date: "Jún 17", time: "03:00", group: "J", venue: "Arrowhead Stadium, Kansas City", round: "group", status: "scheduled" },
  { id: 58, home: "POR", away: "COD", date: "Jún 17", time: "19:00", group: "K", venue: "NRG Stadium, Houston", round: "group", status: "scheduled" },
  { id: 64, home: "ENG", away: "CRO", date: "Jún 17", time: "22:00", group: "L", venue: "AT&T Stadium, Arlington", round: "group", status: "scheduled" },
];

// ─── Venue gradient colors ───────────────────────────────────────

export const VENUE_COLORS: Record<string, string> = {
  "Estadio Azteca, Mexikóváros": "from-green-700 to-emerald-900",
  "Estadio Akron, Guadalajara": "from-red-600 to-rose-800",
  "Estadio BBVA, Monterrey": "from-blue-700 to-indigo-900",
  "BMO Field, Toronto": "from-red-600 to-red-900",
  "BC Place, Vancouver": "from-sky-600 to-blue-800",
  "AT&T Stadium, Arlington": "from-slate-600 to-blue-900",
  "Mercedes-Benz Stadium, Atlanta": "from-zinc-700 to-slate-900",
  "Gillette Stadium, Foxborough": "from-blue-800 to-indigo-950",
  "NRG Stadium, Houston": "from-red-700 to-rose-900",
  "SoFi Stadium, Inglewood": "from-amber-500 to-orange-700",
  "Arrowhead Stadium, Kansas City": "from-red-600 to-red-800",
  "Hard Rock Stadium, Miami": "from-pink-500 to-purple-700",
  "MetLife Stadium, East Rutherford": "from-blue-600 to-indigo-800",
  "Lincoln Financial Field, Philadelphia": "from-teal-600 to-emerald-800",
  "Levi's Stadium, Santa Clara": "from-amber-600 to-red-700",
  "Lumen Field, Seattle": "from-green-600 to-teal-800",
};

// ─── Sample Leaderboard ──────────────────────────────────────────

export const SQUAD_MEMBERS: Player[] = [
  { id: 1, name: "Richard", pts: 847, exact: 5, correct: 18, trend: "up", avatar: "R" },
  { id: 2, name: "Balázs", pts: 812, exact: 4, correct: 17, trend: "up", avatar: "B" },
  { id: 3, name: "Ádám", pts: 798, exact: 4, correct: 16, trend: "down", avatar: "Á" },
  { id: 4, name: "Petra", pts: 775, exact: 3, correct: 17, trend: "up", avatar: "P" },
  { id: 5, name: "Zsolt", pts: 760, exact: 3, correct: 15, trend: "same", avatar: "Z" },
  { id: 6, name: "Eszter", pts: 741, exact: 2, correct: 14, trend: "down", avatar: "E" },
];

export const RIVAL_SQUADS: Squad[] = [
  { name: "AI Hungary FC", logo: "⚡", members: 6, pts: 4733, rank: 1 },
  { name: "Passport Pub XI", logo: "🍺", members: 8, pts: 4680, rank: 2 },
  { name: "Debuggerek", logo: "🐛", members: 5, pts: 4512, rank: 3 },
  { name: "DevOps United", logo: "🚀", members: 7, pts: 4201, rank: 4 },
];

// ─── Scoring ─────────────────────────────────────────────────────

export const MATCH_SCORING: ScoringRule[] = [
  { label: "Helyes kimenetel (1-X-2)", pts: 3, icon: "⚽" },
  { label: "Pontos gólkülönbség", pts: "+2 bónusz", icon: "🎯" },
  { label: "Pontos végeredmény", pts: "+5 bónusz", icon: "🏅" },
  { label: "Gólok száma (pontos)", pts: 3, icon: "🥅" },
  { label: "Szögletek száma (±2)", pts: 1, icon: "🚩" },
  { label: "Szögletek száma (pontos)", pts: 3, icon: "🚩" },
  { label: "Sárgalapok (±1)", pts: 1, icon: "🟨" },
  { label: "Sárgalapok (pontos)", pts: 3, icon: "🟨" },
];

export const TOURNAMENT_SCORING: ScoringRule[] = [
  { label: "Világbajnok", pts: 25, icon: "🏆" },
  { label: "Döntős (vesztes)", pts: 15, icon: "🥈" },
  { label: "Elődöntős", pts: "10 / csapat", icon: "🏟️" },
  { label: "Csoportgyőztes", pts: "5 / csoport", icon: "📊" },
  { label: "Gólkirály nemzete", pts: 10, icon: "👟" },
];

export const MULTIPLIERS: Multiplier[] = [
  { label: "Csoportkör", mult: "×1" },
  { label: "32-es döntő", mult: "×1.2" },
  { label: "Nyolcaddöntő", mult: "×1.5" },
  { label: "Negyeddöntő", mult: "×2" },
  { label: "Elődöntő", mult: "×2.5" },
  { label: "Döntő", mult: "×3" },
];
