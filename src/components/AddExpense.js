import withObservables from '@nozbe/with-observables'
import React, { useState } from 'react'
import { Alert, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Button, Header, Icon, Input, ListItem, Overlay } from 'react-native-elements'
import { database } from '../../index'

const AddExpense = ({ navigation, accounts, categories }) => {
    const [name, setName] = useState('')
    const [amount, setAmount] = useState(null)
    const [accountsExpanded, setAccountsExpanded] = useState(false)
    const [selectedAccount, setSelectedAccount] = useState(accounts[0])
    const [categoriesExpanded, setCategoriesExpanded] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState(categories[0])

    const toggleCategoriesOverlay = () => {
        setCategoriesExpanded(!categoriesExpanded)
    }

    const toggleAccountsOverlay = () => {
        setAccountsExpanded(!accountsExpanded)
    }

    const onAccountIconPress = (account) => {
        console.log('account icon pressed: ', account)
        setSelectedAccount(account)
        setAccountsExpanded(!accountsExpanded)
    }

    const onCategoryIconPress = (category) => {
        console.log('category icon pressed: ', category)
        setSelectedCategory(category)
        setCategoriesExpanded(!categoriesExpanded)
    }

    const log = () => {
        console.log('Pressed')
    }

    const onAddItemPress = async () => {

        if (name.length < 2) {
            Alert.alert('Name should have atleast two characters')
            return
        }

        if (!amount) {
            Alert.alert('Amount cannot be empty')
            return
        }

        if (!selectedAccount) {
            Alert.alert('Account must be selected')
            return
        }

        if (!selectedCategory) {
            Alert.alert('Category must be selected')
            return
        }

        await database.write(async () => {
            const newExpense = await database.get('expenses').create(expense => {
                expense.name = name
                expense.amount = Number(amount)
                expense.account.set(selectedAccount)
                expense.category.set(selectedCategory)
            })

            console.log('Expense created')
        })

        navigation.navigate('ExpenseList')
    }

    return (
        <View style={styles.container}>
            <Header
                leftComponent={{ onPress: () => navigation.navigate('Menu') }}
                centerComponent={{ text: 'Expense' }}
                style={styles.input}
            />
            <Input
                placeholder="Name"
                leftIcon={{ type: 'font-awesome', name: 'bank' }}
                onChangeText={setName}
                style={styles.input}
            />
            <Input
                placeholder="Amount"
                leftIcon={{ type: 'material-icons', name: 'account-balance-wallet' }}
                keyboardType="numeric"
                onChangeText={setAmount}
                style={styles.input}
            />
            <TouchableOpacity onPress={toggleCategoriesOverlay}>
                <Input
                    placeholder={selectedCategory.name}
                    leftIcon={{ type: selectedCategory.iconType, name: selectedCategory.iconName }}
                    onChangeText={() => console.log('Catgeory selected')}
                    style={styles.input}
                    disabled
                />
            </TouchableOpacity>
            <Overlay fullScreen={true} isVisible={categoriesExpanded} onBackdropPress={toggleCategoriesOverlay}>
                <ScrollView>
                    {categories && categories.map((category, i) => (
                        <ListItem key={i} onPress={() => onCategoryIconPress(category)} bottomDivider>
                            <Icon name={category.iconName} type={category.iconType} />
                            <ListItem.Content>
                                <ListItem.Title>{category.name}</ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                    ))}
                </ScrollView>
            </Overlay>
            <TouchableOpacity onPress={toggleAccountsOverlay}>
                <Input
                    placeholder={selectedAccount.name}
                    leftIcon={{ type: "font-awesome", name: "bank" }}
                    onChangeText={() => console.log('Account selected')}
                    style={styles.input}
                    disabled
                />
            </TouchableOpacity>
            <Overlay fullScreen={true} isVisible={accountsExpanded} onBackdropPress={toggleAccountsOverlay}>
                <ScrollView>
                    {accounts.map((account, i) => (
                        <ListItem key={i} onPress={() => onAccountIconPress(account)} bottomDivider>
                            <Icon name="bank" type="font-awesome" />
                            <ListItem.Content>
                                <ListItem.Title>{account.name}</ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                    ))}
                </ScrollView>
            </Overlay>
            <Button style={styles.input} title="Save" onPress={onAddItemPress} />
        </View>
    )
}

const enhance = withObservables([], () => ({
    accounts: database.collections.get('accounts').query(),
    categories: database.collections.get('categories').query()
}))

export default enhance(AddExpense)

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    input: {}
})
