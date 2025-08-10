import { games } from '@/lib/mock-data/games';
import { Game } from '@/lib/types';
import { ImageBackground } from 'expo-image';
import * as React from 'react';
import { View, Text, Dimensions, Platform } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';
import { useHaptic } from '@/hooks/useHaptic';
import { useGameThemeStore } from '@/lib/stores/useGameTheme';

const { width: screenWidth } = Dimensions.get('window');
function GamesCarousel() {
  const scrollOffsetValue = useSharedValue<number>(0);
  const hapticSelection = useHaptic('success');
  const setGameTheme = useGameThemeStore((state) => state.setGameTheme);

  const gameImages: Record<string, any> = {
    'chess.jpg': require('@/assets/images/games/chess.jpg'),
    'hit-8.jpg': require('@/assets/images/games/hit-8.jpg'),
    'beer-pong.jpg': require('@/assets/images/games/beer-pong.jpg'),
    'mensch-aergere-dich-nicht.jpg': require('@/assets/images/games/mensch-aerger-dich-nicht.jpg'),
  };

  return (
    <View id='carousel-component'>
      <Carousel
        testID={'xxx'}
        loop={true}
        width={screenWidth}
        autoPlay={false}
        autoPlayInterval={2000}
        height={400}
        snapEnabled={true}
        pagingEnabled={true}
        data={games}
        defaultScrollOffsetValue={scrollOffsetValue}
        // withAnimation={{
        //   type: 'spring',
        //   config: { damping: 15, stiffness: 200 },
        // }}
        mode='parallax'
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
          parallaxAdjacentItemScale: 0.75,
        }}
        onScrollStart={() => {
          console.log('Scroll start');
        }}
        onScrollEnd={(index: number) => {
          console.log('Scroll end');
        }}
        onSnapToItem={(index: number) => {
          setGameTheme(games[index].gameTheme || '#000000');
          console.log('Game theme set to:', games[index].gameTheme);
          console.log('current index:', games[index].imagePath);
          if (Platform.OS !== 'web') {
            if (hapticSelection) {
              hapticSelection();
            }
          }
        }}
        renderItem={({ item }: { item: Game }) => (
          <View
            className='w-[400px] h-[250px] items-center justify-center'
            style={{ borderRadius: 20, overflow: 'hidden' }}
          >
            <ImageBackground
              source={gameImages[item.imagePath]}
              style={{ height: '100%', width: '100%' }}
              className='justify-center items-center '
            >
              <View className='flex-1 items-center justify-center'>
                <Text className='text-3xl font-bold text-white text-center'>
                  {item.description}
                </Text>
              </View>
            </ImageBackground>
          </View>
        )}
      />
    </View>
  );
}

export default GamesCarousel;
