import AsyncStorage from '@react-native-async-storage/async-storage';

export const store = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
        console.log('set', key, value);
    } catch (e) {
        console.log('Error while storing ', key, value, e);
    }
}

export const retrive = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        console.log('get', key, value);
        return value ? JSON.parse(value) : null;
    } catch(e) {
        console.log('Error while retriving ', key, e);
    }
}