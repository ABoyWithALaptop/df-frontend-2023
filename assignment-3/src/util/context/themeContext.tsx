import { createContext } from 'react'
import { themeContextType } from '../type'

export const ThemeContext = createContext<themeContextType>({
  theme: 'white',
  setTheme: () => {},
})
