import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Api from '../Api';

export default ({data}) => {
    const navigation = useNavigation();

    const handleRead = async () => {
        if(data.BOOK_PATH != null) {
            navigation.navigate('Read', {
                BOOK_PATH: data.BOOK_PATH
            });
        } else {
            alert('Não foi possível abrir o livro, tente novamente mais tarde ou contate o administrador: contato-mybook@mybook.com.br');
        }
    };

    return (
        <View style={styles.item} onPress={handleRead}>
            <View style={styles.infoBook}>
                <Text style={styles.title}>Título: {data.BOOK_NAME}</Text>
                <Text style={styles.status}>Status: {data.LOC_STATUS == 'l' ? 'Locado' : 'Disponível'}</Text>
                <Text style={styles.author}>Data locação: {data.LOC_DATE_RETIRADA}</Text>
                <Text style={styles.author2}>Data expiração: {data.LOC_DATE_ENTREGA}</Text>
                {data.LOC_STATUS == 'l' &&
                    <TouchableOpacity style={styles.detail} onPress={handleRead}>
                        <Text>Ler</Text>
                    </TouchableOpacity>
                }
            </View>
        </View>
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
        color: '#000000'
    },
    author2: {
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