import AsyncStorage from '@react-native-async-storage/async-storage';
const BASE_API = 'https://project-e-api.herokuapp.com';

export default {
    checkToken: async (token, user) => {
        const req = await fetch(`${BASE_API}/auth/refresh`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Baerer ' + token
            },
            body: JSON.stringify({token, user})
        });
        const json = await req.json();
        return json;
    },
    signIn: async (USR_LOGINNAME, USR_PASSWORD) => {
        const req = await fetch(`${BASE_API}/auth/login`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({USR_LOGINNAME, USR_PASSWORD})
        });
        const json = await req.json();

        return json;
    },
    signUp: async (USR_NAME, USR_DATEBIRTHDAY, USR_PHONENUMBER, USRDOC_CPFNUMBER, USRDOC_RGNUMBER, USR_LOGINNAME, USR_PASSWORD) => {
        const req = await fetch(`${BASE_API}/auth/register`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({USR_NAME, USR_DATEBIRTHDAY, USR_PHONENUMBER, USRDOC_CPFNUMBER, USRDOC_RGNUMBER, USR_LOGINNAME, USR_PASSWORD})
        });
        const json = await req.json();
        return json;
    },
    signOut: async () => {
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}/auth/logout`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Baerer ' + token
            },
            body: JSON.stringify({token})
        });
        const json = await req.json();

        return json;
    },
    getBooks: async () => {
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}/book`, {
            headers: {
                "Authorization": 'Baerer ' + token
            }
        });
        const json = await req.json();
        return json;
    },
    getBookByName: async (BOOK_NAME) => {
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}/book/byName`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Baerer ' + token
            },
            body: JSON.stringify({BOOK_NAME})
        });
        const json = await req.json();
        return json;
    },
    getUserId: async (user) => {
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}/user/` + user, {
            headers: {
                "Authorization": 'Baerer ' + token
            }
        });
        const json = await req.json();
        return json;
    },
    locateBook: async (BOOK_ID, LOC_DATE_RETIRADA) => {
        const token = await AsyncStorage.getItem('token');
        const user = await AsyncStorage.getItem('user');
        const req = await fetch(`${BASE_API}/user`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Baerer ' + token
            },
            body: JSON.stringify({user, BOOK_ID, LOC_DATE_RETIRADA})
        });
        const json = await req.json();
        return json;
    },
    getLocates: async () => {
        const token = await AsyncStorage.getItem('token');
        const user = await AsyncStorage.getItem('user');
        const req = await fetch(`${BASE_API}/user/getLocates/` + user, {
            headers: {
                "Authorization": 'Baerer ' + token
            }
        });
        const json = await req.json();
        return json;
    }
};