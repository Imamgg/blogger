import Link from "next/link";
import CategoryBadge from "./CategoryBadge";
import type { Post } from "@/lib/posts";

interface PostCardProps {
    post: Post;
    index: number;
}

export default function PostCard({ post, index }: PostCardProps) {
    const formattedDate = new Date(post.date).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    return (
        <Link href={`/posts/${post.slug}`} className="group block">
            <article
                className="animate-fade-in-up relative overflow-hidden rounded-2xl border border-card-border/50 bg-card-bg/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-accent/30 hover:bg-card-bg hover:shadow-xl hover:shadow-accent/5"
                style={{ animationDelay: `${index * 100}ms` }}
            >
                {/* Gradient line on top */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Category & Date */}
                <div className="mb-4 flex items-center justify-between">
                    <CategoryBadge category={post.category} />
                    <time className="text-xs text-muted">{formattedDate}</time>
                </div>

                {/* Title */}
                <h2 className="mb-2 text-xl font-bold text-foreground transition-colors group-hover:text-accent-light">
                    {post.title}
                </h2>

                {/* Excerpt */}
                <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-muted">
                    {post.excerpt}
                </p>

                {/* Read more */}
                <div className="flex items-center gap-2 text-sm font-medium text-accent-light opacity-0 transition-all duration-300 group-hover:opacity-100">
                    <span>Baca selengkapnya</span>
                    <svg
                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </div>
            </article>
        </Link>
    );
}
