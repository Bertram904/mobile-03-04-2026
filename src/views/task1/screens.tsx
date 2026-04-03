import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

/* ------------------------------------------------------------------ */
/*  Shared building blocks                                            */
/* ------------------------------------------------------------------ */

function Avatar({ color, letter }: { color: string; letter: string }) {
  return (
    <View style={[shared.avatar, { backgroundColor: color }]}>
      <Text style={shared.avatarText}>{letter}</Text>
    </View>
  );
}

function SectionHeader({ title }: { title: string }) {
  return <Text style={shared.sectionHeader}>{title}</Text>;
}

function ListRow({
  icon,
  iconColor,
  title,
  subtitle,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <View style={shared.listRow}>
      <Ionicons name={icon} size={22} color={iconColor} style={{ marginRight: 14 }} />
      <View style={{ flex: 1 }}>
        <Text style={shared.listTitle}>{title}</Text>
        {subtitle ? <Text style={shared.listSub}>{subtitle}</Text> : null}
      </View>
      <Ionicons name="ellipsis-vertical" size={16} color="#bbb" />
    </View>
  );
}

function PostCard({
  name,
  color,
  text,
  time,
}: {
  name: string;
  color: string;
  text: string;
  time: string;
}) {
  return (
    <View style={shared.postCard}>
      <View style={shared.postHeader}>
        <Avatar color={color} letter={name[0]} />
        <View style={{ marginLeft: 10 }}>
          <Text style={shared.postName}>{name}</Text>
          <Text style={shared.postTime}>{time}</Text>
        </View>
      </View>
      <Text style={shared.postText}>{text}</Text>
      <View style={shared.postActions}>
        {(['thumbs-up-outline', 'chatbubble-outline', 'share-outline'] as const).map(
          (iconName) => (
            <TouchableOpacity key={iconName} style={shared.actionBtn}>
              <Ionicons name={iconName} size={18} color="#65676b" />
            </TouchableOpacity>
          ),
        )}
      </View>
    </View>
  );
}

/* ------------------------------------------------------------------ */
/*  Facebook-style Top Tab screens                                    */
/* ------------------------------------------------------------------ */

