const API_URL = "http://localhost:3000";

export async function apiRequest(path, options = {}) {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API_URL}${path}`, {
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        ...options,
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || "Request failed");
    return data;
}