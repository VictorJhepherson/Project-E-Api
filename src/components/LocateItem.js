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

    const handleEntrega = async () => {
        let json = await Api.giveBackBook(data.BOOK_ID);
        if(json.error)
            alert('Não foi possível realizar a entrega do livro, tente novamente mais tarde ou contate o administrador: contato-mybook@mybook.com.br');
        else {
            alert('Entrega realizada com sucesso');
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
                    <View> 
                        <TouchableOpacity style={styles.detail} onPress={handleRead}>
                            <Text style={styles.detailText}>Ler</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.detail2} onPress={handleEntrega}>
                            <Text style={styles.detailText2}>Entregar</Text>
                        </TouchableOpacity>
                    </View>
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
        flexDirection: 'row',
        minWidth: 350
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
        width: 130,
        height: 26,
        borderWidth: 1,
        borderColor: '#008000',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    detail2: {
        width: 130,
        height: 26,
        borderWidth: 1,
        borderColor: '#FF0000',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 160,
        marginTop: -26
    },
    detailText: {
        fontSize: 13,
        color: '#008000'
    },
    detailText2: {
        fontSize: 13,
        color: '#FF0000'
    },
});