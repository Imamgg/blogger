"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { getPostById, updatePost, type Post } from "@/lib/posts";
import PostForm from "@/components/PostForm";
import AuthGuard from "@/components/AuthGuard";

export default function EditPostPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPost = async () => {
            const data = await getPostById(id);
            setPost(data);
            setLoading(false);
        };
        fetchPost();
    }, [id]);

    const handleSubmit = async (data: {
        title: string;
        slug: string;
        excerpt: string;
        content: string;
        category: string;
        date: string;
    }) => {
        setIsSubmitting(true);
        setError(null);

        const result = await updatePost(id, data);

        if (result.error) {
            setError(result.error);
            setIsSubmitting(false);
            return;
        }

        router.push("/admin");
    };

    if (loading) {
        return (
            <AuthGuard>
                <main className="mx-auto flex min-h-screen max-w-3xl items-center justify-center px-6 py-12">
                    <svg
                        className="h-8 w-8 animate-spin text-accent"
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
                </main>
            </AuthGuard>
        );
    }

    if (!post) {
        return (
            <AuthGuard>
                <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 py-12">
                    <h1 className="mb-2 text-2xl font-bold text-foreground">
                        Post Tidak Ditemukan
                    </h1>
                    <p className="mb-6 text-sm text-muted">
                        Post dengan ID tersebut tidak ada di database.
                    </p>
                    <Link
                        href="/admin"
                        className="rounded-xl bg-accent px-5 py-2.5 text-sm font-medium text-white"
                    >
                        Kembali ke Admin
                    </Link>
                </main>
            </AuthGuard>
        );
    }

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
                        Edit Post
                    </h1>
                    <p className="mt-2 text-sm text-muted">
                        Edit &quot;{post.title}&quot;
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
                        initialData={{
                            title: post.title,
                            slug: post.slug,
                            excerpt: post.excerpt,
                            content: post.content,
                            category: post.category,
                            date: post.date,
                        }}
                        onSubmit={handleSubmit}
                        submitLabel="Simpan Perubahan"
                        isLoading={isSubmitting}
                    />
                </div>
            </main>
        </AuthGuard>
    );
}
