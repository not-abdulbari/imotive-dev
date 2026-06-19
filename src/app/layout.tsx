import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Imotive Dashboard",
  description: "Imotive Learn Dashboard",
  icons: {
    icon: "https://imotive.in/assets/logo-3HyrHKwN.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex bg-background text-foreground selection:bg-primary/30 font-sans">
        <Sidebar />
        <main className="flex-1 min-h-screen max-w-full overflow-hidden pb-24 md:pb-0">
          <div className="mx-auto w-[95%] max-w-none p-6 md:p-8">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
