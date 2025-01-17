import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';

const PopularScreen = ({navigation}) => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchNowPlayingMovies();
    }, []);

    const fetchNowPlayingMovies = async () => {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/popular`, {
                params: {
                    api_key: "3224b679c26741312a6db19c249e87ae",
                    language: 'en-US',
                    page: 1,
                },
            });
            setMovies(response.data.results);
        } catch (error) {
            console.error('Error fetching now playing movies:', error);
        } finally {
            setLoading(false);
        }
    };

    const renderMovieItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('MovieDetails', { movie: item })}>
        <View style={styles.movieContainer}>
            <Image
                source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
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

    return (
        <FlatList
            data={movies}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderMovieItem}
            contentContainerStyle={styles.listContainer}
        />
    );
};

export default PopularScreen;

const styles = StyleSheet.create({
    listContainer: {
        padding: 10,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
