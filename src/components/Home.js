import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { database } from '../../index'
import { generateDefaultData } from '../model/generateDefaultData'
import AccountList from './AccountList'

const Home = ({ navigation }) => {

    const [generated, setGenerated] = useState(false)

    useEffect(() => {
        checkAndCreateDefaultData()
    }, [])

    const checkAndCreateDefaultData = async () => {
        const accountsCollection = database.get('accounts')
        const accountsCount = await accountsCollection.query().fetchCount()

        if (accountsCount === 0) {
            console.log('Accounts not exist')
            await generateDefaultData(database)
        } else {
            console.log('Accounts exist')
            const accounts = await accountsCollection.query().fetch()
        }

        setGenerated(true)
    }

    return (
        <View style={{flex:1}}>
            {generated && <AccountList navigation={navigation} />}
        </View>
    )
}

export default Home