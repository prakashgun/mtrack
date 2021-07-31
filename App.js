import { NavigationContainer } from '@react-navigation/native'
import { default as React, default as React, useEffect, useState } from 'react'
import Home from './src/components/Home'
import Login from './src/components/Login'

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true)

  const getUser = async () => {
    console.log('Getting user')
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <NavigationContainer>
      {isLoggedIn ? <Home /> : <Login />}
    </NavigationContainer>
  )
}

export default App
