import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Button,
    TextInput,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    RefreshControl
} from 'react-native';
import type { Product } from '../utils/types';
import type { User } from '../utils/types';
import { useAppContext } from '../utils/ContextProvider'; 


const Register = ({route, navigation }) => {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    const { register } = useAppContext(); // Accédez à votre contexte

    const submit = async () => {
        const registerVerif = await register(email, password);
        if(registerVerif){
            navigation.navigate('HomePage');
        }else{
            setError('Email invalide ou mot de passe inferieur à 8 caractères');
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
                title="Register"
                color={'black'}
            />
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('Login');
                }}
            >
                <Text>Déjà un compte ? Connecte toi</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Register;
