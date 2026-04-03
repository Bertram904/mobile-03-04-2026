import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Platform,
  Alert,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import type { DateTimePickerChangeEvent } from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { getPermissionsAsync, requestPermissionsAsync } from 'expo-notifications/build/NotificationPermissions';
import { setNotificationHandler } from 'expo-notifications/build/NotificationsHandler';
import { scheduleNotificationAsync } from 'expo-notifications/build/scheduleNotificationAsync';
import { cancelScheduledNotificationAsync } from 'expo-notifications/build/cancelScheduledNotificationAsync';
import { setNotificationChannelAsync } from 'expo-notifications/build/setNotificationChannelAsync';
import { SchedulableTriggerInputTypes } from 'expo-notifications/build/Notifications.types';
import { AndroidImportance } from 'expo-notifications/build/NotificationChannelManager.types';

type ScheduledAlarm = {
  id: string;
  time: Date;
  notificationId: string;
  title: string;
  body: string;
};

const ALARM_CHANNEL_ID = 'alarm-channel';

export default function Task2View() {
  const [alarms, setAlarms] = useState<ScheduledAlarm[]>([]);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [tempDate, setTempDate] = useState(new Date());
  /** Android: OK only fires onValueChange, not onDismiss — refs avoid stale state in dismiss handlers. */
  const datePickedRef = useRef(false);
  const timePickedRef = useRef(false);
  const tempDateRef = useRef(new Date());
  /** Filled in compose modal; read when scheduling (avoids stale closures on Android). */
  const composeTitleRef = useRef('Reminder');
  const composeBodyRef = useRef('');

  const [showComposeModal, setShowComposeModal] = useState(false);
  const [draftTitle, setDraftTitle] = useState('Reminder');
  const [draftBody, setDraftBody] = useState('');

  const requestNotificationPermission = useCallback(async () => {
    try {
      setNotificationHandler({
        handleNotification: async () => ({
          shouldPlaySound: true,
          shouldSetBadge: false,
          shouldShowBanner: true,
          shouldShowList: true,
        }),
      });

      if (Platform.OS === 'android') {
        await setNotificationChannelAsync(ALARM_CHANNEL_ID, {
          name: 'Alarm Notifications',
          importance: AndroidImportance.HIGH,
          sound: 'default',
          vibrationPattern: [0, 250, 250, 250],
          enableVibrate: true,
        });
      }

      const { status: currentStatus } = await getPermissionsAsync();
      let finalStatus = currentStatus;

      if (currentStatus !== 'granted') {
        const { status } = await requestPermissionsAsync();
        finalStatus = status;
      }

      setPermissionGranted(finalStatus === 'granted');

      if (finalStatus !== 'granted') {
        Alert.alert('Permission Required', 'Please grant notification permission to continue.');
      }
    } catch {
      setPermissionGranted(false);
    }
  }, []);

  useEffect(() => {
    requestNotificationPermission();
  }, [requestNotificationPermission]);

  const scheduleAlarm = useCallback(
    async (date: Date) => {
      if (!permissionGranted) {
        Alert.alert('No Permission', 'Notification permission is not granted.');
        return;
      }

      if (date.getTime() <= Date.now()) {
        Alert.alert('Invalid Time', 'Please choose a future date and time.');
        return;
      }

      const title = (composeTitleRef.current || 'Reminder').trim() || 'Reminder';
      const bodyRaw = composeBodyRef.current.trim();
      const timeLabel = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const body = bodyRaw || `Alarm at ${timeLabel}`;

      const alarmLocalId = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

      try {
        const notificationId = await scheduleNotificationAsync({
          identifier: alarmLocalId,
          content: {
            title,
            body,
            sound: true,
            // Payload tương tự Intent extras / PendingIntent — chỉ dùng string cho Android ổn định
            data: {
              alarmId: alarmLocalId,
              scheduledAt: date.toISOString(),
              kind: 'scheduled_alarm',
              title,
              body,
            },
          },
          trigger: {
            type: SchedulableTriggerInputTypes.DATE,
            date,
            channelId: ALARM_CHANNEL_ID,
          },
        });

        setAlarms((prev) => [
          ...prev,
          {
            id: alarmLocalId,
            time: date,
            notificationId,
            title,
            body,
          },
        ]);
      } catch {
        Alert.alert('Schedule Failed', 'Could not schedule notification.');
      }
    },
    [permissionGranted],
  );

  const cancelAlarm = useCallback(async (alarm: ScheduledAlarm) => {
    await cancelScheduledNotificationAsync(alarm.notificationId);
    setAlarms((prev) => prev.filter((item) => item.id !== alarm.id));
  }, []);

  function openFab() {
    setDraftTitle('Reminder');
    setDraftBody('');
    setShowComposeModal(true);
  }

  function confirmComposeAndOpenPicker() {
    const t = draftTitle.trim() || 'Reminder';
    composeTitleRef.current = t;
    composeBodyRef.current = draftBody.trim();
    setShowComposeModal(false);

    const suggested = new Date();
    suggested.setMinutes(suggested.getMinutes() + 5, 0, 0);

    tempDateRef.current = suggested;
    datePickedRef.current = false;
    timePickedRef.current = false;
    setTempDate(suggested);
    setShowDatePicker(true);
  }

  function onDateValueChange(_event: DateTimePickerChangeEvent, date: Date) {
    datePickedRef.current = true;
    setTempDate((prev) => {
      const merged = new Date(date);
      merged.setHours(prev.getHours(), prev.getMinutes(), 0, 0);
      tempDateRef.current = merged;
      return merged;
    });

    // Android: user confirmed date — onDismiss is NOT called on OK (only on cancel).
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
      setTimeout(() => setShowTimePicker(true), 0);
    }
  }

  function onDateDismiss() {
    setShowDatePicker(false);
    // iOS: confirmation is typically tied to dismiss; Android cancel-only path.
    if (Platform.OS === 'ios' && datePickedRef.current) {
      setTimeout(() => setShowTimePicker(true), 120);
    }
    datePickedRef.current = false;
  }

  function onTimeValueChange(_event: DateTimePickerChangeEvent, date: Date) {
    timePickedRef.current = true;
    setTempDate((prev) => {
      const merged = new Date(prev);
      merged.setHours(date.getHours(), date.getMinutes(), 0, 0);
      tempDateRef.current = merged;
      return merged;
    });

    if (Platform.OS === 'android') {
      setShowTimePicker(false);
      void scheduleAlarm(tempDateRef.current);
    }
  }

  async function onTimeDismiss() {
    setShowTimePicker(false);
    if (Platform.OS === 'ios' && timePickedRef.current) {
      await scheduleAlarm(tempDateRef.current);
    }
    timePickedRef.current = false;
  }

  const renderItem = ({ item }: { item: ScheduledAlarm }) => {
    const isPast = item.time.getTime() <= Date.now();

    return (
      <View style={[styles.alarmCard, isPast && styles.alarmCardPast]}>
        <View style={styles.alarmIconWrap}>
          <Ionicons name={isPast ? 'checkmark-circle' : 'alarm-outline'} size={24} color={isPast ? '#9ca3af' : '#6200ee'} />
        </View>

        <View style={styles.alarmBody}>
          <Text style={styles.alarmTitle} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.alarmMessage} numberOfLines={2}>
            {item.body}
          </Text>
          <Text style={styles.alarmTime}>
            {item.time.toLocaleDateString([], {
              weekday: 'short',
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
            {'  '}
            {item.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
          <Text style={styles.alarmLabel}>{isPast ? 'Triggered' : 'Scheduled'}</Text>
        </View>

        <TouchableOpacity style={styles.deleteBtn} onPress={() => cancelAlarm(item)}>
          <Ionicons name="trash-outline" size={20} color="#ef4444" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerCard}>
        <Ionicons name="notifications" size={24} color="#6200ee" />
        <View style={{ marginLeft: 10, flex: 1 }}>
          <Text style={styles.title}>Notification Scheduler</Text>
          <Text style={styles.subtitle}>Set a specific date/time and receive local notification exactly then.</Text>
          <Text style={styles.permissionState}>Permission: {permissionGranted ? 'Granted' : 'Not granted'}</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>SCHEDULED ({alarms.length})</Text>

      {alarms.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="alarm-outline" size={62} color="#d1d5db" />
          <Text style={styles.emptyTitle}>No alarm scheduled yet</Text>
          <Text style={styles.emptySubtitle}>Tap + to enter a message and pick date/time.</Text>
        </View>
      ) : (
        <FlatList
          data={alarms}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        />
      )}

      <TouchableOpacity style={styles.fab} onPress={openFab} activeOpacity={0.9}>
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>

      <Modal
        visible={showComposeModal}
        animationType="slide"
        transparent
        onRequestClose={() => setShowComposeModal(false)}
      >
        <KeyboardAvoidingView
          style={styles.modalOverlay}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <TouchableOpacity style={styles.modalBackdrop} activeOpacity={1} onPress={() => setShowComposeModal(false)} />
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Nội dung báo thức</Text>
            <Text style={styles.modalHint}>Hiển thị khi thông báo tới (title/body + data cho app xử lý).</Text>
            <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
              <Text style={styles.inputLabel}>Tiêu đề</Text>
              <TextInput
                style={styles.input}
                value={draftTitle}
                onChangeText={setDraftTitle}
                placeholder="Reminder"
                placeholderTextColor="#9ca3af"
                maxLength={80}
              />
              <Text style={styles.inputLabel}>Tin nhắn</Text>
              <TextInput
                style={[styles.input, styles.inputMultiline]}
                value={draftBody}
                onChangeText={setDraftBody}
                placeholder="Nhập nội dung…"
                placeholderTextColor="#9ca3af"
                multiline
                maxLength={500}
                textAlignVertical="top"
              />
            </ScrollView>
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.modalBtnSecondary} onPress={() => setShowComposeModal(false)}>
                <Text style={styles.modalBtnSecondaryText}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalBtnPrimary} onPress={confirmComposeAndOpenPicker}>
                <Text style={styles.modalBtnPrimaryText}>Chọn giờ</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {showDatePicker && (
        <DateTimePicker
          value={tempDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          minimumDate={new Date()}
          onValueChange={onDateValueChange}
          onDismiss={onDateDismiss}
        />
      )}

      {showTimePicker && (
        <DateTimePicker
          value={tempDate}
          mode="time"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onValueChange={onTimeValueChange}
          onDismiss={onTimeDismiss}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f7' },
  headerCard: {
    margin: 16,
    padding: 16,
    borderRadius: 14,
    backgroundColor: '#f3e8ff',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  title: { fontSize: 16, fontWeight: '800', color: '#4c1d95' },
  subtitle: { marginTop: 4, fontSize: 13, color: '#5b5b66', lineHeight: 18 },
  permissionState: { marginTop: 8, fontSize: 12, fontWeight: '700', color: '#6d28d9' },

  sectionTitle: {
    marginHorizontal: 16,
    marginBottom: 8,
    fontSize: 12,
    color: '#9ca3af',
    fontWeight: '800',
    letterSpacing: 1,
  },

  alarmCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ececf1',
  },
  alarmCardPast: { opacity: 0.6 },
  alarmIconWrap: { marginRight: 12 },
  alarmBody: { flex: 1 },
  alarmTitle: { fontSize: 15, fontWeight: '800', color: '#111827' },
  alarmMessage: { marginTop: 4, fontSize: 13, color: '#4b5563', lineHeight: 18 },
  alarmTime: { marginTop: 6, fontSize: 13, fontWeight: '700', color: '#374151' },
  alarmLabel: { marginTop: 2, fontSize: 12, color: '#6b7280' },
  deleteBtn: { padding: 4 },

  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 80,
  },
  emptyTitle: { marginTop: 14, fontSize: 18, fontWeight: '700', color: '#9ca3af' },
  emptySubtitle: { marginTop: 6, fontSize: 13, color: '#c0c4cc' },

  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  modalBackdrop: { ...StyleSheet.absoluteFillObject },
  modalCard: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 28,
    maxHeight: '88%',
  },
  modalTitle: { fontSize: 18, fontWeight: '800', color: '#111827' },
  modalHint: { marginTop: 6, marginBottom: 14, fontSize: 13, color: '#6b7280', lineHeight: 18 },
  inputLabel: { fontSize: 12, fontWeight: '700', color: '#6b7280', marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: '#111827',
    marginBottom: 14,
    backgroundColor: '#fafafa',
  },
  inputMultiline: { minHeight: 100, paddingTop: 12 },
  modalActions: { flexDirection: 'row', gap: 12, marginTop: 8 },
  modalBtnSecondary: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
  },
  modalBtnSecondaryText: { fontSize: 16, fontWeight: '700', color: '#4b5563' },
  modalBtnPrimary: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#6200ee',
    alignItems: 'center',
  },
  modalBtnPrimaryText: { fontSize: 16, fontWeight: '700', color: '#fff' },

  fab: {
    position: 'absolute',
    right: 24,
    bottom: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#6200ee',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#6200ee',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
  },
});
