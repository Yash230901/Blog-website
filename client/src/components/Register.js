import React, { useState } from 'react'
import Header from './Header'

const Register = () => {
  const [username, setusername] = useState("")
  const [password, setPassword] = useState("")
  const register = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/register", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { 'content-type': 'application/json' },
    })
    if (response.status === 200) {
      alert("registration successful")
      console.log(response)
    }
    else {
      alert("registration failed")
    }
  }
  return (
    <>
      <Header />
      <form className='register' onSubmit={register}>
        <h1>Register</h1>
        <input
          type="name"
          placeholder='username'
          value={username}
          onChange={(e) => setusername(e.target.value)}
        />
        <input
          type="password"
          placeholder='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Register</button>
      </form>
    </>
  )
}

export default Register