import type { Metadata, Viewport } from "next";
import { Poppins, IBM_Plex_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { ServiceWorkerRegister } from "@/components/sw-register";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ziccer Tipper – Tippelj a Világbajnokságra",
  description:
    "FIFA World Cup 2026 tippjáték – hozd létre a csapatodat, hívd meg a barátaidat és versenyezzetek!",
  manifest: "/manifest.json?v=ziccer3",
  icons: {
    icon: [
      { url: "/favicon.ico?v=ziccer3", sizes: "32x32" },
      { url: "/icon-192x192.png?v=ziccer3", sizes: "192x192", type: "image/png" },
      { url: "/icon-512x512.png?v=ziccer3", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png?v=ziccer3", sizes: "180x180", type: "image/png" },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Ziccer Tipper",
  },
  openGraph: {
    title: "Ziccer Tipper – Tippelj a Világbajnokságra",
    description: "FIFA World Cup 2026 tippjáték – versenyezz a barátaiddal!",
    images: [{ url: "/images/logo.png", width: 192, height: 192 }],
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#021912" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="hu"
      suppressHydrationWarning
      className={`${poppins.variable} ${ibmPlexMono.variable}`}
    >
      <body className="min-h-dvh bg-bg-primary text-text-primary antialiased" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
