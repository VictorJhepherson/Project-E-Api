import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

export default ({data}) => {
    const navigation = useNavigation();

    const handleLocateBook = async () => {
        navigation.navigate('LocateBook', {
            BOOK_ID: data.BOOK_ID,
            BOOK_NAME: data.BOOK_NAME,
            BOOK_DESC: data.BOOK_DESC,
            BOOK_STATUS: data.BOOK_STATUS
        });
    };

    return (
        <TouchableOpacity style={styles.item} onPress={handleLocateBook}>
            <View style={styles.infoBook}>
                <Text style={styles.title}>Título: {data.BOOK_NAME}</Text>
                <Text style={styles.status}>Status: {data.BOOK_STATUS == 'd' ? 'Disponível' : 'Indisponível'}</Text>
                <Text style={styles.author}>Autor: {data.BOOK_AUTHOR}</Text>
                <View style={styles.detail}>
                    <Text>Detalhes</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#FFFFFF',
        marginBottom: 20,
        borderRadius: 20,
        padding: 15,
        flexDirection: 'row'
    },
    infoBook: {
        marginLeft: 20,
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#000000'
    },
    status: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#000000'
    },
    author: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#000000',
        marginBottom: 10
    },
    detail: {
        width: 86,
        height: 26,
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    detailText: {
        fontSize: 13,
        color: '#000000'
    }
});