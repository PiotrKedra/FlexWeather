import React from 'react';
import {connect} from 'react-redux';
import {Text} from 'react-native';

class CustomText extends React.PureComponent {
  render() {
    let style;
    if (this.props.fontLoaded === true) {
      style = [{fontFamily: 'Neucha-Regular'}, this.props.style || {}];
    } else {
      style = [{fontFamily: 'Neucha-Regular'}, this.props.style || {}];
    }
    return (
      <Text x={this.props.x} numberOfLines={1} style={style}>
        {this.props.children}
      </Text>
    );
  }
}

const mapStateToProps = (state) => {
  return {fontLoaded: state.fontLoaded};
};

export default connect(mapStateToProps)(CustomText);
