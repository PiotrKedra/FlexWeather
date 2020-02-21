import React from 'react';
import * as Font from 'expo-font';
import {Text} from 'react-native';


class CustomText extends React.Component {

    state = {
        fontLoaded: false
    };

    async componentDidMount() {
        await Font.loadAsync({
            'Neucha': require('../../../assets/fonts/Neucha-Regular.ttf'),
        });
        this.setState({fontLoaded: true});
    }

    render() {
        let style;
        if (this.state.fontLoaded === true) {
            style = [{fontFamily: 'Neucha'}, this.props.style || {}];
        }
        else {
            style = this.props.style;
        }
        return <Text style={style}>{this.props.children}</Text>
    }
}

export default CustomText;
