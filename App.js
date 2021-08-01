import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React, { useState } from 'react'
import { ThemeProvider } from 'react-native-elements'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { database } from './index'
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
              <Stack.Screen name="Home" component={Home} initialParams={{ database: database }} />
              <Stack.Screen name="AccountList" component={AccountList} initialParams={{ database: database }} />
              <Stack.Screen name="ExpenseList" component={ExpenseList} initialParams={{ database: database }} />
              <Stack.Screen name="Menu" component={Menu} initialParams={{ database: database }} />
            </Stack.Navigator>
            : <Login />}
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  )
}

export default App
