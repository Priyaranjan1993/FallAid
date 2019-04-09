import React, {Component} from 'react';
import {Avatar, Button} from 'react-native-elements';
import {StyleSheet, View, Text, Image} from "react-native";
import FontAwesome, { Icons } from 'react-native-fontawesome';
import AppIntroSlider from 'react-native-app-intro-slider';
import Icon from 'react-native-ionicons'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    image: {
        width: 320,
        height: 320,
    },
    text: {
        color: 'rgba(255, 255, 255, 0.8)',
        backgroundColor: 'transparent',
        textAlign: 'center',
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 35,
        color: '#672217',
        backgroundColor: 'transparent',
        textAlign: 'center',
        marginBottom: 16,
        fontFamily: 'sans-serif-light'
    }
});

const slides = [
    {
        key: 'somethun',
        title: 'Welcome to FallAid ',
        titleStyle: styles.title,
        text: 'The application will help you receive help when you experience any sudden fall. \n',
        image: require('./assets/man-losing-hat.png'),
        imageStyle: styles.image,
        backgroundColor: '#f5a714'
    },
    {
        key: 'somethun-dos',
        title: 'FallAid tracks your movement ',
        titleStyle: styles.title,
        text: 'The application keeps an on movement and checks at every instant that if you fell down. \n',
        image: require('./assets/smartphone-with-glasses.png'),
        imageStyle: styles.image,
        backgroundColor: '#f5a714',
    },
    {
        key: 'somethun1',
        title: 'It will reach out to emergency contacts when you cannot ' ,
        titleStyle: styles.title,
        text: 'The app will reach out to your emergency contacts when are not able to reach your phone and experience a sudden fall. \n',
        image: require('./assets/telephone.png'),
        imageStyle: styles.image,
        backgroundColor: '#f5a714',
    }
];

class Intro extends Component {

    static navigationOptions = {title: 'Introduction', header: null};


    constructor(props) {
        super(props);
        this.state = {
            showRealApp: false
        };
        this._onDone = this._onDone.bind(this);
    }

    _onDone = () => {
        // User finished the introduction. Show real app through
        // navigation or simply by controlling state
        this.setState({showRealApp: true});
    };


    render() {
        if (this.state.showRealApp) {
            return this.props.navigation.push('EmergencyContacts',{
                showBackBtn: false
            });
        } else {
            return <AppIntroSlider slides={slides} onDone={this._onDone} showSkipButton={true} onSkip={this._onDone}/>;
        }
    }
}



export default Intro;