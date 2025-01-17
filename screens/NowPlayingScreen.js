import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';

const NowPlayingScreen = ({ navigation }) => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loadingMore, setLoadingMore] = useState(false);

    useEffect(() => {
        fetchNowPlayingMovies(page);
    }, [page]);

    const fetchNowPlayingMovies = async (page) => {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/now_playing`, {
                params: {
                    api_key: "3224b679c26741312a6db19c249e87ae",
                    language: 'en-US',
                    page,
                },
            });

            setMovies((prevMovies) => [...prevMovies, ...response.data.results]);
            setTotalPages(response.data.total_pages);
        } catch (error) {
            console.error('Error fetching now playing movies:', error);
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    };

    const handleLoadMore = () => {
        if (page < totalPages && !loadingMore) {
            setLoadingMore(true);
            setPage((prevPage) => prevPage + 1);
        }
    };

    const renderFooter = () => {
        if (!loadingMore) return null;
        return (
            <View style={styles.footer}>
                <ActivityIndicator size="small" color="#0000ff" />
            </View>
        );
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

    if (loading && page === 1) {
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
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={renderFooter}
        />
    );
};

export default NowPlayingScreen;

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
    footer: {
        paddingVertical: 10,
        alignItems: 'center',
    },
});
