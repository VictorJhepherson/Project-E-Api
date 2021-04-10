import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { WebView } from 'react-native-webview';

export default function Read() {
    const navigation = useNavigation();
    const route = useRoute();

    const [bookInfo, setBookInfo] = useState({
        BOOK_PATH: route.params.BOOK_PATH
    });

    return (
        <WebView source={{ uri: bookInfo.BOOK_PATH }} />
    );
}
