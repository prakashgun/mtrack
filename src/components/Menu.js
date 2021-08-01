import React from 'react'
import { View } from 'react-native'
import { Header } from 'react-native-elements'


const Menu = ({ navigation }) => {
    return (
        <View>
            <Header
                leftComponent={{ onPress: () => navigation.navigate('Menu') }}
                centerComponent={{ text: 'Menu' }}
            />
        </View>
    )
}

export default Menu
