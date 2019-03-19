import React, {Component} from 'react';
import {Avatar, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {StyleSheet, View, Text, Image} from "react-native";


class Demo2 extends Component {

    static navigationOptions = {title: 'Demo2', header: null};

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <View style={styles.container}>


                <Image
                    style={{width: '100%', height: '50%'}}
                    source={{uri: 'https://res.cloudinary.com/priyaranjan/image/upload/v1552694289/logo_transparent.png'}}
                />

          {/*      <Avatar
                    size="xlarge"
                    rounded
                    source={{
                        uri:
                            'https://res.cloudinary.com/priyaranjan/image/upload/v1552693567/logo_transparent.png',
                    }}
                />
                <Text style={styles.welcome}>FallAid</Text>*/}

                <Button
                    title="Get Started "
                    type="solid"
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
        backgroundColor: '#fff',
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
        width:'50%',
    },
});

export default Demo2;