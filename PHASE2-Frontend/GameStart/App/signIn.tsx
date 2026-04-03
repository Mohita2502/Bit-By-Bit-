import React, { useState } from "react";
import { router } from "expo-router";
import { useAuth } from "../../context/AuthContext"; // ⬅️ check this path
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import {
  loginWithEmailPassword,
  registerNewUser,
} from "../../APICalls/callProfileAPI";

export default function SignInScreen({ onBack }: any) {
  const { setUser } = useAuth();

  const [isRegistering, setIsRegistering] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ [k: string]: string }>({});
  const [loading, setLoading] = useState(false);

  // 🔴 this is the red text we want to show
  const [loginError, setLoginError] = useState("");

  const validate = () => {
    let valid = true;
    let newErrors: { [k: string]: string } = {};

    if (!firstName && isRegistering) {
      newErrors.firstName = "First name is required";
      valid = false;
    }

    if (!lastName && isRegistering) {
      newErrors.lastName = "Last name is required";
      valid = false;
    }

    if (!email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
      valid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (password.length < 6 && isRegistering) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const LogInHandleSumbmit = async () => {
    // if (!validate()) return;

    // clear old login error before trying again
    setLoginError("");

    try {
      setLoading(true);

      if (isRegistering) {
        // REGISTER
        const res = await registerNewUser(
          firstName,
          lastName,
          email.trim(),
          password
        );

        if (!res.created) {
          // backend said registration failed
          setLoginError(res.error || "Could not create account");
          return;
        }

        setUser({
          first: res.first,
          last: res.last,
          email: res.email,
        });

        router.push("/profile");
      } else {
        // LOGIN
        let res;
        try {
          // if backend returns 200 with {authenticated:false}
          // this will not throw – we’ll handle it below
          res = await loginWithEmailPassword(email.trim(), password);
        } catch (err: any) {
          // if loginWithEmailPassword throws on 401/non-OK
          console.error("login error:", err);
          setLoginError("Incorrect email or password");
          return;
        }

        if (!res || !res.authenticated) {
          setLoginError("Incorrect email or password");
          return;
        }

        setUser({
          first: res.first,
          last: res.last,
          email: res.email,
        });

        router.push("/profile");
      }
    } catch (err) {
      console.error(err);
      // fallback message
      setLoginError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSwitch = () => {
    setIsRegistering((prev) => !prev);
    setErrors({});
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setLoginError(""); // clear login error when switching modes
  };

  let titleText = "Welcome Back";
  let subtitleText = "Login to continue your adventure";
  let buttonText = "Login";
  let switchText = "Don't have an account? Register";

  if (isRegistering) {
    titleText = "Create Account";
    subtitleText = "Join the gamers paradise!";
    buttonText = "Register";
    switchText = "Already have an account? Login";
  }

  return (
    <View style={styles.signInContainer}>
      <Text style={styles.logo}>GameStart</Text>
      <Text style={styles.title}>{titleText}</Text>
      <Text style={styles.subtitle}>{subtitleText}</Text>

      {/* First/Last name only in register mode */}
      {isRegistering && (
        <>
          <TextInput
            style={[styles.input, errors.firstName && styles.errorInput]}
            placeholder="First Name"
            placeholderTextColor="#ccc"
            value={firstName}
            onChangeText={(text) => {
              setFirstName(text);
              setLoginError("");
            }}
          />
          {errors.firstName && (
            <Text style={styles.errorText}>{errors.firstName}</Text>
          )}

          <TextInput
            style={[styles.input, errors.lastName && styles.errorInput]}
            placeholder="Last Name"
            placeholderTextColor="#ccc"
            value={lastName}
            onChangeText={(text) => {
              setLastName(text);
              setLoginError("");
            }}
          />
          {errors.lastName && (
            <Text style={styles.errorText}>{errors.lastName}</Text>
          )}
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
            setErrors((prev) => ({ ...prev, email: "" }));
          }
          setLoginError(""); // clear error when typing
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
            setErrors((prev) => ({ ...prev, password: "" }));
          }
          setLoginError(""); // clear error when typing
        }}
      />
      {errors.password && (
        <Text style={styles.errorText}>{errors.password}</Text>
      )}

      {/* 🔴 LOGIN ERROR SHOWN HERE */}
      {loginError !== "" && (
        <Text style={styles.loginErrorText}>{loginError}</Text>
      )}

      {/* Main Button */}
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

      {/* Switch Login/Register */}
      <TouchableOpacity onPress={handleSwitch}>
        <Text style={styles.switchText}>{switchText}</Text>
      </TouchableOpacity>

      {/* Back to Home */}
      <TouchableOpacity onPress={() => router.push("/")}>
        <Text style={styles.backText}>← Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  signInContainer: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  logo: {
    color: "#00ffff",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },
  title: {
    color: "#00ffff",
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
  subtitle: {
    color: "#ccc",
    marginBottom: 20,
    fontSize: 16,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#111",
    color: "#fff",
    width: "80%",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#00ffff",
  },
  button: {
    backgroundColor: "#00ffff",
    borderRadius: 8,
    width: "80%",
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 5,
  },
  buttonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },
  switchText: {
    color: "#00ffff",
    marginTop: 15,
    fontSize: 14,
  },
  backText: {
    color: "#ccc",
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
  loginErrorText: {
    color: "red",
    marginBottom: 10,
    fontSize: 14,
  },
});
