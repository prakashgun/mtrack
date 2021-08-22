import withObservables from '@nozbe/with-observables'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Button, Header, Icon, ListItem } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler'
import { database } from '../../index'

const RawExpenseItem = ({ expense, account, category, onPress }) => (
    <TouchableOpacity onPress={onPress}>
        <ListItem
            key={expense.id}
            bottomDivider
        >
            <Icon name={category.iconName} type={category.iconType} />
            <ListItem.Content>
                <ListItem.Title>{expense.name}</ListItem.Title>
                <ListItem.Subtitle>{account.name}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Content right>
                <ListItem.Subtitle>{expense.amount}</ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    </TouchableOpacity>
)

const ExpenseItem = withObservables(['expense'], ({ expense }) => ({
    expense: expense.observe(),
    account: expense.account,
    category: expense.category
}))(RawExpenseItem)

const ExpenseList = ({ expenses, navigation }) => {
    return (
        <View>
            <ScrollView >
                <Header
                    leftComponent={{ onPress: () => navigation.navigate('Menu') }}
                    centerComponent={{ text: 'Expenses' }}
                />
                {
                    expenses.map((expense) => (
                        <ExpenseItem
                            expense={expense}
                            key={expense.id}
                            onPress={() => {
                                console.log('Expense clicked')
                                return navigation.navigate('Expense', { id: expense.id })
                            }}
                        />
                    ))
                }
            </ScrollView>
            <Button title="Add" onPress={() => navigation.navigate('AddExpense')} />
        </View>
    )
}

const enhance = withObservables([], () => ({
    expenses: database.collections.get('expenses').query()
}))

export default enhance(ExpenseList)