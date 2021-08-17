import withObservables from '@nozbe/with-observables'
import React from 'react'
import { Alert, View } from 'react-native'
import { Header, PricingCard } from 'react-native-elements'
import { database } from '../../index'


const Expense = ({ expense, navigation }) => {

    const deleteExpense = async (expense) => {
        await database.write(async () => {
            await expense.markAsDeleted()
            console.log('Expense deleted')
            navigation.navigate('ExpenseList')
        })
    }

    const onDeleteItemPress = (expense) => {
        Alert.alert(
            'Delete',
            'Delete this expense and all associated records ?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel pressed'),
                    style: 'cancel'
                },
                {
                    text: 'OK',
                    onPress: () => deleteExpense(expense)
                }
            ]
        )
    }

    return (
        <View>
            <Header
                leftComponent={{ onPress: () => navigation.navigate('Menu') }}
                centerComponent={{ text: 'Expense' }}
            />
            <PricingCard
                color="#8c776e"
                title={expense.name}
                price={expense.amount}
                button={{ title: 'Delete', onPress: () => onDeleteItemPress(expense) }}
            />
        </View>
    )
}

const enhance = withObservables(['route'], ({ route }) => ({
    expense: database.collections.get('expenses').findAndObserve(route.params.id)
}));

export default enhance(Expense);
