import withObservables from '@nozbe/with-observables'
import React from 'react'
import { View } from 'react-native'
import { Header, Icon, ListItem } from 'react-native-elements'

const AccountList = ({ accounts, navigation }) => {
    return (
        <View>
            <Header
                leftComponent={{ onPress: () => navigation.navigate('Menu') }}
                centerComponent={{ text: 'Accounts' }}
            />
            {
                accounts.map((account, i) => (
                    <ListItem
                        key={i}
                        bottomDivider
                    >
                        <Icon name="bank" type="font-awesome" />
                        <ListItem.Content>
                            <ListItem.Title>{account.name}</ListItem.Title>
                        </ListItem.Content>
                        <ListItem.Content right={true}>
                            <ListItem.Title>{account.balance}</ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                ))
            }
        </View>
    )
}

const enhance = withObservables([], ({ database }) => ({
    accounts: database.collections.get('accounts').query()
}))

export default enhance(AccountList)