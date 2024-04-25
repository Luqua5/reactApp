import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    RefreshControl,
    Button
} from 'react-native';
import type { Product } from '../utils/types';
import type { User } from '../utils/types';
import { useAppContext } from '../utils/ContextProvider'; 


const Login = ({route, navigation }) => {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    const { login } = useAppContext(); // Accédez à votre contexte


    const submit = async () => {
        const loginVerif = await login(email, password);
        if (loginVerif) {
            navigation.navigate('HomePage');
        }else{
            setError('Email ou mot de passe incorrect');
        }
    }

    return (
        <View style={{alignItems:'center'}}>
            <Text style={{color:'red'}}>{error}</Text>
            <TextInput
                placeholder="Email"
                onChangeText={(text) => {
                    setEmail(text);
                }}
                style={{borderWidth:1, backgroundColor:'white', borderColor:'black', margin:10, padding:5, borderRadius:5, width:'90%', alignSelf:'center'}}
            />
            <TextInput
                placeholder="Mot de passe"
                secureTextEntry={true}
                onChangeText={(text) => {
                    setPassword(text)
                }}
                style={{borderWidth:1, backgroundColor:'white', borderColor:'black', margin:10, padding:5, borderRadius:5, width:'90%', alignSelf:'center'}}
            />
            <Button
                onPress={() => {
                    submit()
                }}
                title="Login"
                color={'black'}
            />
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('Register');
                }}
            >
                <Text>Pas encore de compte ? Crée un compte</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Login;
