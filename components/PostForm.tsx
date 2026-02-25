"use client";

import { useState, useEffect } from "react";
import { generateSlug } from "@/lib/posts";
import BlockEditor, {
    blocksToHtml,
    htmlToBlocks,
    type ContentBlock,
} from "./BlockEditor";

interface PostFormProps {
    initialData?: {
        title: string;
        slug: string;
        excerpt: string;
        content: string;
        category: string;
        date: string;
    };
    onSubmit: (data: {
        title: string;
        slug: string;
        excerpt: string;
        content: string;
        category: string;
        date: string;
    }) => Promise<void>;
    submitLabel: string;
    isLoading: boolean;
}

const SUGGESTED_CATEGORIES = [
    "Web Development",
    "Programming",
    "Framework",
    "Database",
    "DevOps",
    "Design",
    'Networking'
];

export default function PostForm({
    initialData,
    onSubmit,
    submitLabel,
    isLoading,
}: PostFormProps) {
    const [title, setTitle] = useState(initialData?.title || "");
    const [slug, setSlug] = useState(initialData?.slug || "");
    const [excerpt, setExcerpt] = useState(initialData?.excerpt || "");
    const [category, setCategory] = useState(initialData?.category || "");
    const [date, setDate] = useState(
        initialData?.date || new Date().toISOString().split("T")[0]
    );
    const [blocks, setBlocks] = useState<ContentBlock[]>(
        initialData?.content ? htmlToBlocks(initialData.content) : []
    );
    const [showPreview, setShowPreview] = useState(false);
    const [autoSlug, setAutoSlug] = useState(!initialData);

    // Auto-generate slug from title
    useEffect(() => {
        if (autoSlug && title) {
            setSlug(generateSlug(title));
        }
    }, [title, autoSlug]);

    // Generate HTML from blocks
    const generatedHtml = blocksToHtml(blocks);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSubmit({
            title,
            slug,
            excerpt,
            content: generatedHtml,
            category,
            date,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
                <label
                    htmlFor="title"
                    className="mb-2 block text-sm font-medium text-foreground"
                >
                    Judul <span className="text-red-400">*</span>
                </label>
                <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Contoh: Pengenalan HTML & CSS"
                    required
                    className="w-full rounded-xl border border-card-border/50 bg-card-bg px-4 py-3 text-foreground placeholder-muted/50 outline-none transition-colors focus:border-accent/50 focus:ring-2 focus:ring-accent/20"
                />
            </div>

            {/* Slug */}
            <div>
                <label
                    htmlFor="slug"
                    className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground"
                >
                    Slug (URL)
                    <button
                        type="button"
                        onClick={() => setAutoSlug(!autoSlug)}
                        className={`rounded-full px-2 py-0.5 text-xs transition-colors ${autoSlug
                            ? "bg-accent/20 text-accent-light"
                            : "bg-card-border/30 text-muted"
                            }`}
                    >
                        {autoSlug ? "Auto" : "Manual"}
                    </button>
                </label>
                <input
                    id="slug"
                    type="text"
                    value={slug}
                    onChange={(e) => {
                        setAutoSlug(false);
                        setSlug(e.target.value);
                    }}
                    placeholder="pengenalan-html-css"
                    required
                    className="w-full rounded-xl border border-card-border/50 bg-card-bg px-4 py-3 font-mono text-sm text-foreground placeholder-muted/50 outline-none transition-colors focus:border-accent/50 focus:ring-2 focus:ring-accent/20"
                />
            </div>

            {/* Category & Date Row */}
            <div className="grid gap-4 sm:grid-cols-2">
                {/* Category */}
                <div>
                    <label
                        htmlFor="category"
                        className="mb-2 block text-sm font-medium text-foreground"
                    >
                        Kategori <span className="text-red-400">*</span>
                    </label>
                    <input
                        id="category"
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        placeholder="Pilih atau ketik kategori"
                        required
                        list="categories"
                        className="w-full rounded-xl border border-card-border/50 bg-card-bg px-4 py-3 text-foreground placeholder-muted/50 outline-none transition-colors focus:border-accent/50 focus:ring-2 focus:ring-accent/20"
                    />
                    <datalist id="categories">
                        {SUGGESTED_CATEGORIES.map((cat) => (
                            <option key={cat} value={cat} />
                        ))}
                    </datalist>
                    {/* Quick Category Buttons */}
                    <div className="mt-2 flex flex-wrap gap-1.5">
                        {SUGGESTED_CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                type="button"
                                onClick={() => setCategory(cat)}
                                className={`rounded-full border px-2.5 py-1 text-xs transition-colors ${category === cat
                                    ? "border-accent/50 bg-accent/20 text-accent-light"
                                    : "border-card-border/30 text-muted hover:border-accent/30 hover:text-foreground"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Date */}
                <div>
                    <label
                        htmlFor="date"
                        className="mb-2 block text-sm font-medium text-foreground"
                    >
                        Tanggal
                    </label>
                    <input
                        id="date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full rounded-xl border border-card-border/50 bg-card-bg px-4 py-3 text-foreground outline-none transition-colors focus:border-accent/50 focus:ring-2 focus:ring-accent/20"
                    />
                </div>
            </div>

            {/* Excerpt */}
            <div>
                <label
                    htmlFor="excerpt"
                    className="mb-2 block text-sm font-medium text-foreground"
                >
                    Ringkasan Singkat <span className="text-red-400">*</span>
                </label>
                <textarea
                    id="excerpt"
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    placeholder="Deskripsi singkat tentang materi ini (1-2 kalimat)"
                    required
                    rows={2}
                    className="w-full resize-none rounded-xl border border-card-border/50 bg-card-bg px-4 py-3 text-foreground placeholder-muted/50 outline-none transition-colors focus:border-accent/50 focus:ring-2 focus:ring-accent/20"
                />
            </div>

            {/* Content — Block Editor */}
            <div>
                <div className="mb-3 flex items-center justify-between">
                    <label className="text-sm font-medium text-foreground">
                        Konten <span className="text-red-400">*</span>
                    </label>
                    <button
                        type="button"
                        onClick={() => setShowPreview(!showPreview)}
                        className="flex items-center gap-1.5 rounded-lg border border-card-border/50 bg-card-bg px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:border-accent/30 hover:text-foreground"
                    >
                        {showPreview ? (
                            <>
                                <svg
                                    className="h-3.5 w-3.5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                    />
                                </svg>
                                Editor
                            </>
                        ) : (
                            <>
                                <svg
                                    className="h-3.5 w-3.5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                </svg>
                                Preview
                            </>
                        )}
                    </button>
                </div>

                {showPreview ? (
                    <div className="min-h-[200px] rounded-xl border border-card-border/50 bg-card-bg p-6">
                        {generatedHtml ? (
                            <div
                                className="prose"
                                dangerouslySetInnerHTML={{ __html: generatedHtml }}
                            />
                        ) : (
                            <p className="text-center text-sm text-muted">
                                Belum ada konten untuk di-preview
                            </p>
                        )}
                    </div>
                ) : (
                    <BlockEditor blocks={blocks} onChange={setBlocks} />
                )}
            </div>

            {/* Submit */}
            <div className="flex items-center gap-4 pt-2">
                <button
                    type="submit"
                    disabled={
                        isLoading ||
                        !title ||
                        !slug ||
                        !excerpt ||
                        blocks.length === 0 ||
                        !category
                    }
                    className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent to-accent-light px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition-all hover:shadow-xl hover:shadow-accent/30 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {isLoading ? (
                        <>
                            <svg
                                className="h-4 w-4 animate-spin"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                />
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                />
                            </svg>
                            Menyimpan...
                        </>
                    ) : (
                        submitLabel
                    )}
                </button>
            </div>
        </form>
    );
}
