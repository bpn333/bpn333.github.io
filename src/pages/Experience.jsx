import { motion } from "framer-motion"
import experience from "../data/experience"

export default function Experience() {
    return (
        <div>
            <motion.header
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 className="text-3xl font-bold">Experience</h1>
                <p className="mt-2 text-gray-600 dark:text-gray-300 max-w-2xl">
                    Companies and teams I've worked with while building real-world software.
                </p>
            </motion.header>

            <section className="mt-8 space-y-6">
                {experience.map((job, i) => (
                    <motion.div
                        key={job.company}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="p-5 sm:p-8 rounded-lg border bg-neutral-50 dark:bg-gray-900 dark:border-gray-800"
                    >
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                            <h2 className="text-xl font-semibold">{job.company}</h2>
                            <span className="text-sm text-gray-500">{job.period}</span>
                        </div>

                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                            {job.location} •{" "}
                            <a
                                href={job.website}
                                target="_blank"
                                className="text-indigo-600 dark:text-indigo-300 hover:underline"
                            >
                                Website
                            </a>
                        </p>

                        {job.tags && (
                            <div className="mt-4 flex flex-wrap gap-2">
                                {job.tags.map(tag => (
                                    <span
                                        key={tag}
                                        className="text-sm text-text px-3 py-1 rounded bg-gray-100 dark:bg-gray-800 hover:bg-text hover:text-gray-100 dark:hover:text-gray-800 cursor-pointer"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}

                        {job.testimonial && (
                            <blockquote className="mt-5 text-sm italic border-l-4 pl-4 text-gray-700 dark:text-gray-300">
                                “{job.testimonial.text}”
                                <div className="mt-1 text-xs">
                                    —{" "}
                                    <a
                                        href={job.testimonial.source}
                                        target="_blank"
                                        className="underline"
                                    >
                                        Source
                                    </a>
                                </div>
                            </blockquote>
                        )}
                    </motion.div>
                ))}
            </section>
        </div>
    )
}
