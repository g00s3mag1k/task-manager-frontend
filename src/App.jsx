import { useState } from 'react';
import Login from "./auth/Login";
import Dashboard from './tasks/Dashboard';

function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));

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