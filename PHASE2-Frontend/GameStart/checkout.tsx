import React, { useMemo, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { FlatList } from 'react-native';

const DARK_BG = '#000000ff';
const CARD_BG = '#101827';
const ACCENT = '#22c1dc';
const TEXT_PRIMARY = '#e5f2ff';
const TEXT_SECONDARY = '#9ca3af';
const BORDER = '#1f2937';
const ERROR = '#f87171';

const formatCardNumber = (value: string) => {
  const digitsOnly = value.replace(/\D/g, '').slice(0, 16);
  return digitsOnly.replace(/(.{4})/g, '$1 ').trim();
};

const formatExpiry = (value: string) => {
  const digitsOnly = value.replace(/\D/g, '').slice(0, 4);
  if (digitsOnly.length <= 2) return digitsOnly;
  return `${digitsOnly.slice(0, 2)}/${digitsOnly.slice(2)}`;
};

export default function CheckoutScreen() {
  const { user } = useAuth();
  const { items } = useCart();

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const [method, setMethod] = useState<'credit' | 'debit'>('credit');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [cardholderName, setCardholderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const [cardholderNameError, setCardholderNameError] = useState('');
  const [cardNumberError, setCardNumberError] = useState('');
  const [expiryDateError, setExpiryDateError] = useState('');
  const [cvvError, setCvvError] = useState('');

  const cardDigits = useMemo(() => cardNumber.replace(/\D/g, ''), [cardNumber]);
  const cvvDigits = useMemo(() => cvv.replace(/\D/g, ''), [cvv]);

  const clearErrors = () => {
    setCardholderNameError('');
    setCardNumberError('');
    setExpiryDateError('');
    setCvvError('');
  };

  const validatePaymentFields = () => {
    clearErrors();
    let isValid = true;

    if (!cardholderName.trim()) {
      setCardholderNameError('Cardholder name is required.');
      isValid = false;
    }

    if (cardDigits.length !== 16) {
      setCardNumberError('Card number must be exactly 16 digits.');
      isValid = false;
    }

    const expiryMatch = expiryDate.match(/^(\d{2})\/(\d{2})$/);
    if (!expiryMatch) {
      setExpiryDateError('Expiry date must be in MM/YY format.');
      isValid = false;
    } else {
      const month = Number(expiryMatch[1]);
      const year = Number(expiryMatch[2]);

      if (month < 1 || month > 12) {
        setExpiryDateError('Month must be between 01 and 12.');
        isValid = false;
      } else {
        const now = new Date();
        const currentMonth = now.getMonth() + 1;
        const currentYear = now.getFullYear() % 100;

        if (year < currentYear || (year === currentYear && month < currentMonth)) {
          setExpiryDateError('Card expiry date cannot be in the past.');
          isValid = false;
        }
      }
    }

    if (cvvDigits.length !== 3) {
      setCvvError('CVV must be exactly 3 digits.');
      isValid = false;
    }

    return isValid;
  };

  const handleConfirmPayment = async () => {
  if (!validatePaymentFields()) return;

  setIsLoading(true);

  try {
    console.log('hitting checkout...');
    
    const response = await fetch('http://localhost:8000/com.gamestart/v1/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ total }),
    });

    console.log('response status:', response.status);
    const data = await response.json();
    console.log('response data:', data);

    if (data.success) {
      setPaymentSuccess(true);
    } else {
      Alert.alert('Payment Failed', data.error || 'Something went wrong.');
    }

  } catch (err) {
    console.log('fetch error:', err);
    Alert.alert('Error', 'Could not reach the server.');
  } finally {
    setIsLoading(false);
  }
};

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

  // Success screen
  if (paymentSuccess) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.header}>
          <View style={styles.navbar}>
            <Text style={styles.logo}>Payment Successful</Text>
          </View>
        </View>

        <View style={styles.successContainer}>
          <Text style={styles.successIcon}>✓</Text>
          <Text style={styles.successTitle}>Payment Confirmed!</Text>
          <Text style={styles.successAmount}>Total: ${total.toFixed(2)}</Text>
          
          <View style={styles.successDetails}>
            <Text style={styles.detailLabel}>Order Status</Text>
            <Text style={styles.detailValue}>Processing</Text>
            
            <Text style={styles.detailLabel}>Cardholder</Text>
            <Text style={styles.detailValue}>{cardholderName}</Text>
            
            <Text style={styles.detailLabel}>Card</Text>
            <Text style={styles.detailValue}>{cardNumber.slice(-4).padStart(cardNumber.length, '•')}</Text>
          </View>

          <TouchableOpacity
            style={styles.successButton}
            onPress={() => router.replace('/(tabs)')}
          >
            <Text style={styles.successButtonText}>Continue Shopping</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.successButtonSecondary}
            onPress={() => router.replace('/(tabs)/orders')}
          >
            <Text style={styles.successButtonSecondaryText}>View Orders</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <View style={styles.navbar}>
          <Text style={styles.logo}>Checkout</Text>
        </View>
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
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
                  <Text style={styles.itemQty}>Quantity: {item.quantity}</Text>
                </View>

                <Text style={styles.price}>${(item.price * item.quantity).toFixed(2)}</Text>
              </View>
            )}
          />

          <View style={styles.summaryTotalRow}>
            <Text style={styles.summaryTotalLabel}>Total</Text>
            <Text style={styles.summaryTotalPrice}>${total.toFixed(2)}</Text>
          </View>
        </View>

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

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {method === 'credit' ? 'Credit Card Details' : 'Debit Card Details'}
          </Text>

          <View style={styles.cardBox}>
            <TextInput
              placeholder="Cardholder Name"
              placeholderTextColor="#6b7280"
              style={[styles.input, cardholderNameError ? styles.inputError : null]}
              value={cardholderName}
              onChangeText={(text) => {
                setCardholderName(text);
                if (cardholderNameError) setCardholderNameError('');
              }}
            />
            {!!cardholderNameError && <Text style={styles.errorText}>{cardholderNameError}</Text>}

            <TextInput
              placeholder="Card Number"
              placeholderTextColor="#6b7280"
              style={[styles.input, cardNumberError ? styles.inputError : null]}
              value={cardNumber}
              onChangeText={(text) => {
                setCardNumber(formatCardNumber(text));
                if (cardNumberError) setCardNumberError('');
              }}
              keyboardType="number-pad"
              maxLength={19}
            />
            {!!cardNumberError && <Text style={styles.errorText}>{cardNumberError}</Text>}

            <View style={styles.row}>
              <View style={styles.halfField}>
                <TextInput
                  placeholder="MM/YY"
                  placeholderTextColor="#6b7280"
                  style={[styles.input, styles.inputHalf, expiryDateError ? styles.inputError : null]}
                  value={expiryDate}
                  onChangeText={(text) => {
                    setExpiryDate(formatExpiry(text));
                    if (expiryDateError) setExpiryDateError('');
                  }}
                  keyboardType="number-pad"
                  maxLength={5}
                />
                {!!expiryDateError && <Text style={styles.errorText}>{expiryDateError}</Text>}
              </View>

              <View style={styles.halfField}>
                <TextInput
                  placeholder="CVV"
                  placeholderTextColor="#6b7280"
                  style={[styles.input, styles.inputHalf, cvvError ? styles.inputError : null]}
                  value={cvv}
                  onChangeText={(text) => {
                    setCvv(text.replace(/\D/g, '').slice(0, 3));
                    if (cvvError) setCvvError('');
                  }}
                  keyboardType="number-pad"
                  secureTextEntry
                  maxLength={3}
                />
                {!!cvvError && <Text style={styles.errorText}>{cvvError}</Text>}
              </View>
            </View>
          </View>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.backButton}
            disabled={isLoading}
            onPress={() => router.back()}
          >
            <Text style={styles.backText}>← Back to Cart</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.payButton, isLoading && styles.payButtonDisabled]}
            disabled={isLoading}
            activeOpacity={0.7}
            onPress={() => {
              console.log('Pay button pressed');
              handleConfirmPayment();
            }}
          >
            <Text style={styles.payText}>{isLoading ? 'Processing...' : 'Confirm Payment'}</Text>
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
  inputError: {
    borderColor: ERROR,
  },
  errorText: {
    color: ERROR,
    marginTop: -6,
    marginBottom: 10,
    fontSize: 12,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  halfField: {
    flex: 1,
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
  payButtonDisabled: {
    backgroundColor: '#888888',
    opacity: 0.6,
  },
  payText: {
    color: DARK_BG,
    fontWeight: '700',
    fontSize: 16,
  },
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
    fontWeight: 'bold',
  },
  name: {
    color: TEXT_PRIMARY,
    fontSize: 16,
  },
  // Success screen styles
  successContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  successIcon: {
    fontSize: 80,
    color: '#10b981',
    marginBottom: 20,
  },
  successTitle: {
    color: TEXT_PRIMARY,
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 10,
    textAlign: 'center',
  },
  successAmount: {
    color: ACCENT,
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 30,
    textAlign: 'center',
  },
  successDetails: {
    width: '100%',
    backgroundColor: CARD_BG,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: BORDER,
    marginBottom: 30,
  },
  detailLabel: {
    color: TEXT_SECONDARY,
    fontSize: 12,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 4,
  },
  detailValue: {
    color: TEXT_PRIMARY,
    fontSize: 14,
    fontWeight: '500',
  },
  successButton: {
    width: '100%',
    borderRadius: 10,
    backgroundColor: ACCENT,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 12,
  },
  successButtonText: {
    color: DARK_BG,
    fontWeight: '700',
    fontSize: 16,
  },
  successButtonSecondary: {
    width: '100%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: ACCENT,
    paddingVertical: 14,
    alignItems: 'center',
  },
  successButtonSecondaryText: {
    color: ACCENT,
    fontWeight: '700',
    fontSize: 16,
  },
});