import { getPostBySlug, getAllPosts } from "@/lib/posts";
import CategoryBadge from "@/components/CategoryBadge";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        return { title: "Post Tidak Ditemukan" };
    }

    return {
        title: `${post.title} — Resume Materi`,
        description: post.excerpt,
    };
}

export default async function PostPage({ params }: PageProps) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    const formattedDate = new Date(post.date).toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    return (
        <main className="mx-auto min-h-screen max-w-3xl px-6 py-12">
            {/* Back button */}
            <Link
                href="/"
                className="group mb-8 inline-flex items-center gap-2 rounded-lg border border-card-border/50 bg-card-bg/50 px-4 py-2 text-sm font-medium text-muted transition-all hover:border-accent/30 hover:text-foreground"
            >
                <svg
                    className="h-4 w-4 transition-transform group-hover:-translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                </svg>
                Kembali
            </Link>

            {/* Post Header */}
            <header className="animate-fade-in-up mb-10">
                <div className="mb-4 flex items-center gap-3">
                    <CategoryBadge category={post.category} size="md" />
                    <span className="text-sm text-muted">•</span>
                    <time className="text-sm text-muted">{formattedDate}</time>
                </div>
                <h1 className="mb-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                    {post.title}
                </h1>
                <p className="text-lg leading-relaxed text-muted">{post.excerpt}</p>
            </header>

            {/* Divider */}
            <div className="mb-10 h-px bg-gradient-to-r from-transparent via-card-border to-transparent" />

            {/* Content */}
            <article
                className="animate-fade-in-up prose"
                style={{ animationDelay: "200ms" }}
                dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Bottom Navigation */}
            <div className="mt-16 border-t border-card-border/50 pt-8">
                <Link
                    href="/"
                    className="group inline-flex items-center gap-2 text-sm font-medium text-accent-light transition-colors hover:text-accent"
                >
                    <svg
                        className="h-4 w-4 transition-transform group-hover:-translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                    </svg>
                    Lihat semua materi
                </Link>
            </div>
        </main>
    );
}
