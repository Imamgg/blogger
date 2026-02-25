const VALID_USERNAME = "Imamgg";
const VALID_PASSWORD = "admin123";
const AUTH_KEY = "blog_admin_auth";

export function login(username: string, password: string): boolean {
    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
        if (typeof window !== "undefined") {
            localStorage.setItem(AUTH_KEY, JSON.stringify({ username, loggedInAt: Date.now() }));
        }
        return true;
    }
    return false;
}

export function logout(): void {
    if (typeof window !== "undefined") {
        localStorage.removeItem(AUTH_KEY);
    }
}

export function isAuthenticated(): boolean {
    if (typeof window === "undefined") return false;
    const session = localStorage.getItem(AUTH_KEY);
    if (!session) return false;
    try {
        const parsed = JSON.parse(session);
        return parsed.username === VALID_USERNAME;
    } catch {
        return false;
    }
}
