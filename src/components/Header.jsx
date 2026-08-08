import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, SunDim } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { links } from "../data/navLinks";

export default function Header({ theme, setTheme }) {
  const [open, setOpen] = useState(false);

  const navItem = ({ isActive }) =>
    isActive ? "font-medium" : "text-gray-600 dark:text-gray-300";

  return (
    <header className="bg-background text-text border-b border-gray-300 dark:border-gray-800">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link to="/" className="text-xl font-semibold">
          i am bpn
        </Link>

        <nav className="hidden items-center gap-5 text-sm sm:flex">
          {links.map((dta) => (
            <NavLink to={dta.path} className={navItem} key={dta.name}>
              {dta.name}
            </NavLink>
          ))}

          <motion.button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            whileTap={{ scale: 0.95 }}
            className="ml-3 cursor-pointer rounded bg-gray-100 p-2 dark:bg-gray-700"
            aria-label={
              theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {theme === "dark" ? <SunDim /> : <Moon />}
          </motion.button>
        </nav>

        <div className="flex items-center gap-2 sm:hidden">
          <motion.button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer rounded bg-gray-100 p-2 dark:bg-gray-700"
            aria-label={
              theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {theme === "dark" ? <SunDim /> : <Moon />}
          </motion.button>

          <button
            onClick={() => setOpen(!open)}
            className="cursor-pointer p-2 text-lg"
            aria-label="Toggle Menu"
          >
            <Menu />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="flex flex-col gap-3 px-4 pb-4 text-sm sm:hidden"
          >
            {links.map((dta) => (
              <NavLink
                key={dta.name}
                onClick={() => setOpen(false)}
                to={dta.path}
                className={navItem}
              >
                {dta.name}
              </NavLink>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
