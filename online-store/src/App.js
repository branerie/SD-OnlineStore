import React, { useEffect, useState } from 'react'
import './App.css'
import UserContext from './Context'
import Navigation from './navigation'
import getCookie from './utils/cookie'

function App() {
  const [user, setUser] = useState({})

  useEffect(async () => {
    const token = getCookie('x-auth-cookie')

    const response = await fetch('http://localhost:3001/api/user/verify', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Authorization': token || ''
      }
    })

    const userInfo = await response.json()
    console.log(userInfo);

    setUser(userInfo)

  }, [])

  return (
    <UserContext.Provider value={user}>
      <Navigation />
    </UserContext.Provider>
  )
}

export default App
