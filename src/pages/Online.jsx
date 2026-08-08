import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import online from "../data/online";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

export default function Online() {
  return (
    <div>
      <motion.header
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <h1 className="text-3xl font-bold">Online Presence</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          On most online platforms, I go by bpn333. This is where you can find
          me across the web, from work-related links to the occasional random
          drop.
        </p>
      </motion.header>

      <motion.a
        target="_blank"
        href="mailto:work@07032004.xyz?subject=Hiring%20For%20Work%20%7C%20From%20Portfolio"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: [1.05, 0.98, 1] }}
        transition={{ duration: 0.6 }}
        className="relative mt-5 inline-flex items-center gap-3 overflow-hidden rounded bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 px-6 py-3 font-medium text-white shadow-[0_0_0px_rgba(168,85,247,0.0)] hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500"
      >
        {/* rotating gradient border aura */}
        <span className="absolute inset-0 rounded-xl p-px">
          <span className="absolute -inset-0.5 animate-[spin_4s_linear_infinite] rounded-xl bg-[conic-gradient(from_0deg,indigo,purple,pink,indigo)] opacity-70 blur-md" />
        </span>
        <span className="relative z-10 flex items-center gap-3">
          <Mail size={18} />
          Email for work
        </span>
      </motion.a>

      <motion.section
        className="mt-6 space-y-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {online.map((section) => (
          <motion.div
            key={section.title}
            variants={item}
            className="rounded-lg border border-gray-200 bg-neutral-50 p-5 dark:border-gray-800 dark:bg-gray-900"
          >
            <div>
              <h2 className="text-lg font-semibold">{section.title}</h2>
              {section.description && (
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                  {section.description}
                </p>
              )}
            </div>

            <motion.div
              className="mt-4 flex flex-wrap gap-3"
              variants={container}
            >
              {section.items.map((itemData) => {
                const Icon = itemData.icon;

                return (
                  <motion.a
                    key={itemData.name}
                    href={itemData.link}
                    target="_blank"
                    rel="noreferrer"
                    variants={item}
                    className="text-text inline-flex items-center gap-2 rounded border border-gray-300 px-3 py-2 text-sm transition-[background-color] hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
                  >
                    {Icon ? (
                      <Icon size={16} />
                    ) : (
                      <span className="h-2 w-2 rounded-full bg-indigo-500" />
                    )}
                    {itemData.name}
                  </motion.a>
                );
              })}
            </motion.div>
          </motion.div>
        ))}
      </motion.section>
    </div>
  );
}
