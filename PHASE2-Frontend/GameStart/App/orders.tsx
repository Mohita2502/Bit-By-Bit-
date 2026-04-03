// app/(tabs)/orders.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { router } from "expo-router";

export default function OrdersScreen() {
  // Later you can load real orders from backend.
  // For now, just pretend there are none:
  const orders: any[] = [];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContent}>
        <Text style={styles.title}>Order History</Text>
        {orders.length === 0 ? (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyText}>You have no orders yet</Text>
          </View>
        ) : (
          orders.map((order, idx) => (
            <View key={idx} style={styles.orderCard}>
              <Text style={styles.orderTitle}>Order #{order.id}</Text>
              <Text style={styles.orderDate}>{order.date}</Text>
              <View style={styles.itemsBox}>
                {order.items.map((item: any, index: number) => (
                  <Text key={index} style={styles.itemText}>
                    • {item.name} (x{item.qty})
                  </Text>
                ))}
              </View>
            </View>
          ))
        )}
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const ACCENT = "#00ffff";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  scrollContent: {
    flex: 1,
    padding: 20,
  },
  title: {
    color: ACCENT,
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  emptyBox: {
    backgroundColor: "#111",
    padding: 30,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 40,
  },
  emptyText: {
    color: "#888",
    fontSize: 16,
  },
  orderCard: {
    backgroundColor: "#0a0f1a",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
  },
  orderTitle: {
    color: ACCENT,
    fontSize: 18,
    fontWeight: "bold",
  },
  orderDate: {
    color: "#aaa",
    marginBottom: 10,
  },
  itemsBox: {
    marginLeft: 10,
  },
  itemText: {
    color: "#fff",
    marginBottom: 4,
  },
  backButton: {
    marginTop: 20,
  },
  backText: {
    color: ACCENT,
    fontSize: 16,
  },
});