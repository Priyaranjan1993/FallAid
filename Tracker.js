import React, {Component} from 'react';
import {Avatar, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {StyleSheet, View, Text, Platform, AsyncStorage, ToastAndroid} from "react-native";
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
import {accelerometer, setUpdateIntervalForType, SensorTypes} from "react-native-sensors";
import SwitchSelector from "react-native-switch-selector";
import {map, filter} from "rxjs/operators";
import ReactTimeout from 'react-timeout';
import CountDown from 'react-native-countdown-component';
import Geolocation from 'react-native-geolocation-service';
import Communications from 'react-native-communications';
import SendSMS from 'react-native-sms-x';
import {
    BallIndicator,
    BarIndicator,
    DotIndicator,
    MaterialIndicator,
    PacmanIndicator,
    PulseIndicator,
    SkypeIndicator,
    UIActivityIndicator,
    WaveIndicator,
} from 'react-native-indicators';
import Dialog, {
    DialogContent,
    SlideAnimation,
    DialogTitle,
    DialogFooter,
    DialogButton
} from 'react-native-popup-dialog';
import utility from "./utility";
import GlobalFont from "react-native-global-font";
import {NativeModules} from 'react-native';


const instructions = Platform.select({
    ios:'The app detected a fall , are you okay ?,\n' +
    'Press Cancel if okay else choose the call option \n\n'+
    'No action would initiate a call after the countdown expires',
    android:
    'The app detected a fall , are you okay ?,\n' +
    'Press Cancel if okay else choose the call option \n\n'+
    'No action would initiate a call after the countdown expires',
});

setUpdateIntervalForType(SensorTypes.accelerometer, 50);

class Tracker extends Component {

    static navigationOptions = {title: 'Home', header: null};

    constructor(props) {
        super(props);
        console.log("Height -- "+this.props.navigation.getParam("height"));
        console.log("Indicator Val -- "+this.props.navigation.getParam("initialIndicatorVal"));
        this.state = {
            acc: 0,
            height: this.props.navigation.getParam("height"),
            visible: false,
            initialIndicatorVal: this.props.navigation.getParam("initialIndicatorVal"),
            emergencyNumber:this.props.navigation.getParam("emergencyNumber"),
            lat:0,
            long:0
        };
        this.changeHeight = this.changeHeight.bind(this);
        //this.forceCall = this.forceCall().bind(this);
    }

    componentDidMount() {
        console.log(this.state);
        let fontName = 'Roboto';
        GlobalFont.applyGlobal(fontName);
    }





    changeHeight(val) {
        console.log("actual - " + val);
        this.setState({
            height: val
        });
        let heightVal = {
            height: val
        };
        console.log(heightVal);
        AsyncStorage.setItem('fallHeight', JSON.stringify(heightVal));

    }

    forceCall = () => {


        if(this.state.visible == true)
        {
           console.log("2Latitude -> "+this.state.lat);
           console.log("2Longitude -> "+this.state.long);
            let parsedObj = {};
            let emName = '';

            this.setState({
                visible: false
            });

            utility.getToken().then(
                (val) => {
                    console.log(val);
                    parsedObj = JSON.parse(val);
                    emName = parsedObj.emName;
                });

           // Communications.text('8572052392','Test Message from FallAId');
           SendSMS.send(123, this.state.emergencyNumber, "Your friend "+emName+" is in trouble. He has experienced a " +
                "fall and need your help urgently.\n He is at "+this.state.lat+" latitude and "+this.state.long+" longitude.\n\n-FallAid",
                (msg)=>{
                   // ToastAndroid.show(msg, ToastAndroid.SHORT);
                    console.log(msg);
                }
            );
           RNImmediatePhoneCall.immediatePhoneCall(this.state.emergencyNumber);
        }
    };


    render() {
        const options = [
            {label: "Low ", value: "30", imageIcon: require('./assets/help.png')},
            {label: "Medium ", value: "45", imageIcon: require('./assets/accident.png')},
            {label: "High ", value: "65", imageIcon: require('./assets/person-falling-down-stairs.png')}
        ];


        const subscription = accelerometer
            .pipe(map(({x, y, z}) => x + y + z), filter(speed => speed > 20))
            .subscribe(
                speed => {
                    if (speed > this.state.height) {
                        console.log("state height -- " + this.state.height);
                        console.log(`You fell with ${speed}"`);
                        this.setState({
                            visible: true
                        });
                        Geolocation.getCurrentPosition(
                            (pos) => {
                                this.setState({
                                    lat: pos.coords.latitude,
                                    long:pos.coords.longitude
                                });
                                console.log("1Latitude -> "+pos.coords.latitude);
                                console.log("1Longitude -> "+pos.coords.longitude);
                            },
                            (error) => {
                                console.log(error.code, error.message);
                            },
                            { enableHighAccuracy: true, timeout: 1500, maximumAge: 1000 }
                        );
                       this.props.setTimeout(this.forceCall, 20000);

                    }
                    console.log(`You moved your phone with ${speed}`)
                },
                error => {
                    console.log("The sensor is not available");
                }
            );


        setTimeout(() => {
            // If it's the last subscription to accelerometer it will stop polling in the native API
            subscription.unsubscribe();
        }, 10000);


        return (
            <View style={styles.container}>

                <SwitchSelector
                    options={options}
                    initial={this.state.initialIndicatorVal}
                    onPress={value => this.changeHeight(value)}
                    style={styles.switch}
                    textColor='#7a44cf'
                    selectedColor='#fff'
                    buttonColor='#7a44cf'
                    borderColor='#7a44cf'
                    hasPadding
                />

                <WaveIndicator color='#7a44cf' size={580} count={3} waveFactor={0.55} waveMode="fill"/>

                <Dialog
                    visible={this.state.visible}
                    dialogAnimation={new SlideAnimation({
                        slideFrom: 'bottom',
                    })}
                    rounded={true}
                    width={380}
                    dialogTitle={<DialogTitle title="Fall Detected"/>}
                    footer={
                        <DialogFooter>
                            <DialogButton
                                text="CANCEL"
                                onPress={() => {
                                    this.setState({visible: false})
                                }}
                            />
                            <DialogButton
                                text="CALL"
                                onPress={() => {
                                    this.setState({visible: false});
                                    RNImmediatePhoneCall.immediatePhoneCall(this.state.emergencyNumber);
                                }}
                            />
                        </DialogFooter>
                    }
                >
                    <DialogContent>
                        <Text style={styles.instructionss}>{instructions}</Text>
                        <CountDown
                            until={20}
                            size={20}
                            digitStyle={{backgroundColor: '#FFF'}}
                            digitTxtStyle={{color: '#1CC625'}}
                            timeToShow={['S']}
                            timeLabels={{s: 'Seconds'}}
                        />
                    </DialogContent>
                </Dialog>

                <Avatar
                    size="medium"
                    rounded
                    icon={{name: 'user', type: 'font-awesome', color: '#7a44cf'}}
                    overlayContainerStyle={{backgroundColor: 'white'}}
                    onPress={() => this.props.navigation.push('EmergencyContacts',{
                        showBackBtn: true
                    })}
                    activeOpacity={0.1}
                    containerStyle={{marginBottom: 30}}
                />


            </View>
        );
    }
}

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
    instructionss: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 10,
        marginTop: 10,
        fontSize: 15,
    },
    butnPos: {
        marginTop: 180,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    switch: {
        width: '90%',
        marginTop: 40
    }
});

export default ReactTimeout(Tracker);