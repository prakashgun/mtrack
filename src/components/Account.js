import React from 'react'
import { Text, View } from 'react-native'
import {Header} from 'react-native-elements'

const Account = ({route, navigation}) => {
    const {id} = route.params
    return (
        <View>
                        <Header
                leftComponent={{ onPress: () => navigation.navigate('Menu') }}
                centerComponent={{ text: 'Account' }}
            />
            <Text>Account {id}</Text>
        </View>
    )
}

export default Account
