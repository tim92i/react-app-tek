import React from 'react';
import { StateContext } from '../state';
import {KeyboardAvoidingView, StyleSheet, TextInput, Text, Button, View} from 'react-native';

export default class MainApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            text: '',
        }
    }

    static contextType = StateContext;

    openEditionScreen (action) {
        if (this.state.text) {
            this.context.file = {value: this.state.text, action };
            this.props.navigation.navigate('Edit');
        }
    }

    render() {

        return (
            <KeyboardAvoidingView behavior={'padding'} enabled={true} style={styles.container}>
                <Text style={{
                    fontSize: 20,
                    fontWeight: 'bold'
                }}>Edition mode : </Text>
                <TextInput
                    style={styles.input}
                    numberOfLines={6}
                    value={this.state.text}
                    onChangeText={(text) => this.setState({text})}/>
                <View style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                    <Button
                        title={'Create'}
                        onPress={() => this.openEditionScreen('CREATE')}
                    />
                    <Text>or</Text>
                    <Button
                        title={'Join'}
                        onPress={() => this.openEditionScreen('JOIN')}
                    />
                </View>
            </KeyboardAvoidingView>
        )
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
