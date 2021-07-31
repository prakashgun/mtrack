import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import ExpenseList from '../components/ExpenseList'
import {database} from '../../index'

const Stack = createStackNavigator()

const Home = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="ExpenseList" component={ExpenseList} />
        </Stack.Navigator>
    )
}

export default Home