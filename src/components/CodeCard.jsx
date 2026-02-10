import React, { useState } from "react";
import { ClipboardCopy, Terminal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";

const Ln = ({ no }) => (
    <span className="select-none text-neutral-400 dark:text-neutral-600 mr-4">
        {no.toString().padStart(2, "0")}
    </span>
);

const Key = ({ children }) => (
    <span className="text-purple-600 dark:text-purple-400">{children}</span>
);

const Str = ({ children }) => (
    <span className="text-emerald-600 dark:text-emerald-400">
        '{children}'
    </span>
);

const Var = ({ children }) => (
    <span className="text-amber-600 dark:text-amber-300">{children}</span>
);

const Bool = ({ children }) => (
    <span className="text-blue-600 dark:text-blue-400">{children}</span>
);

const renderValue = (value, indent = 0, lineCounter) => {
    if (typeof value === "string") return <Str>{value}</Str>;
    if (typeof value === "boolean") return <Bool>{value.toString()}</Bool>;
    if (typeof value === "number") return <Bool>{value}</Bool>;

    if (Array.isArray(value)) {
        return (
            <>
                {"["}
                {"\n"}
                {value.map((v, i) => (
                    <React.Fragment key={i}>
                        <Ln no={lineCounter.current++} />
                        {"  ".repeat(indent + 1)}
                        {renderValue(v, indent + 1, lineCounter)}
                        {i < value.length - 1 && ","}
                        {"\n"}
                    </React.Fragment>
                ))}
                <Ln no={lineCounter.current++} />
                {"  ".repeat(indent)}
                {"]"}
            </>
        );
    }

    if (typeof value === "object" && value !== null) {
        return renderObject(value, indent + 1, lineCounter);
    }

    return null;
};

const renderObject = (obj, indent = 0, lineCounter) => {
    const entries = Object.entries(obj);

    return (
        <>
            {"{"}
            {"\n"}
            {entries.map(([k, v], i) => (
                <React.Fragment key={k}>
                    <Ln no={lineCounter.current++} />
                    {"  ".repeat(indent)}
                    <Key>{k}</Key>: {renderValue(v, indent, lineCounter)}
                    {i < entries.length - 1 && ","}
                    {"\n"}
                </React.Fragment>
            ))}
            <Ln no={lineCounter.current++} />
            {"  ".repeat(Math.max(indent - 1, 0))}
            {"}"}
        </>
    );
};

const generateMarkdown = (data, variableName) => {
    let md = `# ${variableName}\n\n`;

    const formatValue = (val, level = 0) => {
        const indent = "  ".repeat(level);

        if (Array.isArray(val)) {
            return val.map(item => `${indent}- ${typeof item === 'object' ? JSON.stringify(item) : item}`).join('\n');
        }

        if (typeof val === 'object' && val !== null) {
            return Object.entries(val)
                .map(([k, v]) => {
                    if (Array.isArray(v)) {
                        return `${indent}**${k}:**\n${formatValue(v, level + 1)}`;
                    } else if (typeof v === 'object' && v !== null) {
                        return `${indent}**${k}:**\n${formatValue(v, level + 1)}`;
                    }
                    return `${indent}**${k}:** ${v}`;
                })
                .join('\n');
        }

        return `${indent}${val}`;
    };

    Object.entries(data).forEach(([key, value]) => {
        md += `## ${key}\n`;
        md += formatValue(value) + '\n\n';
    });

    return md;
};

const generateTerminal = (data, variableName) => {
    let output = `$ node ${variableName}.js\n\n`;
    output += `Initializing ${variableName}...\n\n`;

    const formatTerminalValue = (val, prefix = '') => {
        if (Array.isArray(val)) {
            return val.map((item, i) => `${prefix}  [${i}] ${typeof item === 'object' ? JSON.stringify(item, null, 2) : item}`).join('\n');
        }

        if (typeof val === 'object' && val !== null) {
            return Object.entries(val)
                .map(([k, v]) => {
                    if (Array.isArray(v)) {
                        return `${prefix}${k}:\n${formatTerminalValue(v, prefix + '  ')}`;
                    } else if (typeof v === 'object' && v !== null) {
                        return `${prefix}${k}:\n${formatTerminalValue(v, prefix + '  ')}`;
                    }
                    return `${prefix}${k}: ${v}`;
                })
                .join('\n');
        }

        return `${prefix}${val}`;
    };

    Object.entries(data).forEach(([key, value]) => {
        output += `━━━ ${key} ━━━\n`;
        output += formatTerminalValue(value) + '\n\n';
    });

    output += `\n✓ ${variableName}.init() completed successfully\n`;
    output += `✓ All systems operational\n`;

    return output;
};

const CodeCard = ({ data, variableName = "dev" }) => {
    const lineCounter = React.useRef(1);
    const navigate = useNavigate();
    const raw = `const ${variableName} = ${JSON.stringify(data, null, 4)};\n\n${variableName}.init();`;
    const [justCopied, setJustCopied] = useState(false);
    const [currentTab, setCurrentTab] = useState(0);

    const markdown = generateMarkdown(data, variableName);
    const terminal = generateTerminal(data, variableName);

    const handleDownload = () => {
        const extensions = { 0: 'js', 1: 'txt', 2: 'md' };
        const contents = { 0: raw, 1: terminal, 2: markdown };

        const url = URL.createObjectURL(
            new Blob([contents[currentTab]], {
                type: currentTab === 0 ? "text/javascript" : "text/plain"
            })
        );
        const a = document.createElement("a");
        a.href = url;
        a.download = `${variableName}.${extensions[currentTab]}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    const handleCopy = async () => {
        try {
            const contents = { 0: raw, 1: terminal, 2: markdown };
            await navigator.clipboard.writeText(contents[currentTab]);
            setJustCopied(true);
            setTimeout(() => setJustCopied(false), 800);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    const renderContent = () => {
        lineCounter.current = 1;

        if (currentTab === 0) {
            // JavaScript view
            return (
                <pre className="font-roboto py-5 px-3 sm:px-6 leading-relaxed text-neutral-800 dark:text-neutral-100 whitespace-pre-wrap wrap-break-word overflow-x-auto">
                    <Ln no={lineCounter.current++} />const <Var>{variableName}</Var> ={" "}
                    {renderObject(data, 1, lineCounter)}
                    {";\n"}
                    <Ln no={lineCounter.current++} />{"\n"}
                    <Ln no={lineCounter.current++} /><Var>{variableName}</Var>.init();
                </pre>
            );
        } else if (currentTab === 1) {
            // Terminal view
            return (
                <pre className="font-roboto py-5 px-3 sm:px-6 leading-relaxed text-green-600 dark:text-green-400 whitespace-pre-wrap overflow-x-auto">
                    {terminal}
                </pre>
            );
        } else {
            // Markdown view
            return (
                <pre className="font-roboto py-5 px-3 sm:px-6 leading-relaxed text-neutral-800 dark:text-neutral-300 whitespace-pre-wrap overflow-x-auto">
                    {markdown}
                </pre>
            );
        }
    };

    return (
        <div className="w-full rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-lg bg-neutral-50 dark:bg-zinc-900 text-xs sm:text-sm group relative">
            <div className="flex items-center justify-between px-4 py-3 bg-neutral-200 dark:bg-zinc-950 border-b border-neutral-200 dark:border-neutral-800">
                <div className="flex gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-800" onClick={() => navigate('/')} />
                    <span className="w-3 h-3 rounded-full bg-yellow-400 hover:bg-yellow-700" onClick={() => (document.fullscreenElement) && document.exitFullscreen()} />
                    <span className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-800" onClick={() => document.documentElement.requestFullscreen?.()} />
                </div>
                <AnimatePresence mode="wait">
                    <motion.span
                        className="text-xs text-neutral-500 dark:text-neutral-400 tracking-wide cursor-pointer hover:underline"
                        onClick={handleDownload}
                        key={currentTab}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -25 }}
                        transition={{ ease: "linear" }}
                    >
                        {variableName}.{currentTab === 0 ? 'js' : currentTab === 1 ? 'txt' : 'md'}
                    </motion.span>
                </AnimatePresence>
            </div>

            <div className="absolute hidden rounded right-3 top-12 p-2 bg-neutral-200 dark:bg-zinc-950/50 cursor-pointer items-center gap-1 group-hover:flex" onClick={handleCopy}>
                {justCopied && "Copied !"}<ClipboardCopy />
            </div>

            <div className="flex mx-3 mt-3 sm:ml-6 sm:w-fit rounded overflow-hidden items-center">
                <div
                    className={`flex p-5 border-b-2 cursor-pointer h-5 gap-3 items-center hover:bg-neutral-200 hover:dark:bg-zinc-800 ${currentTab == 0 ? "border-amber-300 bg-neutral-200 dark:bg-zinc-800" : "border-b-transparent bg-neutral-100 dark:bg-zinc-950"}`}
                    onClick={() => setCurrentTab(0)}
                >
                    <motion.span
                        className="fill-amber-300 w-5"
                        animate={{ rotate: currentTab === 0 ? [0, 5, -5, 0] : 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>JavaScript</title><path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z" /></svg>
                    </motion.span>
                    <span className="hidden min-[460px]:block">JavaScript</span>
                </div>
                <div
                    className={`flex p-5 border-b-2 cursor-pointer h-5 gap-3 items-center hover:bg-neutral-200 hover:dark:bg-zinc-800 ${currentTab == 1 ? "border-green-600 bg-neutral-200 dark:bg-zinc-800" : "border-b-transparent bg-neutral-100 dark:bg-zinc-950"}`}
                    onClick={() => setCurrentTab(1)}
                >
                    <motion.span
                        className="w-5"
                        animate={{ rotate: currentTab === 1 ? [0, 5, -5, 0] : 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Terminal className="text-green-600" />
                    </motion.span>
                    <span className="hidden min-[460px]:block">Terminal</span>
                </div>
                <div
                    className={`flex p-5 border-b-2 cursor-pointer h-5 gap-3 items-center hover:bg-neutral-200 hover:dark:bg-zinc-800 ${currentTab == 2 ? "border-blue-500 bg-neutral-200 dark:bg-zinc-800" : "border-b-transparent bg-neutral-100 dark:bg-zinc-950"}`}
                    onClick={() => setCurrentTab(2)}
                >
                    <motion.span
                        className="fill-blue-500 w-5"
                        animate={{ rotate: currentTab === 2 ? [0, 5, -5, 0] : 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Markdown</title><path d="M22.27 19.385H1.73A1.73 1.73 0 010 17.655V6.345a1.73 1.73 0 011.73-1.73h20.54A1.73 1.73 0 0124 6.345v11.308a1.73 1.73 0 01-1.73 1.731zM5.769 15.923v-4.5l2.308 2.885 2.307-2.885v4.5h2.308V8.078h-2.308l-2.307 2.885-2.308-2.885H3.46v7.847zM21.232 12h-2.309V8.077h-2.307V12h-2.308l3.461 4.039z" /></svg>
                    </motion.span>
                    <span className="hidden min-[460px]:block">Markdown</span>
                </div>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentTab}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                    {renderContent()}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default CodeCard;