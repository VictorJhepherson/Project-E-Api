import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TouchableOpacity, TextInput, ScrollView, ImageBackground, StyleSheet } from 'react-native';
import Api from '../Api';

import LogOut from '../assets/logout.svg';
import Back from '../assets/back.svg';
import Account from '../assets/account.svg';
import LocateItem from '../components/LocateItem';

export default function Profile() {
    const navigation = useNavigation();

    const [list, setList] = useState([]);
    const [listLocate, setListLocate] = useState([]);
    const [verify, setVerify] = useState(true);
    const [name, setName] = useState('');
    const [cpf, setCPF] = useState('');
    const [rg, setRG] = useState('');
    const [phone, setPhone] = useState('');
    const [birthday, setBirthday] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const [passwordModal, setPasswordModal] = useState(false);

    const handleBack = async () => {
        navigation.navigate('Home');
    };

    const handleRead = async () => {
        navigation.navigate('Read');
    };

    const handleModifyPageInfo = () => {
        setVerify(true);
    }

    const handleEditButton = () => {
        setPasswordModal(true);
    }

    const getLocates = async () => {
        let json = await Api.getLocates();
        if(json.data != null)
            setListLocate(json.data);
        else 
            alert("Erro: "+ res.error);
    };

    const handleModifyPageLocados = () => {
        setVerify(false);
        setList
        (
            <View style={styles.infoArea} >
                <ScrollView style={styles.scroll} >
                    {loading && 
                        <ActivityIndicator size="large" color="#FFFFFF"/>
                    }
                    <View style={styles.listArea}>
                        {listLocate ?
                            listLocate.map((item, k) => (
                                <LocateItem key={k} data={item} />
                            ))
                            :
                            <Text style={styles.infoText}>Você não possui livros locados</Text>
                        }
                    </View>
                </ScrollView>
            </View>
        );
    }

    const handleModifyPageFavoritos = () => {
        setVerify(false);
        setList
        (
            <View style={styles.infoArea}>
                <Text style={styles.infoText}>Favoritos</Text>
            </View>
        );
    }

    const handleMessageButtonClick = async () => {
        let json = await Api.signOut();
        if(json.token == null){
            await AsyncStorage.setItem('token', '');
            navigation.reset({
                routes: [{name: 'SignIn'}]
            });
        } else {
            alert('Não foi possível fazer Logout!');
        }
    };

    const getUserInfo = async () => {
        const user = await AsyncStorage.getItem('user');
        let json = await Api.getUserId(user);
        if(json.lenght < 1){

        } else {
            json.data.map((item, k) => {
                setCPF(item.USRDOC_CPFNUMBER);
                setRG(item.USRDOC_RGNUMBER);
                setPhone(item.USR_PHONENUMBER);
                setBirthday(item.USR_DATEBIRTHDAY);
                setEmail(item.USR_LOGINNAME);
            });
        }
    };

    useEffect(async () => {
        setName(await AsyncStorage.getItem('userName'));
        getUserInfo();
        getLocates();
    }, [], []);
    return(
        <View style={styles.background}>
            <ImageBackground style={styles.headerArea} source={{ uri: 'https://super.abril.com.br/wp-content/uploads/2018/04/bibliotecas.png?quality=70&strip=info&resize=680,453' }}>
               <TouchableOpacity style={styles.back} onPress={handleBack}>
                    <Back width="36" height="36" fill="#FFFFFF"/>
                </TouchableOpacity>
            </ImageBackground>
            <View style={styles.pageBody}>
                <View style={styles.profile}>
                    <Account width="66" height="66" fill="#000000"/>
                </View>
                <Text style={styles.name}>{name}</Text>
                <View style={styles.buttonArea}>
                    <TouchableOpacity style={styles.infoButton} onPress={handleModifyPageInfo}>
                        <Text style={styles.info}>Info</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.locadosButton} onPress={handleModifyPageLocados}>
                        <Text style={styles.locados}>Locados</Text >
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.favoritosButton} onPress={handleModifyPageFavoritos}>
                        <Text style={styles.favoritos}>Favoritos</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.infoBody}>
                <View style={styles.body}>
                    {verify ?
                        <ScrollView style={styles.scrollBody}>
                            <Text style={styles.textBodyTitle}>CPF:</Text>
                            <Text style={styles.textBody}>{cpf}</Text>
                            <Text style={styles.textBodyTitle}>RG:</Text>
                            <Text style={styles.textBodyRG}>{rg}</Text>
                            <Text style={styles.textBodyTitle}>Telefone:</Text>
                            <Text style={styles.textBodyPhone}>{phone}</Text>
                            <Text style={styles.textBodyTitle}>Nascimento:</Text>
                            <Text style={styles.textBodyBirthday}>{birthday}</Text>
                            <Text style={styles.textBodyTitle}>Email:</Text>
                            <Text style={styles.textBodyEmail}>{email}</Text>
                            <TouchableOpacity style={styles.altSenha}>
                                <Text style={styles.altText}>Alterar senha</Text>
                            </TouchableOpacity>
                        </ScrollView>
                        :
                        list
                    }
                </View>
                <View style={styles.logOutArea}>
                    <Text style={styles.logOutText}>Sair da minha conta</Text>
                    <TouchableOpacity style={styles.logOut} onPress={handleMessageButtonClick}>
                        <LogOut width="36" height="36" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
} 

