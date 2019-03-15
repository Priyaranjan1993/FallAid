import React, {Component} from 'react';
import {StyleSheet, View, Text, AsyncStorage} from "react-native";

export default class utility {

    static async getToken() {
        try {
            let token = await AsyncStorage.getItem('user');
            return token
        } catch (error) {
            console.log("error while getting token");
            return 'error'
        }
    }

    static async getFallHeight() {
        try {
            let token = await AsyncStorage.getItem('fallHeight');
            return token
        } catch (error) {
            console.log("error while getting token");
            return 'error'
        }
    }
}