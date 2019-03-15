import React, {Component} from 'react';
import {Avatar, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {StyleSheet, View, Text} from "react-native";

class Home extends Component {

    static navigationOptions = {title: 'Home', header: null};

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <View style={styles.container}>

                <Avatar
                    size="xlarge"
                    rounded
                    source={{
                        uri:
                            'https://res.cloudinary.com/priyaranjan/image/upload/v1551245302/ESM2-150ppp.jpg',
                    }}
                />
                <Text style={styles.welcome}>FallAid</Text>

                <Button
                    title="Get Started "
                    type = "solid"
                    raised
                    containerStyle={styles.butnPos}
                    onPress={() =>
                        this.props.navigation.navigate('EmergencyContacts')
                    }
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
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    butnPos:{
        marginTop:180,
    },
});

export default Home;