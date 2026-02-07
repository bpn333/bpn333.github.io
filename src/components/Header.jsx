import { Link, NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Moon, SunDim, Menu } from 'lucide-react'

export default function Header({ theme, setTheme }) {
    const [open, setOpen] = useState(false);

    const navItem = ({ isActive }) =>
        isActive ? 'font-medium' : 'text-gray-600 dark:text-gray-300'

    return (
        <header className="bg-background text-text border-b dark:border-gray-800">
            <div className="mx-auto px-4 py-4 flex items-center justify-between 2xl:px-10">
                <Link to="/" className="text-xl font-semibold">i am bpn</Link>

                <nav className="hidden md:flex items-center gap-5 text-sm">
                    <NavLink to="/" className={navItem}>Home</NavLink>
                    <NavLink to="/projects" className={navItem}>Projects</NavLink>
                    <NavLink to="/skills" className={navItem}>Skills</NavLink>

                    <motion.button
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        whileTap={{ scale: 0.95 }}
                        className="ml-3 p-2 rounded bg-gray-100 dark:bg-gray-700 cursor-pointer"
                    >
                        {theme === 'dark' ? <SunDim /> : <Moon />}
                    </motion.button>
                </nav>

                <div className="flex md:hidden items-center gap-2">
                    <motion.button
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 rounded bg-gray-100 dark:bg-gray-700 cursor-pointer"
                    >
                        {theme === 'dark' ? <SunDim /> : <Moon />}
                    </motion.button>

                    <button
                        onClick={() => setOpen(!open)}
                        className="p-2 text-lg cursor-pointer"
                    >
                        <Menu />
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {open && (
                    <motion.nav
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="md:hidden px-4 pb-4 flex flex-col gap-3 text-sm"
                    >
                        <NavLink onClick={() => setOpen(false)} to="/" className={navItem}>Home</NavLink>
                        <NavLink onClick={() => setOpen(false)} to="/about" className={navItem}>About</NavLink>
                        <NavLink onClick={() => setOpen(false)} to="/projects" className={navItem}>Projects</NavLink>
                        <NavLink onClick={() => setOpen(false)} to="/skills" className={navItem}>Skills</NavLink>
                        <NavLink onClick={() => setOpen(false)} to="/contact" className={navItem}>Contact</NavLink>
                    </motion.nav>
                )}
            </AnimatePresence>
        </header>
    )
}
