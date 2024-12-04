import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';

export default function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const API_KEY = '76d3525f990430d820af876c6c194fa4';
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
        );
        setMovies(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const renderMovie = ({ item }) => (
    <TouchableOpacity onPress={() => setSelectedMovie(item)}>
      <View style={styles.card}>
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
          style={styles.poster}
        />
        <View style={styles.info}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.rating}>Rating: {item.vote_average}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderMovieDetail = () => {
    if (!selectedMovie) return null;

    return (
      <ScrollView style={styles.detailContainer}>
        <TouchableOpacity style={styles.closeButton} onPress={() => setSelectedMovie(null)}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
        <Text style={styles.detailTitle}>{selectedMovie.title}</Text>
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${selectedMovie.backdrop_path}` }}
          style={styles.detailImage}
        />
        <Text style={styles.releaseDate}>Release Date: {selectedMovie.release_date}</Text>
        <Text style={styles.rating}>Rating: {selectedMovie.vote_average}</Text>
        <Text style={styles.detailOverview}>{selectedMovie.overview}</Text>
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Popular Movies</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={movies}
          renderItem={renderMovie}
          keyExtractor={(item) => item.id.toString()}
        />
      )}

      {renderMovieDetail()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 40,
  },
  header: {
    padding: 15,
    backgroundColor: '#1E90FF',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  card: {
    flexDirection: 'row',
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    marginHorizontal: 10,
  },
  poster: {
    width: 100,
    height: 150,
  },
  info: {
    padding: 10,
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  rating: {
    fontSize: 14,
    color: '#888',
  },
  detailContainer: {
    marginTop: 20,
    paddingTop: 50,
    padding: 15,
    backgroundColor: '#fff',
    marginHorizontal: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  closeButton: {
    backgroundColor: '#FF6347',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'flex-start',
    marginBottom: 15,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  detailTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detailOverview: {
    fontSize: 16,
    marginBottom: 15,
    color: '#555',
  },
  detailImage: {
    width: '100%',
    height: 200,
    marginBottom: 15,
    borderRadius: 10,
  },
  releaseDate: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
});
