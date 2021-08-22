import { Q } from '@nozbe/watermelondb'
import withObservables from '@nozbe/with-observables'
import React, { useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Button, FAB, Header, Icon, ListItem, Text } from 'react-native-elements'
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
                <ListItem.Title>{expense.amount}</ListItem.Title>
            </ListItem.Content>
        </ListItem>
    </TouchableOpacity>
)

const ExpenseItem = withObservables(['expense'], ({ expense }) => ({
    expense: expense.observe(),
    account: expense.account,
    category: expense.category
}))(RawExpenseItem)

const RawExpenseList = ({ startTime, endTime, expenses, navigation }) => {

    const [total, setTotal] = useState(0)

    const getTotal = async () => {
        const result = await database.get('expenses').query(
            Q.unsafeSqlQuery(`select sum(amount) as total from expenses where created_at >= ${startTime} and created_at <= ${endTime} limit 1`)
        ).unsafeFetchRaw()

        if (result[0]['total'] != null) {
            setTotal(result[0]['total'])
        } else {
            setTotal(0)
        }
    }

    useEffect(() => {
        getTotal()
    }, [startTime])

    return (
        <View>
            <ScrollView >
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
            <ListItem
                bottomDivider
            >
                <Icon name="bank" type="font-awesome" />
                <ListItem.Content>
                    <ListItem.Title>Total</ListItem.Title>
                    {/* <ListItem.Subtitle>{account.name}</ListItem.Subtitle> */}
                </ListItem.Content>
                <ListItem.Content right>
                    <ListItem.Title>{total}</ListItem.Title>
                </ListItem.Content>
            </ListItem>
            <Button title="Add" onPress={() => navigation.navigate('AddExpense')} />
        </View>
    )
}

const ExpenseListRange = withObservables(['startTime', 'endTime', 'total'], ({ startTime, endTime }) => ({
    expenses: database.collections.get('expenses')
        .query(
            Q.where('created_at', Q.gte(startTime)),
            Q.where('created_at', Q.lte(endTime))
        )
}))(RawExpenseList)

const DateScroller = ({ count, currentDate, decreaseDay, increaseDay }) => {
    return (
        <View style={styles.date_scroller}>
            <FAB title="-" color="#3e3b33" onPress={decreaseDay} />
            <Text style={styles.date_scroller_text}>{currentDate.toDateString()}</Text>
            <FAB title="+" color="#3e3b33" onPress={increaseDay} />
        </View>
    )
}

const ExpenseList = ({ startDate = new Date(), endDate = new Date() }) => {
    const [startTime, setStartTime] = useState(startDate.setHours(0, 0, 0, 0))
    const [endTime, setEndTime] = useState(endDate.setHours(23, 59, 59, 999))
    const [currentDate, setCurrentDate] = useState(startDate)
    const [count, setCount] = useState(0)

    const setTimes = () => {
        setStartTime(currentDate.setHours(0, 0, 0, 0))
        setEndTime(currentDate.setHours(23, 59, 59, 999))
    }

    const decreaseDay = () => {
        console.log('Decresing day')
        currentDate.setDate(currentDate.getDate() - 1)
        setCurrentDate(currentDate)
        setCount(count + 1)
        setTimes()
    }

    const increaseDay = () => {
        console.log('Increasing day')
        currentDate.setDate(currentDate.getDate() + 1)
        setCurrentDate(currentDate)
        setCount(count + 1)
        setTimes()
    }

    return (
        <View>
            <Header
                leftComponent={{ onPress: () => navigation.navigate('Menu') }}
                centerComponent={{ text: 'Expenses' }}
            />
            <DateScroller
                count={count}
                currentDate={currentDate}
                decreaseDay={decreaseDay}
                increaseDay={increaseDay}
            />
            <ExpenseListRange
                startTime={startTime}
                endTime={endTime}
            />
        </View>
    )
}

export default ExpenseList

const styles = StyleSheet.create({
    date_scroller: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: 10
    },
    date_scroller_text: {
        fontSize: 16
    }
})