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
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                    Technologies and tools I use to design, build, and deploy software.
                </p>
            </motion.header>

            <section className="mt-8 grid gap-6 sm:grid-cols-2">
                {skills.map((group, i) => (
                    <motion.div
                        key={group.category}
                        className="p-5 rounded-lg border bg-neutral-50 dark:bg-gray-900 dark:border-gray-800"
                        variants={{
                            hidden: {
                                opacity: 0,
                                y: 20
                            },
                            show: {
                                opacity: 1,
                                y: 0,
                                transition: {
                                    delay: i * 0.08,
                                    staggerChildren: 0.05,
                                },
                            },
                        }}
                        initial="hidden"
                        whileInView="show"
                    >
                        <div className="flex gap-3 items-center">
                            <group.icon size={20} />
                            <h2 className="text-lg font-semibold">{group.category}</h2>
                        </div>
                        <p className="mt-3 text-sm">{group.desc}</p>

                        <div className="mt-4 flex flex-wrap gap-2">
                            {group.items.map((skill, index) => (
                                <motion.span
                                    key={skill}
                                    variants={{
                                        hidden: { opacity: 0, scale: 0.5 },
                                        show: {
                                            opacity: 1,
                                            scale: 1,
                                            transition: {
                                                type: "spring",
                                                stiffness: 300,
                                            },
                                        },
                                    }}
                                    whileHover={{
                                        y: -4,
                                        scale: 1.08,
                                    }}
                                    className="cursor-pointer rounded bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800"
                                >
                                    {skill}
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </section>
        </div>
    )
}
