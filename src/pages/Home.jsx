import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import contacts from '../data/contacts'

export default function Home() {
    return (
        <div>
            <motion.header initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                <h1 className="text-3xl font-bold">Hi — I am Bipin Lamsal.</h1>
                <p className="mt-2 text-gray-600">
                    I'm a final-year Computer Science Engineering student who enjoys building real,
                    working software instead of just prototypes. My work focuses on modern web
                    applications, performance, and clean system design.
                </p>
            </motion.header>

            <section className="mt-10">
                <motion.div
                    className="flex flex-col gap-10 justify-center md:flex-row md:gap-20 items-center"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <div className="w-56 h-56 rounded-full overflow-hidden shadow">
                        <img src="/imgs/bipin.jpg" alt="chill" className="w-full h-full object-cover" />
                    </div>

                    <div className="flex-1/2 grow-0">
                        <h2 className="text-2xl font-bold">Something About Me!</h2>
                        <p className='mt-3 text-gray-700 dark:text-gray-300'>
                            Name : Bipin Lamsal<br />
                            DOB : 2004 March 07<br />
                            Sex : Male<br />
                            Education : Computer Science Engineer<br />
                            Email : <a href="mailto:bipinlamsal2004@gmail.com" className='text-indigo-600 dark:text-indigo-300'>bipinlamsal2004@gmail.com</a><br />
                            Religion: Hindu<br />
                        </p>
                        <div className='mt-3 flex gap-5 items-center'>
                            {
                                contacts?.map((dta) => (
                                    <a key={dta.name} href={dta.link} title={dta.name}>
                                        <dta.icon className="hover:text-indigo-600 dark:hover:text-indigo-300" />
                                    </a>
                                ))
                            }
                        </div>
                        <div className="mt-4 flex gap-5">
                            <Link to="/projects" className="px-4 py-2 bg-indigo-600 text-white rounded">See projects</Link>
                            <Link to="/skills" className="px-4 py-2 border rounded">Skills</Link>
                        </div>
                    </div>
                </motion.div>
            </section>
        </div>
    )
}