export function FeedScreen() {
  return (
    <ScrollView style={shared.screen}>
      <View style={shared.storyRow}>
        {['You', 'Alice', 'Bob', 'Charlie', 'Diana'].map((name, i) => (
          <View key={name} style={shared.storyItem}>
            <Avatar color={['#1877F2', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6'][i]} letter={name[0]} />
            <Text style={shared.storyName}>{name}</Text>
          </View>
        ))}
      </View>

      <View style={shared.composeBox}>
        <Avatar color="#1877F2" letter="U" />
        <Text style={shared.composePlaceholder}>What&apos;s on your mind?</Text>
      </View>

      <PostCard
        name="Alice Nguyen"
        color="#e74c3c"
        text="Just finished my React Native assignment! The nested navigation is mind-blowing 🚀"
        time="2h ago"
      />
      <PostCard
        name="Bob Tran"
        color="#2ecc71"
        text="Anyone else struggling with Reanimated config on Windows? Finally got it working after clearing caches."
        time="5h ago"
      />
      <PostCard
        name="Charlie Le"
        color="#f39c12"
        text="Beautiful weather in Ho Chi Minh City today! Perfect day for coding at a cafe ☕"
        time="8h ago"
      />
    </ScrollView>
  );
}

export function VideosScreen() {
  const videos = [
    { title: 'React Native in 2026 – What Changed?', channel: 'Tech Daily', views: '1.2M views' },
    { title: 'Building Apps with Expo SDK 54', channel: 'Code Academy', views: '340K views' },
    { title: 'Navigation Deep Dive', channel: 'RN Mastery', views: '89K views' },
    { title: 'Reanimated 4 Animations', channel: 'UI Motion', views: '560K views' },
  ];
  return (
    <ScrollView style={shared.screen}>
      <SectionHeader title="Watch" />
      {videos.map((v) => (
        <View key={v.title} style={shared.videoCard}>
          <View style={shared.videoThumb}>
            <Ionicons name="play-circle" size={40} color="#fff" />
          </View>
          <View style={shared.videoInfo}>
            <Text style={shared.videoTitle} numberOfLines={2}>{v.title}</Text>
            <Text style={shared.videoMeta}>{v.channel} · {v.views}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

export function GroupsScreen() {
  const groups = [
    { name: 'React Native VN', members: '45K members', color: '#1877F2' },
    { name: 'Expo Developers', members: '23K members', color: '#000' },
    { name: 'JavaScript Wizards', members: '128K members', color: '#f7df1e' },
    { name: 'Mobile Dev Community', members: '67K members', color: '#2ecc71' },
  ];
  return (
    <ScrollView style={shared.screen}>
      <SectionHeader title="Your Groups" />
      {groups.map((g) => (
        <View key={g.name} style={shared.groupCard}>
          <Avatar color={g.color} letter={g.name[0]} />
          <View style={{ marginLeft: 12, flex: 1 }}>
            <Text style={shared.groupName}>{g.name}</Text>
            <Text style={shared.groupMeta}>{g.members}</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#bbb" />
        </View>
      ))}
    </ScrollView>
  );
}

export function NotificationsScreen() {
  const items = [
    { text: 'Alice commented on your post', time: '2m ago', color: '#e74c3c', read: false },
    { text: 'Bob liked your photo', time: '1h ago', color: '#2ecc71', read: false },
    { text: 'Charlie invited you to a group', time: '3h ago', color: '#f39c12', read: true },
    { text: 'Diana shared a memory with you', time: '1d ago', color: '#9b59b6', read: true },
    { text: 'Your Reel has 100 new views', time: '2d ago', color: '#1877F2', read: true },
  ];
  return (
    <ScrollView style={shared.screen}>
      <SectionHeader title="Notifications" />
      {items.map((n, i) => (
        <View key={i} style={[shared.notifRow, !n.read && { backgroundColor: '#e7f3ff' }]}>
          <Avatar color={n.color} letter={n.text[0]} />
          <View style={{ marginLeft: 12, flex: 1 }}>
            <Text style={shared.notifText}>{n.text}</Text>
            <Text style={shared.notifTime}>{n.time}</Text>
          </View>
          {!n.read && <View style={shared.unreadDot} />}
        </View>
      ))}
    </ScrollView>
  );
}

export function MenuScreen() {
  const menuItems: { icon: keyof typeof MaterialCommunityIcons.glyphMap; label: string }[] = [
    { icon: 'bookmark-outline', label: 'Saved' },
    { icon: 'account-group-outline', label: 'Groups' },
    { icon: 'video-outline', label: 'Video' },
    { icon: 'storefront-outline', label: 'Marketplace' },
    { icon: 'calendar-outline', label: 'Events' },
    { icon: 'clock-outline', label: 'Memories' },
    { icon: 'flag-outline', label: 'Pages' },
    { icon: 'cog-outline', label: 'Settings' },
  ];
  return (
    <ScrollView style={shared.screen}>
      <SectionHeader title="Menu" />
      <View style={shared.menuGrid}>
        {menuItems.map((item) => (
          <View key={item.label} style={shared.menuItem}>
            <MaterialCommunityIcons name={item.icon} size={26} color="#1877F2" />
            <Text style={shared.menuLabel}>{item.label}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

/* ------------------------------------------------------------------ */
/*  YouTube-style Bottom Tab screens                                  */
/* ------------------------------------------------------------------ */

export function ExploreTabScreen() {
  const categories = ['Trending', 'Music', 'Gaming', 'News', 'Sports', 'Learning'];
  const trending = [
    { title: 'Top 10 Expo Tips You Didn\'t Know', channel: 'DevTips', views: '2.1M views' },
    { title: 'React Native vs Flutter 2026', channel: 'Fireship', views: '4.5M views' },
    { title: 'Build a Full App in 1 Hour', channel: 'Traversy', views: '890K views' },
  ];
  return (
    <ScrollView style={shared.screen}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16 }}>
        {categories.map((c) => (
          <View key={c} style={shared.chip}>
            <Text style={shared.chipText}>{c}</Text>
          </View>
        ))}
      </ScrollView>
      <SectionHeader title="Trending" />
      {trending.map((v) => (
        <View key={v.title} style={shared.videoCard}>
          <View style={[shared.videoThumb, { backgroundColor: '#ff0000' }]}>
            <Ionicons name="play-circle" size={40} color="#fff" />
          </View>
          <View style={shared.videoInfo}>
            <Text style={shared.videoTitle} numberOfLines={2}>{v.title}</Text>
            <Text style={shared.videoMeta}>{v.channel} · {v.views}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

export function SubscriptionsTabScreen() {
  const channels = [
    { name: 'Fireship', color: '#ff6b35', subs: '2.1M' },
    { name: 'Traversy Media', color: '#0077b6', subs: '2.2M' },
    { name: 'The Net Ninja', color: '#2ecc71', subs: '1.3M' },
    { name: 'William Candillon', color: '#9b59b6', subs: '180K' },
    { name: 'Catalin Miron', color: '#e74c3c', subs: '120K' },
  ];
  return (
    <ScrollView style={shared.screen}>
      <SectionHeader title="Subscriptions" />
      {channels.map((ch) => (
        <View key={ch.name} style={shared.channelRow}>
          <Avatar color={ch.color} letter={ch.name[0]} />
          <View style={{ marginLeft: 12, flex: 1 }}>
            <Text style={shared.channelName}>{ch.name}</Text>
            <Text style={shared.channelSubs}>{ch.subs} subscribers</Text>
          </View>
          <View style={shared.subscribedBadge}>
            <Text style={shared.subscribedText}>SUBSCRIBED</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

export function LibraryTabScreen() {
  return (
    <ScrollView style={shared.screen}>
      {(['History', 'Watch Later', 'Playlists', 'Your Videos', 'Downloads'] as const).map(
        (section) => (
          <View key={section} style={shared.libSection}>
            <Ionicons
              name={
                section === 'History'
                  ? 'time-outline'
                  : section === 'Watch Later'
                  ? 'bookmark-outline'
                  : section === 'Downloads'
                  ? 'cloud-download-outline'
                  : 'list-outline'
              }
              size={22}
              color="#606060"
              style={{ marginRight: 12 }}
            />
            <Text style={shared.libText}>{section}</Text>
            <Ionicons name="chevron-forward" size={18} color="#bbb" />
          </View>
        ),
      )}
    </ScrollView>
  );
}

/* ------------------------------------------------------------------ */
/*  Google Drive Drawer screens                                       */
/* ------------------------------------------------------------------ */

export function RecentScreen() {
  const files = [
    { name: 'Project Proposal.docx', icon: 'document-text-outline' as const, color: '#4285F4', date: 'Apr 1, 2026' },
    { name: 'Budget Q2.xlsx', icon: 'grid-outline' as const, color: '#0F9D58', date: 'Mar 28, 2026' },
    { name: 'Presentation.pptx', icon: 'easel-outline' as const, color: '#F4B400', date: 'Mar 25, 2026' },
    { name: 'Meeting Notes.pdf', icon: 'document-outline' as const, color: '#DB4437', date: 'Mar 20, 2026' },
  ];
  return (
    <ScrollView style={shared.screen}>
      {files.map((f) => (
        <ListRow key={f.name} icon={f.icon} iconColor={f.color} title={f.name} subtitle={f.date} />
      ))}
    </ScrollView>
  );
}

export function StarredScreen() {
  return (
    <ScrollView style={shared.screen}>
      <ListRow icon="star" iconColor="#F4B400" title="Important Docs" subtitle="Folder · 12 items" />
      <ListRow icon="star" iconColor="#F4B400" title="Design Assets.fig" subtitle="Mar 15, 2026" />
      <ListRow icon="star" iconColor="#F4B400" title="API Reference.md" subtitle="Feb 28, 2026" />
    </ScrollView>
  );
}

export function OfflineScreen() {
  return (
    <View style={[shared.screen, shared.emptyState]}>
      <Ionicons name="cloud-offline-outline" size={64} color="#dadce0" />
      <Text style={shared.emptyTitle}>No offline files</Text>
      <Text style={shared.emptySubtitle}>
        Files you make available offline will appear here
      </Text>
    </View>
  );
}

export function BinScreen() {
  return (
    <ScrollView style={shared.screen}>
      <View style={shared.binBanner}>
        <Ionicons name="information-circle-outline" size={18} color="#5f6368" />
        <Text style={shared.binBannerText}>
          Items in the bin are deleted forever after 30 days
        </Text>
      </View>
      <ListRow icon="document-outline" iconColor="#bbb" title="Old Report.docx" subtitle="Deleted Mar 30, 2026" />
      <ListRow icon="image-outline" iconColor="#bbb" title="Screenshot_2026.png" subtitle="Deleted Mar 28, 2026" />
    </ScrollView>
  );
}

export function SettingsScreen() {
  return (
    <ScrollView style={shared.screen}>
      <ListRow icon="person-outline" iconColor="#5f6368" title="Account" subtitle="user@gmail.com" />
      <ListRow icon="notifications-outline" iconColor="#5f6368" title="Notifications" />
      <ListRow icon="cloud-outline" iconColor="#5f6368" title="Storage" subtitle="3.2 GB of 15 GB used" />
      <ListRow icon="shield-outline" iconColor="#5f6368" title="Privacy" />
      <ListRow icon="information-circle-outline" iconColor="#5f6368" title="About" subtitle="Version 1.0.0" />
    </ScrollView>
  );
}

/* ------------------------------------------------------------------ */
/*  Styles                                                            */
/* ------------------------------------------------------------------ */

const shared = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#f7f8fb' },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { color: '#fff', fontWeight: '700', fontSize: 16 },

  /* Stories */
  storyRow: { flexDirection: 'row', paddingHorizontal: 12, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#eee' },
  storyItem: { alignItems: 'center', marginHorizontal: 8, width: 58 },
  storyName: { fontSize: 11, color: '#65676b', marginTop: 4 },

  /* Compose */
  composeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderBottomWidth: 8,
    borderBottomColor: '#f0f2f5',
  },
  composePlaceholder: { marginLeft: 12, color: '#65676b', fontSize: 15, flex: 1 },

  /* Post card */
  postCard: {
    marginHorizontal: 10,
    marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#eef0f4',
    shadowColor: '#111827',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  postHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  postName: { fontWeight: '700', fontSize: 15, color: '#050505' },
  postTime: { fontSize: 12, color: '#65676b', marginTop: 1 },
  postText: { fontSize: 15, color: '#050505', lineHeight: 22, marginBottom: 12 },
  postActions: { flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#eee', paddingTop: 8, justifyContent: 'space-around' },
  actionBtn: { padding: 6 },

  /* Video card */
  videoCard: {
    flexDirection: 'row',
    padding: 12,
    borderWidth: 1,
    borderColor: '#edf0f4',
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  videoThumb: {
    width: 140,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#222',
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoInfo: { marginLeft: 12, flex: 1, justifyContent: 'center' },
  videoTitle: { fontSize: 14, fontWeight: '600', color: '#0f0f0f', marginBottom: 4 },
  videoMeta: { fontSize: 12, color: '#606060' },

  /* Groups */
  groupCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderWidth: 1,
    borderColor: '#edf0f4',
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  groupName: { fontSize: 15, fontWeight: '600', color: '#050505' },
  groupMeta: { fontSize: 13, color: '#65676b', marginTop: 2 },

  /* Notifications */
  notifRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderWidth: 1,
    borderColor: '#edf0f4',
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  notifText: { fontSize: 14, color: '#050505', lineHeight: 20 },
  notifTime: { fontSize: 12, color: '#65676b', marginTop: 2 },
  unreadDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#1877F2' },

  /* Menu grid */
  menuGrid: { flexDirection: 'row', flexWrap: 'wrap', padding: 10 },
  menuItem: {
    width: '25%',
    alignItems: 'center',
    paddingVertical: 14,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#edf0f4',
    borderRadius: 12,
    marginBottom: 8,
  },
  menuLabel: { fontSize: 12, color: '#050505', marginTop: 6 },

  /* Chips */
  chip: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 4,
  },
  chipText: { fontSize: 13, fontWeight: '600', color: '#0f0f0f' },

  /* Channels */
  channelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderWidth: 1,
    borderColor: '#edf0f4',
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  channelName: { fontSize: 15, fontWeight: '600', color: '#0f0f0f' },
  channelSubs: { fontSize: 13, color: '#606060', marginTop: 2 },
  subscribedBadge: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
  },
  subscribedText: { fontSize: 11, fontWeight: '700', color: '#606060' },

  /* Library */
  libSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: '#edf0f4',
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  libText: { flex: 1, fontSize: 15, fontWeight: '500', color: '#0f0f0f' },

  /* List rows (Drive) */
  listRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#edf0f4',
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  listTitle: { fontSize: 14, fontWeight: '500', color: '#202124' },
  listSub: { fontSize: 12, color: '#5f6368', marginTop: 2 },

  /* Empty state */
  emptyState: { alignItems: 'center', justifyContent: 'center', paddingTop: 80 },
  emptyTitle: { fontSize: 18, fontWeight: '600', color: '#5f6368', marginTop: 16 },
  emptySubtitle: { fontSize: 14, color: '#80868b', marginTop: 6, textAlign: 'center', paddingHorizontal: 40 },

  /* Bin */
  binBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 14,
    margin: 12,
    borderRadius: 8,
  },
  binBannerText: { marginLeft: 8, fontSize: 13, color: '#5f6368', flex: 1 },
});
