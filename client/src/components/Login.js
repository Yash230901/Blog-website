import React, { useContext, useState } from 'react'
import Header from "./Header"
import { Navigate } from 'react-router-dom'
import { UserContext } from '../UserContext'
const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext)
  const login = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { 'content-type': 'application/json' },
      credentials: 'include'
    })
    if (response.status === 200) {
      response.json().then(userInfo => {
        setUserInfo(userInfo)
        setRedirect(true);
      })
    }
    else {
      alert("Wrong credentials login failed");
    }
  }

  if (redirect) {
    return <Navigate to="/" />
  }
  return (
    <div>
      <Header />
      <form className='login' onSubmit={login}>
        <h1>Login</h1>
        <input
          type="name"
          placeholder='username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Login</button>
      </form>
    </div>
  )
}

export default Login