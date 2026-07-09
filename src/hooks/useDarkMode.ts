import { useEffect, useState } from 'react'

export const useDarkMode = () => {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const savedTheme = localStorage.getItem('theme')

    if (savedTheme) {
      setIsDark(savedTheme === 'dark')
    } else {
      setIsDark(prefersDark)
    }
  }, [])

  const toggle = () => {
    setIsDark(!isDark)
    localStorage.setItem('theme', !isDark ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark')
  }

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  return { isDark, toggle }
}
