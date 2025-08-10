import { View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import GamesCarousel from '@/components/games/GamesCarousel';
import Button from '@/components/helpers/button';
import { useGameThemeStore } from '@/lib/stores/useGameTheme';
const index = () => {
  const gameTheme = useGameThemeStore((state) => state.color);
  return (
    <SafeAreaView className='flex-1 dark:bg-gray-900 bg-white'>
      <View className='flex-1 justify-center items-center'>
        <GamesCarousel />
        <Button
          title='Play Now'
          onPress={() => {
            console.log('Play Now pressed');
          }}
          style={{ backgroundColor: gameTheme }}
        />
      </View>
    </SafeAreaView>
  );
};

export default index;
