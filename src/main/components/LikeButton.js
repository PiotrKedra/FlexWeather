import React from 'react';
import {View, Animated, StyleSheet, TouchableOpacity, Text} from "react-native";

class LikeButton extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            count : 0,
            claps: []
        }
    }

    clap = () => {
        let count = this.state.count + 1;
        let claps = this.state.claps;
        claps.push(count);
        this.setState({count: count, claps: claps})
    };

    removeBobble = (count) => {
        let claps = this.state.claps;
        claps.splice(claps.indexOf(count), 1);
        this.setState(claps);
    };

    renderBobbles() {
        return this.state.claps.map(countNum => <LikeBobble key={countNum} count={countNum} removeBobble={this.removeBobble}/>)
    };

    keepClapping = () => {
        this.clapTimer = setInterval(() => this.clap(), 150);
    };

    stopClapping = () => {
        if (this.clapTimer){
            clearInterval(this.clapTimer);
        }
    };

    render() {
        return (
            <View style={{flex: 1, position: 'absolute', bottom: 5, right: 5}}>
                <TouchableOpacity
                    onPress={this.clap}
                    onPressIn={this.keepClapping}
                    onPressOut={this.stopClapping}
                    style={styles.likeButton}
                >
                </TouchableOpacity>
                {this.renderBobbles()}
            </View>
        )
    };
}

class LikeBobble extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            yPosition : new Animated.Value(0),
            opacity: new Animated.Value(0)
        }
    }

    componentDidMount() {
        Animated.parallel([
            Animated.timing(this.state.yPosition, {
                toValue: -70,
                duration: 500
            }),
            Animated.timing(this.state.opacity, {
                toValue: 1,
                duration: 400
            })
        ]).start(() => {
            setTimeout(() => {
                this.props.removeBobble(this.props.count)
            }, 400)
        });
    }

    render() {
        let animationStyle = {
            transform: [{translateY: this.state.yPosition}],
            opacity: this.state.opacity,
        };
        return (
            <Animated.View style={[styles.likeBobble, animationStyle]}>
                <Text style={styles.bobbleText}>+ {this.props.count}</Text>
            </Animated.View>
        )
    }
}



const styles = StyleSheet.create({
    likeButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#33417a',
        position: 'absolute',
        bottom: 20,
        right: 20,
        elevation: 5
    },
    likeBobble: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#33417a',
        position: 'absolute',
        bottom: 20,
        right: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    bobbleText: {
        fontSize:  14,
        color: 'white'
    }
});

export default LikeButton;
