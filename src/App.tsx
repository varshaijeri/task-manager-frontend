import './App.css'
import { TaskProvider } from './context/TaskContext';
import TaskPage from './pages/TaskPage';
import Login from "./pages/LoginPage.tsx";
import Register from "./pages/RegisterPage.tsx";
import { useEffect, useState } from "react";

function App() {
    const [token, setToken] = useState<string | null>(null);
    const [isRegistering, setIsRegistering] = useState(false);

    // On mount, check localStorage
    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
            setToken(savedToken);
        }
    }, []);

    const handleLogin = (jwt: string) => {
        localStorage.setItem('token', jwt);
        setToken(jwt);
    };

    const handleLogout = () => {
        console.log("User logged out");
        localStorage.removeItem('token');
        setToken(null);
    };

    return (
        <>
            {token ? (
                <TaskProvider>
                    <TaskPage onLogout={handleLogout} />
                </TaskProvider>
            ) : isRegistering ? (
                <Register
                    switchToLogin={() => setIsRegistering(false)}
                />
            ) : (
                <Login
                    onLogin={handleLogin}
                    switchToRegister={() => setIsRegistering(true)}
                />
            )}
        </>
    );
}

export default App;
