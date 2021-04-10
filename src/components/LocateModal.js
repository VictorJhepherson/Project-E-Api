import React, { useState } from 'react';
import { Modal, TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import Api from '../Api';

import ExpandIcon from '../assets/expand.svg';

export default ({show, setShow, value})  => {

    const [seven, setSeven] = useState(false);
    const [fourteen, setFourteen] = useState(false);

    const handleCloseButton = () => {
        setShow(false);
    };

    const LocateBook = async () => {
        let loc_date = 0;
        if(seven)
            loc_date = 7;
        else
            loc_date = 14;
        
        let json = await Api.locateBook(value, loc_date);
        if(json.mensagem == 'Você já realizou 3 locações nos últimos 30 dias desde a primeira locação') 
            alert(json.mensagem);
        else if(json.error)
            alert('Não foi possível realizar a locação do livro');
        else 
            setShow(false);
    };

    return (
        <Modal
            transparent={true}
            visible={show}
            animationType="slide"
        >
            <View style={styles.background}>
                <View style={styles.modalBody}>
                    <TouchableOpacity onPress={handleCloseButton} style={styles.closeButton}>
                        <ExpandIcon width="40" height="40" fill="#000000"/>
                    </TouchableOpacity>
                    <View style={styles.checkArea}>
                        <TouchableOpacity style={styles.seven} disabled={seven} onPress={() => { setFourteen(false); setSeven(true); }}>
                            <Text style={styles.dias}>7 Dias</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.fourteen} disabled={fourteen} onPress={() => { setSeven(false); setFourteen(true) }}>
                            <Text style={styles.dias}>14 Dias</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.header}>
                        <TouchableOpacity style={styles.locar} onPress={LocateBook}>
                            <Text style={styles.textLocar}>Locar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end'
    },
    modalBody: {
        backgroundColor: '#FFFFFF',
        minHeight: 300,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        padding: 10
    },
    closeButton: {
        width: 40,
        height: 40
    },
    checkArea: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    seven: {
        backgroundColor: '#87CEEB',
        width: 150,
        height: 60,
        marginBottom: 30,
        marginTop: 40,
        marginLeft: 25,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20
    },
    fourteen: {
        backgroundColor: '#87CEEB',
        width: 150,
        height: 60,
        marginBottom: 30,
        marginTop: 40,
        marginRight: 25,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20
    },
    locar: {
        flex: 1,
        backgroundColor: '#4169E1',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        marginLeft: 40,
        marginRight: -40,
        marginBottom: -30
    },
    textLocar: {
        fontSize: 18,
        color: '#FFFFFF'
    },
    dias: {
        fontSize: 18,
        color: '#FFFFFF'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 300,
        height: 50
    }
});