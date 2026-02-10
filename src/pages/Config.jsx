import CodeCard from "../components/CodeCard"
import { motion } from "motion/react"

export default function Config() {
    return (
        <motion.section className='flex justify-center' initial={{ y: 50 }} animate={{ y: 0 }}>
            <CodeCard variableName='bipinLamsal' data={{
                "tags": [
                    "Open source enthusiast",
                    "Indie game lover",
                    "System design nerd",
                    "Terminal dweller",
                    "Night owl developer",
                    "Linux advocate",
                ],
                "status": {
                    "currentMood": "🎵 Music Mode",
                    "availability": "Open to opportunities",
                    "lastSeen": "3hrs ago",
                    "energyLevel": "Fueled by coffee"
                },
                "currentlyListening": [
                    "The Search",
                    "Death Bed",
                    "Thank You",
                    "Eye of the Tiger"
                ],
                "quickFacts": [
                    "I use Arch, btw",
                    "Dark mode enthusiast",
                    "Coffee > Tea",
                    "Believes in 'Code that works > Perfect code'"
                ],
                "favoriteStack": {
                    "frontend": ["React", "JS", "CSS"],
                    "backend": "Node.js",
                    "database": "MongoDB",
                    "tools": ["Git", "VS-Code", "Vite"]
                },
                "preferredEnvironment": "Terminal + music + dark room",
                "availableFor": [
                    "Freelance projects",
                    "Full-time opportunities"
                ],
                "heroes": [
                    "Linus Torvalds (Linux)",
                    "Dennis Ritchie (C)",
                    "Richard Stallman (GNU)",
                    "Notch (Minecraft)",
                    "Red (Terraria)",
                    "Team Cherry (Hollow Knight)"
                ],
                "codingPhilosophy": "Ship fast, iterate faster",
                "whenNotCoding": [
                    "Watching anime",
                    "Listening to music",
                    "Doomscrolling Shorts"
                ],
                "achievements": [
                    "Fixed a bug by doing nothing",
                    "Solved an issue after explaining it to someone else",
                    "Spent 3 hours debugging a typo"
                ],
                "randomFact": "Can debug code better at 2 AM than 2 PM"
            }
            } />
        </motion.section >
    )
}