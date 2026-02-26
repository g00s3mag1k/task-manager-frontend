import { useEffect, useState } from 'react';
import Login from "./auth/Login";
import Dashboard from './tasks/Dashboard';
import "./App.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));

// Global logout listener
useEffect(() => {
  const handler = () => setLoggedIn(false);
  window.addEventListener("auth:logout", handler);
  return () => window.removeEventListener("auth:logout", handler)
}, []);

  return loggedIn ? (
    <Dashboard
    onLogout={() => {
      localStorage.removeItem("token");
      setLoggedIn(false);
    }}
  />
  ) : (
    <Login onSuccess={() => setLoggedIn(true)} />
  );
}

export default App;