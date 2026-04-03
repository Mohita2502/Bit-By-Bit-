// app/checkout.tsx
import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useAuth } from '../context/AuthContext'; 
import { useCart } from '../context/CartContext';
import { FlatList } from 'react-native';

const DARK_BG = '#000000ff';
const CARD_BG = '#101827';
const ACCENT = '#22c1dc';
const TEXT_PRIMARY = '#e5f2ff';
const TEXT_SECONDARY = '#9ca3af';
const BORDER = '#1f2937';


export default function CheckoutScreen() {
  const { user } = useAuth(); 

  // for none users)
  if (!user) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.header}>
          <View style={styles.navbar}>
            <Text style={styles.logo}>Checkout</Text>
          </View>
        </View>

        <View style={styles.mustSignInWrap}>
          <Text style={styles.mustSignInText}>Must be signed in</Text>

          <TouchableOpacity
            style={styles.goSignInButton}
            onPress={() => router.replace('/signIn')}
          >
            <Text style={styles.goSignInText}>Go to Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // read total from route params
  // const { total } = useLocalSearchParams<{ total?: string }>();

  const { items } = useCart(); // STORES All items info from cart page
  const total = items.reduce(
  (sum, item) => sum + item.price * item.quantity, 0);
  const numericTotal = total;
  const displayTotal = numericTotal.toFixed(2);

  const [method, setMethod] = useState<'credit' | 'debit'>('credit');

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.navbar}>
          <Text style={styles.logo}>Checkout</Text>
        </View>
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        // OLD Code
        {/* Order summary */}
        {/* <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          <View style={styles.summaryBox}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryTotalLabel}>Total</Text>
              <Text style={styles.summaryTotalPrice}>${displayTotal}</Text>
            </View>
          </View>
        </View> */}
        <View style={styles.section}>
      <Text style={styles.sectionTitle}>Order Summary</Text>

        <FlatList
          data={items}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false}
            renderItem={({ item }) => (
            <View style={styles.summaryItem}>
              <View>
                <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.itemQty}>
                  Quantity: {item.quantity}
                </Text>
              </View>

              <Text style={styles.price}>
                ${(item.price * item.quantity).toFixed(2)}
              </Text>
            </View>
            )}
          />

          <View style={styles.summaryTotalRow}>
            <Text style={styles.summaryTotalLabel}>Total</Text>
            <Text style={styles.summaryTotalPrice}>
              ${total.toFixed(2)}
            </Text>
          </View>
        </View>
        

        {/* Payment method */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <View style={styles.methodRow}>
            <TouchableOpacity
              style={[
                styles.methodButton,
                method === 'credit' && styles.methodButtonActive,
              ]}
              onPress={() => setMethod('credit')}
            >
              <Text
                style={[
                  styles.methodText,
                  method === 'credit' && styles.methodTextActive,
                ]}
              >
                Credit Card
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.methodButton,
                method === 'debit' && styles.methodButtonActive,
              ]}
              onPress={() => setMethod('debit')}
            >
              <Text
                style={[
                  styles.methodText,
                  method === 'debit' && styles.methodTextActive,
                ]}
              >
                Debit Card
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Card details needs work  */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {method === 'credit' ? 'Credit Card Details' : 'Debit Card Details'}
          </Text>
          <View style={styles.cardBox}>
            <TextInput
              placeholder="Cardholder Name"
              placeholderTextColor="#6b7280"
              style={styles.input}
            />
            <TextInput
              placeholder="Card Number"
              placeholderTextColor="#6b7280"
              style={styles.input}
              keyboardType="number-pad"
            />
            <View style={styles.row}>
              <TextInput
                placeholder="MM/YY"
                placeholderTextColor="#6b7280"
                style={[styles.input, styles.inputHalf]}
                keyboardType="number-pad"
              />
              <TextInput
                placeholder="CVV"
                placeholderTextColor="#6b7280"
                style={[styles.input, styles.inputHalf]}
                keyboardType="number-pad"
                secureTextEntry
              />
            </View>
          </View>
        </View>

        {/* no payment logic just the buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backText}>← Back to Cart</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.payButton}
            onPress={() => {
              // no-op for now
            }}
          >
            <Text style={styles.payText}>Confirm Payment</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: DARK_BG,
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
  container: {
    flex: 1,
    backgroundColor: DARK_BG,
    paddingHorizontal: 20,
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    color: TEXT_PRIMARY,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  summaryBox: {
    backgroundColor: CARD_BG,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: BORDER,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryTotalLabel: {
    color: TEXT_PRIMARY,
    fontSize: 16,
    fontWeight: '700',
  },
  summaryTotalPrice: {
    color: ACCENT,
    fontSize: 16,
    fontWeight: '700',
  },
  methodRow: {
    flexDirection: 'row',
    gap: 10,
  },
  methodButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: BORDER,
    alignItems: 'center',
    backgroundColor: '#020617',
  },
  methodButtonActive: {
    borderColor: ACCENT,
    backgroundColor: '#022c37',
  },
  methodText: {
    color: TEXT_SECONDARY,
    fontWeight: '600',
  },
  methodTextActive: {
    color: ACCENT,
  },
  cardBox: {
    backgroundColor: CARD_BG,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: BORDER,
    marginTop: 4,
  },
  input: {
    backgroundColor: '#020617',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: TEXT_PRIMARY,
    borderWidth: 1,
    borderColor: BORDER,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  inputHalf: {
    flex: 1,
  },
  buttonRow: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  backButton: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: TEXT_SECONDARY,
    paddingVertical: 12,
    alignItems: 'center',
  },
  backText: {
    color: TEXT_SECONDARY,
    fontWeight: '600',
  },
  payButton: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: ACCENT,
    paddingVertical: 12,
    alignItems: 'center',
  },
  payText: {
    color: DARK_BG,
    fontWeight: '700',
    fontSize: 16,
  },

  // Block screen for CE14
  mustSignInWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  mustSignInText: {
    color: '#f97373',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  goSignInButton: {
    width: '100%',
    borderRadius: 10,
    backgroundColor: ACCENT,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  goSignInText: {
    color: DARK_BG,
    fontWeight: '700',
    fontSize: 16,
  },
  summaryItem: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: CARD_BG,
  padding: 12,
  borderRadius: 10,
  marginBottom: 8,
  borderWidth: 1,
  borderColor: BORDER,
},
itemQty: {
  color: TEXT_SECONDARY,
  marginTop: 4,
},

summaryTotalRow: {
  marginTop: 12,
  flexDirection: 'row',
  justifyContent: 'space-between',
  borderTopWidth: 1,
  borderTopColor: BORDER,
  paddingTop: 10,
},
price: { 
  color: TEXT_PRIMARY, 
  fontSize: 16, 
  fontWeight: "bold", 
},
name: { 
  color: TEXT_PRIMARY, 
  fontSize: 16, 
},
});