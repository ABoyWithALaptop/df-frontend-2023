import './globals.css'
import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import HeaderBar from '../components/HeaderBar'
import { ThemeProvider } from './theme-provider'
import { ContextProvider } from '../utils/context'

const inter = DM_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} h-full`}>
        <ThemeProvider attribute="class">
          <ContextProvider>
            <HeaderBar />
            {children}
          </ContextProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
