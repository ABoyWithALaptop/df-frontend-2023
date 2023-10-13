import './globals.css'
import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import HeaderBar from '../components/HeaderBar'
import { ThemeProvider } from './theme-provider'
import { ContextProvider } from '../utils/context'
import Loading from '../components/loading'

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
        <ToastContainer
          position="top-right"
          autoClose={5000}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        {/* <Loading /> */}
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
