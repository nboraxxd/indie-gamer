import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import NavBar from '@/components/NavBar'
import { exo2, orbitron } from '@/app/font'
import './globals.css'

interface LayoutProps {
  children: ReactNode
}

export const metadata: Metadata = {
  title: {
    default: 'Indie Gamer',
    template: '%s | Indie Gamer',
  },
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en" className={`${orbitron.variable} ${exo2.variable}`}>
      <body>
        <div className="bg-orange-50">
          <div className="mx-auto flex flex-col min-h-screen max-w-[80rem] px-4 py-2">
            <header>
              <NavBar />
            </header>

            <main className="grow py-3">{children}</main>

            <footer className="py-3 border-t border-t-3 text-slate-500 text-xs text-center">
              Game data and images courtesy of{' '}
              <a href="https://rawg.io/" target="_blank" className="text-orange-800 transition hover:underline">
                RAWG
              </a>{' '}
              | Deployed on Vercel
            </footer>
          </div>
        </div>
      </body>
    </html>
  )
}
