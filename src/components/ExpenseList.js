import { Q } from '@nozbe/watermelondb'
import withObservables from '@nozbe/with-observables'
import React, { useState } from 'react'
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

const RawExpenseList = ({ startTime, expenses, navigation }) => {
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

const ExpenseListRange = withObservables([], ({ startTime, endTime }) => ({
    expenses: database.collections.get('expenses')
        .query(
            Q.where('created_at', Q.gte(startTime)),
            Q.where('created_at', Q.lte(endTime))
        )
}))(RawExpenseList)


const ExpenseList = ({ startDate = new Date(), endDate = new Date() }) => {
    const [startTime, setStartTime] = useState(startDate.setHours(0, 0, 0, 0))
    const [endTime, setEndTime] = useState(endDate.setHours(23, 59, 59, 999))

    return (
        <ExpenseListRange
            startTime={startTime}
            endTime={endTime}
        />
    )
}

export default ExpenseList