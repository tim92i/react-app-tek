import React from 'react';
import io from 'socket.io-client';
import { SERVER_URL } from 'react-native-dotenv';
import { StateContext } from '../../state';
import {KeyboardAvoidingView, StyleSheet, TextInput, Text, View} from 'react-native';

export default class Edition extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            name: '',
            fileId: null,
            io: io(SERVER_URL)
        }
    }

    async componentDidMount() {
        const { io } = this.state;
        const {file} = this.context;
        if (file.action === "CREATE") {
            const fileId = await this.context.createFile(file.value);
            this.setState({fileId, name: file.value});
            io.emit('join', fileId);
        }
        else {
            this.setState({fileId: file.value});
            const name = await this.context.getFileName(file.value);
            this.setState({name});
            io.emit('join', file.value);
        }
        io.on('update', (data) => {
            this.setState({text: data})
        });
    }

    static contextType = StateContext;

    render() {

        const { io, fileId, text, name } = this.state;
        const {file} = this.context;
        return (
            <KeyboardAvoidingView behavior={'padding'} enabled={true} style={styles.container}>
                <Text style={styles.filename}>{name}</Text>

                    {file.action === "CREATE" ? <View >
                            <Text>Id to join the doc edition :</Text>
                            <Text selectable>{fileId}</Text>
                    </View>
                        : <Text>Edition of joined document</Text>}
                <TextInput
                    style={styles.input}
                    multiline={true}
                    numberOfLines={6}
                    value={text}
                    onChangeText={(text) => {
                        io.emit('update', fileId, text);
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
        height: '70%',
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        margin: 20
    },
    filename: {
        fontSize: 20,
        fontWeight: 'bold'
    }
});
