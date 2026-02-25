const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
    "Web Development": {
        bg: "bg-blue-500/10",
        text: "text-blue-400",
        border: "border-blue-500/20",
    },
    Programming: {
        bg: "bg-emerald-500/10",
        text: "text-emerald-400",
        border: "border-emerald-500/20",
    },
    Framework: {
        bg: "bg-violet-500/10",
        text: "text-violet-400",
        border: "border-violet-500/20",
    },
    Database: {
        bg: "bg-amber-500/10",
        text: "text-amber-400",
        border: "border-amber-500/20",
    },
    DevOps: {
        bg: "bg-rose-500/10",
        text: "text-rose-400",
        border: "border-rose-500/20",
    },
    Design: {
        bg: "bg-pink-500/10",
        text: "text-pink-400",
        border: "border-pink-500/20",
    },
};

const defaultColor = {
    bg: "bg-accent/10",
    text: "text-accent-light",
    border: "border-accent/20",
};

interface CategoryBadgeProps {
    category: string;
    size?: "sm" | "md";
}

export default function CategoryBadge({ category, size = "sm" }: CategoryBadgeProps) {
    const color = categoryColors[category] || defaultColor;

    return (
        <span
            className={`inline-flex items-center rounded-full border font-medium ${color.bg} ${color.text} ${color.border} ${size === "sm" ? "px-2.5 py-0.5 text-xs" : "px-3 py-1 text-sm"
                }`}
        >
            {category}
        </span>
    );
}
