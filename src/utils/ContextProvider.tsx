import React, { createContext, useState, useContext } from 'react';
import type { Product, User, Cart, ProductInCart } from './types';
import { FIREBASE_AUTH } from './firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword} from 'firebase/auth';

type AppContextType = {
    carts: Cart[];
    addToCart: (product: Product, user: User) => void;
    removeFromCart: (product: Product, user: User) => void;
    user: User | null;
    login: (email: string, password:string) => Promise<boolean>;
    register: (email: string, password:string) => Promise<boolean>;
    logout: () => void;
    getCart: (user: User) => Promise<Cart | undefined>;
    removeProductFromCart: (product: Product, user: User) => void;
    removeAllProducts: (user: User) => void;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider = ({ children }) => {
    const [carts, setCarts] = useState<Cart[]>();
    const [user, setUser] = useState<User | null>(null);

    const addToCart = (product: Product, user: User) => {
        const updatedCarts = [...carts];
        const userCart = updatedCarts.find(cart => cart.idUser === user.uid);
        if (userCart) {
            const productInCart = userCart.products.find(p => p.id === product.id);
            if (productInCart) {
                productInCart.quantity += 1;
            } else {
                const productInCart: ProductInCart = {
                    ...product,
                    quantity: 1
                };
                userCart.products.push(productInCart);
            }
        }
        setCarts(updatedCarts);
    };

    const removeFromCart = (product: Product, user: User) => {
        const updatedCarts = [...carts];
        const userCart = updatedCarts.find(cart => cart.idUser === user.uid);
        if (userCart) {
            const productInCart = userCart.products.find(p => p.id === product.id);
            if (productInCart) {
                if (productInCart.quantity > 1) {
                    productInCart.quantity -= 1;
                } else {
                    userCart.products = userCart.products.filter(p => p.id !== product.id);
                }
            }
        }
        setCarts(updatedCarts);
    };

    const login = async(email:string, password:string) => {
        try {
            const userCredential = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
            setUser({
                email: userCredential.user.email,
                uid: userCredential.user.uid
            });
            const userCart: Cart = {
                idUser: userCredential.user.uid,
                products: []
            };
            setCarts(carts ? [...carts, userCart] : [userCart]);
            return true;
        } catch (error) {
            return false;
        }
    }

    const logout = () => {
        setUser(null);
    };

    const register = async (email: string, password: string) => {
        try{
            const userCredential = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
            setUser({
                email: userCredential.user.email,
                uid: userCredential.user.uid
            });
            const userCart: Cart = {
                idUser: userCredential.user.uid,
                products: []
            };
            setCarts(carts ? [...carts, userCart] : [userCart]);
            return true;
        }catch(error){
            console.error(error)
            return false;
        }
    }

    const getCart = async (user: User) => {
        const userCart = carts.find(cart => cart.idUser === user.uid);
        return userCart;
    }

    const removeProductFromCart = (product: Product, user: User) => {
        const updatedCarts = [...carts];
        const userCart = updatedCarts.find(cart => cart.idUser === user.uid);
        if (userCart) {
            userCart.products = userCart.products.filter(p => p.id !== product.id);
        }
        setCarts(updatedCarts);
    }

    const removeAllProducts = (user: User) => {
        const updatedCarts = [...carts];
        const userCart = updatedCarts.find(cart => cart.idUser === user.uid);
        if (userCart) {
            userCart.products = [];
        }
        setCarts(updatedCarts);
    }

    return (
        <AppContext.Provider value={{ removeAllProducts, carts, addToCart, removeFromCart, user, login, register, logout, getCart, removeProductFromCart }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
      throw new Error('useAppContext must be used within a AppContextProvider');
    }
    return context;
};