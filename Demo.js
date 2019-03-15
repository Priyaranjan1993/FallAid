import React, {Component} from 'react';
import {Avatar, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {StyleSheet, View, Text, Platform, AsyncStorage} from "react-native";
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
import {accelerometer, setUpdateIntervalForType, SensorTypes} from "react-native-sensors";
import SwitchSelector from "react-native-switch-selector";
import {map, filter} from "rxjs/operators";
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

const instructions = Platform.select({
    ios: 'The app detected a fall , are you okay ?,\n' + 'Press Cancel if okay else choose the call option',
    android:
    'The app detected a fall , are you okay ?,\n' +
    'Press Cancel if okay else choose the call option',
});

setUpdateIntervalForType(SensorTypes.accelerometer, 10);

class Demo extends Component {

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
            emergencyNumber:this.props.navigation.getParam("emergencyNumber")
        };
        this.changeHeight = this.changeHeight.bind(this);
    }

    componentDidMount() {
        console.log(this.state);
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



    render() {
        const options = [
            {label: "30", value: "30"},
            {label: "40", value: "40"},
            {label: "50", value: "50"}
        ];


        const subscription = accelerometer
            .pipe(map(({x, y, z}) => x + y + z), filter(speed => speed > 20))
            .subscribe(
                speed => {
                    /*                  this.setState({
                                          acc: speed
                                      });*/
                    //call(args).catch(console.error);
                    //RNImmediatePhoneCall.immediatePhoneCall('+14085948932');
                    if (speed > this.state.height) {
                        console.log("state height -- " + this.state.height);
                        console.log(`You fell with ${speed}"`);
                        this.setState({
                            visible: true
                        });

                        subscription.unsubscribe();
                    }
                    console.log(`You moved your phone with ${speed}`)
                },
                error => {
                    console.log("The sensor is not available");
                }
            );

        return (
            <View style={styles.container}>

                <SwitchSelector
                    options={options}
                    initial={this.state.initialIndicatorVal}
                    onPress={value => this.changeHeight(value)}
                    style={styles.switch}
                />

                <WaveIndicator color='blue' size={580} count={3} waveFactor={0.55} waveMode="fill"/>


                <Dialog
                    visible={this.state.visible}
                    onTouchOutside={() => {
                        this.setState({visible: false});
                    }}
                    dialogAnimation={new SlideAnimation({
                        slideFrom: 'bottom',
                    })}
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
                    </DialogContent>
                </Dialog>

                <Avatar
                    size="medium"
                    rounded
                    icon={{name: 'user', type: 'font-awesome', color: 'orange'}}
                    overlayContainerStyle={{backgroundColor: 'white'}}
                    onPress={() => this.props.navigation.navigate('EmergencyContacts')}
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
        fontSize: 18,
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
        width: '60%',
        marginTop: 40
    }
});

export default Demo;