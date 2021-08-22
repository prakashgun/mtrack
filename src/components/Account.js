import withObservables from '@nozbe/with-observables'
import React from 'react'
import { Alert, View } from 'react-native'
import { Header, PricingCard } from 'react-native-elements'
import { database } from '../../index'


const Account = ({ account, navigation }) => {

    const deleteAccount = async (account) => {
        await database.write(async () => {
            await account.markAsDeleted()
            console.log('Account deleted')
            navigation.navigate('AccountList')
        })
    }

    const onDeleteItemPress = (account) => {
        Alert.alert(
            'Delete',
            'Delete this account and all associated records ?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel pressed'),
                    style: 'cancel'
                },
                {
                    text: 'OK',
                    onPress: () => deleteAccount(account)
                }
            ]
        )
    }

    return (
        <View>
            <Header
                leftComponent={{ onPress: () => navigation.navigate('Menu') }}
                centerComponent={{ text: 'Account' }}
            />
            <PricingCard
                color="#3e3b33"
                title={account.name}
                price={account.amount}
                button={{ title: 'Delete', onPress: () => onDeleteItemPress(account) }}
            />
        </View>
    )
}

const enhance = withObservables(['route'], ({ route }) => ({
    account: database.collections.get('accounts').findAndObserve(route.params.id)
}));

export default enhance(Account);
