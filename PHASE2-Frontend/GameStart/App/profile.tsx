import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";
import { useAuth } from "../../context/AuthContext"; // 👈 adjust path

const ProfileScreen = () => {
  const { user, setUser } = useAuth();

  const isLoggedIn = !!user;

  const displayName = isLoggedIn
    ? `${user?.first ?? ""} ${user?.last ?? ""}`.trim() || user?.email || "Profile"
    : "Sign-In";

  const displayEmail = isLoggedIn ? user?.email ?? "" : "";

  const handleSignOut = () => {
    // clear user from global state
    setUser(null);
    // go back to home; header button will show "Sign In" again
    router.replace("/");
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <View style={styles.navbar}>
          <Text style={styles.logo}>Your Profile</Text>
        </View>
      </View>

      {/* Profile Info */}
      <View style={styles.userCard}>
        <View style={styles.userRow}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarIcon}>👤</Text>
          </View>
          <View>
            <Text style={styles.userName}>{displayName}</Text>
            {!!displayEmail && (
              <Text style={styles.userEmail}>{displayEmail}</Text>
            )}
          </View>
        </View>
      </View>

      {/* My Orders */}
{isLoggedIn && (
  <View style={styles.menuCard}>
    <TouchableOpacity
      style={styles.menuItem}
      onPress={() => router.push('/orders')}
    >
      <View style={styles.menuLeft}>
        <Text style={styles.menuIcon}>📦</Text>
        <Text style={styles.menuLabel}>My Orders</Text>
      </View>
      <Text style={styles.menuChevron}>›</Text>
    </TouchableOpacity>
  </View>
)}



      {/* Sign Out */}
      <TouchableOpacity
        style={styles.signOutButton}
        onPress={handleSignOut}   // 👈 wired up
      >
        <Text style={styles.signOutIcon}>↪</Text>
        <Text style={styles.signOutText}>
          {isLoggedIn ? "Sign Out" : "Back to Home"}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const DARK_BG = "#000000ff";
const CARD_BG = "#0a101bff";
const ACCENT = "#22c1dc";
const TEXT_PRIMARY = "#e5f2ff";
const TEXT_SECONDARY = "#9ca3af";
const BORDER = "#1f2937";

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: DARK_BG,
  },
  header: {
    backgroundColor: "#000",
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: "center",
  },
  navbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#111",
    width: "95%",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  logo: {
    color: "#00ffff",
    fontSize: 28,
    fontWeight: "bold",
  },
  userCard: {
    backgroundColor: CARD_BG,
    borderRadius: 18,
    padding: 18,
    marginHorizontal: 18,
    marginTop: 20,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: BORDER,
  },
  userRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#111827",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  avatarIcon: {
    fontSize: 28,
    color: ACCENT,
  },
  userName: {
    fontSize: 18,
    fontWeight: "600",
    color: TEXT_PRIMARY,
  },
  userEmail: {
    fontSize: 13,
    color: TEXT_SECONDARY,
  },
  menuCard: {
    backgroundColor: CARD_BG,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: BORDER,
    marginHorizontal: 18,
    marginBottom: 24,
  },
  menuItem: {
    flexDirection: "row",
    paddingHorizontal: 18,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "space-between",
  },
  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuIcon: {
    fontSize: 18,
    color: ACCENT,
    marginRight: 12,
  },
  menuLabel: {
    fontSize: 15,
    color: TEXT_PRIMARY,
  },
  menuChevron: {
    fontSize: 22,
    color: "#4b5563",
  },
  signOutButton: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#f97373",
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginHorizontal: 18,
  },
  signOutIcon: {
    fontSize: 18,
    color: "#f97373",
    marginRight: 6,
  },
  signOutText: {
    color: "#f97373",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default ProfileScreen;
