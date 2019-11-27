import * as React from 'react';
import QRCode from 'react-native-qrcode-svg';
import {View, StyleSheet} from 'react-native';

export default class QR extends React.Component {
    render() {
        const code = this.props.navigation.getParam('code');

        return <View style={styles.container}>
            <QRCode
                value={code}
                size={300}
            />
        </View>
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



