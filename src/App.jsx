import { useState, useEffect } from "react";

export default function App() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");

  // Проверяем, есть ли сессия
  useEffect(() => {
    fetch(`${import.meta.env.VITE_DOMEN}/me`, {
      credentials: "include"
    })
    .then(res => res.json())
    .then(data => {
      if(!data.error) setUser(data.user);
    });
  }, []);

  const handleLogin = () => {
    fetch(`${import.meta.env.VITE_DOMEN}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ username })
    })
    .then(res => res.json())
    .then(data => {
      if(!data.error) setUser({ username });
    });
  };

  if(user) return <h1>Привет, {user.username}</h1>;

  return (
    <div>
      <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Имя"/>
      <button onClick={handleLogin}>Войти</button>
    </div>
  );
}