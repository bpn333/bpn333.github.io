import { motion } from "framer-motion"
import projects from "../data/projects"

export default function Projects() {
    return (
        <div>
            <motion.header
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 className="text-3xl font-bold">Projects</h1>
                <p className="mt-2 text-gray-600 dark:text-gray-300 max-w-2xl">
                    A collection of things I've built, experimented with, and learned from.
                </p>
            </motion.header>

            <section className="mt-8 grid gap-6 sm:grid-cols-2">
                {projects.map((project, i) => (
                    <motion.div
                        key={project.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="p-5 rounded-lg border bg-neutral-50 dark:bg-gray-900 dark:border-gray-800"
                    >
                        <h2 className="text-xl font-semibold">{project.name}</h2>

                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                            {project.description}
                        </p>

                        {project.tags && (
                            <div className="mt-3 flex flex-wrap gap-2">
                                {project.tags.map(tag => (
                                    <span
                                        key={tag}
                                        className="text-xs text-text px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 hover:bg-text hover:text-gray-100 dark:hover:text-gray-800 cursor-pointer"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}

                        <div className="mt-4 flex gap-4 text-sm">
                            {project.github && (
                                <a
                                    href={project.github}
                                    target="_blank"
                                    className="text-indigo-600 dark:text-indigo-300 hover:underline"
                                >
                                    GitHub
                                </a>
                            )}

                            {project.live && (
                                <a
                                    href={project.live}
                                    target="_blank"
                                    className="text-indigo-600 dark:text-indigo-300 hover:underline"
                                >
                                    Live demo
                                </a>
                            )}
                        </div>
                    </motion.div>
                ))}
            </section>
        </div>
    )
}
