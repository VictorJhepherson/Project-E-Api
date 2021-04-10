import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import Api from '../Api';
import { UserContext } from '../contexts/UserContext';

import MyBook from '../assets/Logo.svg';
import Email from '../assets/email.svg';
import Lock from '../assets/lock.svg';

export default function SignIn() {
    const { dispatch: userDispatch } = useContext(UserContext);
    const navigation = useNavigation();

    const [emailField, setEmailField] = useState('');
    const [passwordField, setpasswordField] = useState('');

    const handleSignClick = async () => {
        if(emailField != '' && passwordField != '') {
            let json = await Api.signIn(emailField, passwordField); 
            if(json.token)  {
                await AsyncStorage.setItem('token', json.token);
                await AsyncStorage.setItem('user', json.data.USR_ID.toString());
                await AsyncStorage.setItem('userName', json.data.USR_NAME);
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
                alert('E-mail e/ou senha incorretos!');
            }

        } else {
            alert("Preencha os campos!");
        }
    }

    const handleMessageButtonClick = () => {
        navigation.navigate('SignUp');
    }

    return (
        <View style={styles.background}>
            <MyBook width="100%" height="160"/>
            <Text style={styles.title}>MyBook</Text>
            <View style={styles.container}>
                <View style={styles.inputArea}>
                    <Email width="24" height="24" fill="#000000" />
                    <TextInput 
                        style={styles.input} 
                        placeholder="Digite seu e-mail"
                        placeholderTextColor="#000000"
                        value={emailField}
                        onChangeText={t=>setEmailField(t)}
                    />
                </View>
                <View style={styles.inputArea}>
                    <Lock width="24" height="24" fill="#000000" />
                    <TextInput
                        style={styles.input} 
                        placeholder="Digite sua senha"
                        placeholderTextColor="#000000"
                        value={passwordField}
                        onChangeText={t=>setpasswordField(t)}
                        secureTextEntry={true}
                    />
                </View>
                <TouchableOpacity onPress={handleSignClick} style={styles.loginButton}>
                    <Text style={styles.loginText}>Login</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={handleMessageButtonClick} style={styles.registerButton}>
                <Text style={styles.registerText}>Ainda não possui uma conta?</Text>
                <Text style={styles.registerTextBold}>Cadastre-se</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    },
    title: {
        fontSize: 24,
        color: '#000',
        marginBottom: 40,
        marginTop: 10,
        fontWeight: 'bold'
    },
    container: {
        width: '100%',
        padding: 40
    },
    inputArea: {
        width: '100%',
        height: 50,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        borderRadius: 10,
        paddingLeft: 15,
        alignItems: 'center',
        marginBottom: 15,
        marginTop: 10,
        borderLeftWidth: 4,
        borderRightWidth: 4
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#000000'
    },
    TextMasked: {
        flex: 1,
        fontSize: 16,
        color: "#000000",
        marginLeft: 10
    },
    loginButton: {
        height: 50,
        backgroundColor: '#000000',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    loginText: {
        fontSize: 18,
        color: '#FFFFFF'
    },
    registerButton: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    registerText: {
        fontSize: 16,
        color: '#000000'
    },
    registerTextBold: {
        fontSize: 16,
        color: '#000000',
        fontWeight: 'bold',
        marginLeft: 5
    }
});