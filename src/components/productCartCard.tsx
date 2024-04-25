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
import type { ProductInCart } from '../utils/types';
import { StyleSheet } from 'react-native';
import { useAppContext } from '../utils/ContextProvider'; 
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';



type ProductCartCardProps = {
    product: ProductInCart;
};

const ProductCartCard = ({product}: ProductCartCardProps) => {
    const { addToCart, user, removeProductFromCart, removeFromCart } = useAppContext();
    const navigation = useNavigation();

    const [Product, setProduct] = useState<ProductInCart>();
    
    useEffect(() => {
        setProduct(product)
    }, [])

    const plusOne = () => {
        addToCart(Product, user);
    }

    const minusOne = () => {
        removeFromCart(Product, user);
    }

    const remove = () => {
        removeProductFromCart(Product, user);
    }

    return (
        <View style={styles.card}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: Product?.image }} style={styles.image} />
            </View>
            <Text style={styles.title}>{Product?.title}</Text>
            <Text style={styles.price}>{Product?.price} €</Text>
            <View style={styles.quantityContainer}>
                <TouchableOpacity
                    onPress={() => minusOne()}
                >
                    <Icon name="minus" size={20} color="black"> </Icon>
                </TouchableOpacity>
                <Text style={styles.quantity}>{Product?.quantity}</Text>
                <TouchableOpacity
                    onPress={() => plusOne()}
                >
                    <Icon name="plus" size={20} color="black"> </Icon>
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                onPress={() => remove()}
                style={styles.trash}
            >
                <Icon name="trash" size={32} color="red"> </Icon>
            </TouchableOpacity>

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
        position: 'relative',
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
    price:{
        fontSize: 15,
        textAlign: 'center',
    },
    quantityContainer:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantity:{
        fontWeight:'bold',
        fontSize: 20,
        textAlign: 'center',
        marginLeft:10,
        marginRight:10,
    },
    trash:{
        position: 'absolute',
        top: 10,
        right: 10,
    }
});

export default ProductCartCard;
