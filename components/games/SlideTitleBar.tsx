// components/games/SlideTitleBar.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function SlideTitleBar({ title }: { title: string }) {
  const insets = useSafeAreaInsets();
  return (
    <View
      pointerEvents='none'
      style={[
        styles.wrap,
        { paddingTop: Math.max(insets.top, 12) }, // Safe-area top
      ]}
    >
      {/* leichter Scrim für Lesbarkeit */}
      <View style={styles.scrim} />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  scrim: {
    ...StyleSheet.absoluteFillObject,
    height: 90, // reicht für Notch/Statusbar + Titel
    backgroundColor: 'rgba(0,0,0,0.18)',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowRadius: 4,
  },
});
