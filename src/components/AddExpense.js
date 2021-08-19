import withObservables from '@nozbe/with-observables'
import React, { useState } from 'react'
import { Alert, ScrollView, View, StyleSheet } from 'react-native'
import { Button, Header, Icon, Input, ListItem } from 'react-native-elements'
import { database } from '../../index'

const AddExpense = ({ navigation, accounts, categories }) => {
    const [name, setName] = useState('')
    const [amount, setAmount] = useState(null)
    const [accountsExpanded, setAccountsExpanded] = useState(false)
    const [selectedAccount, setSelectedAccount] = useState(accounts[0])
    const [categoriesExpanded, setCategoriesExpanded] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState(categories[0])

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
            console.log('amount is')
            console.log(amount)

            const newExpense = await database.get('expenses').create(expense => {
                expense.name = name
                expense.amount = Number(amount)
                expense.account.set(selectedAccount)
                expense.category.set(selectedCategory)
            })

            console.log('Expense created')
            console.log(newExpense)
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
            <ListItem.Accordion 
                content={
                    <>
                        <Icon name="bank" type="font-awesome" />
                        <ListItem.Content>
                            <ListItem.Title>{selectedAccount.name}</ListItem.Title>
                        </ListItem.Content>
                    </>
                }
                isExpanded={accountsExpanded}
                onPress={() => {
                    setAccountsExpanded(!accountsExpanded)
                }}
                containerStyle={{ backgroundColor: 'inherit', paddingBottom: 15, marginBottom: 30 }}
                bottomDivider
                style={styles.input}
            >
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
            </ListItem.Accordion>

            <ListItem.Accordion
                content={
                    <>
                        <Icon
                            type={selectedCategory.iconType}
                            name={selectedCategory.iconName}
                        />
                        <ListItem.Content>
                            <ListItem.Title>{selectedCategory.name}</ListItem.Title>
                        </ListItem.Content>
                    </>
                }
                isExpanded={categoriesExpanded}
                onPress={() => {
                    setCategoriesExpanded(!categoriesExpanded)
                }}
                containerStyle={{ backgroundColor: 'inherit', paddingBottom: 15, marginBottom: 30 }}
                bottomDivider
                style={styles.input}
            >
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
            </ListItem.Accordion>
            <Button style={styles.input} title="Submit" onPress={onAddItemPress} />
        </View>
    )
}

const enhance = withObservables([], () => ({
    accounts: database.collections.get('accounts').query(),
    categories: database.collections.get('categories').query()
}))

export default enhance(AddExpense)

const styles = StyleSheet.create({
    container:{
        flex:1,
        borderColor: 'red',
        borderWidth:2
    },
    input:{
        flex:1,
        borderColor:'yellow',
        borderWidth:2
    }
}) 
