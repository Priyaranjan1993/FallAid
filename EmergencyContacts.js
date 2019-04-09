import React from 'react';
import {StyleSheet, Text, View, Dimensions, AsyncStorage, Alert, ScrollView, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input, Button} from 'react-native-elements';
import GlobalFont from 'react-native-global-font';
import Hr from "react-native-hr-plus";
import utility from "./utility";
import {HeaderBackButton} from 'react-navigation';
import HomeScreen from "./HomeScreen";
import Intro from "./Intro";
import RNImmediatePhoneCall from "react-native-immediate-phone-call";

import Dialog, {
    DialogContent,
    SlideAnimation,
    DialogTitle,
    DialogFooter,
    DialogButton
} from 'react-native-popup-dialog';

const SCREEN_WIDTH = Dimensions.get('window').width;

const instructions = Platform.select({
    ios: 'Great !! All set. \n\n' +

    'The application would prompt you to dial to your \n' + 'emergency contact automatically when you experience a ' +
    'sudden fall. \n\n' + 'In case you do not respond within  10 seconds, FallAid would automatically dial up to your emergency contact without your permission for your safety. ' +
    'Please press Continue to move forward.',
    android:
    'Great !! All set. \n\n' +

    'The application would prompt you to dial to your \n' + 'emergency contact automatically when you experience a ' +
    'sudden fall. \n\n' + 'In case you do not respond within  20 seconds, FallAid would automatically dial up to your emergency contact without your permission for your safety. ' +
    'Please press Continue to move forward.'
});

export default class EmergencyContacts extends React.Component {

    static navigationOptions = ({navigation}) => {
        return {
            title: 'Emergency Contact',
            headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#f5a714'
            },
            headerLeft: navigation.getParam('leftButton'),
            headerRight: (
                <Button
                    onPress={navigation.getParam('resetData')}
                    title="RESET" type="clear" raised
                    titleStyle={{color: '#fff'}}
                />
            ),
        };
    };

