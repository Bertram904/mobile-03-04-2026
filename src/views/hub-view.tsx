import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { router, type Href } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function HubView() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View style={styles.headerIcon}>
            <Ionicons name="code-slash" size={28} color="#fff" />
          </View>
          <Text style={styles.title}>Assignment Hub</Text>
          <Text style={styles.subtitle}>React Native + Expo</Text>
        </View>

        <Text style={styles.sectionTitle}>Select an assignment</Text>

        <TouchableOpacity
          style={[styles.card, styles.card1]}
          activeOpacity={0.8}
          onPress={() => router.push('/task1' as Href)}
        >
          <View style={[styles.cardIconWrap, { backgroundColor: '#e8f0fe' }]}>
            <Ionicons name="navigate" size={30} color="#1877F2" />
          </View>
          <View style={styles.cardBody}>
            <Text style={styles.cardLabel}>TASK 1</Text>
            <Text style={styles.cardTitle}>UI Navigation Replicas</Text>
            <Text style={styles.cardDesc}>
              Drawer (Google Drive) + Bottom Tabs (YouTube) + Material Top Tabs
              (Facebook)
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={22} color="#1877F2" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, styles.card2]}
          activeOpacity={0.8}
          onPress={() => router.push('/task2' as Href)}
        >
          <View style={[styles.cardIconWrap, { backgroundColor: '#f3e8ff' }]}>
            <Ionicons name="notifications" size={30} color="#6200ee" />
          </View>
          <View style={styles.cardBody}>
            <Text style={styles.cardLabel}>TASK 2</Text>
            <Text style={styles.cardTitle}>Scheduled Notifications</Text>
            <Text style={styles.cardDesc}>
              FAB + DateTimePicker + Local Push Notifications
              (expo-notifications)
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={22} color="#6200ee" />
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Built with Expo SDK 54 & React Navigation v7
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f7fa' },
  scrollContent: { padding: 24, paddingTop: 60 },
  header: { alignItems: 'center', marginBottom: 36 },
  headerIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#1a1a2e',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1a1a2e',
    letterSpacing: -0.5,
  },
  subtitle: { fontSize: 15, color: '#8e8e93', marginTop: 4 },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#8e8e93',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
  },
  card1: { borderLeftWidth: 4, borderLeftColor: '#1877F2' },
  card2: { borderLeftWidth: 4, borderLeftColor: '#6200ee' },
  cardIconWrap: {
    width: 52,
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  cardBody: { flex: 1 },
  cardLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#8e8e93',
    letterSpacing: 1.2,
    marginBottom: 3,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: 4,
  },
  cardDesc: { fontSize: 13, color: '#636366', lineHeight: 18 },
  footer: {
    alignItems: 'center',
    marginTop: 36,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#e5e5ea',
  },
  footerText: { fontSize: 12, color: '#aeaeb2' },
});
