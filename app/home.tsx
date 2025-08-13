// app/(tabs)/index.tsx (oder dein aktueller Pfad)
import { View, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '@/components/helpers/button';
import { useGameThemeStore } from '@/lib/stores/useGameTheme';
import QuickStatsSelectedGame from '@/components/stats/QuickStatsSelectedGame';
import Header from '@/components/nav/header';
import { useRouter } from 'expo-router';
import FullscreenBoardCarousel from '@/components/games/FullscreenBoardCarousel';

const IndexScreen = () => {
  const router = useRouter();
  const gameTheme = useGameThemeStore((s) => s.color);
  const [selectedGameId, setSelectedGameId] = useState<number | null>(null);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
      {/* Carousel = Hintergrund & Selector */}
      <FullscreenBoardCarousel onSelected={setSelectedGameId} />

      {/* Overlay UI */}
      <View style={StyleSheet.absoluteFill} pointerEvents='box-none'>
        <Header />

        {/* Stats (unten über dem Button, je nach Geschmack verschieben) */}
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 96,
            paddingHorizontal: 24,
          }}
        >
          <QuickStatsSelectedGame gameId={selectedGameId} />
        </View>

        {/* Play-Button unten */}
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 20,
            paddingHorizontal: 24,
          }}
        >
          <CustomButton
            title='Play Now'
            disabled={!selectedGameId}
            onPress={() => {
              router.push({
                pathname: '/game/[gameId]/game',
                params: { gameId: selectedGameId?.toString() || '' },
              });
            }}
            style={{ backgroundColor: selectedGameId ? gameTheme : '#6b7280' }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default IndexScreen;
