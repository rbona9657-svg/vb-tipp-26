import { Header } from "@/components/ui/header";
import { BottomNav } from "@/components/ui/bottom-nav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh flex flex-col">
      <Header />
      <main className="flex-1 pb-20 mb-[env(safe-area-inset-bottom)]">{children}</main>
      <BottomNav />
    </div>
  );
}
