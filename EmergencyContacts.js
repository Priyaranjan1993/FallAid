import React from 'react';
import {StyleSheet, Text, View, Dimensions, AsyncStorage, Alert, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input, Button} from 'react-native-elements';
import GlobalFont from 'react-native-global-font';
import Hr from "react-native-hr-plus";
import utility from "./utility";

const SCREEN_WIDTH = Dimensions.get('window').width;

export default class EmergencyContacts extends React.Component {

    static navigationOptions = {title: 'Emergency Contact'};

    constructor(props) {
        super(props);
        this.state = {
            userInfo: {
                emName: '', emNumber: '', emEmail: '', name: '', email: '', number: ''
            },
            isValid:true
        };
        this.setCache = this.setCache.bind(this);
/*        this.getCache = this.getCache.bind(this);*/
        this.isValid = this.isValid.bind(this);
        this.updateForm = this.updateForm.bind(this);
        this.isValidCheck = this.isValidCheck.bind(this);

    }

    componentDidMount() {
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

    updateForm(newState) {
        this.setState(newState);
       // console.log(newState);
    }

    isValidCheck()
    {
        this.state.isValid = ! (this.state.userInfo.emName != '' && this.state.userInfo.emNumber != '' && this.state.userInfo.name != '' &&
            this.state.userInfo.number != '' && this.state.userInfo.email != '');
/*        console.log(this.state.isValid);
        console.log("*****************");*/
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
        this.props.navigation.navigate('Demo');
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
    textWithDivider: {
        color: "black",
        marginVertical: 10,
        paddingHorizontal: 10
    }
});