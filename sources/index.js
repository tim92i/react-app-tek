import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import MainApp from './app';
import Edit from './app/edition';
import Login from './login';
import Register from './register';
import { StateContext } from './state';

const AuthNavigator = createStackNavigator({
    Login: {
        screen: Login,
    },
    Register: {
        screen: Register
    }
}, {
    initialRouteName: 'Login',
});


const AppNavigator = createStackNavigator({
    Home: {
        screen: MainApp,
    },
    Edit: {
        screen: Edit
    }
}, {
    initialRouteName: 'Home',
});

const AuthApp = createAppContainer(AuthNavigator);
const TekApp = createAppContainer(AppNavigator);

export default class AppTek extends Component {
    static contextType = StateContext;
    render() {
        switch (this.context.token) {
            case null: {
                return <AuthApp/>;
            }
            default: {
                return <TekApp/>;
            }

        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

