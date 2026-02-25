"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createPost } from "@/lib/posts";
import PostForm from "@/components/PostForm";
import AuthGuard from "@/components/AuthGuard";

export default function CreatePostPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (data: {
        title: string;
        slug: string;
        excerpt: string;
        content: string;
        category: string;
        date: string;
    }) => {
        setIsLoading(true);
        setError(null);

        const result = await createPost(data);

        if (result.error) {
            setError(result.error);
            setIsLoading(false);
            return;
        }

        router.push("/admin");
    };

    return (
        <AuthGuard>
            <main className="mx-auto min-h-screen max-w-3xl px-6 py-12">
                {/* Back */}
                <Link
                    href="/admin"
                    className="group mb-8 inline-flex items-center gap-2 rounded-lg border border-card-border/50 bg-card-bg/50 px-4 py-2 text-sm font-medium text-muted transition-all hover:border-accent/30 hover:text-foreground"
                >
                    <svg
                        className="h-4 w-4 transition-transform group-hover:-translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M7 16l-4-4m0 0l4-4m-4 4h18"
                        />
                    </svg>
                    Kembali ke Admin
                </Link>

                {/* Title */}
                <div className="animate-fade-in-up mb-10">
                    <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
                        Buat Post Baru
                    </h1>
                    <p className="mt-2 text-sm text-muted">
                        Isi form di bawah untuk membuat resume materi baru
                    </p>
                </div>

                {/* Error */}
                {error && (
                    <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-3 text-sm text-red-400">
                        <strong>Error:</strong> {error}
                    </div>
                )}

                {/* Form */}
                <div className="animate-fade-in-up rounded-2xl border border-card-border/50 bg-card-bg/30 p-6 backdrop-blur-sm sm:p-8" style={{ animationDelay: "100ms" }}>
                    <PostForm
                        onSubmit={handleSubmit}
                        submitLabel="Buat Post"
                        isLoading={isLoading}
                    />
                </div>
            </main>
        </AuthGuard>
    );
}
