import { supabase } from "./supabase";

export interface Post {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    category: string;
    cover_image: string | null;
    created_at: string;
}

export interface PostInput {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    category: string;
    date?: string;
    cover_image?: string | null;
}

// Generate slug dari title
export function generateSlug(title: string): string {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();
}

// READ - Get all posts
export async function getAllPosts(): Promise<Post[]> {
    const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("date", { ascending: false });

    if (error) {
        console.error("Error fetching posts:", error);
        return [];
    }

    return data as Post[];
}

// READ - Get single post by slug
export async function getPostBySlug(slug: string): Promise<Post | null> {
    const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("slug", slug)
        .single();

    if (error) {
        console.error("Error fetching post:", error);
        return null;
    }

    return data as Post;
}

// READ - Get single post by id
export async function getPostById(id: string): Promise<Post | null> {
    const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        console.error("Error fetching post:", error);
        return null;
    }

    return data as Post;
}

// READ - Get unique categories
export async function getCategories(): Promise<string[]> {
    const { data, error } = await supabase.from("posts").select("category");

    if (error) {
        console.error("Error fetching categories:", error);
        return [];
    }

    const categories = [
        ...new Set((data as { category: string }[]).map((p) => p.category)),
    ];
    return categories;
}

// CREATE - Insert new post
export async function createPost(
    input: PostInput
): Promise<{ data: Post | null; error: string | null }> {
    const { data, error } = await supabase
        .from("posts")
        .insert([
            {
                title: input.title,
                slug: input.slug,
                excerpt: input.excerpt,
                content: input.content,
                category: input.category,
                date: input.date || new Date().toISOString().split("T")[0],
                cover_image: input.cover_image || null,
            },
        ])
        .select()
        .single();

    if (error) {
        console.error("Error creating post:", error);
        return { data: null, error: error.message };
    }

    return { data: data as Post, error: null };
}

// UPDATE - Update existing post
export async function updatePost(
    id: string,
    input: PostInput
): Promise<{ data: Post | null; error: string | null }> {
    const { data, error } = await supabase
        .from("posts")
        .update({
            title: input.title,
            slug: input.slug,
            excerpt: input.excerpt,
            content: input.content,
            category: input.category,
            date: input.date || new Date().toISOString().split("T")[0],
            cover_image: input.cover_image || null,
        })
        .eq("id", id)
        .select()
        .single();

    if (error) {
        console.error("Error updating post:", error);
        return { data: null, error: error.message };
    }

    return { data: data as Post, error: null };
}

// DELETE - Delete post by id
export async function deletePost(
    id: string
): Promise<{ success: boolean; error: string | null }> {
    const { error } = await supabase.from("posts").delete().eq("id", id);

    if (error) {
        console.error("Error deleting post:", error);
        return { success: false, error: error.message };
    }

    return { success: true, error: null };
}
