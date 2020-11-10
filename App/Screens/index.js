import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import React, { Component } from 'react'
import { Root } from "native-base"
import NavigationService from './NavigationService'

export const AppNavigator = createStackNavigator(
    {
        Splash: {
            getScreen: () => require('./Splash').default,
            navigationOptions: {
                headerShown: false
            },
        },
        Login: {
            getScreen: () => require('./Login').default,
            navigationOptions: {
                headerShown: false
            },
        },
        Home: {
            getScreen: () => require('./Home').default,
            navigationOptions: {
                headerShown: false
            },
        },
        Register: {
            getScreen: () => require('./Register').default,
            navigationOptions: {
                headerShown: false
            },
        },
        FilterJokes: {
            getScreen: () => require('./FilterJokes').default,
            navigationOptions: {
                headerShown: false
            },
        },
        FilterJokesFromApi: {
            getScreen: () => require('./FilterJokesFromApi').default,
            navigationOptions: {
                headerShown: false
            },
        },
    },
    // initialRouteName
    {
        initialRouteName: 'Splash'
    },
    {
        header: null
    }
)

AppNavigator.navigationOptions = {
    header: null
}

const AppContainer = createAppContainer(AppNavigator)

export default class Navigation extends Component {

    constructor(props) {
        super(props)
        
    }

    render() {
        return (
            <Root>
                <AppContainer
                    ref={navigatorRef => {
                        NavigationService.setTopLevelNavigator(navigatorRef)
                    }}
                />
            </Root>
        )
    }
}