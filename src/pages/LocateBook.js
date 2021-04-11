import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TouchableOpacity, TextInput, ScrollView, ImageBackground, StyleSheet } from 'react-native';
import Api from '../Api';

import Back from '../assets/back.svg';
import FavoriteClean from '../assets/favorito-vazio.svg';
import Favorite from '../assets/favorito.svg';
import LocateModal from '../components/LocateModal';

export default function LocateBook() {
    const navigation = useNavigation();
    const route = useRoute();

    const [locateModal, setLocateModal] = useState(false);
    const [verify, setVerify] = useState(true);

    const [bookInfo, setBookInfo] = useState({
        BOOK_ID: route.params.BOOK_ID,
        BOOK_NAME: route.params.BOOK_NAME,
        BOOK_DESC: route.params.BOOK_DESC,
        BOOK_STATUS: route.params.BOOK_STATUS,
        BOOK_AUTHOR: route.params.BOOK_AUTHOR,
        BOOK_GEN: route.params.BOOK_GEN
    });

    const handleBack = async () => {
        navigation.navigate('Home');
    };

    const handleFavorite = () => {
        setVerify(false);
    };

    const handleFavorite2 = () => {
        setVerify(true);
    };

    const LocateBook = async () => {
        setLocateModal(true);
    };

    return (
        <View style={styles.background}>
            <ImageBackground style={styles.headerArea} source={{ uri: 'https://super.abril.com.br/wp-content/uploads/2018/04/bibliotecas.png?quality=70&strip=info&resize=680,453' }}>
               <TouchableOpacity style={styles.back} onPress={handleBack}>
                    <Back width="36" height="36" fill="#FFFFFF"/>
                </TouchableOpacity>
            </ImageBackground>
            <View style={styles.infoBook}>
                <Text style={styles.title}>{bookInfo.BOOK_NAME}</Text>
                <Text style={styles.textBodyTitleGen}>Genêro:</Text>
                <Text style={styles.desc}>{bookInfo.BOOK_GEN}</Text>
                <Text style={styles.textBodyTitleAutor}>Autor:</Text>
                <Text style={styles.desc}>{bookInfo.BOOK_AUTHOR}</Text>
                <Text style={styles.textBodyTitle}>Descrição:</Text>
                <Text style={styles.desc}>{bookInfo.BOOK_DESC}</Text>
                
            </View>
            <View style={styles.header}>
                {verify ?
                    <TouchableOpacity style={styles.back} onPress={handleFavorite}>
                        <FavoriteClean width="36" height="36" fill="#000000" style={styles.core}/>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={styles.back} onPress={handleFavorite2}>
                        <Favorite width="36" height="36" fill="#000000" style={styles.core}/>
                    </TouchableOpacity>
                }
                {bookInfo.BOOK_STATUS == 'd' ?
                    <TouchableOpacity style={styles.locar} onPress={LocateBook}>
                        <Text style={styles.textLocar}>Locar</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={styles.locar} disabled={true}>
                        <Text style={styles.textLocar}>Indisponível</Text>
                    </TouchableOpacity>
                }
            </View>

            <LocateModal 
                show={locateModal}
                setShow={setLocateModal}
                value={bookInfo.BOOK_ID}
            />
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
        marginBottom: 50,
        height: 230,
        minWidth: 415,
        backgroundColor: '#191919'
    },
    back: {
        alignItems: 'center',
        marginBottom: 160,
        marginLeft: 10
    },
    infoBook: {
        flex: 1,
        alignItems: 'center',
        marginBottom: 30,
        marginTop: -50,
        width: 412
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 20,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 15
    },
    textBodyTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        marginRight: 270,
        marginBottom: 5,
        marginTop: 5
    },
    textBodyTitleGen: {
        fontSize: 17,
        fontWeight: 'bold',
        marginRight: 300,
        marginBottom: 5,
        marginTop: 5
    },
    textBodyTitleAutor: {
        fontSize: 17,
        fontWeight: 'bold',
        marginRight: 310,
        marginBottom: 5,
        marginTop: 5
    },
    desc: {
        fontSize: 17,
        color: '#000',
        marginLeft: 10,
        marginRight: 10
    },
    locar: {
        flex: 1,
        backgroundColor: '#000000',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50
    },
    textLocar: {
        fontSize: 18,
        color: '#FFFFFF'
    },
    header: {
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 350,
        height: 50
    },
    core: {
        marginTop: 160,
        marginRight: 20,
        marginLeft: -15
    }
});