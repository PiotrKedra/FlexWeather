import React from 'react';
import {View, Text, StyleSheet, FlatList, ScrollView} from 'react-native';

export default class MainPage extends React.Component {

    state = {
        days: [{date: 22, short: 'wen'},{date: 23, short: 'thr'},{date: 24, short: 'fri'},{date: 25, short: 'sun'},{date: 26, short: 'sat'},{date: 27, short: 'mon'},{date: 28, short: 'thu'}]
    };

    render = () => {
        return(
            <View style={{flex: 1, backgroundColor: '#aaedaa'}}>
                <View style={styles.upView}>
                    <View style={styles.leftMenu}>
                        <Text style={{fontSize: 35}}>M</Text>
                        <View style={styles.leftSmallMenu}>
                            <Text style={{fontSize: 35}}>L</Text>
                            <Text style={{fontSize: 35}}>C</Text>
                        </View>
                    </View>
                    <View style={styles.rightMenu}>
                        <View style={styles.locationView}>
                            <Text style={styles.streetText}>Widokowa 22</Text>
                            <Text style={styles.locationText}>Zabierzów</Text>
                        </View>
                        <View>
                            <FlatList
                                data={this.state.days}
                                renderItem={ (item) => (
                                    <View style={styles.dayPickView}>
                                        <Text>{item.item.date}</Text>
                                        <Text>{item.item.short}</Text>
                                    </View>
                                )}
                                keyExtractor={item => JSON.stringify(item.date)}
                                horizontal={true}
                            />
                        </View>
                    </View>
                </View>
                <ScrollView style={styles.container}>

                    <View style={styles.mainWeather}>

                    </View>
                    <View style={styles.mainWeather}>

                    </View>
                    <View style={styles.mainWeather}>

                    </View>
                </ScrollView>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        //alignItems: 'center',
        //justifyContent: 'center',
        padding: 10,
        paddingTop: 0,
    },
    mainWeather: {
        backgroundColor: 'white',
        borderRadius: 20,
        width: '100%',
        height: 200,
        marginBottom: 10
    },
    upView: {
        flexDirection: 'row',
        marginLeft: 10,
        marginTop: 30,
    },
    leftMenu:{
        borderWidth: 1,
        width: '20%',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    leftSmallMenu: {
        borderWidth: 1,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    rightMenu:{
        borderWidth: 1,
        width: '80%',
        padding: 10,
        paddingRight: 0,
    },
    border: {
        borderWidth: 1
    },
    locationView: {
        justifyContent: 'flex-end',
    },
    dayPickView: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        width: 45,
        marginLeft: 5
    },
    streetText: {
        fontSize: 23
    },
    locationText: {
        fontSize: 37
    }
});
