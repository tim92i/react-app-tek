import React from 'react';
import io from 'socket.io-client';
import { SERVER_URL } from 'react-native-dotenv';
import { StateContext } from '../../state';
import {KeyboardAvoidingView, StyleSheet, TextInput, Text, View, Button} from 'react-native';

export default class Edition extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            fileId: null,
            io: io(SERVER_URL)
        }
    }

    async componentDidMount() {
        const { io } = this.state;
        const {file} = this.context;
        if (file.action === "CREATE") {
            const fileId = await this.context.createFile(file.value);
            this.setState({fileId});
            io.emit('join', fileId);
        }
        else {
            this.setState({fileId: file.value});
            io.emit('join', file.value);

        }
        io.on('update', (data) => {
            this.setState({text: data})
        });
    }

    static contextType = StateContext;

    render() {
        const { io } = this.state;
        const {file} = this.context;
        return (
            <KeyboardAvoidingView behavior={'padding'} enabled={true} style={styles.container}>

                    {file.action === "CREATE" ? <View >
                            <Text>Id for joining the doc edition :</Text>
                            <Text selectable>{this.state.fileId}</Text>
                    </View>
                        : <Text>Edition of joined document</Text>}
                <TextInput
                    style={styles.input}
                    multiline={true}
                    numberOfLines={6}
                    value={this.state.text}
                    onChangeText={(text) => {
                        io.emit('update', this.state.fileId, text);
                        this.setState({text})}
                    }/>

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
        height: 200,
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        margin: 20
    },
});
