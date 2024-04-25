import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    RefreshControl
} from 'react-native';
import { FetchProduct } from '../utils/api';
import type { Product } from '../utils/types';
import ProductCard from '../components/productCard';


const Home = ({ navigation }) => {
    const [data, setData] = useState<Product[]>();
    const [dataSearch, setDataSearch] = useState<Product[]>();
    const [search, setSearch] = useState<string>('');

    useEffect(() => {
        getProduct();
    }, []);
    
    const getProduct = async () => {
        try {
            const fetch:Product[] = await FetchProduct();
            setData(fetch);
            setDataSearch(fetch);
            console.log(data);
            
        } catch (error) {
            console.error(error)
        }
    }

    const handleSeach = (string:string) => {
        setSearch(string);
        if (string.length > 0) {
            const result = data?.filter((product:Product) => product.title.toLowerCase().includes(string.toLowerCase()));
            setDataSearch(result);
        } else {
            setDataSearch(data);
        }
    }

    return (
        <View >
            <TextInput 
                placeholder="Search" 
                style={{borderWidth:1, backgroundColor:'white' ,borderColor:'black', margin:10, padding:5, borderRadius:5, width:'90%', alignSelf:'center'}}
                onChangeText={newText => handleSeach(newText)}
                defaultValue={search}
            />
            <ScrollView contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                {dataSearch ? (
                    dataSearch.map((product: Product) => (
                        <View style={{width:'48%'}}>
                            <TouchableOpacity
                                key={product.id}
                                onPress={() => navigation.navigate('ProductDetails', { product:product})}
                            >
                                <ProductCard product={product} />
                            </TouchableOpacity>
                        </View>
                    ))
                ) : (
                    <ActivityIndicator />
                )}
            </ScrollView>
        </View>

    );


};

export default Home;
