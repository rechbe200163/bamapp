import { games } from '@/lib/mock-data/games';
import { Game } from '@/lib/types';
import { ImageBackground } from 'expo-image';
import * as React from 'react';
import {
  View,
  Text,
  Dimensions,
  Platform,
  useWindowDimensions,
  StyleSheet,
} from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';
import { useHaptic } from '@/hooks/useHaptic';
import { useGameThemeStore } from '@/lib/stores/useGameTheme';
import { useEffect, useState } from 'react';
import { useSelectedGameNameStore } from '@/lib/stores/useGameStore';
import { ScreenStackHeaderBackButtonImage } from 'react-native-screens';

type GamesCarouselProps = {
  sendDataToParent: (gameId: number) => void;
};

function GamesCarousel({ sendDataToParent }: GamesCarouselProps) {
  const scrollOffsetValue = useSharedValue<number>(0);
  const { width, height } = useWindowDimensions();
  const hapticSelection = useHaptic('success');
  const setGameTheme = useGameThemeStore((state) => state.setGameTheme);
  const setGameName = useSelectedGameNameStore((state) => state.setGameName);

  const gameImages: Record<string, any> = {
    'chess.jpg': require('@/assets/images/games/chess.jpg'),
    'hit-8.jpg': require('@/assets/images/games/hit-8.jpg'),
    'beer-pong.jpg': require('@/assets/images/games/beer-pong.jpg'),
    'mensch-aergere-dich-nicht.jpg': require('@/assets/images/games/mensch-aerger-dich-nicht.jpg'),
  };

  useEffect(() => {
    // Initial: erstes Spiel setzen
    if (games.length > 0) {
      sendDataToParent(games[0].id);
      setGameTheme(games[0].gameTheme || '#000000');
      setGameName(games[0].title || '');
    }
  }, []);

  return (
    <View id='carousel-component'>
      <Carousel
        testID={'xxx'}
        loop={true}
        width={width}
        autoPlay={false}
        height={height}
        snapEnabled={true}
        pagingEnabled={true}
        data={games}
        defaultScrollOffsetValue={scrollOffsetValue}
        withAnimation={{
          type: 'spring',
          config: { damping: 15, stiffness: 200 },
        }}
        onSnapToItem={(index: number) => {
          setGameTheme(games[index].gameTheme || '#000000');
          setGameName(games[index].title || '');
          sendDataToParent(games[index].id);
          if (Platform.OS !== 'web') {
            if (hapticSelection) {
              hapticSelection();
            }
          }
        }}
        renderItem={({ item }: { item: Game }) => (
          <View>
            <ImageBackground
              source={gameImages[item.imagePath]}
              style={styles.carouselImage}
            >
              <Text style={styles.carouselText}>{item.title}</Text>
              <Text style={styles.carouselDescription}>{item.description}</Text>
            </ImageBackground>
          </View>
        )}
      />
    </View>
  );
}

export default GamesCarousel;

const styles = StyleSheet.create({
  carouselContainer: {
    flex: 1,
  },
  carouselItem: {
    height: '100%',
    width: '100%',
  },
  carouselImage: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  carouselText: {
    color: 'white',
    padding: 20,
    fontSize: 32,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  carouselDescription: {
    color: 'white',
    padding: 20,
    fontSize: 20,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
});
