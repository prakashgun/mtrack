import { NavigationContainer } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import AuthNavigator from './AuthNavigator'
import HomeNavigator from './HomeNavigator'

export default function AppNavContainer() {
    const [isAuthenticated, setIsAuthenticated] = useState(true)
    const [isLoggedIn, setIsLoggedIn] = useState(true)

    const getUser = async () => {
        console.log('Getting user')
    }

    useEffect(() => {
        getUser()
    }, [])

    return (
        <NavigationContainer>
            {isLoggedIn || isAuthenticated ? <HomeNavigator /> : <AuthNavigator />}
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({})