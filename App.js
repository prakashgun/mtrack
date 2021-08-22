import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React, { useState } from 'react'
import { ThemeProvider } from 'react-native-elements'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Account from './src/components/Account'
import AccountList from './src/components/AccountList'
import AddAccount from './src/components/AddAccount'
import AddCategory from './src/components/AddCategory'
import AddExpense from './src/components/AddExpense'
import Category from './src/components/Category'
import CategoryList from './src/components/CategoryList'
import ExpenseList from './src/components/ExpenseList'
import Home from './src/components/Home'
import Login from './src/components/Login'
import Menu from './src/components/Menu'
import Expense from './src/components/Expense'

const theme = {
  Button: {
    buttonStyle: {
      backgroundColor: '#3e3b33'
    },
  },
  Header: {
    placement: 'left',
    leftComponent: { icon: 'menu', color: '#fff' },
    centerComponent: { text: 'MY TITLE', style: { color: '#fff', fontSize: 18 } },
    rightComponent: { icon: 'home', color: '#fff' },
    backgroundColor: '#3e3b33'
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
              <Stack.Screen name="ExpenseList" component={ExpenseList} />
              <Stack.Screen name="AddExpense" component={AddExpense} />
              <Stack.Screen name="Expense" component={Expense} />
              <Stack.Screen name="Home" component={Home} />

              <Stack.Screen name="Menu" component={Menu} />
              <Stack.Screen name="AccountList" component={AccountList} />
              <Stack.Screen name="AddAccount" component={AddAccount} />
              <Stack.Screen name="Account" component={Account} />
              <Stack.Screen name="CategoryList" component={CategoryList} />
              <Stack.Screen name="AddCategory" component={AddCategory} />
              <Stack.Screen name="Category" component={Category} />
            </Stack.Navigator>
            : <Login />}
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  )
}

export default App
