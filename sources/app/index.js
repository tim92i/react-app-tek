import * as React from 'react';
import { StateContext } from '../state';
import {Text} from 'react-native';

export default class MainApp extends React.Component {

    static contextType = StateContext;

    render() {
        return <Text>{this.context.token}</Text>
    }
}
