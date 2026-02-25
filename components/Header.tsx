"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-card-border/50 backdrop-blur-xl bg-background/80">
            <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
                {/* Logo */}
                <Link href="/" className="group flex items-center gap-3">
                    <span className="text-lg font-bold text-foreground">
                        Imam<span className="text-accent-light">Syafii</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden items-center gap-8 md:flex">
                    <Link
                        href="/"
                        className="text-sm font-medium text-muted transition-colors hover:text-foreground"
                    >
                        Home
                    </Link>
                    <Link
                        href="/about"
                        className="text-sm font-medium text-muted transition-colors hover:text-foreground"
                    >
                        About
                    </Link>
                    <Link
                        href="/admin"
                        className="flex items-center gap-1.5 rounded-lg border border-accent/30 bg-accent/10 px-3 py-1.5 text-sm font-medium text-accent-light transition-colors hover:bg-accent/20"
                    >
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Admin
                    </Link>
                </div>

                {/* Mobile hamburger */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-card-border bg-card-bg transition-colors hover:border-accent/50 md:hidden"
                    aria-label="Toggle menu"
                >
                    <div className="flex flex-col gap-1">
                        <span
                            className={`block h-0.5 w-4 rounded-full bg-foreground transition-all ${isMenuOpen ? "translate-y-1.5 rotate-45" : ""
                                }`}
                        />
                        <span
                            className={`block h-0.5 w-4 rounded-full bg-foreground transition-all ${isMenuOpen ? "opacity-0" : ""
                                }`}
                        />
                        <span
                            className={`block h-0.5 w-4 rounded-full bg-foreground transition-all ${isMenuOpen ? "-translate-y-1.5 -rotate-45" : ""
                                }`}
                        />
                    </div>
                </button>
            </nav>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="border-t border-card-border/50 bg-background/95 backdrop-blur-xl md:hidden">
                    <div className="flex flex-col gap-1 px-6 py-4">
                        <Link
                            href="/"
                            onClick={() => setIsMenuOpen(false)}
                            className="rounded-lg px-4 py-3 text-sm font-medium text-muted transition-colors hover:bg-card-bg hover:text-foreground"
                        >
                            Home
                        </Link>
                        <Link
                            href="/about"
                            onClick={() => setIsMenuOpen(false)}
                            className="rounded-lg px-4 py-3 text-sm font-medium text-muted transition-colors hover:bg-card-bg hover:text-foreground"
                        >
                            About
                        </Link>
                        <Link
                            href="/admin"
                            onClick={() => setIsMenuOpen(false)}
                            className="mt-1 flex items-center gap-2 rounded-lg border border-accent/30 bg-accent/10 px-4 py-3 text-sm font-medium text-accent-light transition-colors hover:bg-accent/20"
                        >
                            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Admin
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}
