import * as React from 'react';
import { Button, TextInput, Text, View, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { StateContext } from '../state';

export default class Register extends React.Component {

    state = {
        email: '',
        password: '',
        password_verify: ''
    }

    static contextType = StateContext;

    static navigationOptions = {
        title: 'Register',
    };

    render() {
        return <KeyboardAvoidingView behavior={'padding'} enabled={true} style={styles.container}>
            <TextInput
                //value={this.state.email}
                onChangeText={(email) => this.setState({ email })}
                placeholder={'Email'}
                style={styles.input}
            />
            <TextInput
                //value={this.state.password}
                onChangeText={(password) => this.setState({ password })}
                placeholder={'Password'}
                secureTextEntry={true}
                style={styles.input}
            />
            <TextInput
                //value={this.state.password}
                onChangeText={(password_verify) => this.setState({ password_verify })}
                placeholder={'Verify Password'}
                secureTextEntry={true}
                style={styles.input}
            />
            <View style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                <Button
                    title={'Register'}
                    onPress={() => {
                        if (this.state.email && this.state.password && this.state.password === this.state.password_verify) {
                            this.context.register(this.state.email, this.state.password);
                        }
                    }}
                />
            </View>
        </KeyboardAvoidingView>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    input: {
        width: '80%',
        height: 44,
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        margin: 20
    },
});


