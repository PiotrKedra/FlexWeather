import React from 'react';
import {FlatList, TouchableOpacity} from 'react-native';
import Text from './CustomText';

class DayPickerList extends React.Component{

    render() {
        return (
            <FlatList
                nestedScrollEnabled={true}
                horizontal={true}
                style={{paddingLeft: '5%', marginBottom: 10, paddingRight: 100, flex: 1}}
                data={this.props.days}
                renderItem={item => (
                    <TouchableOpacity style={{flexGrow: 1, width: 55, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderRadius: 10, marginRight: 8}}>
                        <Text style={{fontSize: 25}}>{item.item.date}</Text>
                        <Text style={{fontSize: 22}}>{item.item.day}</Text>
                    </TouchableOpacity>
                )}
                ListFooterComponent={() => (
                    <TouchableOpacity style={{height: 75, width: 30, marginRight: 8}}>
                    </TouchableOpacity>
                )}
                keyExtractor={item => JSON.stringify(item.unixTimestamp)}
            />
        )
    }
}

export default DayPickerList;
