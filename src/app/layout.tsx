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
  title: "Alex Sosa — Product & Technology | AI-Native Builder",
  description:
    "I turn ideas and business problems into working digital products and AI-enabled workflows.",
  openGraph: {
    title: "Alex Sosa — Product & Technology | AI-Native Builder",
    description:
      "I turn ideas and business problems into working digital products and AI-enabled workflows.",
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
