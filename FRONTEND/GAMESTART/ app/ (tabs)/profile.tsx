import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

const ProfileScreen = () => {
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
              <Text style={styles.userName}>Guest User</Text>
              <Text style={styles.userEmail}>guest@gamestart.com</Text>
            </View>
          </View>
        </View>

        {/* My Orders */}
        <View style={styles.menuCard}>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuLeft}>
              <Text style={styles.menuIcon}>📦</Text>
              <Text style={styles.menuLabel}>My Orders</Text>
            </View>
            <Text style={styles.menuChevron}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Sign Out */}
        <TouchableOpacity style={styles.signOutButton}>
          <Text style={styles.signOutIcon}>↪</Text>
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
    </SafeAreaView>
  );
};

const DARK_BG = '#000000ff';
const CARD_BG = '#0a101bff';
const ACCENT = '#22c1dc';
const TEXT_PRIMARY = '#e5f2ff';
const TEXT_SECONDARY = '#9ca3af';
const BORDER = '#1f2937';

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: DARK_BG,
  },
  scroll: {
    paddingBottom: 100,
  },

  // Header bar
  headerBar: {
    backgroundColor: CARD_BG,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderColor: BORDER,
  },
  logoText: {
    color: ACCENT,
    fontSize: 22,
    fontWeight: '700',
  },
  pageTitle: {
    color: TEXT_PRIMARY,
    fontSize: 20,
    fontWeight: '600',
  },

  // Profile section
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#111827',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  avatarIcon: {
    fontSize: 28,
    color: ACCENT,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: TEXT_PRIMARY,
  },
  userEmail: {
    fontSize: 13,
    color: TEXT_SECONDARY,
  },

  // My Orders section
  menuCard: {
    backgroundColor: CARD_BG,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: BORDER,
    marginHorizontal: 18,
    marginBottom: 24,
  },
  menuItem: {
    flexDirection: 'row',
    paddingHorizontal: 18,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
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
    color: '#4b5563',
  },

  // Sign out
  signOutButton: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#f97373',
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginHorizontal: 18,
  },
  signOutIcon: {
    fontSize: 18,
    color: '#f97373',
    marginRight: 6,
  },
  signOutText: {
    color: '#f97373',
    fontSize: 16,
    fontWeight: '600',
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
  }
});

export default ProfileScreen;
