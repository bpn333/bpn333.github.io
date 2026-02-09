import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Skills from './pages/Skills'
import Experience from './pages/Experience'
import Config from './pages/Config'

function App() {
  const [theme, setTheme] = useState(
    () => document.documentElement.classList.contains('dark') ? "dark" : "light"
  );
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname])

  useEffect(() => {
    const root = document.documentElement
    const isDark = root.classList.contains('dark')

    if (theme === 'dark' && !isDark) root.classList.add('dark')
    if (theme === 'light' && isDark) root.classList.remove('dark')

    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <div className="min-h-screen bg-background text-text">
      <Header theme={theme} setTheme={setTheme} />
      <main className="max-w-5xl mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/projects' element={<Projects />} />
          <Route path='/skills' element={<Skills />} />
          <Route path='/experience' element={<Experience />} />
          <Route path='/config' element={<Config />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
