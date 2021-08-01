import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React, { useState } from 'react'
import { ThemeProvider } from 'react-native-elements'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Account from './src/components/Account'
import AccountList from './src/components/AccountList'
import ExpenseList from './src/components/ExpenseList'
import Home from './src/components/Home'
import Login from './src/components/Login'
import Menu from './src/components/Menu'

const theme = {
  Button: {
    buttonStyle: {
      backgroundColor: '#8c776e'
    },
  },
  Header: {
    placement: 'left',
    leftComponent: { icon: 'menu', color: '#fff' },
    centerComponent: { text: 'MY TITLE', style: { color: '#fff' } },
    rightComponent: { icon: 'home', color: '#fff' },
    backgroundColor: '#8c776e'
  }
}

const Stack = createStackNavigator()


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true)



  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          {isLoggedIn ?
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="AccountList" component={AccountList} />
              <Stack.Screen name="ExpenseList" component={ExpenseList} />
              <Stack.Screen name="Menu" component={Menu} />
              <Stack.Screen name="Account" component={Account} />
            </Stack.Navigator>
            : <Login />}
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  )
}

export default App
