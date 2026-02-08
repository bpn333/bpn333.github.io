import { Link, NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Moon, SunDim, Menu } from 'lucide-react'

export default function Header({ theme, setTheme }) {
    const [open, setOpen] = useState(false);

    const navItem = ({ isActive }) =>
        isActive ? 'font-medium' : 'text-gray-600 dark:text-gray-300'

    const links = [
        {
            name: "Home",
            path: "/"
        },
        {
            name: "Projects",
            path: "/projects",
        },
        {
            name: "Skills",
            path: "/skills"
        },
        {
            name: "Experience",
            path: "/experience"
        }
    ]

    return (
        <header className="bg-background text-text border-b border-gray-300 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                <Link to="/" className="text-xl font-semibold">i am bpn</Link>

                <nav className="hidden sm:flex items-center gap-5 text-sm">

                    {
                        links.map((dta) => (
                            <NavLink to={dta.path} className={navItem} key={dta.name}>{dta.name}</NavLink>
                        ))
                    }

                    <motion.button
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        whileTap={{ scale: 0.95 }}
                        className="ml-3 p-2 rounded bg-gray-100 dark:bg-gray-700 cursor-pointer"
                    >
                        {theme === 'dark' ? <SunDim /> : <Moon />}
                    </motion.button>
                </nav>

                <div className="flex sm:hidden items-center gap-2">
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
                        className="sm:hidden px-4 pb-4 flex flex-col gap-3 text-sm"
                    >
                        {
                            links.map((dta) => (
                                <NavLink
                                    key={dta.name}
                                    onClick={() => setOpen(false)}
                                    to={dta.path}
                                    className={navItem}
                                >{dta.name}</NavLink>
                            ))
                        }
                    </motion.nav>
                )}
            </AnimatePresence>
        </header>
    )
}
