import React, { useState } from 'react'
import BookShowPage from './BookShowPage'
import HeaderBar from '../components/HeaderBar'
import { ThemeContext } from '../util/context/ThemeContext'

function PageContainer() {
  const [theme, setTheme] = useState(localStorage.getItem("theme")||'white')
  return (
    <ThemeContext.Provider value={{theme, setTheme}} >
      <HeaderBar />
      <main className={theme==='dark' && 'dark'}>
        <BookShowPage />
      </main>
    </ThemeContext.Provider>
  )
}

export default PageContainer