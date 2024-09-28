import React, {useState} from 'react';
import {Alert, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FoodItem from './components/FoodItem';

const VendingMachine: React.FC = () => {
    const [balance, setBalance] = useState<number>(0);
    const [stock, setStock] = useState<{ [key: string]: number }>({
        Biskuit: 10,
        Chips: 5,
        Oreo: 8,
        Tango: 6,
        Cokelat: 3,
    });

    const foodItems = [
        {
            name: 'Biskuit',
            price: 6000,
            image: 'https://www.luluhypermarket.com/cdn-cgi/image/f=auto/medias/367318-01.jpg-1200Wx1200H?context=bWFzdGVyfGltYWdlc3wxOTg1ODN8aW1hZ2UvanBlZ3xhRE5pTDJnMFpDOHhNRFk1TnpVMk5UYzVPRFF6TUM4ek5qY3pNVGd0TURFdWFuQm5YekV5TURCWGVERXlNREJJfDAwNTM4YWI1MzAyODBlMzU3YjdkNTJjYThhZmY2MmM0NDA2YjJhODVjMTcwNzEzNDRjYTJhNjQ5MDhiMmUyNzg'
        },
        {
            name: 'Chips',
            price: 8000,
            image: 'https://www.luluhypermarket.com/cdn-cgi/image/f=auto/medias/368340-001.jpg-1200Wx1200H?context=bWFzdGVyfGltYWdlc3w3MzQ5MTl8aW1hZ2UvanBlZ3xhR1UyTDJnNVpTOHhNalF3TURBMk1UWTNOelU1T0M4ek5qZ3pOREF0TURBeExtcHdaMTh4TWpBd1YzZ3hNakF3U0F8ZDc1ZmNlNTE2MjkyMzM5OGI3YTBlZmY4MDY4ZGMyZWE2MDYwYjMyNTRhOTJhNjEwMzhjZDFjOGFlOGRjZmJkMw'
        },
        {
            name: 'Oreo',
            price: 10000,
            image: 'https://www.luluhypermarket.com/cdn-cgi/image/f=auto/medias/367656-01.jpg-1200Wx1200H?context=bWFzdGVyfGltYWdlc3wxMjM4NjJ8aW1hZ2UvanBlZ3xhRGc0TDJnME9TOHhNRFk1T0RFME1UWTVOakF6TUM4ek5qYzJOVFl0TURFdWFuQm5YekV5TURCWGVERXlNREJJfDVhNWI2MWIzYmE4NzgyMWU0NjE0NjY0YWYzNDUwMWQ0ZGJiNjc1YTI5ZmZiMTE0NmVmMTAzMjkzMmQzZTk0ODU'
        },
        {
            name: 'Tango',
            price: 12000,
            image: 'https://www.luluhypermarket.com/cdn-cgi/image/f=auto/medias/367597-001.jpg-1200Wx1200H?context=bWFzdGVyfGltYWdlc3w0NjgzNDZ8aW1hZ2UvanBlZ3xhREF5TDJnNE1pOHhNamMyTVRreU5UVTRNamczT0M4ek5qYzFPVGN0TURBeExtcHdaMTh4TWpBd1YzZ3hNakF3U0F8ZmU5ZWNjOTcyNTdlNGJmZTIwYjI0Y2VmZGUxNmJiMjdkMmJiNWIxNGE3MTBhZTdiYTM0MTMyNDU0NWFhYjczMw'
        },
        {
            name: 'Cokelat',
            price: 15000,
            image: 'https://www.luluhypermarket.com/cdn-cgi/image/f=auto/medias/413025-01.jpg-1200Wx1200H?context=bWFzdGVyfGltYWdlc3wxMzE3MTR8aW1hZ2UvanBlZ3xhRGN5TDJoaE5DOHhNRFkxTXprNU5EVTRNakEwTmk4ME1UTXdNalV0TURFdWFuQm5YekV5TURCWGVERXlNREJJfDNjMTkyZDg3MmUyOTFiYzY1ZDFhN2Q2MjUwYjJmMjczZjU3MzFjYTVlZmY2YTI5NzhhZmVhYmE0OTJkODMzMjQ'
        },
    ];

    const insertMoney = (amount: number) => {
        setBalance(balance + amount);
        Alert.alert('Uang Dimasukkan', `Anda memasukkan Rp ${amount}`);
    };

    const buyItem = (item: { name: string; price: number }) => {
        if (balance < item.price) {
            Alert.alert('Saldo tidak cukup', 'Silakan masukkan uang lebih banyak.');
            return;
        }
        if (stock[item.name] === 0) {
            Alert.alert('Stok habis', `Item ${item.name} sudah habis.`);
            return;
        }

        setBalance(balance - item.price);
        setStock((prevStock) => ({
            ...prevStock,
            [item.name]: prevStock[item.name] - 1,
        }));
        Alert.alert('Pembelian Berhasil', `Anda telah membeli ${item.name}.`);
    };

    const returnChange = () => {
        if (balance === 0) {
            Alert.alert('Tidak ada saldo', 'Tidak ada saldo yang dapat dikembalikan.');
            return;
        }
        Alert.alert('Pengembalian Saldo', `Saldo sebesar Rp ${balance} telah dikembalikan.`);
        setBalance(0);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Mesin Vending</Text>
            <Text style={styles.balanceText}>Total Uang: Rp {balance}</Text>
            <ScrollView contentContainerStyle={styles.grid}>
                {foodItems.map((item) => (
                    <FoodItem
                        key={item.name}
                        name={item.name}
                        price={item.price}
                        stock={stock[item.name]}
                        onBuy={() => buyItem(item)}
                        image={item.image}
                    />
                ))}
            </ScrollView>
            <View style={styles.moneyContainer}>
                <Text style={styles.insertText}>Masukkan Uang:</Text>
                <View style={styles.moneyButtons}>
                    {[2000, 5000, 10000, 20000, 50000].map((amount) => (
                        <TouchableOpacity
                            key={amount}
                            style={styles.moneyButton}
                            onPress={() => insertMoney(amount)}
                        >
                            <Text style={styles.moneyButtonText}>Rp {amount}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
            <View style={styles.returnContainer}>
                <TouchableOpacity style={styles.returnButton} onPress={returnChange}>
                    <Text style={styles.returnButtonText}>Kembalikan Uang</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e0f7fa',
        padding: 20,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#00796b',
    },
    balanceText: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 10,
        color: '#004d40',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    moneyContainer: {
        marginTop: 20,
        padding: 20,
        backgroundColor: '#ffffff',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    insertText: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 10,
        fontWeight: 'bold',
        color: '#00796b',
    },
    moneyButtons: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    moneyButton: {
        backgroundColor: '#f44336',
        padding: 10,
        borderRadius: 5,
        marginVertical: 5,
        width: '30%',
        alignItems: 'center',
    },
    moneyButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    returnContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    returnButton: {
        backgroundColor: '#ff9800',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        width: '80%',
    },
    returnButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

const App: React.FC = () => {
    return <VendingMachine/>;
};

export default App;
