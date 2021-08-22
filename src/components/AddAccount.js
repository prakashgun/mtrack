import React, { useState } from 'react'
import { Alert, View } from 'react-native'
import { Button, Header, Input } from 'react-native-elements'
import { database } from '../../index'


const AddAccount = ({ navigation }) => {
    const [name, setName] = useState('')
    const [amount, setAmount] = useState(null)

    const onAddItemPress = async () => {

        if (name.length < 2) {
            Alert.alert('Name should have atleast two characters')
            return
        }

        if (!amount) {
            Alert.alert('Amount cannot be empty')
            return
        }

        await database.write(async () => {

            const newAccount = await database.get('accounts').create(account => {
                account.name = name
                account.amount = Number(amount)
            })

            console.log('Account created')
        })

        navigation.goBack()
    }

    return (
        <View>
            <Header
                leftComponent={{ onPress: () => navigation.navigate('Menu') }}
                centerComponent={{ text: 'Account' }}
            />
            <Input
                placeholder="Name"
                leftIcon={{ type: 'font-awesome', name: 'bank' }}
                onChangeText={setName}
            />
            <Input
                placeholder="Amount"
                leftIcon={{ type: 'material-icons', name: 'account-balance-wallet' }}
                keyboardType="numeric"
                onChangeText={setAmount}
            />
            <Button title="Save" onPress={onAddItemPress} />
        </View>
    )
}

export default AddAccount
