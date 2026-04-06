import { useState } from "react";
import { apiRequest } from "../api/client";

export default function Register({ onGoLogin, onSuccess }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [err, setErr] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setErr('');
        setLoading(true);

        try {
            const data = await apiRequest('/api/auth/register', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
            });

            if (data.token) {
                localStorage.setItem('token', data.token);
                onSuccess();
                return;
            }
            onGoLogin();
        } catch (e) {
            setErr(e.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='container'>
            <div className='card'>
                <h2>Create Account</h2>

                <form onSubmit={handleSubmit}>
                    <input
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    />

                    <input
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete='new-password'
                    />

                    <button type='submit' disabled={loading || !email || !password}>
                        {loading ? 'Creating...' : 'Register'}
                    </button>

                    {err && <div className="error">{err}</div>}
                </form>

                <div style={{ marginTop: 12 }}>
                    <button type='button' onClick={onGoLogin}>
                        Back to Login
                    </button>
                </div>
            </div>
        </div>
    );
}