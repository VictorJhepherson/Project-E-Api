import React, { useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import Api from '../Api'; 
import { UserContext } from '../contexts/UserContext';

import MyBook from '../assets/Logo.svg';

export default () => {
    const { dispatch: userDispatch } = useContext(UserContext);
    const navigation = useNavigation();

    useEffect(()=>{
        const checkToken = async () => {
            const token = await AsyncStorage.getItem('token');
            const user = await AsyncStorage.getItem('user');
            if(token) {
                let json = await Api.checkToken(token, user);
                if(json.token) {
                    await AsyncStorage.setItem('token', json.token);
                    userDispatch({
                        type: 'setAvatar',
                        payload: {
                            avatar: json.data.USR_PHOTO
                        }
                    });
                    
                    navigation.reset({
                        routes: [{name: 'Home'}]
                    });
                } else {
                    navigation.reset({
                        routes: [{name: 'SignIn'}]
                    });
                }
            } else {
                navigation.reset({
                    routes: [{name: 'SignIn'}]
                });
            }
        }
        checkToken();
    }, []);

    return (
        <View style={styles.container}>
            <MyBook width="100%" height="160"/>
            <ActivityIndicator size="large" color="#000000" style={styles.loading}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    },
    loading: {
        marginTop: 10
    }
})