import React, { useState, useEffect, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Image, StyleSheet, ActivityIndicator } from 'react-native';
import Api from '../Api';
import BookItem from '../components/BookItem';
import { UserContext } from '../contexts/UserContext';

import MyBook from '../assets/Logo.svg';
import Account from '../assets/account.svg';
import Search from '../assets/search.svg';

export default function Home({state}) {
    const { state: user } = useContext(UserContext);
    const navigation = useNavigation();

    const [list, setList] = useState([]);
    const [bookField, setBookField] = useState('');
    const [loading, setLoading] = useState(false);

    const handleMessageButtonClick = async () => {
        navigation.navigate('Profile');
    };

    const getBooks = async () => {
        setLoading(true);
        setList([]);

        let res = await Api.getBooks();
        if(res.data != null) {
            setList(res.data);
        } else {
            alert("Erro: "+ res.error);
        }
        setLoading(false);
    };

    const handleSearch = async () => {
        setLoading(true);
        setList([]);
        if(bookField != ''){
            let res = await Api.getBookByName(bookField);
            if(res.data != null) 
                setList(res.data);
            else 
                alert("Erro: "+ res.error);
        } else {
            alert('Digite o nome de um Livro!');
        }
        setLoading(false);
    };

    useEffect(() => {
        getBooks();
    }, []);

    return (
        <View style={styles.background}>
            <View style={styles.headerArea}>
                <MyBook width="36" height="36" style={styles.image}/>
                <Text style={styles.title}>MyBook</Text>
                <TouchableOpacity style={styles.profile} onPress={handleMessageButtonClick}>
                    <Account width="36" height="36" fill="#000000" />
                </TouchableOpacity>
            </View>
            <View style={styles.pageBody}>
                <View style={styles.inputArea}>
                    <TextInput 
                        style={styles.input} 
                        placeholder="Livro..."
                        placeholderTextColor="#FFFFFF"
                        value={bookField}
                        onChangeText={t=>setBookField(t)}
                    />
                    <TouchableOpacity style={styles.search} onPress={handleSearch}>
                        <Search width="24" height="24" fill="#FFFFFF"/>
                    </TouchableOpacity>
                </View>
                <View style={styles.area} >
                    <ScrollView style={styles.scroll} >
                        {loading && 
                            <ActivityIndicator size="large" color="#FFFFFF"/>
                        }
                        <View style={styles.listArea}>
                            {list.map((item, k) => (
                                <BookItem key={k} data={item} />
                            ))}
                        </View>
                    </ScrollView>
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
    image: {
        marginLeft: -10
    },
    headerArea: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 50,
        height: 60
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        marginLeft: 5
    },
    profile: {
        width: 36,
        height: 36,
        marginLeft: 200,
        marginTop: -10
    },
    pageBody: {
        backgroundColor: '#191919',
        borderTopLeftRadius: 50,
        alignItems: 'center',
        flex: 1,
        width: '100%'
    },
    inputArea: {
        width: '70%',
        height: 40,
        backgroundColor: '#191919',
        flexDirection: 'row',
        borderRadius: 10,
        paddingLeft: 15,
        position: 'absolute',
        right: 0,
        marginTop: 20,
        marginRight: 20,
        alignItems: 'center',
        borderLeftWidth: 4,
        borderRightWidth: 4
    },
    search: {
        width: 24,
        height: 24,
        marginRight: 10
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#000000'
    },
    area: {
        flex: 1,
        marginTop: 40
    },
    scroll: {
        flex: 1,
        padding: 20,
        marginTop: 30
    },
    listArea: {
        marginBottom: 10,
        marginTop: 10
    },
});