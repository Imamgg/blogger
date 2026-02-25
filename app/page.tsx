import { getAllPosts, getCategories } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import CategoryBadge from "@/components/CategoryBadge";

export const dynamic = "force-dynamic";

export default async function Home() {
  const posts = await getAllPosts();
  const categories = await getCategories();

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-6 py-12">
      {/* Hero Section */}
      <section className="mb-16 text-center">
        <div className="animate-fade-in-up mb-6">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-accent-light shadow-xl shadow-accent/25">
            <svg
              className="h-8 w-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
              />
            </svg>
          </div>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Resume{" "}
            <span className="animate-gradient bg-gradient-to-r from-accent via-accent-light to-accent bg-clip-text text-transparent">
              Materi
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted">
            Kumpulan rangkuman dan catatan materi yang dipelajari selama magang.
          </p>
        </div>

        {/* Stats */}
        <div className="animate-fade-in-up mx-auto mt-8 flex max-w-md justify-center gap-8" style={{ animationDelay: "200ms" }}>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent-light">{posts.length}</div>
            <div className="text-xs text-muted">Materi</div>
          </div>
          <div className="h-10 w-px bg-card-border" />
          <div className="text-center">
            <div className="text-2xl font-bold text-accent-light">{categories.length}</div>
            <div className="text-xs text-muted">Kategori</div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      {categories.length > 0 && (
        <section className="animate-fade-in-up mb-10 flex flex-wrap items-center gap-2" style={{ animationDelay: "300ms" }}>
          <span className="mr-2 text-sm font-medium text-muted">Kategori:</span>
          {categories.map((cat) => (
            <CategoryBadge key={cat} category={cat} size="md" />
          ))}
        </section>
      )}

      {/* Posts Grid */}
      {posts.length > 0 ? (
        <section className="grid gap-6 sm:grid-cols-2">
          {posts.map((post, index) => (
            <PostCard key={post.id} post={post} index={index} />
          ))}
        </section>
      ) : (
        <section className="animate-fade-in-up flex flex-col items-center justify-center py-24 text-center">
          <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-card-bg">
            <svg
              className="h-10 w-10 text-muted"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
              />
            </svg>
          </div>
          <h2 className="mb-2 text-xl font-bold text-foreground">Belum ada materi</h2>
          <p className="max-w-sm text-sm text-muted">
            Materi akan muncul di sini setelah ditambahkan ke database Supabase.
          </p>
        </section>
      )}
    </main>
  );
}
