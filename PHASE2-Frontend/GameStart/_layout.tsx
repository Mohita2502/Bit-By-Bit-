// app/_layout.tsx (RootLayout)

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { View, StyleSheet } from 'react-native';

import { useColorScheme } from '@/hooks/useColorScheme';
import { AuthProvider } from '../context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import ChatWidget from '../components/ChatWidget';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <CartProvider>
      <AuthProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <View style={styles.container}>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack>
            {/* ChatWidget Addition. It is rendered at the root level so it's accessible on all screens */}
            <ChatWidget />
            <StatusBar style="auto" />
          </View>
        </ThemeProvider>
      </AuthProvider>
    </CartProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});