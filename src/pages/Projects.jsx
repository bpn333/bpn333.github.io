import { motion } from "framer-motion";
import projects from "../data/projects";

export default function Projects() {
  return (
    <div>
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold">Projects</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          A collection of things I've built, experimented with, and learned
          from.
        </p>
      </motion.header>

      <section className="mt-8 grid gap-6 sm:grid-cols-2">
        {projects.map((project, i) => (
          <motion.div
            key={project.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="flex flex-col rounded-lg border bg-neutral-50 p-5 dark:border-gray-800 dark:bg-gray-900"
          >
            <h2 className="text-xl font-semibold">{project.name}</h2>

            <p className="mt-2 mb-4 text-sm text-gray-600 dark:text-gray-300">
              {project.description}
            </p>

            <div className="mt-auto flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-text hover:bg-text cursor-pointer rounded bg-gray-100 px-2 py-1 text-xs hover:text-gray-100 dark:bg-gray-800 dark:hover:text-gray-800"
                >
                  {tag}
                </span>
              ))}
            </div>

            {project.links && (
              <div className="mt-4 flex gap-4 text-sm">
                {Object.entries(project.links).map(([key, value], indx) => (
                  <a
                    key={indx}
                    href={value}
                    target="_blank"
                    className="text-indigo-600 hover:underline dark:text-indigo-300"
                  >
                    {key}
                  </a>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </section>
    </div>
  );
}
