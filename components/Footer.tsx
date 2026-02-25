export default function Footer() {
    return (
        <footer className="border-t border-card-border/50 bg-surface/50">
            <div className="mx-auto max-w-5xl px-6 py-8">
                <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                    <div className="flex items-center gap-3">
                        <span className="text-sm font-semibold text-foreground">
                            Resume<span className="text-accent-light">Materi</span>
                        </span>
                    </div>
                    <p className="text-sm text-muted">
                        © {new Date().getFullYear()} Blog Resume Materi Magang. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
