import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TouchableOpacity, TextInput, ScrollView, StyleSheet } from 'react-native';
import { TextInputMask } from 'react-native-masked-text'
import Api from '../Api';

import MyBook from '../assets/Logo.svg';
import Email from '../assets/email.svg';
import Lock from '../assets/lock.svg';
import Person from '../assets/person.svg';
import Today from '../assets/today.svg';
import Tel from '../assets/telefone-celular.svg';
import Doc from '../assets/pasta-de-documentos.svg';

export default function SignUp() {
    const navigation = useNavigation();

    const [nameField, setNameField] = useState('');
    const [emailField, setEmailField] = useState('');
    const [passwordField, setpasswordField] = useState('');
    const [telField, setTelField] = useState('');
    const [cpfField, setCPFField] = useState('');
    const [rgField, setRGField] = useState('');
    const [ageField, setAgeField] = useState('');

    var rgFormated = '';
    var um = '';
    var dois = '';
    var tres = '';
    var dv = '';

    function FormatedRG (numberRG) {
        var i = 0;
        while(i <= numberRG.length) {
            if(i < 2)
                um += numberRG[i];
            else if(i >= 2 && i <= 4)
                dois += numberRG[i];
            else if(i >= 5 && i <= 7)
                tres += numberRG[i];
            else if(i == 8){
                dv += numberRG[i];
            }
            i++;
        }
        rgFormated += um + '.' + dois + '.' + tres + '-' + dv;

        return rgFormated;
    }

    const handleSignClick = async () => {
        if(nameField != '' && ageField != '' && emailField != '' && passwordField != '' && cpfField != '' && rgField != '') {
            const RG = FormatedRG(rgField);
            let json = await Api.signUp(nameField, ageField, telField, cpfField, RG,  emailField, passwordField);
            if(json.token) {
                await AsyncStorage.setItem('token', json.token);

                navigation.reset({
                    routes: [{name: 'Home'}]
                });
            } else {
                alert("Erro: " + json.mensagem);
            }
        } else {
            alert("Preencha os campos obrigatórios");
        }
    };

    const handleMessageButtonClick = () => {
        navigation.navigate('SignIn')
    };

    return (
        <View style={styles.background}>
            <MyBook width="100%" height="160" style={styles.image}/>
                <View style={styles.container}>
                    <View style={styles.inputArea}>
                        <Person width="24" height="24" fill="#000000" />
                        <TextInput 
                            style={styles.input} 
                            placeholder="Digite seu nome"
                            placeholderTextColor="#000000"
                            autoCapitalize='none'
                            value={nameField}
                            onChangeText={t=>setNameField(t)}
                        />
                    </View>
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
                            secureTextEntry={true}
                            value={passwordField}
                            onChangeText={t=>setpasswordField(t)}
                        />
                    </View>
                    <View style={styles.inputArea}>
                        <Tel width="24" height="24" fill="#000000" />
                        <TextInputMask
                            type={'cel-phone'}
                            options={{
                                maskType: 'BRL',
                                withDDD: true,
                                dddMask: '(99)'
                            }}
                            placeholder="Digite seu telefone"
                            placeholderTextColor="#000000"
                            style={styles.TextMasked}
                            value={telField}
                            onChangeText={t=>setTelField(t)}
                        />
                    </View>
                    <View style={styles.inputArea}>
                        <Today width="24" height="24" fill="#000000" />
                        <TextInputMask
                            type={'datetime'}
                            options={{
                                format: 'DD/MM/YYYY'
                            }}
                            placeholder="Data de nascimento"
                            placeholderTextColor="#000000"
                            value={ageField}
                            style={styles.TextMasked}
                            onChangeText={t=>setAgeField(t)}
                        />
                    </View>
                    <View style={styles.inputArea}>
                        <Doc width="24" height="24" fill="#000000" />
                        <TextInputMask
                            type={'cpf'}
                            value={cpfField}
                            placeholder="Digite seu CPF"
                            placeholderTextColor="#000000"
                            style={styles.TextMasked}
                            onChangeText={t=>setCPFField(t)}
                        />
                    </View>
                    <View style={styles.inputArea}>
                        <Doc width="24" height="24" fill="#000000" />
                        <TextInputMask
                            type={'only-numbers'}
                            value={rgField}
                            maxLength={9}
                            placeholder="Digite seu RG"
                            placeholderTextColor="#000000"
                            style={styles.TextMasked}
                            onChangeText={t=>setRGField(t)}
                        />
                    </View>
                    <TouchableOpacity onPress={handleSignClick} style={styles.loginButton}>
                        <Text style={styles.loginText}>Cadastre-se</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleMessageButtonClick} style={styles.registerButton}>
                        <Text style={styles.registerText}>Já possui uma conta?</Text>
                        <Text style={styles.registerTextBold}>Faça login</Text>
                    </TouchableOpacity>
                </View>
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
    image: {
        marginBottom: -30,
        marginTop: 60
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
        marginBottom: 10,
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
        color: "#000000"
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
        justifyContent: 'center',
        marginBottom: 30,
        marginTop: 10
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