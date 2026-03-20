import { useCallback, useEffect, useMemo, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    FlatList,
    Pressable,
    StyleSheet,
    TextInput,
    View,
} from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { TodoController } from '@/src/controllers/todo-controller';
import { Todo } from '@/src/models/todo';

export default function TodoListView() {
  const controller = useMemo(() => new TodoController(), []);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState('');

  const loadTodos = useCallback(async () => {
    setLoading(true);
    try {
      const data = await controller.list();
      setTodos(data);
    } catch {
      Alert.alert('Lỗi', 'Không tải được danh sách công việc.');
    } finally {
      setLoading(false);
    }
  }, [controller]);

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  const onAdd = useCallback(async () => {
    setSaving(true);
    try {
      await controller.create({ title });
      setTitle('');
      await loadTodos();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Không thể thêm công việc.';
      Alert.alert('Lỗi', message);
    } finally {
      setSaving(false);
    }
  }, [controller, loadTodos, title]);

  const onToggle = useCallback(
    async (todo: Todo) => {
      try {
        await controller.toggleDone(todo);
        await loadTodos();
      } catch {
        Alert.alert('Lỗi', 'Không cập nhật được trạng thái công việc.');
      }
    },
    [controller, loadTodos]
  );

  const onDelete = useCallback(
    async (todoId: number) => {
      try {
        await controller.delete(todoId);
        await loadTodos();
      } catch {
        Alert.alert('Lỗi', 'Không xoá được công việc.');
      }
    },
    [controller, loadTodos]
  );

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">MVC + SQLite Base</ThemedText>
      <ThemedText style={styles.subtitle}>Feature mẫu: Todo list lưu bằng SQLite</ThemedText>

      <View style={styles.inputRow}>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Nhập công việc..."
          style={styles.input}
        />
        <Pressable style={styles.primaryButton} onPress={onAdd} disabled={saving}>
          <ThemedText>{saving ? '...' : 'Thêm'}</ThemedText>
        </Pressable>
      </View>

      {loading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={todos}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          ListEmptyComponent={<ThemedText>Chưa có công việc nào.</ThemedText>}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Pressable onPress={() => onToggle(item)} style={styles.itemMain}>
                <ThemedText style={item.isDone ? styles.doneText : undefined}>{item.title}</ThemedText>
              </Pressable>
              <Pressable onPress={() => onDelete(item.id)}>
                <ThemedText style={styles.deleteText}>Xoá</ThemedText>
              </Pressable>
            </View>
          )}
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 12,
  },
  subtitle: {
    opacity: 0.7,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  primaryButton: {
    borderRadius: 8,
    paddingHorizontal: 14,
    justifyContent: 'center',
    borderWidth: 1,
  },
  list: {
    gap: 8,
    paddingBottom: 24,
  },
  item: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  itemMain: {
    flex: 1,
  },
  doneText: {
    textDecorationLine: 'line-through',
    opacity: 0.6,
  },
  deleteText: {
    textDecorationLine: 'underline',
  },
});
