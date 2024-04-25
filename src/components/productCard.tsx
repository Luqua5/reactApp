import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Image,
    Button,
    TextInput,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    RefreshControl
} from 'react-native';
import type { Product } from '../utils/types';
import { StyleSheet } from 'react-native';
import { useAppContext } from '../utils/ContextProvider'; 
import { useNavigation } from '@react-navigation/native';



type ProductCardProps = {
    product: Product;
};

const ProductCard = ({product}: ProductCardProps) => {
    const { addToCart, user } = useAppContext();
    const navigation = useNavigation();

    const [Product, setProduct] = useState<Product>();
    
    useEffect(() => {
        setProduct(product)
    }, [])

    const addCart = () => {
        if(user){
            addToCart(Product, user);
        }else{
            navigation.navigate('Login');
        }
    }

    return (
        <View style={styles.card}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: Product?.image }} style={styles.image} /> 
            </View> 
            <Text style={styles.title}>{Product?.title}</Text>
            <Text style={styles.title}>{Product?.price} €</Text>
            <Button
                onPress={() => addCart()}
                title="Ajouter au panier"
                color={'black'}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        margin: 10,
        padding: 10,
        borderRadius: 10,
        width: '90%',
        height: "auto",
        backgroundColor: 'white',
    },
    imageContainer: {
        width: '90%',
        height: 150,
        overflow: 'hidden',
        borderRadius: 10,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    addToCart:{
        backgroundColor: 'green',
    }
});

export default ProductCard;
