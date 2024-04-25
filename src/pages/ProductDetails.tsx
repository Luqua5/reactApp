import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    ActivityIndicator,
    RefreshControl,
    Button
} from 'react-native';
import type { Product } from '../utils/types';
import { useAppContext } from '../utils/ContextProvider'; 


const ProductDetails = ({route, navigation }) => {
    const [Product, setProduct] = useState<Product>();

    const { addToCart, user } = useAppContext(); // Accédez à votre contexte

    
    useEffect(() => {
        setProduct(route.params.product)
        navigation.setOptions({ title: route.params.product.title })
    }, [])

    return (
        <View style={{flex: 1, alignItems: 'center'}}> 
            <View style={{width:'90%'}}> 
                <View style={styles.imageContainer}>
                    <Image source={{ uri: Product?.image }} style={styles.image} /> 
                </View> 
                <Text style={styles.title}>{Product?.title}</Text>
                <Text style={styles.description}>{Product?.description}</Text>
                <Text style={styles.price}>{Product?.price} €</Text> 
                <Button 
                    onPress={() => {
                        addToCart(Product, user);
                        navigation.navigate('Cart');
                    }} 
                    title="Ajouter au panier"
                    color={'black'}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: '100%',
        height: 400,
    },
    title:{
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 10
    },
    price:{
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 10
    },
    description:{
        fontSize: 15,
        textAlign: 'center',
        margin: 10
    },
    
});

export default ProductDetails;
