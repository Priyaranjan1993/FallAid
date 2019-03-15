import React, {Component} from 'react';
import {StyleSheet, View, Text, AsyncStorage} from "react-native";
import utility from "./utility";


export default class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initialIndicatorVal:0,
            height:0
        };

        let initialVal = 10;
        let fallHeightJson={
            height:35
        };
        let token = utility.getToken().then(
            (val) => {
                console.log(val);

                let parsedObj = JSON.parse(val);
                console.log(parsedObj);
                console.log(parsedObj.emName);
                console.log(Object.entries(parsedObj).length === 0 && parsedObj.constructor === Object);
                if(Object.entries(parsedObj).length === 0 && parsedObj.constructor === Object)
                {
                    this.props.navigation.navigate('Demo2');
                }
                else{
                    utility.getFallHeight().then(
                        (val) => {
                            if (val != null) {
                                fallHeightJson = JSON.parse(val);
                                console.log(fallHeightJson);

                                this.setState({height: fallHeightJson.height});
                                if (fallHeightJson.height == 30) {
                                    initialVal = 0;
                                }
                                else if (fallHeightJson.height == 40) {
                                    initialVal = 1;

                                }
                                else if (fallHeightJson.height == 50)
                                {
                                    initialVal = 2;
                                }
                            }
                            else{
                                initialVal = 0;
                            }
                            this.setState({
                                initialIndicatorVal: initialVal
                            });
                            this.props.navigation.navigate('Demo',{height:this.state.height,
                                initialIndicatorVal:this.state.initialIndicatorVal,
                                emergencyNumber: parsedObj.emNumber
                            });
                        });
                }

            });

  /*      if (token != null) {
          //this.props.navigation.navigate('Demo')
            this.props.navigation.navigate('Demo2')
        } else {
            this.props.navigation.navigate('Demo')
        }*/
    }

    isEmpty(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
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
            <View style={{ flex: 1 }}>
                <Text>Loading.....</Text>
            </View>
        )
    }
}