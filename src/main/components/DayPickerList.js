import React from 'react';
import {FlatList, TouchableOpacity} from 'react-native';
import Text from './CustomText';

class DayPickerList extends React.Component{

    isCurrentTimestamp = (timestamp) => {
        return this.props.currentTimestamp === timestamp;
    };

    render() {
        return (
            <FlatList
                nestedScrollEnabled={true}
                horizontal={true}
                style={{paddingLeft: '5%', marginBottom: 10, paddingRight: 100, flex: 1}}
                data={this.props.days}
                renderItem={item => (
                    <TouchableOpacity
                        style={[
                            {flexGrow: 1, width: 55, justifyContent: 'center', alignItems: 'center', borderRadius: 10, marginRight: 8},
                            this.isCurrentTimestamp(item.item.timestamp) ? {backgroundColor: '#FFAD94'} : {backgroundColor: 'white'}
                            ]}
                        onPress={() => this.props.setCurrentTimestamp(item.item.timestamp)}
                    >
                        <Text style={{fontSize: 25}}>{item.item.date}</Text>
                        <Text style={{fontSize: 22}}>{item.item.day}</Text>
                    </TouchableOpacity>
                )}
                ListFooterComponent={() => (
                    <TouchableOpacity style={{height: 75, width: 30, marginRight: 8}}>
                    </TouchableOpacity>
                )}
                keyExtractor={item => JSON.stringify(item.timestamp)}
            />
        )
    }
}

export default DayPickerList;
