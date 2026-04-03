import { useCallback, useMemo, useState } from 'react';
import { Alert, FlatList, Pressable, StyleSheet, TextInput, View, KeyboardAvoidingView, Platform } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { AuthController } from '@/src/controllers/auth-controller';
import { ScoreController } from '@/src/controllers/score-controller';
import { Account } from '@/src/models/account';
import { StudentScoreView } from '@/src/models/score';

// Bảng màu hiện đại
const COLORS = {
  primary: '#4F46E5', // Indigo
  secondary: '#6366F1',
  background: '#F8FAFC',
  card: '#FFFFFF',
  textMain: '#1E293B',
  textSub: '#64748B',
  border: '#E2E8F0',
  success: '#10B981',
  white: '#FFFFFF',
};

export default function LoginScoreView() {
  const authController = useMemo(() => new AuthController(), []);
  const scoreController = useMemo(() => new ScoreController(), []);

  const [username, setUsername] = useState('s001');
  const [password, setPassword] = useState('123456');
  const [isLoading, setIsLoading] = useState(false);
  const [account, setAccount] = useState<Account | null>(null);
  const [studentScores, setStudentScores] = useState<StudentScoreView | null>(null);

  const onLogin = useCallback(async () => {
    setIsLoading(true);
    try {
      const loggedInAccount = await authController.login({ username, password });
      const data = await scoreController.getStudentScores(loggedInAccount.username);
      setAccount(loggedInAccount);
      setStudentScores(data);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Đăng nhập thất bại.';
      Alert.alert('Thông báo', message);
      setAccount(null);
      setStudentScores(null);
    } finally {
      setIsLoading(false);
    }
  }, [authController, password, scoreController, username]);

  const onLogout = useCallback(() => {
    setAccount(null);
    setStudentScores(null);
    setPassword('');
  }, []);

  return (
    <ThemedView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        {!account ? (
          <View style={styles.loginWrapper}>
            <View style={styles.headerSection}>
              <ThemedText style={styles.title}>Welcome Back!</ThemedText>
              <ThemedText style={styles.subtitle}>Đăng nhập để xem bảng điểm của bạn</ThemedText>
            </View>

            <View style={styles.formCard}>
              <View style={styles.inputGroup}>
                <ThemedText style={styles.label}>Tài khoản</ThemedText>
                <TextInput
                  style={styles.input}
                  placeholder="Nhập mã sinh viên..."
                  autoCapitalize="none"
                  value={username}
                  onChangeText={setUsername}
                  placeholderTextColor={COLORS.textSub}
                />
              </View>

              <View style={styles.inputGroup}>
                <ThemedText style={styles.label}>Mật khẩu</ThemedText>
                <TextInput
                  style={styles.input}
                  placeholder="Nhập mật khẩu..."
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                  placeholderTextColor={COLORS.textSub}
                />
              </View>

              <Pressable 
                style={({ pressed }) => [styles.loginButton, pressed && styles.buttonPressed]} 
                disabled={isLoading} 
                onPress={onLogin}
              >
                <ThemedText style={styles.loginButtonText}>
                  {isLoading ? 'Đang xác thực...' : 'Đăng Nhập'}
                </ThemedText>
              </Pressable>
              
              <ThemedText style={styles.helperText}>Demo: s001 / 123456</ThemedText>
            </View>
          </View>
        ) : (
          <View style={styles.dashboardWrapper}>
            {/* Header thông tin sinh viên */}
            <View style={styles.profileCard}>
              <View style={styles.profileInfo}>
                <ThemedText style={styles.welcomeText}>Xin chào, {account.username} 👋</ThemedText>
                <View style={styles.badge}>
                  <ThemedText style={styles.badgeText}>{account.role.toUpperCase()}</ThemedText>
                </View>
              </View>
              
              {studentScores && (
                <View style={styles.studentDetail}>
                  <ThemedText style={styles.studentName}>{studentScores.student.name}</ThemedText>
                  <ThemedText style={styles.studentSubInfo}>
                    {studentScores.student.code} • {studentScores.student.className}
                  </ThemedText>
                </View>
              )}
            </View>

            {/* Danh sách điểm */}
            <ThemedText style={styles.sectionTitle}>Kết quả học tập</ThemedText>
            <FlatList
              data={studentScores?.scores}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={styles.listContainer}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={
                <View style={styles.emptyState}>
                  <ThemedText style={{ color: COLORS.textSub }}>Chưa có dữ liệu điểm.</ThemedText>
                </View>
              }
              renderItem={({ item }) => (
                <View style={styles.scoreCard}>
                  <View style={styles.scoreInfo}>
                    <ThemedText style={styles.subjectText}>{item.subject}</ThemedText>
                    <ThemedText style={{ color: COLORS.textSub }}>Học phần bắt buộc</ThemedText>
                  </View>
                  <View style={[styles.scoreBadge, { backgroundColor: Number(item.score) >= 5 ? '#ECFDF5' : '#FEF2F2' }]}>
                    <ThemedText style={[styles.scoreValue, { color: Number(item.score) >= 5 ? COLORS.success : '#EF4444' }]}>
                      {item.score}
                    </ThemedText>
                  </View>
                </View>
              )}
            />

            <Pressable style={styles.logoutButton} onPress={onLogout}>
              <ThemedText style={styles.logoutButtonText}>Đăng xuất</ThemedText>
            </Pressable>
          </View>
        )}
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  // --- LOGIN STYLES ---
  loginWrapper: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  headerSection: {
    marginBottom: 32,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: COLORS.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSub,
    textAlign: 'center',
  },
  formCard: {
    backgroundColor: COLORS.card,
    borderRadius: 24,
    padding: 24,
    // Shadow cho iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    // Elevation cho Android
    elevation: 5,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textMain,
    marginBottom: 8,
    marginLeft: 4,
  },
  input: {
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: COLORS.textMain,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  loginButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  loginButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
  },
  helperText: {
    marginTop: 16,
    textAlign: 'center',
    fontSize: 13,
    color: COLORS.textSub,
    fontStyle: 'italic',
  },
  // --- DASHBOARD STYLES ---
  dashboardWrapper: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  profileCard: {
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
  },
  profileInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  welcomeText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '600',
  },
  badge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: '800',
  },
  studentDetail: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
    paddingTop: 12,
  },
  studentName: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: '700',
  },
  studentSubInfo: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textMain,
    marginBottom: 16,
  },
  listContainer: {
    paddingBottom: 20,
    gap: 12,
  },
  scoreCard: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  scoreInfo: {
    flex: 1,
  },
  subjectText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textMain,
    marginBottom: 4,
  },
  scoreBadge: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreValue: {
    fontSize: 18,
    fontWeight: '800',
  },
  emptyState: {
    alignItems: 'center',
    marginTop: 40,
  },
  logoutButton: {
    marginVertical: 20,
    paddingVertical: 12,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#EF4444',
    fontSize: 15,
    fontWeight: '600',
  },
});