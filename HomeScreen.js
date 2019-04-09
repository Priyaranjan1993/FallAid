import React, {Component} from 'react';
import {StyleSheet, View, Text, AsyncStorage, Image} from "react-native";
import utility from "./utility";


export default class HomeScreen extends Component {

    static navigationOptions = {title: 'HomePage', header: null};

    constructor(props) {
        super(props);
        this.state = {
            initialIndicatorVal: 0,
            height: 0
        };
    }

    async componentDidMount() {
        // Preload data from an external API
        // Preload data using AsyncStorage
        const data = await this.performTimeConsumingTask();
        let initialVal = 0;
        let fallHeightJson = {};

        if (data !== null) {
            let token = utility.getToken().then(
                (val) => {
                    console.log(val);

                    let parsedObj = JSON.parse(val);
                    //console.log(parsedObj);
                    //console.log(parsedObj.emName);
                    //console.log(Object.entries(parsedObj)[0].value);
                    //console.log(Object.entries(parsedObj).length === 0);
                    //console.log(parsedObj.constructor === Object);
                    if (val ==null || parsedObj.emName == '') {
                        this.props.navigation.navigate('Intro');
                    }
                    else {
                        //this.props.navigation.navigate('Intro');
                        utility.getFallHeight().then(
                            (val) => {
                                if (val != null) {
                                    fallHeightJson = JSON.parse(val);
                                    console.log(fallHeightJson);

                                    this.setState({height: fallHeightJson.height});
                                    if (fallHeightJson.height == 30) {
                                        initialVal = 0;
                                    }
                                    else if (fallHeightJson.height == 45) {
                                        initialVal = 1;

                                    }
                                    else if (fallHeightJson.height == 65) {
                                        initialVal = 2;
                                    }
                                }
                                else {
                                    initialVal = 0;
                                }
                                this.setState({
                                    initialIndicatorVal: initialVal
                                });
                                this.props.navigation.navigate('Tracker', {
                                    height: fallHeightJson.height== undefined ? 30 : fallHeightJson.height,
                                    initialIndicatorVal: initialVal,
                                    emergencyNumber: parsedObj.emNumber
                                });
                            });
                    }

                });
        }
    }

    performTimeConsumingTask = async () => {
        return new Promise((resolve) =>
            setTimeout(
                () => {
                    resolve('result')
                },
                1000
            )
        )
    };

    isEmpty(obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    /*    getCache = async() => {
            try{
                let user = await AsyncStorage.getItem('user');
                console.log(user);
                let parsed = JSON.parse(user);
                this.setState({isFirstLogin: user != null ? false : true})
            }
            catch(error){

            }
        };*/

    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={{width: '100%', height: '50%'}}
                    source={{uri: 'https://res.cloudinary.com/priyaranjan/image/upload/v1552694289/logo_transparent.png'}}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    }
});