const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: 'center'
    },
    headerArea: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        height: 230,
        minWidth: 415
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000'
    },
    logOutArea: {
        flexDirection: 'column',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        alignItems: 'center'
    },
    logOutText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#FF0000',
        marginLeft: 80,
        marginTop: 20,
        marginBottom: -3
    },
    logOut: {
        alignItems: 'center',
        marginLeft: 300,
        marginTop: -25,
        marginBottom: 20
    },
    back: {
        alignItems: 'center',
        marginBottom: 160,
        marginLeft: 10
    },
    pageBody: {
        alignItems: 'center',
        width: 412,
        flexDirection: 'row'
    },
    profile: {
        width: 66,
        height: 66,
        marginTop: -500,
        marginLeft: 10
    },
    name: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#000',
        marginTop: -500
    },
    buttonArea: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 410,
        marginLeft: -340,
        marginBottom: 450 
    },
    info: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#000'
    },
    locados: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#000'
    },
    favoritos: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#000'
    },
    infoButton: {
        width: 40,
        height: 40,
        marginLeft: 30,
        marginTop: 70
    },
    locadosButton: {
        width: 80,
        height: 80,
        marginTop: 35,
        marginBottom: -75
    },
    favoritosButton: {
        width: 80,
        height: 80,
        marginRight: 30,
        marginTop: 35,
        marginBottom: -75
    },
    infoBody: {
        marginTop: -450,
        height: 461,
        width: 412
    },
    body: {
        height: 400,
        width: 405,
        marginLeft: 3,
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#000000'
    },
    scrollBody: {
        flex: 1
    },
    textBodyTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        marginLeft: 20,
        marginTop: 20
    },
    textBody: {
        fontSize: 17,
        marginLeft: 75,
        marginBottom: 20,
        marginTop: -25
    },
    textBodyRG: {
        fontSize: 17,
        marginLeft: 65,
        marginBottom: 20,
        marginTop: -25
    },
    textBodyPhone: {
        fontSize: 17,
        marginLeft: 115,
        marginBottom: 20,
        marginTop: -25
    },
    textBodyBirthday: {
        fontSize: 17,
        marginLeft: 140,
        marginBottom: 20,
        marginTop: -25
    },
    textBodyEmail: {
        fontSize: 17,
        marginLeft: 88,
        marginBottom: 20,
        marginTop: -25
    },
    altSenha: {
        width: 146,
        height: 56,
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 120
    },
    altText: {
        fontSize: 15,
        color: '#000000'
    },  
    infoArea: {
        flex: 1
    },
    scroll: {
        flex: 1,
        padding: 20
    },
    listArea: {
        marginBottom: 10,
        marginTop: 10
    }
});