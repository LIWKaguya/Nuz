import { useEffect, useState } from "react";

import HomePage from "./components/HomePage"
import LoginPage from "./components/LoginPage";
import postsService from './services/posts'

const App = () => {
  const [ user, setUser ] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNuzUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      postsService.setToken(user.token)
    }
  }, [])

  return (
    <>
      {user ? 
        <HomePage 
          user = { user }
          setUser = {setUser} /> 
        : 
        <LoginPage 
          setUser = {setUser}/>}
    </>
  )


}

export default App;
