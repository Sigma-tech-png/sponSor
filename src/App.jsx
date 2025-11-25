import { useEffect, useState } from "react"

const API = import.meta.env.VITE_DOMEN

export default function App() {
  const [user, setUser] = useState(null)

  const [regName, setRegName] = useState("")
  const [regUser, setRegUser] = useState("")
  const [regPass, setRegPass] = useState("")

  const [logUser, setLogUser] = useState("")
  const [logPass, setLogPass] = useState("")

  const api = (url, method = "GET", body = null) =>
    fetch(API + url, {
      method,
      headers: { "Content-Type": "application/json" },
      credentials: "include", // важно для HttpOnly cookie
      body: body ? JSON.stringify(body) : null,
    }).then((r) => r.json())

  // register
  const register = () => {
    api("/register", "POST", {
      name: regName,
      username: regUser,
      password: regPass,
    }).then((res) => {
      if (res.name) setUser(res.name)
    })
  }

  // login
  const login = () => {
    api("/login", "POST", {
      username: logUser,
      password: logPass,
    }).then((res) => {
      if (res.name) setUser(res.name)
    })
  }

  // logout
  const logout = () => {
    api("/logout", "POST").then(() => setUser(null))
  }

  // auth check on page load
  useEffect(() => {
    api("/me").then((res) => {
      if (res.name) setUser(res.name)
    })
  }, [])

  return (
    <div style={{ padding: 20 }}>
      <h1>{user ? `Добро пожаловать, ${user}` : "Вы не авторизованы"}</h1>

      {!user && (
        <>
          <h2>Регистрация</h2>
          <input placeholder="Name" value={regName} onChange={(e) => setRegName(e.target.value)} /><br />
          <input placeholder="Username" value={regUser} onChange={(e) => setRegUser(e.target.value)} /><br />
          <input placeholder="Password" type="password" value={regPass} onChange={(e) => setRegPass(e.target.value)} /><br />
          <button onClick={register}>Зарегистрироваться</button>

          <h2>Логин</h2>
          <input placeholder="Username" value={logUser} onChange={(e) => setLogUser(e.target.value)} /><br />
          <input placeholder="Password" type="password" value={logPass} onChange={(e) => setLogPass(e.target.value)} /><br />
          <button onClick={login}>Войти</button>
        </>
      )}

      {user && <button onClick={logout}>Выйти</button>}
    </div>
  )
}