import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface FoodItemProps {
    name: string;
    price: number;
    stock: number;
    onBuy: () => void;
    image: string;
}

const FoodItem: React.FC<FoodItemProps> = ({name, price, stock, onBuy, image}) => (
    <View style={styles.card}>
        <Image source={{uri: image}} style={styles.foodImage}/>
        <Text style={styles.foodName}>{name}</Text>
        <Text style={styles.foodPrice}>Rp {price}</Text>
        <Text style={styles.stockText}>Stok: {stock}</Text>
        <TouchableOpacity
            style={[styles.buyButton, stock === 0 ? styles.disabledButton : {}]}
            onPress={onBuy}
            disabled={stock === 0}
        >
            <Text style={styles.buttonText}>{stock === 0 ? 'Stok Habis' : 'Beli'}</Text>
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    card: {
        width: '45%',
        backgroundColor: '#ffffff',
        borderRadius: 15,
        padding: 15,
        marginVertical: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
        borderWidth: 1,
        borderColor: '#b2dfdb',
    },
    foodImage: {
        width: 100,
        height: 100,
        marginBottom: 10,
        borderRadius: 10,
    },
    foodName: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#00796b',
    },
    foodPrice: {
        fontSize: 16,
        color: '#555',
        marginBottom: 5,
    },
    stockText: {
        fontSize: 14,
        color: '#888',
        marginBottom: 5,
    },
    buyButton: {
        marginTop: 10,
        backgroundColor: '#4caf50',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        width: '80%',
    },
    disabledButton: {
        backgroundColor: '#ddd',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default FoodItem;
