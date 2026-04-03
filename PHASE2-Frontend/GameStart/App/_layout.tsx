// app/(tabs)/_layout.tsx
import { Tabs } from "expo-router";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CartProvider, useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext"; // 👈 check this path

// 🔹 Custom Cart tab icon that shows the item count badge
function CartTabIcon({ color, size }: { color: string; size: number }) {
  const { items } = useCart();
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Ionicons name="cart" size={size} color={color} />
      {count > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{count > 99 ? "99+" : count}</Text>
        </View>
      )}
    </View>
  );
}

function InnerTabs() {
  const { user } = useAuth();
  const isLoggedIn = !!user;

  const signInTitle = isLoggedIn
    ? `Welcome, ${user?.first || user?.email || ""}`
    : "Sign In";

  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <CartTabIcon color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />

      {/* 👇 Orders route always exists, but href hides it if logged out */}
      <Tabs.Screen
        name="orders"
        options={{
          title: "Orders",
          headerShown: false,
          // ⭐ this is the important part:
          // null => hide tab, still can navigate via router.push("/orders")
          href: isLoggedIn ? "/orders" : null,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="receipt" size={size} color={color} />
          ),
        }}
      />

      {/* Hidden signIn route, just for navigation */}
      <Tabs.Screen
        name="signIn"
        options={{
          href: null,
          title: signInTitle,
          headerShown: false,
        }}
      />
    </Tabs>
  );
}

export default function TabsLayout() {
  return (
    // better for Cart provider to be in the _louout file outside the tabs folder
    // <CartProvider>
      <InnerTabs />
    // </CartProvider>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: "absolute",
    top: -4,
    right: -12,
    backgroundColor: "#00ffff",
    borderRadius: 999,
    paddingHorizontal: 5,
    paddingVertical: 1,
    minWidth: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    color: "#000",
    fontSize: 10,
    fontWeight: "700",
  },
});
