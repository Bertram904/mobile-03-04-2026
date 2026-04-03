import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {
  NavigationContainer,
  NavigationIndependentTree,
} from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

import {
  FeedScreen,
  VideosScreen,
  GroupsScreen,
  NotificationsScreen,
  MenuScreen,
  ExploreTabScreen,
  SubscriptionsTabScreen,
  LibraryTabScreen,
  RecentScreen,
  StarredScreen,
  OfflineScreen,
  BinScreen,
  SettingsScreen,
} from './screens';

const Drawer = createDrawerNavigator();
const BottomTab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

/* ------------------------------------------------------------------ */
/*  Facebook-style Material Top Tabs (inside "Home" bottom tab)       */
/* ------------------------------------------------------------------ */

function FacebookTopTabs() {
  return (
    <TopTab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarShowIcon: true,
        tabBarIndicatorStyle: { backgroundColor: '#1877F2', height: 3, borderRadius: 4 },
        tabBarActiveTintColor: '#1877F2',
        tabBarInactiveTintColor: '#65676b',
        tabBarStyle: { backgroundColor: '#ffffff', elevation: 3, shadowOpacity: 0.08, shadowRadius: 6 },
        tabBarPressColor: '#e8f0fe',
      }}
    >
      <TopTab.Screen
        name="Feed"
        component={FeedScreen}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="home" size={22} color={color} />,
        }}
      />
      <TopTab.Screen
        name="Videos"
        component={VideosScreen}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="play-circle-outline" size={22} color={color} />,
        }}
      />
      <TopTab.Screen
        name="Groups"
        component={GroupsScreen}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="people-outline" size={22} color={color} />,
        }}
      />
      <TopTab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="notifications-outline" size={22} color={color} />,
        }}
      />
      <TopTab.Screen
        name="Menu"
        component={MenuScreen}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="menu" size={22} color={color} />,
        }}
      />
    </TopTab.Navigator>
  );
}

/* ------------------------------------------------------------------ */
/*  YouTube-style Bottom Tab Navigator                                */
/* ------------------------------------------------------------------ */

function YouTubeBottomTabs() {
  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#FF0000',
        tabBarInactiveTintColor: '#606060',
        headerShown: false,
        tabBarStyle: {
          height: 64,
          paddingBottom: 8,
          paddingTop: 6,
          borderTopLeftRadius: 18,
          borderTopRightRadius: 18,
          backgroundColor: '#fff',
          position: 'absolute',
          elevation: 10,
          shadowOpacity: 0.12,
          shadowRadius: 10,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={FacebookTopTabs}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Explore"
        component={ExploreTabScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="compass-outline" size={size} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Subscriptions"
        component={SubscriptionsTabScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="youtube-subscription" size={size} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Library"
        component={LibraryTabScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="library-outline" size={size} color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

/* ------------------------------------------------------------------ */
/*  Custom Drawer Content (Google Drive style)                        */
/* ------------------------------------------------------------------ */

function CustomDrawerContent(props: any) {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <View style={drawerStyles.header}>
        <View style={drawerStyles.avatar}>
          <Text style={drawerStyles.avatarText}>U</Text>
        </View>
        <Text style={drawerStyles.userName}>User Name</Text>
        <Text style={drawerStyles.userEmail}>user@gmail.com</Text>
        <View style={drawerStyles.storagePill}>
          <MaterialCommunityIcons name="cloud-check-outline" size={14} color="#fff" />
          <Text style={drawerStyles.storageText}>12.4 GB / 15 GB used</Text>
        </View>
      </View>

      <View style={drawerStyles.divider} />
      <DrawerItemList {...props} />
      <View style={{ flex: 1 }} />

      <View style={drawerStyles.divider} />
      <TouchableOpacity style={drawerStyles.backBtn} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={20} color="#5f6368" />
        <Text style={drawerStyles.backText}>Back to Hub</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
}

/* ------------------------------------------------------------------ */
/*  Google Drive-style Drawer Navigator (Root)                        */
/* ------------------------------------------------------------------ */

export default function Task1Navigator() {
  return (
    <NavigationIndependentTree>
      <NavigationContainer>
        <Drawer.Navigator
          drawerContent={(props) => <CustomDrawerContent {...props} />}
          screenOptions={{
            headerStyle: { backgroundColor: '#ffffff', elevation: 0, shadowOpacity: 0 },
            headerTintColor: '#202124',
            headerTitleStyle: { fontWeight: '700', color: '#111827' },
            drawerActiveTintColor: '#1a73e8',
            drawerActiveBackgroundColor: '#e8f0fe',
            drawerInactiveTintColor: '#5f6368',
            drawerLabelStyle: { fontSize: 14, fontWeight: '500', marginLeft: -8 },
            drawerItemStyle: { borderRadius: 8, marginHorizontal: 8 },
            drawerStyle: { borderTopRightRadius: 20, borderBottomRightRadius: 20, overflow: 'hidden' },
          }}
        >
          <Drawer.Screen
            name="MyDrive"
            component={YouTubeBottomTabs}
            options={{
              title: 'My Drive',
              drawerIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="google-drive" size={size} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="Recent"
            component={RecentScreen}
            options={{
              drawerIcon: ({ color, size }) => (
                <Ionicons name="time-outline" size={size} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="Starred"
            component={StarredScreen}
            options={{
              drawerIcon: ({ color, size }) => (
                <Ionicons name="star-outline" size={size} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="Offline"
            component={OfflineScreen}
            options={{
              drawerIcon: ({ color, size }) => (
                <Ionicons name="cloud-offline-outline" size={size} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="Bin"
            component={BinScreen}
            options={{
              drawerIcon: ({ color, size }) => (
                <Ionicons name="trash-outline" size={size} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="Settings"
            component={SettingsScreen}
            options={{
              drawerIcon: ({ color, size }) => (
                <Ionicons name="settings-outline" size={size} color={color} />
              ),
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </NavigationIndependentTree>
  );
}

/* ------------------------------------------------------------------ */
/*  Drawer-specific styles                                            */
/* ------------------------------------------------------------------ */

const drawerStyles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 16,
    backgroundColor: '#1a73e8',
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#ffffff22',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarText: { color: '#fff', fontSize: 22, fontWeight: '700' },
  userName: { fontSize: 16, fontWeight: '700', color: '#ffffff' },
  userEmail: { fontSize: 13, color: '#dbeafe', marginTop: 2 },
  storagePill: {
    marginTop: 10,
    alignSelf: 'flex-start',
    backgroundColor: '#ffffff26',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  storageText: { marginLeft: 6, color: '#ffffff', fontSize: 11, fontWeight: '600' },
  divider: { height: 1, backgroundColor: '#e0e0e0', marginVertical: 8 },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    marginBottom: 8,
  },
  backText: { marginLeft: 12, fontSize: 14, fontWeight: '500', color: '#5f6368' },
});
