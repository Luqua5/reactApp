import type { Product } from './types';

const API_URL = "https://fakestoreapi.com/products"

export const FetchProduct = async () => {
    try {
        const response = await fetch(API_URL)
        const json:Product[] = await response.json()
        return json;
    } catch (error) {
        console.error(error);
        throw new Error('Erreur lors de la récupération des données');
    }
}