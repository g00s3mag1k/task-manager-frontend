import { useState } from "react";
import { apiRequest } from "../api/client";

export default function Login({ onSuccess, onGoRegister }) {
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
  <div className="container">
    <div className="card">
      <h2>Task Manager Login</h2>

      <form onSubmit={handleSubmit}>
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

        {err && <div className="error">{err}</div>}
      </form>

      <div style={{ marginTop: 12 }}>
        <button type='button' onClick={onGoRegister}>
          Create Account 
        </button>
      </div>
    </div>
  </div>
);

}