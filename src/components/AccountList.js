import withObservables from '@nozbe/with-observables'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Header, Icon, ListItem } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler'

const RawAccountItem = ({ account, onPress }) => (
    <TouchableOpacity onPress={onPress}>
        <ListItem
            key={account.id}
            bottomDivider
        >
            <Icon name="bank" type="font-awesome" />
            <ListItem.Content>
                <ListItem.Title>{account.name}</ListItem.Title>
                <ListItem.Subtitle>{account.amount}</ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    </TouchableOpacity>
)

const AccountItem = withObservables(['account'], ({ account }) => ({
    account: account.observe()
}))(RawAccountItem)

const AccountList = ({ accounts, navigation }) => {
    return (
        <ScrollView>
            <Header
                leftComponent={{ onPress: () => navigation.navigate('Menu') }}
                centerComponent={{ text: 'Accounts' }}
            />
            {
                accounts.map((account) => (
                    <AccountItem
                        account={account}
                        key={account.id}
                        onPress={() => {
                            console.log('Account clicked')
                            return navigation.navigate('Account', {id: id})
                        }}
                    />
                ))
            }
        </ScrollView>
    )
}

const enhance = withObservables([], ({ database }) => ({
    accounts: database.collections.get('accounts').query()
}))

export default enhance(AccountList)