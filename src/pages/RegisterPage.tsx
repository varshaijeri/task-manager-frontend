import React, { useState } from "react";
import {toast, ToastContainer} from "react-toastify";
import API_BASE_URL from "../config/config.ts";

interface RegisterProps {
    // onRegister: (token: string) => void;
    switchToLogin: () => void;
}

export default function Register({ switchToLogin }: RegisterProps) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const apiUrl = `${API_BASE_URL}/api/auth`;
            const res = await fetch(`${apiUrl}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });

            if (res.ok) {
                setUsername(""); // reset if adding
                setPassword(""); // reset if adding
                toast.success('Registered successfully');
            } else {
                alert("Registration failed");
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <div>
                <ToastContainer />
            </div>
        <div style={{padding: '2rem'}}>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    className="border p-2 w-full"
                    required
                />
                <br/><br/>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="border p-2 w-full"
                    required
                />
                <br/><br/>
                <button type="submit">Register</button>
            </form>
            <br/>
            <p>
                To Login -{">"}
                <button onClick={switchToLogin}>Login</button>
            </p>
        </div>
        </>
    );
}
