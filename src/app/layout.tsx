import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Alex Sosa — Product & Technology Leader",
  description:
    "Product & Technology Leader with 20+ years building interactive digital products across gaming, fintech, SmartTV, mobile, UX, gamification, and AI-assisted workflows.",
  openGraph: {
    title: "Alex Sosa — Product & Technology Leader",
    description:
      "Building digital products through technology, UX, AI and interactive experiences.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen bg-[#040810]">{children}</body>
    </html>
  )
}
