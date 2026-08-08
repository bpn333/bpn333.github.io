const baseTitle = "Bipin Lamsal";

export const DEFAULT_SEO = {
  title: `${baseTitle} - Full Stack Developer | React & Node.js Engineer`,
  description:
    "Bipin Lamsal is a Full Stack Developer specializing in React, Node.js, MongoDB, and modern web development.",
};

export const seoConfig = {
  "/": DEFAULT_SEO,

  "/projects": {
    title: `Projects - ${baseTitle}`,
    description:
      "Featured applications, experiments, and open-source work by Bipin Lamsal.",
  },

  "/skills": {
    title: `Skills - ${baseTitle}`,
    description:
      "Technical stack of Bipin including frontend, backend, databases, DevOps, and tools.",
  },

  "/experience": {
    title: `Experience - ${baseTitle}`,
    description:
      "Professional experience, roles, and real-world development work by Bipin Lamsal.",
  },

  "/config": {
    title: `Config - ${baseTitle}`,
    description:
      "Explore Bipin preferences, hobbies, favorite tools, coding philosophy, and a few questionable achievements.",
  },

  "/online": {
    title: `Online Presence - ${baseTitle}`,
    description:
      "Find Bipin across GitHub, LinkedIn, and other platforms. Contact and identity hub.",
  },
};
