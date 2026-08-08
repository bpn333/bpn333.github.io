import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import contacts from "../data/contacts";

export default function Home() {
  return (
    <div>
      <motion.header
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <h1 className="text-3xl font-bold">Hi — I am Bipin Lamsal.</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          I'm a Computer Science Engineer who enjoys building software that
          people can actually use. I focus on modern web technologies, scalable
          backend systems, and creating experiences that are fast, reliable, and
          thoughtfully designed.
        </p>
      </motion.header>

      <section className="mt-10">
        <motion.div
          className="flex flex-col items-center justify-center gap-10 sm:flex-row sm:gap-25"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="size-63 overflow-hidden rounded-full shadow sm:size-70">
            <img
              src="/imgs/bipin.jpg"
              alt="Bipin Lamsal"
              fetchPriority="high"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex-1/2 grow-0">
            <h2 className="text-2xl font-bold">Something About Me!</h2>
            <p className="mt-4 text-gray-700 dark:text-gray-300">
              Name : Bipin Lamsal
              <br />
              Sex : Male
              <br />
              DOB :{" "}
              <a
                target="_blank"
                href="https://07032004.xyz"
                className="text-indigo-600 dark:text-indigo-300"
              >
                07 March, 2004{" "}
              </a>
              <br />
              Profession : Software Engineer
              <br />
              Email :{" "}
              <a
                target="_blank"
                href="mailto:bipinlamsal2004@gmail.com"
                className="text-indigo-600 dark:text-indigo-300"
              >
                bipinlamsal2004@gmail.com
              </a>
              <br />
              Religion: Hindu
              <br />
              Location: Burari, Delhi
              <br />
            </p>
            <motion.div
              className="mt-4 flex items-center"
              initial={{ gap: "0px", x: -20 }}
              animate={{ gap: "15px", x: 0 }}
            >
              {contacts?.map((dta) => (
                <motion.a
                  key={dta.name}
                  href={dta.link}
                  target="_blank"
                  title={dta.name}
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
            <div className="mt-4 flex gap-5">
              <Link
                to="/projects"
                className="rounded border border-indigo-600 bg-indigo-600 px-4 py-2 text-neutral-50 hover:bg-neutral-50 hover:text-indigo-600"
              >
                See projects
              </Link>
              <Link
                to="/online"
                className="text-text bg-background hover:text-background hover:bg-text rounded border px-4 py-2"
              >
                Hire me
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
