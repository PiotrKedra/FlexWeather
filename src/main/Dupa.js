import React from 'react';
import {View, Text} from "react-native";

class Dupa extends React.PureComponent{

    componentDidMount(): void {
        this.props.navigation.navigate('MainPage')
    }

    render() {
        return (
            <View>
                <Text>Dupa</Text>
            </View>
        )
    }


}

export default Dupa;
