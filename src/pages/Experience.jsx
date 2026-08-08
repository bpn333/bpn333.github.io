import { motion } from "framer-motion";
import experience from "../data/experience";

export default function Experience() {
  return (
    <div>
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold">Experience</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Companies and teams I've worked with while building real-world
          software.
        </p>
      </motion.header>

      <section className="mt-8 space-y-6">
        {experience.map((job, i) => (
          <motion.div
            key={job.company}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="rounded-lg border bg-neutral-50 p-5 sm:p-8 dark:border-gray-800 dark:bg-gray-900"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-xl font-semibold">{job.company}</h2>
              <span className="text-sm text-gray-500">{job.period}</span>
            </div>

            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              {job.location} •{" "}
              <a
                href={job.website}
                target="_blank"
                className="text-indigo-600 hover:underline dark:text-indigo-300"
              >
                Website
              </a>
            </p>

            {job.tags && (
              <div className="mt-4 flex flex-wrap gap-2">
                {job.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-text hover:bg-text cursor-pointer rounded bg-gray-100 px-3 py-1 text-sm hover:text-gray-100 dark:bg-gray-800 dark:hover:text-gray-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {job.testimonial && (
              <blockquote className="mt-5 border-l-4 pl-4 text-sm text-gray-700 italic dark:text-gray-300">
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

            {job.contacts && (
              <motion.div
                className="mt-3 flex justify-end gap-4"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={{
                  show: {
                    transition: {
                      staggerChildren: 0.08,
                    },
                  },
                }}
              >
                {job.contacts.map((dta, i) => (
                  <motion.a
                    key={dta.name}
                    href={dta.link}
                    target="_blank"
                    title={dta.name}
                    variants={{
                      hidden: {
                        opacity: 0,
                        y: 20,
                        scale: 0.8,
                      },
                      show: {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                      },
                    }}
                    whileHover={{
                      y: -6,
                      scale: 1.15,
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 18,
                    }}
                  >
                    <dta.icon />
                  </motion.a>
                ))}
              </motion.div>
            )}
          </motion.div>
        ))}
      </section>
    </div>
  );
}