/*    headerLeft: this.props.navigation.getParam("showBackBtn") == false ?  null : <Button
title="Back  " type="clear" raised titleStyle={{color: '#fff'}}
onPress={navigation.getParam('goBack')}
/>*/


    constructor(props) {
        super(props);
        this.state = {
            userInfo: {
                emName: '', emNumber: '', emEmail: '', name: '', email: '', number: ''
            },
            isValid: true,
            visible: false,
            initialIndicatorVal: 0,
            height: 0,
            isBackButtonEnabled: this.props.navigation.getParam("showBackBtn")
        };
        this.setCache = this.setCache.bind(this);
        /*        this.getCache = this.getCache.bind(this);*/
        this.isValid = this.isValid.bind(this);
        this.updateForm = this.updateForm.bind(this);
        this.isValidCheck = this.isValidCheck.bind(this);
        this.trackerNavigate = this.trackerNavigate.bind(this);
        this.gback = this.gback.bind(this);

    }

    componentDidMount() {
        this.props.navigation.setParams({resetData: this._resetData});
        this.props.navigation.setParams({goBack: this._goBack});
        this.props.navigation.setParams({leftButton: this._leftButton});
        let fontName = 'Roboto';
        GlobalFont.applyGlobal(fontName);
        let token = utility.getToken().then(
            (val) => {
                console.log(val);
                parsedObj = JSON.parse(val);
                this.updateForm({
                    userInfo: {
                        ...this.state.userInfo,
                        emName: parsedObj.emName,
                        emNumber: parsedObj.emNumber,
                        emEmail: parsedObj.emEmail,
                        name: parsedObj.name,
                        email: parsedObj.email,
                        number: parsedObj.number,
                    }
                })

            });
    }

    isValid() {
        return !(this.state.userInfo.emName != '');
    }

    _resetData = () => {
        let newObj = {
            emName: '',
            emNumber: '',
            emEmail: '',
            name: '',
            number: '',
            email: ''
        };
        let heightVal = {
            height: 0
        };
        AsyncStorage.setItem('user', JSON.stringify(newObj));
        AsyncStorage.setItem('fallHeight', JSON.stringify(heightVal));
        this.props.navigation.push('Intro');
    };

    _goBack = () => {
        this.props.navigation.goBack();
    };

    gback()
    {
        this.props.navigation.goBack();
    };

    _leftButton = () => {
        if(this.state.isBackButtonEnabled)
        {
            return <Button
                title="Back  " type="clear" raised titleStyle={{color: '#fff'}}
                onPress={this.gback}/>
        }
        else {
            return null;
        }
    };

    trackerNavigate() {

        let initialVal = 0;
        let fallHeightJson = {};
        let parsedObj= {};
        this.setState({visible: false});

        utility.getToken().then(
            (val) => {
                console.log(val);
                parsedObj = JSON.parse(val);
            });
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
                this.props.navigation.push('Tracker', {
                    height: fallHeightJson.height== undefined ? 30 : fallHeightJson.height,
                    initialIndicatorVal: this.state.initialIndicatorVal,
                    emergencyNumber: parsedObj.emNumber
                });
            });
    }

    updateForm(newState) {
        this.setState(newState);
        // console.log(newState);
    }

    isValidCheck() {
        this.state.isValid = !(this.state.userInfo.emName != '' && this.state.userInfo.emNumber != '' && this.state.userInfo.name != '' &&
            this.state.userInfo.number != '' && this.state.userInfo.email != '');
        console.log(this.state.isValid);
        console.log("*****************");
    }


    setCache() {
        let obj = {
            emName: this.state.userInfo.emName,
            emNumber: this.state.userInfo.emNumber,
            emEmail: this.state.userInfo.emEmail,
            name: this.state.userInfo.name,
            number: this.state.userInfo.number,
            email: this.state.userInfo.email
        };
        AsyncStorage.setItem('user', JSON.stringify(obj));
        this.setState({
            visible: true
        });
        //this.props.navigation.navigate('Tracker');
    };

    /*
        getCache = async () => {
            try {
                let user = await AsyncStorage.getItem('user');
                let parsed = JSON.parse(user);
                alert(parsed.name);
            }
            catch (error) {

            }
        };*/

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>

                    <Hr color="black" width={3}>
                        <Text style={styles.textWithDivider}>USER INFO</Text>
                    </Hr>

                    <Input
                        placeholder='Contact Name'
                        inputContainerStyle={styles.inputField}
                        onChangeText={
                            text => {
                                this.updateForm({userInfo: {...this.state.userInfo, name: text}});
                                this.isValidCheck();
                            }
                        }
                        value={this.state.userInfo.name}
                        leftIcon={
                            <Icon
                                name='user'
                                size={20}
                                color='black'
                            />
                        }
                    />

                    <Input
                        placeholder='Phone Number'
                        keyboardType='numeric'
                        inputContainerStyle={styles.inputField}
                        onChangeText={
                            text => {
                                this.updateForm({userInfo: {...this.state.userInfo, number: text}});
                                this.isValidCheck();
                            }
                        }
                        value={this.state.userInfo.number}
                        leftIcon={
                            <Icon
                                name='phone'
                                size={20}
                                color='black'
                            />
                        }
                    />

                    <Input
                        placeholder='Email ID'
                        inputContainerStyle={styles.inputField}
                        onChangeText={
                            text => {
                                this.updateForm({userInfo: {...this.state.userInfo, email: text}});
                                this.isValidCheck();
                            }
                        }
                        value={this.state.userInfo.email}
                        leftIcon={
                            <Icon
                                name='envelope'
                                size={20}
                                color='black'
                            />
                        }
                    />

                    <Hr color="black" width={3}>
                        <Text style={styles.textWithDivider}>EMERGENCY CONTACT INFO</Text>
                    </Hr>

                    <Input
                        placeholder='Contact Name'
                        inputContainerStyle={styles.inputField}
                        onChangeText={
                            text => {
                                this.updateForm({userInfo: {...this.state.userInfo, emName: text}});
                                this.isValidCheck();
                            }
                        }
                        value={this.state.userInfo.emName}
                        leftIcon={
                            <Icon
                                name='user'
                                size={20}
                                color='black'
                            />
                        }
                    />

                    <Input
                        placeholder='Phone Number'
                        keyboardType='numeric'
                        inputContainerStyle={styles.inputField}
                        onChangeText={
                            text => {
                                this.updateForm({userInfo: {...this.state.userInfo, emNumber: text}});
                                this.isValidCheck();
                            }
                        }
                        value={this.state.userInfo.emNumber}
                        leftIcon={
                            <Icon
                                name='phone'
                                size={20}
                                color='black'
                            />
                        }
                    />

                    <Input
                        placeholder='Email ID'
                        inputContainerStyle={styles.inputField}
                        onChangeText={
                            text => {
                                this.updateForm({userInfo: {...this.state.userInfo, emEmail: text}});
                                this.isValidCheck();
                            }
                        }
                        value={this.state.userInfo.emEmail}
                        leftIcon={
                            <Icon
                                name='envelope'
                                size={20}
                                color='black'
                            />
                        }
                    />


                    <Button
                        title="Submit"
                        type="solid"
                        raised
                        containerStyle={styles.fallCSS}
                        onPress={this.setCache}
                        disabled={this.state.isValid}
                    />


                    <Dialog
                        visible={this.state.visible}
                        dialogAnimation={new SlideAnimation({
                            slideFrom: 'bottom',
                        })}
                        rounded={true}
                        width={380}
                        dialogTitle={<DialogTitle title="ALL SET"/>}
                        footer={
                            <DialogFooter>
                                <DialogButton
                                    text="CONTINUE"
                                    onPress={this.trackerNavigate}
                                />
                            </DialogFooter>
                        }
                    >
                        <DialogContent>
                            <Text style={styles.instructionss}>{instructions}</Text>
                        </DialogContent>
                    </Dialog>

                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputField: {
        borderRadius: 40,
        borderWidth: 1,
        borderColor: 'rgba(110, 120, 170, 1)',
        height: 50,
        width: SCREEN_WIDTH - 20,
        marginVertical: 20,
        paddingLeft: 5
    },
    fallCSS: {
        width: '50%',
        top: '0%'
    },
    instructionss: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 10,
        marginTop: 10,
        fontSize: 15,
    },
    reset: {
        color: '#fff'
    },
    textWithDivider: {
        color: "black",
        marginVertical: 10,
        paddingHorizontal: 10
    }
});