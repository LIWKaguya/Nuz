import { useEffect, useState } from "react";

import HomePage from "./components/HomePage"
import LoginPage from "./components/LoginPage";
import postsService from './services/posts'

const App = () => {
  const [ user, setUser ] = useState(null)

  useEffect(() => {
    const loggedCredentialsJSON = window.localStorage.getItem('loggedNuzUser')
    if (loggedCredentialsJSON) {
      const credentials = JSON.parse(loggedCredentialsJSON)
      setUser(credentials.user)
      postsService.setToken(credentials.token)
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
