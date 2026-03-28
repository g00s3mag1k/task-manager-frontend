const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export async function apiRequest(path, options = {}) {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API_URL}${path}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(options.headers || {}),
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    });

    const data = await res.json().catch(() => ({}));

    // Auto-logout on auth failures
    const message = (data.error || data.message || "").toLowerCase();
    const isAuthRoute = path.startsWith("/api/auth/login");

    const authFailed = 
    !isAuthRoute && 
    (res.status === 401 || res.status === 403 ||
    message.includes("invalid token") || message.includes("expired"));

    if (authFailed) {
        localStorage.removeItem("token");
        window.dispatchEvent(new Event("auth:logout"));
        throw new Error("Session expired. Please log in again.");
    }

    if (!res.ok) throw new Error(data.error || "Request failed");
    return data;
}