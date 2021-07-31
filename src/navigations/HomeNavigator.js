import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import ExpensesScreen from '../screens/expenses/ExpensesScreen'

const Stack = createStackNavigator()

const HomeNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Expenses" component={ExpensesScreen} />
        </Stack.Navigator>
    )
}

export default HomeNavigator
