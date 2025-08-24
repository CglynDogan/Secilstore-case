import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers/Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Secil Store - B2B Fashion Platform',
  description: 'Professional fashion collection management platform',
  keywords: 'fashion, B2B, collections, clothing, wholesale',
  authors: [{ name: 'Secil Store Team' }],
  viewport: 'width=device-width, initial-scale=1',
  icons: {
    icon: '/Secilstore.webp',
    apple: '/Secilstore.webp',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}