"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getAllPosts, deletePost, type Post } from "@/lib/posts";
import CategoryBadge from "@/components/CategoryBadge";
import DeleteModal from "@/components/DeleteModal";
import AuthGuard from "@/components/AuthGuard";
import { logout } from "@/lib/auth";

export default function AdminPage() {
    const router = useRouter();
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleteTarget, setDeleteTarget] = useState<Post | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [notification, setNotification] = useState<{
        type: "success" | "error";
        message: string;
    } | null>(null);

    const fetchPosts = async () => {
        setLoading(true);
        const data = await getAllPosts();
        setPosts(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    // Auto-hide notification
    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => setNotification(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [notification]);

    const handleDelete = async () => {
        if (!deleteTarget) return;
        setIsDeleting(true);
        const result = await deletePost(deleteTarget.id);
        setIsDeleting(false);

        if (result.success) {
            setNotification({ type: "success", message: "Post berhasil dihapus!" });
            setPosts((prev) => prev.filter((p) => p.id !== deleteTarget.id));
        } else {
            setNotification({
                type: "error",
                message: result.error || "Gagal menghapus post",
            });
        }
        setDeleteTarget(null);
    };

    const categories = [...new Set(posts.map((p) => p.category))];

    const handleLogout = () => {
        logout();
        router.replace("/login");
    };

    return (
        <AuthGuard>
            <main className="mx-auto min-h-screen max-w-5xl px-6 py-12">
                {/* Notification */}
                {notification && (
                    <div
                        className={`animate-fade-in-up fixed top-20 right-6 z-50 rounded-xl border px-5 py-3 text-sm font-medium shadow-lg ${notification.type === "success"
                            ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                            : "border-red-500/30 bg-red-500/10 text-red-400"
                            }`}
                    >
                        {notification.message}
                    </div>
                )}

                {/* Header */}
                <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
                            Admin Dashboard
                        </h1>
                        <p className="mt-1 text-sm text-muted">
                            Kelola semua post blog resume materi
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link
                            href="/admin/create"
                            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent to-accent-light px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition-all hover:shadow-xl hover:shadow-accent/30"
                        >
                            <svg
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 4.5v15m7.5-7.5h-15"
                                />
                            </svg>
                            Buat Post Baru
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="inline-flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-3 text-sm font-semibold text-red-400 transition-all hover:bg-red-500/20"
                        >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                            </svg>
                            Logout
                        </button>
                    </div>
                </div>

                {/* Stats */}
                <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
                    <div className="rounded-xl border border-card-border/50 bg-card-bg/50 p-4">
                        <div className="text-2xl font-bold text-accent-light">
                            {posts.length}
                        </div>
                        <div className="text-xs text-muted">Total Post</div>
                    </div>
                    <div className="rounded-xl border border-card-border/50 bg-card-bg/50 p-4">
                        <div className="text-2xl font-bold text-emerald-400">
                            {categories.length}
                        </div>
                        <div className="text-xs text-muted">Kategori</div>
                    </div>
                    <div className="col-span-2 rounded-xl border border-card-border/50 bg-card-bg/50 p-4 sm:col-span-1">
                        <div className="text-2xl font-bold text-amber-400">
                            {posts.length > 0
                                ? new Date(posts[0].date).toLocaleDateString("id-ID", {
                                    day: "numeric",
                                    month: "short",
                                })
                                : "-"}
                        </div>
                        <div className="text-xs text-muted">Post Terbaru</div>
                    </div>
                </div>

                {/* Post Table */}
                {loading ? (
                    <div className="flex items-center justify-center py-20">
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
                    </div>
                ) : posts.length > 0 ? (
                    <div className="overflow-hidden rounded-2xl border border-card-border/50">
                        {/* Desktop Table */}
                        <div className="hidden md:block">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-card-border/50 bg-card-bg/80">
                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted">
                                            Judul
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted">
                                            Kategori
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted">
                                            Tanggal
                                        </th>
                                        <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-muted">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {posts.map((post, index) => (
                                        <tr
                                            key={post.id}
                                            className={`border-b border-card-border/30 transition-colors hover:bg-card-bg/50 ${index === posts.length - 1 ? "border-b-0" : ""
                                                }`}
                                        >
                                            <td className="px-6 py-4">
                                                <Link
                                                    href={`/posts/${post.slug}`}
                                                    className="font-medium text-foreground transition-colors hover:text-accent-light"
                                                >
                                                    {post.title}
                                                </Link>
                                                <p className="mt-0.5 line-clamp-1 text-xs text-muted">
                                                    {post.excerpt}
                                                </p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <CategoryBadge category={post.category} />
                                            </td>
                                            <td className="px-6 py-4 text-sm text-muted">
                                                {new Date(post.date).toLocaleDateString("id-ID", {
                                                    day: "numeric",
                                                    month: "short",
                                                    year: "numeric",
                                                })}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link
                                                        href={`/admin/edit/${post.id}`}
                                                        className="rounded-lg border border-card-border/50 bg-card-bg px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:border-accent/30 hover:text-foreground"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={() => setDeleteTarget(post)}
                                                        className="rounded-lg border border-red-500/20 bg-red-500/5 px-3 py-1.5 text-xs font-medium text-red-400 transition-colors hover:bg-red-500/10"
                                                    >
                                                        Hapus
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile Cards */}
                        <div className="divide-y divide-card-border/30 md:hidden">
                            {posts.map((post) => (
                                <div key={post.id} className="p-4">
                                    <div className="mb-2 flex items-start justify-between gap-3">
                                        <div>
                                            <Link
                                                href={`/posts/${post.slug}`}
                                                className="font-medium text-foreground"
                                            >
                                                {post.title}
                                            </Link>
                                            <div className="mt-1 flex items-center gap-2">
                                                <CategoryBadge category={post.category} />
                                                <span className="text-xs text-muted">
                                                    {new Date(post.date).toLocaleDateString("id-ID", {
                                                        day: "numeric",
                                                        month: "short",
                                                    })}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-3 flex gap-2">
                                        <Link
                                            href={`/admin/edit/${post.id}`}
                                            className="flex-1 rounded-lg border border-card-border/50 bg-card-bg py-2 text-center text-xs font-medium text-muted transition-colors hover:text-foreground"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => setDeleteTarget(post)}
                                            className="flex-1 rounded-lg border border-red-500/20 bg-red-500/5 py-2 text-center text-xs font-medium text-red-400 transition-colors hover:bg-red-500/10"
                                        >
                                            Hapus
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center rounded-2xl border border-card-border/50 bg-card-bg/30 py-20">
                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-card-bg">
                            <svg
                                className="h-8 w-8 text-muted"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={1.5}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                                />
                            </svg>
                        </div>
                        <h2 className="mb-2 text-lg font-bold text-foreground">
                            Belum ada post
                        </h2>
                        <p className="mb-6 text-sm text-muted">
                            Mulai buat post pertama kamu!
                        </p>
                        <Link
                            href="/admin/create"
                            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent to-accent-light px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-accent/25"
                        >
                            <svg
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 4.5v15m7.5-7.5h-15"
                                />
                            </svg>
                            Buat Post Baru
                        </Link>
                    </div>
                )}

                {/* Delete Modal */}
                <DeleteModal
                    postTitle={deleteTarget?.title || ""}
                    isOpen={!!deleteTarget}
                    isLoading={isDeleting}
                    onClose={() => setDeleteTarget(null)}
                    onConfirm={handleDelete}
                />
            </main>
        </AuthGuard>
    );
}
