import withObservables from '@nozbe/with-observables'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Button, Header, Icon, ListItem } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler'
import { database } from '../../index'

const RawCategoryItem = ({ category, onPress }) => (
    <TouchableOpacity onPress={onPress}>
        <ListItem
            key={category.id}
            bottomDivider
        >
            <Icon name={category.iconName} type={category.iconType} />
            <ListItem.Content>
                <ListItem.Title>{category.name}</ListItem.Title>
            </ListItem.Content>
        </ListItem>
    </TouchableOpacity>
)

const CategoryItem = withObservables(['category'], ({ category }) => ({
    category: category.observe()
}))(RawCategoryItem)

const CategoryList = ({ categories }) => {
    const navigation = useNavigation()

    return (
        <View style={styles.container}>
            <ScrollView style={styles.list} >
                <Header
                    leftComponent={{ onPress: () => navigation.navigate('Menu') }}
                    centerComponent={{ text: 'Categories' }}
                />
                {
                    categories.map((category) => (
                        <CategoryItem
                            category={category}
                            key={category.id}
                            onPress={() => {
                                console.log('Category clicked')
                                return navigation.navigate('Category', { id: category.id })
                            }}
                        />
                    ))
                }
            </ScrollView>
            <Button title="Add" onPress={() => navigation.navigate('AddCategory')} />
        </View>
    )
}

const enhance = withObservables([], () => ({
    categories: database.collections.get('categories').query()
}))

export default enhance(CategoryList)

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    list: {
        flex: 1
    }
})