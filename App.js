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
        } else {
            this.setState({
                restored: true
            });
        }

    }

    getFileName = async (id) => {
        try {
            const response = await axios.get(`${SERVER_URL}/files/${id}`, {
                headers: {
                    Authorization: `bearer ${this.state.token}`,
                    'Access-Control-Allow-Origin': '*',
                    'Content-type': 'application/x-www-form-urlencoded',
                },
            });
            if (response.status >= 200 && response.status <= 299) {
                return response && response.data && response.data.name;
            } else {
                alert(response.status);
            }
        } catch (e) {
            alert('Error while requesting file infos');
            return null;
        }
        return null;
    };

    createFile = async (name) => {
        try {
            const response = await axios.post(`${SERVER_URL}/files`, qs.stringify({ name }), {
                headers: {
                    Authorization: `bearer ${this.state.token}`,
                    'Access-Control-Allow-Origin': '*',
                    'Content-type': 'application/x-www-form-urlencoded',
                },
            });
            if (response.status >= 200 && response.status <= 299) {
                return response && response.data && response.data.id;
            } else {
                alert(response.status);
            }
        }
        catch (e) {
            alert('Error while requesting file infos');
            return null;
        }
    };

    login = (email, password) => {
        axios.post(`${SERVER_URL}/users/login`, qs.stringify({email, password }), {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-type': 'application/x-www-form-urlencoded',
            },
        }).then(async (res) => {
            if (res.status >= 200 && res.status <= 299) {
                AsyncStorage.setItem('@app:session', JSON.stringify({token: res.data.token, email}));
                this.setState({
                    token: res.data.token,
                    email
                })
            } else {
                alert(res.status);
            }
        }).catch(() => {
            alert('Error while login');
        })
    };

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
        }).catch(() => {
            alert('Error while registering');
        });
    };

    render() {
        if (this.state.restored) {
            return <StateContext.Provider value={{
                token: this.state.token,
                login: this.login,
                createFile: this.createFile,
                getFileName: this.getFileName,
                register: this.register
            }}>
                <AppTek/>
            </StateContext.Provider>;
        } else {
            return null;
        }
    }
}

