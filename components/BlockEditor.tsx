"use client";

import { useState } from "react";

// Block types
export type BlockType = "heading" | "paragraph" | "code" | "list" | "image";

export interface ContentBlock {
    id: string;
    type: BlockType;
    data: Record<string, string | string[]>;
}

// Generate unique ID
function uid(): string {
    return Math.random().toString(36).slice(2, 9);
}

// Convert blocks to HTML
export function blocksToHtml(blocks: ContentBlock[]): string {
    return blocks
        .map((block) => {
            switch (block.type) {
                case "heading": {
                    const level = (block.data.level as string) || "2";
                    const text = (block.data.text as string) || "";
                    return `<h${level}>${escapeHtml(text)}</h${level}>`;
                }
                case "paragraph": {
                    const text = (block.data.text as string) || "";
                    // Convert line breaks to <br> and bold markers
                    const processed = escapeHtml(text)
                        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                        .replace(/\n/g, "<br>");
                    return `<p>${processed}</p>`;
                }
                case "code": {
                    const code = (block.data.code as string) || "";
                    return `<pre><code>${escapeHtml(code)}</code></pre>`;
                }
                case "list": {
                    const items = (block.data.items as string[]) || [];
                    const listType = (block.data.listType as string) || "ul";
                    const lis = items
                        .filter((item) => item.trim())
                        .map((item) => `  <li>${escapeHtml(item)}</li>`)
                        .join("\n");
                    return `<${listType}>\n${lis}\n</${listType}>`;
                }
                case "image": {
                    const url = (block.data.url as string) || "";
                    const alt = (block.data.alt as string) || "";
                    return `<img src="${escapeHtml(url)}" alt="${escapeHtml(alt)}" />`;
                }
                default:
                    return "";
            }
        })
        .join("\n\n");
}

// Parse HTML back to blocks (for editing existing posts)
export function htmlToBlocks(html: string): ContentBlock[] {
    if (!html.trim()) return [];

    const blocks: ContentBlock[] = [];
    // Simple regex-based parser
    const regex = /<(h[2-3]|p|pre|ul|ol|img)([^>]*)>([\s\S]*?)<\/\1>|<img([^>]*?)\/?>/g;
    let match;

    while ((match = regex.exec(html)) !== null) {
        const tag = match[1] || "img";
        const content = match[3] || "";

        if (tag === "h2" || tag === "h3") {
            blocks.push({
                id: uid(),
                type: "heading",
                data: { level: tag[1], text: stripHtml(content) },
            });
        } else if (tag === "p") {
            const text = content
                .replace(/<strong>(.*?)<\/strong>/g, "**$1**")
                .replace(/<br\s*\/?>/g, "\n")
                .replace(/<[^>]+>/g, "");
            blocks.push({
                id: uid(),
                type: "paragraph",
                data: { text },
            });
        } else if (tag === "pre") {
            const code = content.replace(/<\/?code>/g, "");
            blocks.push({
                id: uid(),
                type: "code",
                data: { code: unescapeHtml(code) },
            });
        } else if (tag === "ul" || tag === "ol") {
            const items: string[] = [];
            const liRegex = /<li>([\s\S]*?)<\/li>/g;
            let liMatch;
            while ((liMatch = liRegex.exec(content)) !== null) {
                items.push(stripHtml(liMatch[1]));
            }
            blocks.push({
                id: uid(),
                type: "list",
                data: { items, listType: tag },
            });
        }
    }

    // If no blocks were parsed, treat the whole thing as a paragraph
    if (blocks.length === 0 && html.trim()) {
        blocks.push({
            id: uid(),
            type: "paragraph",
            data: { text: stripHtml(html) },
        });
    }

    return blocks;
}

function escapeHtml(text: string): string {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

function unescapeHtml(text: string): string {
    return text
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"');
}

function stripHtml(html: string): string {
    return html.replace(/<[^>]+>/g, "").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/&quot;/g, '"');
}

// Block type metadata for UI
const BLOCK_TYPES: {
    type: BlockType;
    label: string;
    description: string;
    icon: string;
}[] = [
        { type: "heading", label: "Judul", description: "Sub judul bagian", icon: "H" },
        { type: "paragraph", label: "Paragraf", description: "Teks penjelasan", icon: "¶" },
        { type: "code", label: "Kode", description: "Contoh kode program", icon: "</>" },
        { type: "list", label: "Daftar", description: "Daftar poin-poin", icon: "•" },
    ];

interface BlockEditorProps {
    blocks: ContentBlock[];
    onChange: (blocks: ContentBlock[]) => void;
}

