import { useState } from "react";
import { apiRequest } from "../api/client";

export default function Login({ onSuccess }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        setErr("");

        try {
            const data = await apiRequest("/api/auth/login", {
                method: "POST",
                body: JSON.stringify({ email, password }),
            });

            localStorage.setItem("token", data.token);
            onSuccess();
        } catch (e) {
            setErr(e.message);
        }
    }

    return (
        <div style={{ padding: 24, fontFamily: "system-ui" }}>
            <h2>Login</h2>

            <form onSubmit={handleSubmit} style={{ display: "grid", gap: 8, maxWidth: 320 }}>
                <input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                />

                <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                />

                <button type="submit">Login</button>

                {err && <div style={{ color: "crimson" }}>{err}</div>}
            </form>
        </div>
    );
}