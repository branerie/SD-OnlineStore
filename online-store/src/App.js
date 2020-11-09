import React, { useEffect, useState } from 'react'
import './App.css'
import UserContext from './Context'
import Navigation from './navigation'
import getCookie from './utils/cookie'

function App() {
  const [user, setUser] = useState({ userId: null, isAdmin: false })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = getCookie('x-auth-cookie')
    
    fetch('http://localhost:3001/api/user/verify', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Authorization': token || ''
      }
    })
    .then(response => response.json())
    .then(userInfo => {
      if (userInfo.errorMessage) {
          console.error(userInfo.errorMessage)
      }

      setUser({ userId: userInfo.userId, isAdmin: userInfo.isAdmin })
      
      setIsLoading(false)
    })
  }, [])

  if (isLoading) {
    return null
  }

  return (
    <UserContext.Provider value={user}>
      <Navigation />
    </UserContext.Provider>
  )
}

export default App
