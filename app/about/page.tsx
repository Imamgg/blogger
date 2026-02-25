import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About — Resume Materi",
    description: "Tentang blog Resume Materi dan perjalanan belajar selama magang.",
};

export default function AboutPage() {
    return (
        <main className="mx-auto min-h-screen max-w-3xl px-6 py-12">
            {/* Profile Section */}
            <section className="animate-fade-in-up mb-12 text-center">
                {/* Avatar */}
                <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-light shadow-xl shadow-accent/25">
                    <span className="text-3xl font-bold text-white">👨‍💻</span>
                </div>

                <h1 className="mb-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                    Tentang Blog Ini
                </h1>
                <p className="mx-auto max-w-lg text-lg leading-relaxed text-muted">
                    Blog ini dibuat untuk mendokumentasikan dan merangkum materi-materi
                    yang dipelajari selama program magang.
                </p>
            </section>

            {/* Divider */}
            <div className="mb-12 h-px bg-gradient-to-r from-transparent via-card-border to-transparent" />

            {/* About Content */}
            <section className="animate-fade-in-up space-y-8" style={{ animationDelay: "200ms" }}>
                {/* Purpose */}
                <div className="rounded-2xl border border-card-border/50 bg-card-bg/50 p-6 backdrop-blur-sm">
                    <div className="mb-3 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
                            <svg
                                className="h-5 w-5 text-accent-light"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={1.5}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
                                />
                            </svg>
                        </div>
                        <h2 className="text-xl font-bold text-foreground">Tujuan</h2>
                    </div>
                    <p className="leading-relaxed text-muted">
                        Blog ini berfungsi sebagai catatan pribadi sekaligus referensi untuk
                        materi-materi yang sudah dipelajari. Setiap post berisi rangkuman
                        materi yang disusun agar mudah dipahami dan dijadikan bahan review.
                    </p>
                </div>

                {/* Topics */}
                <div className="rounded-2xl border border-card-border/50 bg-card-bg/50 p-6 backdrop-blur-sm">
                    <div className="mb-3 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10">
                            <svg
                                className="h-5 w-5 text-emerald-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={1.5}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
                                />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-bold text-foreground">Topik yang Dibahas</h2>
                    </div>
                    <ul className="space-y-3 text-muted">
                        <li className="flex items-center gap-3">
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-500/10 text-xs text-rose-400">
                                1
                            </span>
                            <span>Networking - Pengenalan Jaringan Komputer</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/10 text-xs text-blue-400">
                                2
                            </span>
                            <span>HTML & CSS - Struktur dan styling halaman web</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500/10 text-xs text-amber-400">
                                3
                            </span>
                            <span>JavaScript - Bahasa pemrograman untuk web</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-500/10 text-xs text-violet-400">
                                4
                            </span>
                            <span>React / Next.js - Framework modern untuk UI</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/10 text-xs text-emerald-400">
                                5
                            </span>
                            <span>Database - Pengelolaan dan penyimpanan data</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-500/10 text-xs text-rose-400">
                                6
                            </span>
                            <span>Dan materi lainnya seiring perjalanan magang</span>
                        </li>
                    </ul>
                </div>

                {/* Tech Stack */}
                <div className="rounded-2xl border border-card-border/50 bg-card-bg/50 p-6 backdrop-blur-sm">
                    <div className="mb-3 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10">
                            <svg
                                className="h-5 w-5 text-violet-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={1.5}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"
                                />
                            </svg>
                        </div>
                        <h2 className="text-xl font-bold text-foreground">Tech Stack</h2>
                    </div>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                        {["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4", "Supabase", "Vercel"].map(
                            (tech) => (
                                <div
                                    key={tech}
                                    className="rounded-xl border border-card-border/30 bg-background/50 px-4 py-3 text-center text-sm font-medium text-muted transition-colors hover:border-accent/30 hover:text-foreground"
                                >
                                    {tech}
                                </div>
                            )
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
}
