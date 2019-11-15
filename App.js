import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import AppTek from './sources';
import {StateContext} from './sources/state';
import { SERVER_URL } from 'react-native-dotenv';
import axios from 'axios';
import qs from 'qs';

export default class App extends Component {

    state = {
        restored: false,
        token: null,
        email: null
    };

    async componentWillMount() {
        const data = await AsyncStorage.getItem('@app:session');

        if (data) {
            const parsed_data = JSON.parse(data);
            this.setState({
                restored: true,
                token: parsed_data.token,
                email: parsed_data.email
            });
            //this.setState({
            //    restored: true
            //});
        } else {
            this.setState({
                restored: true
            });
        }

    }

    login = (email, password) => {
        axios.post(`${SERVER_URL}/users/login`, qs.stringify({email, password }), {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-type': 'application/x-www-form-urlencoded',
            },
        }).then(async (res) => {
            if (res.status >= 200 && res.status <= 299) {
                AsyncStorage.setItem('@app:session', JSON.stringify({token: res.data.token, email}))
                this.setState({
                    token: res.data.token,
                    email
                })
            } else {
                alert(res.status);
            }
        }).catch(err => {
            alert('Error while login');
        })
    }

    register = (email, password)  => {

        axios.post(`${SERVER_URL}/users`, qs.stringify({email, password }), {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-type': 'application/x-www-form-urlencoded',
            },
        }).then(async (res) => {
            if (res.status >= 200 && res.status <= 299) {
                await this.login(email, password);
            } else {
                alert(res.status);
            }
        }).catch((err) => {
            alert('Error while registering');
        });
    }

    render() {
        if (this.state.restored) {
            return <StateContext.Provider value={{
                token: this.state.token,
                login: this.login,
                register: this.register
            }}>
                <AppTek/>
            </StateContext.Provider>;
        } else {
            return null;
        }
    }
}

