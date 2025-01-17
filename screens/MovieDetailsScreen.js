import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/Ionicons';

const MovieDetailsScreen = ({ route }) => {
    const { movie } = route.params;
    const [isFavorite, setIsFavorite] = useState(false);
    const favoritesRef = firestore().collection('favorites').doc(movie.id.toString());

    useEffect(() => {
        const checkFavoriteStatus = async () => {
            try {
                const doc = await favoritesRef.get();
                if (doc.exists) {
                    setIsFavorite(true);
                }
            } catch (error) {
                console.error('Error checking favorite status:', error);
            }
        };
        checkFavoriteStatus();
    }, []);

    const toggleFavorite = async () => {
        try {
            if (isFavorite) {
                await favoritesRef.delete();
                setIsFavorite(false);
            } else {
                await favoritesRef.set({
                    title: movie.title,
                    overview: movie.overview,
                    posterUrl: movie.poster_path,
                    release_date: movie.release_date,
                });
                setIsFavorite(true);
            }
        } catch (error) {
            console.error('Error toggling favorite status:', error);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <Image
                    source={{
                        uri: movie.poster_path
                            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                            : `https://image.tmdb.org/t/p/w500${movie.posterUrl}`,
                    }}
                    style={styles.poster}
                />
                <Text style={styles.title}>{movie.title}</Text>
                <Text style={styles.overview}>{movie.overview}</Text>
                <Text style={styles.releaseDate}>Release Date: {movie.release_date}</Text>
                <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteButton}>
                    <Icon name={isFavorite ? 'heart' : 'heart-outline'} size={30} color="red" />
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default MovieDetailsScreen;

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
    },
    poster: {
        width: 300,
        height: 450,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    overview: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 10,
    },
    releaseDate: {
        fontSize: 14,
        color: '#555',
        marginBottom: 20,
    },
    favoriteButton: {
        marginTop: 20,
    },
});
