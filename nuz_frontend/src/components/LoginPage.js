import { useState } from "react"

import loginService from '../services/login'
import postsService from '../services/posts'

const LoginPage = ({ setUser }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (event) => {
        event.preventDefault()
        const user = await loginService.authenticate({
            username, password
        })
        setUser(user)
        postsService.setToken(user.token)
        window.localStorage.setItem(
            'loggedNuzUser', JSON.stringify(user)
        )
        setUsername('')
        setPassword('')
    }

    return (
        <form onSubmit={handleLogin}>
            <div>username:<input type='text' value={username} onChange={({ target }) => setUsername(target.value)}/></div>
            <div>password:<input type='password' value={password} onChange={({ target }) => setPassword(target.value)}/></div>
            <button type='submit'>Login</button>
        </form>
    )
}

export default LoginPage 