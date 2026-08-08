import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Config from "./pages/Config";
import Experience from "./pages/Experience";
import Home from "./pages/Home";
import Online from "./pages/Online";
import Projects from "./pages/Projects";
import Skills from "./pages/Skills";

function App() {
  const [theme, setTheme] = useState(() =>
    document.documentElement.classList.contains("dark") ? "dark" : "light",
  );
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const root = document.documentElement;
    const isDark = root.classList.contains("dark");

    if (theme === "dark" && !isDark) root.classList.add("dark");
    if (theme === "light" && isDark) root.classList.remove("dark");

    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="bg-background text-text min-h-screen">
      <Header theme={theme} setTheme={setTheme} />
      <main className="mx-auto max-w-5xl px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/config" element={<Config />} />
          <Route path="/online" element={<Online />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
