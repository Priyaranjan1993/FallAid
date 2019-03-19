/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {AsyncStorage, StyleSheet, Text, View} from 'react-native';
import {Avatar, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import Home from "./Home";
import Tracker from "./Tracker";
import Demo2 from "./Demo2";
import HomeScreen from "./HomeScreen";
import Intro from "./Intro";
import EmergencyContacts from "./EmergencyContacts";


export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isFirstLogin : false
        };
       // this.getCache = this.getCache.bind(this);
    }


    render() {
        return <AppContainer/>;
    }
}
/*const HomeComponent = (props) => {
    console.log(props.navigation.state);
    return (this.state.isFirstLogin ? Home : Tracker );
};*/


const AppNavigator = createStackNavigator({
        AppHome: {screen: HomeScreen},
        Tracker: {screen: Tracker},
        Demo2: {screen: Demo2},
        Intro: {screen: Intro},
        EmergencyContacts: {screen: EmergencyContacts},

    },
    {
        initialRouteName: "AppHome"
    });

const AppContainer = createAppContainer(AppNavigator);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#edeaf3',
    },
    welcome: {
        fontSize: 50,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    butnPos: {
        marginTop: 180,
    },
});


