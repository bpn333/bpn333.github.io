import { Youtube } from "lucide-react";
import contacts from "./contacts";

const onlineSections = [
  {
    title: "Contacts",
    description: "Reach out to me here.",
    items: [...contacts],
  },
  {
    title: "Domains I Use",
    description: "Websites and domains I use and manage.",
    items: [
      {
        name: "bpn.localplayer.dev",
        link: "https://bpn.localplayer.dev",
      },
      {
        name: "*.07032004.xyz",
        link: "https://07032004.xyz",
      },
    ],
  },
  {
    title: "Elsewhere",
    description: "A few extra corners of the internet where I exist.",
    items: [
      {
        icon: Youtube,
        name: "YouTube · @bpn333",
        link: "https://youtube.com/@bpn333",
      },
    ],
  },
];

export default onlineSections;
