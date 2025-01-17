import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const FavoritesScreen = ({ navigation }) => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = fetchFavorites();
        return () => unsubscribe();
    }, []);

    const fetchFavorites = () => {
        return firestore()
            .collection('favorites')
            .onSnapshot((snapshot) => {
                const fetchedFavorites = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setFavorites(fetchedFavorites);
                setLoading(false);
            }, (error) => {
                console.error('Error fetching favorites:', error);
                setLoading(false);
            });
    };

    const renderFavoriteItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('MovieDetails', { movie: item })}>
            <View style={styles.movieContainer}>
                <Image
                    source={{ uri: `https://image.tmdb.org/t/p/w500${item.posterUrl}` }}
                    style={styles.moviePoster}
                />
                <View style={styles.movieDetails}>
                    <Text style={styles.movieTitle}>{item.title}</Text>
                    <Text style={styles.movieOverview} numberOfLines={3}>
                        {item.overview}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (favorites.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No favorite movies added yet!</Text>
            </View>
        );
    }

    return (
        <FlatList
            data={favorites}
            keyExtractor={(item) => item.id}
            renderItem={renderFavoriteItem}
            contentContainerStyle={styles.listContainer}
        />
    );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
    listContainer: {
        padding: 10,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 18,
        color: '#555',
    },
    movieContainer: {
        flexDirection: 'row',
        marginBottom: 15,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        overflow: 'hidden',
    },
    moviePoster: {
        width: 100,
        height: 150,
    },
    movieDetails: {
        flex: 1,
        padding: 10,
        justifyContent: 'space-between',
    },
    movieTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    movieOverview: {
        fontSize: 14,
        color: '#555',
    },
});
