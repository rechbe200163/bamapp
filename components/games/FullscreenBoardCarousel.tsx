// components/games/FullscreenBoardCarousel.tsx
import React, { useEffect } from 'react';
import { View, Dimensions, Platform, StyleSheet } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { useSharedValue } from 'react-native-reanimated';
import GameBoardBackground, {
  BoardVariant,
} from '@/components/backgrounds/GameBoardBackground';
import { games } from '@/lib/mock-data/games';
import { useHaptic } from '@/hooks/useHaptic';
import { useGameThemeStore } from '@/lib/stores/useGameTheme';
import { useSelectedGameNameStore } from '@/lib/stores/useGameStore';
import SlideTitleBar from './SlideTitleBar';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

type Props = { onSelected: (gameId: number) => void };

export default function FullscreenBoardCarousel({ onSelected }: Props) {
  const scrollOffsetValue = useSharedValue<number>(0);
  const hapticSelection = useHaptic('success');
  const setGameTheme = useGameThemeStore((s) => s.setGameTheme);
  const setGameName = useSelectedGameNameStore((s) => s.setGameName);

  useEffect(() => {
    if (games.length > 0) {
      const g = games[0];
      onSelected(g.id);
      setGameTheme(g.gameTheme || '#000000');
      setGameName(g.title || '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={{ width: screenWidth, height: screenHeight }}>
      <Carousel
        loop
        width={screenWidth}
        height={screenHeight}
        data={games}
        pagingEnabled
        snapEnabled
        defaultScrollOffsetValue={scrollOffsetValue}
        mode='parallax'
        modeConfig={{
          parallaxScrollingScale: 1,
          parallaxAdjacentItemScale: 1,
          parallaxScrollingOffset: 0,
        }}
        onSnapToItem={(index) => {
          const g = games[index];
          setGameTheme(g.gameTheme || '#000000');
          setGameName(g.title || '');
          onSelected(g.id);
          if (Platform.OS !== 'web' && hapticSelection) hapticSelection();
        }}
        renderItem={({ item }) => {
          const variant = (item.type || 'hit8') as BoardVariant;
          const color = item.gameTheme || '#6b7280';
          return (
            <View
              style={styles.slide} // WICHTIG: exakt Screen-Größe
            >
              <GameBoardBackground variant={variant} primary={color} />
              <SlideTitleBar title={item.title} />
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  slide: {
    width: screenWidth,
    height: screenHeight,
    overflow: 'hidden', // falls doch mal was raussteht
  },
});
