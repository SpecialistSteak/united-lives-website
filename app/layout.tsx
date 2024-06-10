import './css/globals.css';
import './css/Fork-Awesome-1.2.0/css/fork-awesome.min.css';
import './css/bootstrap.min.css';
import { Inter } from 'next/font/google';
import HeaderAndNavbar from '@/components/header-and-navbar';
import './window.d.ts';

export const metadata = {
  metadataBase: new URL('https://postgres-starter.vercel.app'),
  title: 'Vercel Postgres Demo',
  description:
    'A simple Next.js app with Vercel Postgres as the database',
}

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}><header><HeaderAndNavbar></HeaderAndNavbar></header>{children}</body>
    </html>
  )
}
