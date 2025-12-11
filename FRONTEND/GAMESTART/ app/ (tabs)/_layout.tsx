// app/(tabs)/_layout.tsx  (or wherever your tabs layout lives)
import { Tabs } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';      // npx expo install @expo/vector-icons
import { CartProvider, useCart } from '../../context/CartContext'; // 🔁 adjust path

// 🔹 Custom Cart tab icon that shows the item count badge
function CartTabIcon({ color, size }: { color: string; size: number }) {
  const { items } = useCart();
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Ionicons name="cart" size={size} color={color} />
      {count > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {count > 99 ? '99+' : count}
          </Text>
        </View>
      )}
    </View>
  );
}

export default function TabsLayout() {
  return (
    <CartProvider>
      <Tabs>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="search"
          options={{
            title: 'Search',
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="search" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="cart"
          options={{
            title: 'Cart',
            headerShown: false,
            // 👇 use our custom icon that shows the badge
            tabBarIcon: ({ color, size }) => (
              <CartTabIcon color={color} size={size} />
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="signIn"
          options={{
            href: null,
            title: 'signIn',
            headerShown: false,
          }}
        />
      </Tabs>
    </CartProvider>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: -4,
    right: -12,
    backgroundColor: '#00ffff',
    borderRadius: 999,
    paddingHorizontal: 5,
    paddingVertical: 1,
    minWidth: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#000',
    fontSize: 10,
    fontWeight: '700',
  },
});
