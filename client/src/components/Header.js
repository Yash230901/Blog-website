import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../UserContext'
const Header = () => {
    const { setUserInfo, userInfo } = useContext(UserContext)
    useEffect(() => {
        fetch("http://localhost:5000/profile", {
            credentials: 'include'
        }).then((res) => {
            res.json().then(userInfo => {
                setUserInfo(userInfo);
            })
        })
    }, [])

    const logout = () => {
        fetch("http://localhost:5000/logout", {
            method: 'POST',
            credentials: 'include'
        })
        setUserInfo(null);
    }
    const username = userInfo?.username;
    return (
        <header>
            <Link to="/" className="logo">MyBlog</Link>
            <nav>
                {username && (
                    <>
                        <p>{username}</p>
                        <Link to="/create">Create Post</Link>
                        <a onClick={logout}>logout</a>
                    </>
                )}
                {!username && (
                    <>
                        <Link to="/login" >Login</Link>
                        <Link to="/register" >Register</Link>
                    </>
                )}
            </nav>
        </header>
    )
}

export default Header