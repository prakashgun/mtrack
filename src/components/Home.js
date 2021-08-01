import { createStackNavigator } from '@react-navigation/stack'
import React, { useEffect, useState } from 'react'
import { database } from '../../index'
import ExpenseList from '../components/ExpenseList'
import { generateDefaultData } from '../model/generateDefaultData'

const Stack = createStackNavigator()

const Home = () => {
    const expenses = useState([])

    const checkAndCreateDefaultData = async () => {
        const accountsCollection = database.get('accounts')
        const accountsCount = await accountsCollection.query().fetchCount()

        if (accountsCount === 0) {
            console.log('Accounts not exist')
            await generateDefaultData(database)
        } else {
            console.log('Accounts exist')
            const accounts = await accountsCollection.query().fetch()
            console.log(accounts)
        }
    }

    useEffect(() => {
        checkAndCreateDefaultData()
    }, [])

    return (
        <Stack.Navigator>
            <Stack.Screen name="ExpenseList" component={ExpenseList} />
        </Stack.Navigator>
    )
}

export default Home