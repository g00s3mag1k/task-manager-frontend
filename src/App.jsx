import { useEffect, useState } from 'react';
import Login from "./auth/Login";
import Register from './auth/Register';
import Dashboard from './tasks/Dashboard';
import "./App.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));
  const [mode, setMode] = useState('login');

// Global logout listener
useEffect(() => {
  const handler = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    setMode("login");
  };

  window.addEventListener("auth:logout", handler);
  return () => window.removeEventListener("auth:logout", handler)
}, []);

  return loggedIn ? (
    <Dashboard
    onLogout={() => {
      localStorage.removeItem("token");
      setLoggedIn(false);
      setMode("login");
    }}
  />
  ) : mode === "login" ? (
    <Login 
    onSuccess={() => setLoggedIn(true)}
    onGoRegister={() => setMode("register")} 
    />
  ) : (
    <Register
    onSuccess={() => setLoggedIn(true)}
    onGoLogin={() => setMode("login")}
    />
  );
}

export default App;