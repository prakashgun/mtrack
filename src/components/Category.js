import withObservables from '@nozbe/with-observables'
import React from 'react'
import { Alert, View } from 'react-native'
import { Header, PricingCard } from 'react-native-elements'
import { database } from '../../index'


const Category = ({ category, navigation }) => {

    const deleteCategory = async (category) => {
        await database.write(async () => {
            await category.markAsDeleted()
            console.log('Category deleted')
            navigation.navigate('CategoryList')
        })
    }

    const onDeleteItemPress = (category) => {
        Alert.alert(
            'Delete',
            'Delete this category and all associated records ?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel pressed'),
                    style: 'cancel'
                },
                {
                    text: 'OK',
                    onPress: () => deleteCategory(category)
                }
            ]
        )
    }

    return (
        <View>
            <Header
                leftComponent={{ onPress: () => navigation.navigate('Menu') }}
                centerComponent={{ text: 'Category' }}
            />
            <PricingCard
                color="#3e3b33"
                title={category.name}
                button={{ title: 'Delete', onPress: () => onDeleteItemPress(category) }}
            />
        </View>
    )
}

const enhance = withObservables(['route'], ({ route }) => ({
    category: database.collections.get('categories').findAndObserve(route.params.id)
}));

export default enhance(Category);