export default function BlockEditor({ blocks, onChange }: BlockEditorProps) {
    const [dragIndex, setDragIndex] = useState<number | null>(null);

    const addBlock = (type: BlockType) => {
        const newBlock: ContentBlock = {
            id: uid(),
            type,
            data: getDefaultData(type),
        };
        onChange([...blocks, newBlock]);
    };

    const updateBlock = (id: string, data: Record<string, string | string[]>) => {
        onChange(blocks.map((b) => (b.id === id ? { ...b, data } : b)));
    };

    const removeBlock = (id: string) => {
        onChange(blocks.filter((b) => b.id !== id));
    };

    const moveBlock = (fromIndex: number, toIndex: number) => {
        if (toIndex < 0 || toIndex >= blocks.length) return;
        const updated = [...blocks];
        const [moved] = updated.splice(fromIndex, 1);
        updated.splice(toIndex, 0, moved);
        onChange(updated);
    };

    return (
        <div className="space-y-3">
            {/* Blocks */}
            {blocks.map((block, index) => (
                <div
                    key={block.id}
                    draggable
                    onDragStart={() => setDragIndex(index)}
                    onDragOver={(e) => {
                        e.preventDefault();
                    }}
                    onDrop={() => {
                        if (dragIndex !== null && dragIndex !== index) {
                            moveBlock(dragIndex, index);
                        }
                        setDragIndex(null);
                    }}
                    onDragEnd={() => setDragIndex(null)}
                    className={`group rounded-xl border transition-all ${dragIndex === index
                            ? "border-accent/50 bg-accent/5 opacity-50"
                            : "border-card-border/30 bg-card-bg/30 hover:border-card-border/60"
                        }`}
                >
                    {/* Block Header */}
                    <div className="flex items-center gap-2 border-b border-card-border/20 px-3 py-2">
                        {/* Drag handle */}
                        <button
                            type="button"
                            className="cursor-grab text-muted/50 hover:text-muted active:cursor-grabbing"
                            title="Seret untuk memindahkan"
                        >
                            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                <circle cx="9" cy="6" r="1.5" />
                                <circle cx="15" cy="6" r="1.5" />
                                <circle cx="9" cy="12" r="1.5" />
                                <circle cx="15" cy="12" r="1.5" />
                                <circle cx="9" cy="18" r="1.5" />
                                <circle cx="15" cy="18" r="1.5" />
                            </svg>
                        </button>

                        {/* Block type label */}
                        <span className="rounded-md bg-accent/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent-light">
                            {BLOCK_TYPES.find((t) => t.type === block.type)?.label || block.type}
                        </span>

                        <div className="flex-1" />

                        {/* Move buttons */}
                        <button
                            type="button"
                            onClick={() => moveBlock(index, index - 1)}
                            disabled={index === 0}
                            className="rounded p-1 text-muted/50 transition-colors hover:text-foreground disabled:opacity-30"
                            title="Pindah ke atas"
                        >
                            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                            </svg>
                        </button>
                        <button
                            type="button"
                            onClick={() => moveBlock(index, index + 1)}
                            disabled={index === blocks.length - 1}
                            className="rounded p-1 text-muted/50 transition-colors hover:text-foreground disabled:opacity-30"
                            title="Pindah ke bawah"
                        >
                            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {/* Delete */}
                        <button
                            type="button"
                            onClick={() => removeBlock(block.id)}
                            className="rounded p-1 text-muted/50 transition-colors hover:text-red-400"
                            title="Hapus blok"
                        >
                            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Block Content */}
                    <div className="p-3">
                        <BlockInput block={block} onChange={(data) => updateBlock(block.id, data)} />
                    </div>
                </div>
            ))}

            {/* Empty State */}
            {blocks.length === 0 && (
                <div className="rounded-xl border border-dashed border-card-border/50 py-10 text-center">
                    <p className="mb-1 text-sm font-medium text-muted">Belum ada konten</p>
                    <p className="text-xs text-muted/70">Klik tombol di bawah untuk menambahkan blok konten</p>
                </div>
            )}

            {/* Add Block Buttons */}
            <div className="pt-2">
                <p className="mb-2 text-xs font-medium text-muted">+ Tambah Blok:</p>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {BLOCK_TYPES.map((bt) => (
                        <button
                            key={bt.type}
                            type="button"
                            onClick={() => addBlock(bt.type)}
                            className="flex items-center gap-2.5 rounded-xl border border-card-border/30 bg-card-bg/30 px-3 py-2.5 text-left transition-all hover:border-accent/30 hover:bg-card-bg/60"
                        >
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-xs font-bold text-accent-light">
                                {bt.icon}
                            </span>
                            <div>
                                <div className="text-sm font-medium text-foreground">{bt.label}</div>
                                <div className="text-[10px] text-muted">{bt.description}</div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

// Individual Block Input Components
function BlockInput({
    block,
    onChange,
}: {
    block: ContentBlock;
    onChange: (data: Record<string, string | string[]>) => void;
}) {
    switch (block.type) {
        case "heading":
            return <HeadingInput data={block.data} onChange={onChange} />;
        case "paragraph":
            return <ParagraphInput data={block.data} onChange={onChange} />;
        case "code":
            return <CodeInput data={block.data} onChange={onChange} />;
        case "list":
            return <ListInput data={block.data} onChange={onChange} />;
        default:
            return null;
    }
}

function HeadingInput({
    data,
    onChange,
}: {
    data: Record<string, string | string[]>;
    onChange: (data: Record<string, string | string[]>) => void;
}) {
    const level = (data.level as string) || "2";
    const text = (data.text as string) || "";

    return (
        <div className="flex gap-2">
            <select
                value={level}
                onChange={(e) => onChange({ ...data, level: e.target.value })}
                className="w-16 shrink-0 rounded-lg border border-card-border/30 bg-background px-2 py-2 text-sm text-foreground outline-none focus:border-accent/50"
            >
                <option value="2">H2</option>
                <option value="3">H3</option>
            </select>
            <input
                type="text"
                value={text}
                onChange={(e) => onChange({ ...data, text: e.target.value })}
                placeholder="Ketik judul bagian..."
                className={`w-full rounded-lg border border-card-border/30 bg-background px-3 py-2 text-foreground placeholder-muted/50 outline-none focus:border-accent/50 ${level === "2" ? "text-lg font-bold" : "text-base font-semibold"
                    }`}
            />
        </div>
    );
}

function ParagraphInput({
    data,
    onChange,
}: {
    data: Record<string, string | string[]>;
    onChange: (data: Record<string, string | string[]>) => void;
}) {
    return (
        <div>
            <textarea
                value={(data.text as string) || ""}
                onChange={(e) => onChange({ ...data, text: e.target.value })}
                placeholder="Tulis teks penjelasan di sini... (gunakan **teks** untuk membuat tulisan tebal)"
                rows={3}
                className="w-full resize-y rounded-lg border border-card-border/30 bg-background px-3 py-2 text-sm leading-relaxed text-foreground placeholder-muted/50 outline-none focus:border-accent/50"
            />
            <p className="mt-1 text-[10px] text-muted/60">
                Tip: Gunakan **teks tebal** untuk menebalkan kata
            </p>
        </div>
    );
}

function CodeInput({
    data,
    onChange,
}: {
    data: Record<string, string | string[]>;
    onChange: (data: Record<string, string | string[]>) => void;
}) {
    return (
        <textarea
            value={(data.code as string) || ""}
            onChange={(e) => onChange({ ...data, code: e.target.value })}
            placeholder={"// Tulis contoh kode di sini\nconsole.log('Hello World!');"}
            rows={5}
            className="w-full resize-y rounded-lg border border-card-border/30 bg-background px-3 py-2 font-mono text-sm text-foreground placeholder-muted/50 outline-none focus:border-accent/50"
        />
    );
}

function ListInput({
    data,
    onChange,
}: {
    data: Record<string, string | string[]>;
    onChange: (data: Record<string, string | string[]>) => void;
}) {
    const items = (data.items as string[]) || [""];
    const listType = (data.listType as string) || "ul";

    const updateItem = (index: number, value: string) => {
        const updated = [...items];
        updated[index] = value;
        onChange({ ...data, items: updated });
    };

    const addItem = () => {
        onChange({ ...data, items: [...items, ""] });
    };

    const removeItem = (index: number) => {
        if (items.length <= 1) return;
        onChange({ ...data, items: items.filter((_, i) => i !== index) });
    };

    return (
        <div className="space-y-2">
            {/* List type toggle */}
            <div className="flex gap-1">
                <button
                    type="button"
                    onClick={() => onChange({ ...data, listType: "ul" })}
                    className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${listType === "ul"
                            ? "bg-accent/20 text-accent-light"
                            : "text-muted hover:text-foreground"
                        }`}
                >
                    • Bullet
                </button>
                <button
                    type="button"
                    onClick={() => onChange({ ...data, listType: "ol" })}
                    className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${listType === "ol"
                            ? "bg-accent/20 text-accent-light"
                            : "text-muted hover:text-foreground"
                        }`}
                >
                    1. Nomor
                </button>
            </div>

            {/* Items */}
            {items.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                    <span className="w-6 shrink-0 text-center text-xs text-muted">
                        {listType === "ol" ? `${index + 1}.` : "•"}
                    </span>
                    <input
                        type="text"
                        value={item}
                        onChange={(e) => updateItem(index, e.target.value)}
                        placeholder={`Item ${index + 1}`}
                        className="w-full rounded-lg border border-card-border/30 bg-background px-3 py-1.5 text-sm text-foreground placeholder-muted/50 outline-none focus:border-accent/50"
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                addItem();
                            }
                        }}
                    />
                    <button
                        type="button"
                        onClick={() => removeItem(index)}
                        disabled={items.length <= 1}
                        className="shrink-0 rounded p-1 text-muted/40 transition-colors hover:text-red-400 disabled:opacity-30"
                    >
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            ))}

            <button
                type="button"
                onClick={addItem}
                className="flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs text-accent-light transition-colors hover:bg-accent/10"
            >
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Tambah item
            </button>
        </div>
    );
}

function getDefaultData(type: BlockType): Record<string, string | string[]> {
    switch (type) {
        case "heading":
            return { level: "2", text: "" };
        case "paragraph":
            return { text: "" };
        case "code":
            return { code: "" };
        case "list":
            return { items: [""], listType: "ul" };
        case "image":
            return { url: "", alt: "" };
        default:
            return {};
    }
}
