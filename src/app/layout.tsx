import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Confidant | Your AI Interview Coach",
  description: "Ace your next interview with tailored questions, model answers, and real-time feedback.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="relative min-h-screen selection:bg-purple-100 selection:text-primary-purple">
          {children}
        </div>
      </body>
    </html>
  );
}
