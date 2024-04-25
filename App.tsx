import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import HomePage from './src/pages/HomePage';
import CartPage from './src/pages/Cart';
import Login from './src/pages/Login';
import Register from './src/pages/Register';
import ProductDetails from './src/pages/ProductDetails';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppContextProvider } from './src/utils/ContextProvider';
import { useEffect } from 'react';
import { useAppContext } from './src/utils/ContextProvider'; 

const Stack = createNativeStackNavigator();
  

const AppNavigation = () => {
  const { user, logout } = useAppContext(); // Accédez à votre contexte

  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
        name="HomePage"
        component={HomePage}
        options={({ navigation }) => ({ 
          title: 'Accueil',
          headerRight: () => (
            <Button
              onPress={() => navigation.navigate(user ? 'Cart' : 'Login')}
              title= {user ? 'Panier' : 'Connexion'}
              color="#000"
            />
          ),
        })}
      />
        <Stack.Screen name="Cart" component={CartPage} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ProductDetails" component={ProductDetails} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}

export default function App() {
  return (
    <AppContextProvider>
      <AppNavigation />
    </AppContextProvider>
  );
}
