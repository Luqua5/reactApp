import React, { useEffect, useState } from 'react';
import type { Cart } from '../utils/types';
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
import { useAppContext } from '../utils/ContextProvider';
import ProductCartCard from '../components/productCartCard'; 


const CartPage = ({ navigation }) => {

  const { getCart, removeAllProducts, user } = useAppContext(); // Accédez à votre contexte

  const [cart, setCart] = useState<Cart>();

  useEffect(() => {
    getCart(user).then((cart) => {
      setCart(cart);
      console.log(cart)
    });
    console.log(cart)
  }, []);

  return (
          <View>
            {cart ? (
              <View>
                <ScrollView contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                  {cart.products.map((product) => (
                    <View style={{width:'48%'}} key={product.id}>
                      <ProductCartCard product={product} />
                    </View>

                  ))}
                </ScrollView>
                <View style={{position:'absolute', bottom:0, left:0, right:0}}>
                  <Button onPress={() => removeAllProducts(user)} title="Tout supprimer" />
                </View>
              </View>
            ) : (
              <ActivityIndicator />
            )}
          </View>
      );
};

export default CartPage;