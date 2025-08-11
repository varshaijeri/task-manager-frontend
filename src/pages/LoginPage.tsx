import {useState} from 'react';
import API_BASE_URL from "../config/config.ts";

interface LoginProps {
    onLogin: (token: string) => void;
    switchToRegister: () => void;
}

export default function LoginPage({onLogin, switchToRegister}: LoginProps) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const apiUrl = `${API_BASE_URL}/api/auth`;
            const res = await fetch(`${apiUrl}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username, password}),
            });

            if (!res.ok) {
                throw new Error('Login failed');
            }

            const data = await res.json();
            onLogin(data.token); // Pass token to App
        } catch (error) {
            console.error(error);
            alert('Invalid username or password');
        }
    };

    return (
        <div style={{padding: '2rem'}}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border p-2 w-full"
                    required
                /><br/><br/>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border p-2 w-full"
                    required
                /><br/><br/>
                <button type="submit">Login</button>
            </form>
            <p>
                Already have an account?{" "}
                <button onClick={switchToRegister}>Register</button>
            </p>
        </div>
    );
}
