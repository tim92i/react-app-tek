import React from 'react';
import io from 'socket.io-client';
import { SERVER_URL } from 'react-native-dotenv';
import Markdown from 'react-native-markdown-renderer';
import { StateContext } from '../../state';
import {KeyboardAvoidingView, StyleSheet, TextInput, Text, View, ScrollView, Button} from 'react-native';

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

    onQr = (code) => {
        this.props.navigation.navigate('QR', {code});
    };

    render() {

        const { io, fileId, text, name } = this.state;
        const {file} = this.context;
        return (
            <View style={styles.rootViewContainer}>
                <View style={{height: '55%'}}>
                    <KeyboardAvoidingView behavior={'padding'} enabled={true} style={styles.container}>
                        <Text style={styles.filename}>{name}</Text>

                        {file.action === "CREATE" ? <View >
                                <Text selectable>{fileId}</Text>
                                <Button onPress={this.onQr.bind(this, fileId)} title={'Get QR Code'}/>
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
                </View>
                <Text style={styles.previewStyle}> - Preview - </Text>
                <ScrollView style={styles.scrollStyle}>
                    <Markdown>{text}</Markdown>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    rootViewContainer: {
        height: '100%',
        backgroundColor: '#F5FCFF'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
    },
    scrollStyle: {
        height: '50%',
        borderTopColor: 'black',
        borderTopWidth: 1
    },
    previewStyle: {
        width: '100%',
        textAlign: 'center'
    }

});
