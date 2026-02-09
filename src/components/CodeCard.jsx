import React, { useState } from "react";
import { ClipboardCopy } from "lucide-react";

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

const renderValue = (value, indent = 0) => {
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
                        <Ln no={line++} />
                        {"  ".repeat(indent + 1)}
                        {renderValue(v, indent + 1)}
                        {i < value.length - 1 && ","}
                        {"\n"}
                    </React.Fragment>
                ))}
                <Ln no={line++} />
                {"  ".repeat(indent)}
                {"]"}
            </>
        );
    }

    if (typeof value === "object" && value !== null) {
        return renderObject(value, indent + 1);
    }

    return null;
};

let line = 1;

const renderObject = (obj, indent = 0) => {
    const entries = Object.entries(obj);

    return (
        <>
            {"{"}
            {"\n"}
            {entries.map(([k, v], i) => (
                <React.Fragment key={k}>
                    <Ln no={line++} />
                    {"  ".repeat(indent)}
                    <Key>{k}</Key>: {renderValue(v, indent)}
                    {i < entries.length - 1 && ","}
                    {"\n"}
                </React.Fragment>
            ))}
            <Ln no={line++} />
            {"  ".repeat(Math.max(indent - 1, 0))}
            {"}"}
        </>
    );
};


const CodeCard = ({ data, variableName = "dev" }) => {
    line = 1;
    const raw = `const ${variableName} = ${JSON.stringify(data, null, 4)};\n\n${variableName}.init();`;
    const [justCopied, setJustCopied] = useState(false);

    const handleDownload = () => {
        const url = URL.createObjectURL(new Blob([raw], { type: "text/javascript" }));
        const a = document.createElement("a");
        a.href = url;
        a.download = `${variableName}.js`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(raw);
            setJustCopied(true);
            setTimeout(() => setJustCopied(false), 800);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };


    return (
        <div className="w-full rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-lg bg-neutral-50 dark:bg-zinc-900 text-xs sm:text-sm group relative">
            <div className="flex items-center justify-between px-4 py-3 bg-neutral-200 dark:bg-zinc-950 border-b border-neutral-200 dark:border-neutral-800">
                <div className="flex gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-800" />
                    <span className="w-3 h-3 rounded-full bg-yellow-400 hover:bg-yellow-700" />
                    <span className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-800" />
                </div>
                <span className="text-xs text-neutral-500 dark:text-neutral-400 tracking-wide cursor-pointer hover:underline" onClick={handleDownload}>
                    {variableName}.js
                </span>
            </div>

            <div className="absolute hidden rounded right-5 top-12 p-2 bg-neutral-200 dark:bg-zinc-950/50 cursor-pointer items-center gap-1 group-hover:flex" onClick={handleCopy}>
                {justCopied && "Copied !"}<ClipboardCopy />
            </div>

            <pre
                className="font-roboto py-5 px-3 sm:px-6 leading-relaxed text-neutral-800 dark:text-neutral-100 whitespace-pre-wrap wrap-break-word overflow-x-auto" >
                <Ln no={line++} />const <Var>{variableName}</Var> ={" "}
                {renderObject(data, 1)}
                {";\n\n"}
                <Ln no={line++} /><Var>{variableName}</Var>.init();
            </pre>
        </div>
    );
};

export default CodeCard;
