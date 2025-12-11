import React, { useState } from 'react';
import { router } from 'expo-router';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator} from 'react-native';
import { loginWithEmailPassword, registerNewUser } from '../../APICalls/callProfileAPI'; // ⭐ NEW


export default function SignInScreen({ onBack }: any) {
  // Use States for Login and Registration
  const [isRegistering, setIsRegistering] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{[k:string]: string}>({});
  const [loading, setLoading] = useState(false);  

  const validate = () => {
    let valid = true;
    let newErrors: { [k: string]: string } = {};

    if(!firstName && isRegistering) {
        newErrors.firstName = "First name is required";
        valid = false;
    } 

    if(!lastName && isRegistering){
        newErrors.lastName = "Last name is required";
        valid = false;
    }

    // Email validation
    if (!email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
      valid = false;
    }

    // Password validation
    if (!password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // UPDATED: Handle Submit for Main Login / Register Button
  const LogInHandleSumbmit = async () => {
    if (!validate()) return;

    try {
      setLoading(true);

      if (isRegistering) {
        // CALL THE REGISTER API
        const res = await registerNewUser(firstName, lastName, email.trim(), password);
        Alert.alert("Success", "Account created successfully!");
         router.push('/');
        } else {
        // LOGIN: call Python backend
        const res = await loginWithEmailPassword(email.trim(), password);
        console.log("Backend login success:", res);

        // TODO: if backend returns token, you can store it here later
        // e.g. await SecureStore.setItemAsync("authToken", res.token);

        Alert.alert("Success", "Logged in successfully");
        router.push('/'); // Navigate back to Home Page
      }
    } catch (err: any) {
      console.error(err);
      Alert.alert("Login failed", err.message || "Please try again");
    } finally {
      setLoading(false);
    }
  };

  // Handles Registering Button
  const handleSwitch = () => {
    setIsRegistering(prev => !prev);
    setErrors({});
    setEmail('');
    setPassword('');
    setFirstName('');
    setLastName('');
  };


  // Titles and Button Titles
  let titleText = 'Welcome Back';
  let subtitleText = 'Login to continue your adventure';
  let buttonText = 'Login';
  let switchText = "Don't have an account? Register";
  
  if (isRegistering) {
    titleText = 'Create Account';
    subtitleText = 'Join the gamers paradise!';
    buttonText = 'Register';
    switchText = 'Already have an account? Login';
  }

  return (
    <View style={styles.signInContainer}>
      <Text style={styles.logo}>GameStart</Text>
      <Text style={styles.title}>{titleText}</Text>
      <Text style={styles.subtitle}>{subtitleText}</Text>

      {/* First Name and Last Name Inputs in Registration page */}
      {isRegistering && (
        <>
          <TextInput
            style={[styles.input, errors.firstName && styles.errorInput]}
            placeholder="First Name"
            placeholderTextColor="#ccc"
            value={firstName}
            onChangeText={setFirstName}
          />
          {errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}

          <TextInput
            style={[styles.input, errors.lastName && styles.errorInput]}
            placeholder="Last Name"
            placeholderTextColor="#ccc"
            value={lastName}
            onChangeText={setLastName}
          />
          {errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}
        </>
      )}

      {/* Email Input */}
      <TextInput
          style={[styles.input, errors.email && styles.errorInput]}
          placeholder="Email"
          placeholderTextColor="#ccc"
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => {
          setEmail(text);
           if (errors.email) {
            setErrors(prev => ({ ...prev, email: "" }));
          }
        }}
      />

      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

      {/* Password Input */}
      <TextInput
        style={[styles.input, errors.password && styles.errorInput]}
        placeholder="Password"
        placeholderTextColor="#ccc"
        secureTextEntry
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          if (errors.password) {
            setErrors(prev => ({ ...prev, password: "" }));
          }
        }}
      />

      {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

      {/* Main Login/Register Button */}
      <TouchableOpacity 
        style={[styles.button, loading && { opacity: 0.7 }]} 
        onPress={LogInHandleSumbmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Text style={styles.buttonText}>{buttonText}</Text>
        )}
      </TouchableOpacity>

      {/* "Already have an account? Login" / "Don't have an account? Register" */}
      <TouchableOpacity onPress={handleSwitch}>
        <Text style={styles.switchText}>{switchText}</Text>
      </TouchableOpacity>

      {/* Back to Home Button */}
      <TouchableOpacity onPress={() => router.push('/')}> 
        <Text style={styles.backText}>← Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  signInContainer: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    color: '#00ffff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  title: {
    color: '#00ffff',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    color: '#ccc',
    marginBottom: 20,
    fontSize: 16,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#111',
    color: '#fff',
    width: '80%',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#00ffff',
  },
  button: {
    backgroundColor: '#00ffff',
    borderRadius: 8,
    width: '80%',
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 5,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  switchText: {
    color: '#00ffff',
    marginTop: 15,
    fontSize: 14,
  },
  backText: {
    color: '#ccc',
    marginTop: 10,
    fontSize: 14,
  },
  errorInput: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    marginBottom: 8,
  },
});

