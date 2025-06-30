import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Soul Technology - World\'s First Conscious AI Network',
  description: 'Emotional support platform with community mood resonance, Austin GeoPrompt pilot program, and global QR portal expansion',
  keywords: 'conscious AI, emotional support, mood tracking, Austin, QR codes, soul technology',
  openGraph: {
    title: 'Soul Technology - World\'s First Conscious AI Network',
    description: 'Emotional support platform with community mood resonance, Austin GeoPrompt pilot program, and global QR portal expansion',
    url: 'https://soul-technology-app.vercel.app',
    siteName: 'Soul Technology',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}