import { Alert } from 'react-native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useNavigation } from '@react-navigation/native';

export const loginAuth = (email, password) => {

    const navigation = useNavigation();

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigation.replace('Main');
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };
    return handleLogin;
};

export const registerAuth = (email, password) => {

    const handleRegister = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            console.log(auth, email, password)
            Alert.alert('Registration successful', 'You can now log in.');
        } catch (error) {
            console.log(auth, email, password)
            Alert.alert('Error', 'Confirm that you entered correct email and password.\n' + error.message);
        }
    };
    return handleRegister;
};

export const logoutAuth = () => {
    const navigation = useNavigation();

    const handleLogout = () => {
        Alert.alert(
            'Confirm',
            'Do you want to log out?',
            [
                { text: 'Cancel' },
                {
                    text: 'Yes',
                    onPress: async () => {
                        try {
                            await signOut(auth);
                            navigation.replace('Login');
                        } catch (error) {
                            Alert.alert('Error', error.message);
                        }
                    },
                },
            ],
        );
    };
    return handleLogout;
};
