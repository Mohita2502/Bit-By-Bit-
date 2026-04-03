import { router } from 'expo-router';
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView
} from 'react-native';

export default function App() {
  const [showSignIn, setShowSignIn] = useState(false);
  const { user } = useAuth();

  const images = new Map([
    ['videoGames', 'https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg'],
    ['consoles', 'https://www.billboard.com/wp-content/uploads/2023/07/Marvel-s-Spider-Man-2-Limited-Edition-cr-Sony-billboard-1548.png?w=942&h=628&crop=1'],
    ['accessories', 'https://assets.xboxservices.com/assets/59/10/5910d098-6cb4-459e-a3bf-10972df27ac7.jpg?n=Xbox-Wireless-Controller_Image-Hero_1084_Blue_1920x831_01.jpg'],
  ]);

  const isLoggedIn = !!user;
  const signInLabel = isLoggedIn
    ? (user.first || user.email || 'Profile')
    : 'Sign In';

  const handleSignInPress = () => {
    if (isLoggedIn) {
      router.push('/profile');
    } else {
      router.push('/signIn');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Fixed Header */}
      <View style={styles.header}>
        <View style={styles.navbar}>
          <Text style={styles.logo}>GameStart</Text>

          <TouchableOpacity style={styles.signInButton} onPress={handleSignInPress}>
            <Text style={styles.signInText}>{signInLabel}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cartButton}>
            <Text style={styles.cartText}>Cart (0)</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={{ width: '95%' }} onPress={() => router.push('/search')}>
          <TextInput
            style={styles.searchBar}
            placeholder="Search games, consoles, accessories..."
            placeholderTextColor="#ccc"
            editable={false}
            pointerEvents="none"
          />
        </TouchableOpacity>
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollArea}>
        <Text style={styles.title}>Gear up. Game on.</Text>
        <Text style={styles.subtitle}>Gamers Paradise</Text>

        <View style={styles.cardContainer}>
          {[
            { title: 'Video Games', key: 'videoGames', category: 'Games' },
            { title: 'Consoles', key: 'consoles', category: 'Consoles' },
            { title: 'Accessories', key: 'accessories', category: 'Accessories' },
          ].map((item) => (
            <TouchableOpacity
              style={styles.card}
              key={item.key}
              onPress={() =>
                router.push({
                  pathname: '/search',
                  params: { category: item.category },
                })
              }
            >
              <Image source={{ uri: images.get(item.key) }} style={styles.image} />
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardText}>Tap to explore</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  header: {
    backgroundColor: '#000',
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: 'center',
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#111',
    width: '95%',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  logo: {
    color: '#00ffff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  signInButton: {
    marginHorizontal: 5,
  },
  signInText: {
    color: '#00ffff',
    fontWeight: '600',
    fontSize: 14,
  },
  cartButton: {
    backgroundColor: '#00ffff',
    borderRadius: 8,
    paddingHorizontal: 8,
    justifyContent: 'center',
  },
  cartText: {
    color: '#000',
    fontWeight: 'bold',
  },
  searchBar: {
    backgroundColor: '#222',
    color: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
    marginTop: 10,
  },
  scrollArea: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  title: {
    color: '#00ffff',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 5,
  },
  subtitle: {
    color: '#ccc',
    marginBottom: 20,
    fontSize: 16,
    textAlign: 'center',
  },
  cardContainer: {
    width: '100%',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#111',
    borderRadius: 12,
    marginBottom: 20,
    overflow: 'hidden',
    width: '90%',
    alignItems: 'center',
  },
  image: { width: '100%', height: 150 },
  cardTitle: {
    color: '#00ffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  cardText: {
    color: '#aaa',
    marginBottom: 10,
  },
});