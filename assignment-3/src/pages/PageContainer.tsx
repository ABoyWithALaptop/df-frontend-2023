import React, { useMemo, useState } from 'react'
import BookShowPage from './BookShowPage'
import HeaderBar from '../components/HeaderBar'
import { ThemeContext } from '../util/context/themeContext'

function PageContainer() {
  const [theme, setTheme] = useState<string>(
    localStorage.getItem('theme') || 'white',
  )
  const value = useMemo(() => ({ theme, setTheme }), [theme])
  return (
    <ThemeContext.Provider value={value}>
      <HeaderBar />
      <main className={theme === 'dark' ? 'dark' : undefined}>
        <BookShowPage />
      </main>
    </ThemeContext.Provider>
  )
}

export default PageContainer
