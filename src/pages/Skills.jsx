import { motion } from "framer-motion"
import skills from "../data/skills"

export default function Skills() {
    return (
        <div>
            <motion.header
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 className="text-3xl font-bold">Skills</h1>
                <p className="mt-2 text-gray-600 dark:text-gray-300 max-w-2xl">
                    Technologies and tools I use to design, build, and deploy software.
                </p>
            </motion.header>

            <section className="mt-8 grid gap-6 sm:grid-cols-2">
                {skills.map((group, i) => (
                    <motion.div
                        key={group.category}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="p-5 rounded-lg border bg-transparent dark:bg-gray-900 dark:border-gray-800"
                    >
                        <h2 className="text-lg font-semibold">{group.category}</h2>

                        <div className="mt-4 flex flex-wrap gap-2">
                            {group.items.map(skill => (
                                <span
                                    key={skill}
                                    className="text-sm text-text px-3 py-1 rounded bg-gray-100 dark:bg-gray-800 hover:bg-text hover:text-gray-100 dark:hover:text-gray-800 cursor-pointer"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </section>
        </div>
    )
}
