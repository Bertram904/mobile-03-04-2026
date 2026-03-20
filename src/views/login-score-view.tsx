import { useCallback, useMemo, useState } from 'react';
import { Alert, FlatList, Pressable, StyleSheet, TextInput, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { AuthController } from '@/src/controllers/auth-controller';
import { ScoreController } from '@/src/controllers/score-controller';
import { Account } from '@/src/models/account';
import { StudentScoreView } from '@/src/models/score';

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
      <ThemedText type="title">Đăng nhập</ThemedText>
      <ThemedText style={styles.helperText}>Tài khoản mẫu: s001 / 123456</ThemedText>

      {!account ? (
        <>
          <TextInput
            style={styles.input}
            placeholder="Username"
            autoCapitalize="none"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <Pressable style={styles.button} disabled={isLoading} onPress={onLogin}>
            <ThemedText type="defaultSemiBold">{isLoading ? 'Đang đăng nhập...' : 'Login'}</ThemedText>
          </Pressable>
        </>
      ) : (
        <>
          <ThemedText type="subtitle">Xin chào, {account.username}</ThemedText>
          <ThemedText>Role: {account.role}</ThemedText>

          {studentScores ? (
            <>
              <ThemedText>Mã SV: {studentScores.student.code}</ThemedText>
              <ThemedText>Họ tên: {studentScores.student.name}</ThemedText>
              <ThemedText>Lớp: {studentScores.student.className}</ThemedText>

              <FlatList
                data={studentScores.scores}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.list}
                ListEmptyComponent={<ThemedText>Chưa có điểm.</ThemedText>}
                renderItem={({ item }) => (
                  <View style={styles.scoreItem}>
                    <ThemedText type="defaultSemiBold">{item.subject}</ThemedText>
                    <ThemedText>{item.score}</ThemedText>
                  </View>
                )}
              />
            </>
          ) : null}

          <Pressable style={styles.button} onPress={onLogout}>
            <ThemedText type="defaultSemiBold">Logout</ThemedText>
          </Pressable>
        </>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 10,
  },
  helperText: {
    opacity: 0.7,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  button: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    alignItems: 'center',
  },
  list: {
    gap: 8,
    paddingTop: 8,
    paddingBottom: 12,
  },
  scoreItem: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
