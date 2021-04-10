import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TouchableOpacity, TextInput, ScrollView, ImageBackground, StyleSheet } from 'react-native';
import Api from '../Api';

import Back from '../assets/back.svg';
import LocateModal from '../components/LocateModal';

export default function LocateBook() {
    const navigation = useNavigation();
    const route = useRoute();

    const [locateModal, setLocateModal] = useState(false);

    const [bookInfo, setBookInfo] = useState({
        BOOK_ID: route.params.BOOK_ID,
        BOOK_NAME: route.params.BOOK_NAME,
        BOOK_DESC: route.params.BOOK_DESC,
        BOOK_STATUS: route.params.BOOK_STATUS
    });

    const handleBack = async () => {
        navigation.navigate('Home');
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
                <Text style={styles.desc}>{bookInfo.BOOK_DESC}</Text>
                
            </View>
            <View style={styles.header}>
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
        alignItems: 'center'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 20,
        marginLeft: 10,
        marginRight: 10
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
        width: 300,
        height: 50
    }
});