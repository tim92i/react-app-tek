import * as React from 'react';
import { Button, TextInput, Text, View, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { StateContext } from '../state';

export default class Login extends React.Component {

    static contextType = StateContext;

    state = {
        email: '',
        password: ''
    };

    static navigationOptions = {
        title: 'Login',
    };

    render() {
        return <KeyboardAvoidingView behavior={'padding'} enabled={true} style={styles.container}>
            <TextInput
                value={this.state.email !== '' ? this.state.email : undefined}
                onChangeText={(email) => this.setState({ email })}
                placeholder={'Email'}
                style={styles.input}
            />
            <TextInput
                value={this.state.password !== '' ? this.state.password : undefined}
                onChangeText={(password) => this.setState({ password })}
                placeholder={'Password'}
                secureTextEntry={true}
                style={styles.input}
            />
            <View style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                <Button
                    title={'Login'}
                    onPress={
                        () => {
                            if (this.state.email && this.state.password) {
                                this.context.login(this.state.email, this.state.password)
                            }
                        }
                    }
                />
                <Text>or</Text>
                <Button
                    title={'Create Account'}
                    onPress={() => this.props.navigation.navigate('Register')}
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


