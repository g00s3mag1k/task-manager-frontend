import { useState } from 'react';
import Login from "./auth/Login";

function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));

  return loggedIn ? (
    <div style={{ padding: 24, fontFamily: "system-ui"}}>
      <h1>Logged in!</h1>
      <button 
      onClick={() => {
        localStorage.removeItem("token");
        setLoggedIn(false);
      }}
      >
        Logout
      </button>
    </div>
  ) : (
    <Login onSuccess={() => setLoggedIn(true)} />
  );
}

export default App;