import React, { Suspense } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const Task2View = React.lazy(() => import('@/src/views/task2/task2-view'));

function LoadingFallback() {
  return (
    <View style={styles.center}>
      <ActivityIndicator size="large" color="#6200ee" />
    </View>
  );
}

export default function Task2Screen() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Task2View />
    </Suspense>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
