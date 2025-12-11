import React from 'react';
import {SafeAreaView, View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import { useCart } from '../../context/CartContext';

const DARK_BG = '#000000ff';
const CARD_BG = '#101827';
const ACCENT = '#22c1dc';
const TEXT_PRIMARY = '#e5f2ff';
const TEXT_SECONDARY = '#9ca3af';
const BORDER = '#1f2937';

const CartScreen = () => {
  const { items, removeFromCart, setQuantity, clearCart } = useCart();

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const renderItem = ({ item }: any) => (
    <View style={styles.cartItem}>
      <View style={{ flex: 1 }}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>
          ${item.price.toFixed(2)} x {item.quantity}
        </Text>
      </View>
      <View style={styles.qtyRow}>
        <TouchableOpacity
          onPress={() =>
            setQuantity(item.id, Math.max(1, item.quantity - 1))
          }
        >
          <Text style={styles.qtyButton}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setQuantity(item.id, item.quantity + 1)}
        >
          <Text style={styles.qtyButton}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => removeFromCart(item.id)}>
          <Text style={styles.removeText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const isEmpty = items.length === 0;

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.navbar}>
          <Text style={styles.logo}>Your Cart</Text>
        </View>
      </View>

      {/* Body */}
      <View style={styles.container}>
        {isEmpty ? (
          <View style={styles.centerContent}>
            <Text style={styles.emptyTitle}>Your cart is empty</Text>
            <Text style={styles.emptySubtitle}>
              Add some games to get started!
            </Text>
          </View>
        ) : (
          <>
            <FlatList
              data={items}
              keyExtractor={item => item.id.toString()}
              renderItem={renderItem}
              contentContainerStyle={{ paddingVertical: 10 }}
            />
            <View style={styles.footer}>
              <Text style={styles.totalText}>
                Total: ${total.toFixed(2)}
              </Text>
              <TouchableOpacity onPress={clearCart}>
                <Text style={styles.clearText}>Clear cart</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: DARK_BG,
  },
  container: {
    flex: 1,
    backgroundColor: DARK_BG,
    paddingHorizontal: 20,
  },
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
  centerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 70,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: TEXT_PRIMARY,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 15,
    color: TEXT_SECONDARY,
    textAlign: 'center',
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: CARD_BG,
    padding: 12,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: BORDER,
  },
  itemName: {
    color: TEXT_PRIMARY,
    fontSize: 16,
    fontWeight: '600',
  },
  itemPrice: {
    color: TEXT_SECONDARY,
    marginTop: 4,
  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  qtyButton: {
    color: DARK_BG,
    backgroundColor: ACCENT,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    overflow: 'hidden',
    fontWeight: '700',
  },
  removeText: {
    color: '#f97373',
    marginLeft: 8,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: BORDER,
    paddingVertical: 12,
    marginTop: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalText: {
    color: TEXT_PRIMARY,
    fontSize: 18,
    fontWeight: '700',
  },
  clearText: {
    color: ACCENT,
    fontWeight: '600',
  },
});

export default CartScreen;
