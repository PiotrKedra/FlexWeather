import React from 'react';
import {View} from 'react-native';
import CustomText from './CustomText';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import {getClockTimeValue} from '../units/UnitsService';

class RefreshInfo extends React.Component {
    state = {
      dateUpdate: '--:--',
    };

    componentDidMount() {
      this.setLastUpdateTime();
    }

    componentDidUpdate() {
      this.setLastUpdateTime();
    }

    async setLastUpdateTime() {
      const lastUpdate = await AsyncStorage.getItem('@forecast_update_date');
      const date = new Date(JSON.parse(lastUpdate));
      let minutes = date.getMinutes();
      if (minutes < 10) {
        minutes = '0' + minutes;
      }
      this.setState({dateUpdate: date.getHours() + ':' + minutes});
    }

    render() {
      return (
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-end', paddingLeft: '5%', paddingTop: 10}}>
          <View
            style={
              {
                width: 18,
                height: 18,
                borderRadius: 9,
                borderWidth: 1,
                borderColor: this.props.theme.softText,
                justifyContent: 'center',
                alignItems: 'center',
              }
            }>
            <CustomText style={{fontSize: 14, color: this.props.theme.softText}}>!</CustomText>
          </View>
          <CustomText style={{marginLeft: 10, fontSize: 15, color: this.props.theme.softText}}>
                    Last update {getClockTimeValue(this.state.dateUpdate, this.props.weatherUnits.clock)}
          </CustomText>
        </View>
      );
    }
}

function mapStateToProps(state) {
  return {
    theme: state.theme,
    weatherUnits: state.weatherUnits,
  };
}

export default connect(mapStateToProps)(RefreshInfo);
