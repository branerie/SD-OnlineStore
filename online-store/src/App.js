import React, { useCallback, useEffect, useState } from 'react'
import './App.css'
import UserContext from './Context'
import Navigation from './navigation'
import getCookie from './utils/cookie'

import { verifyUser } from './services/user'

function App() {
  const [user, setUser] = useState({ userId: null, isAdmin: false, favorites: [] })
  const [isLoading, setIsLoading] = useState(true)

  const verifyCurrentUser = useCallback(async () => {
    const userInfo = await verifyUser()
    if (userInfo.error) {
      //TODO: handle errors
    }

    setUser({ userId: userInfo.userId, isAdmin: userInfo.isAdmin, favorites: userInfo.favorites })
    setIsLoading(false)
  })

  useEffect(() => {
    verifyCurrentUser()
  }, [])

  if (isLoading) {
    return null
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Navigation />
    </UserContext.Provider>
  )
}

export default App
