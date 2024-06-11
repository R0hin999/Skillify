import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/components/Providers";
import { ToastProvider } from "@/components/toast-provider";
import { ConfettiProvider } from "@/components/confetti-provider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Skillify",
  description: "Your one-stop destination for modern learning journeys ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" sizes="any" />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <ConfettiProvider />
          <ToastProvider />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
