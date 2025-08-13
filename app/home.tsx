import { View, Text, StyleSheet } from 'react-native';
import React, { useCallback, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import GamesCarousel from '@/components/games/GamesCarousel';
import CustomButton from '@/components/helpers/button';
import { useGameThemeStore } from '@/lib/stores/useGameTheme';
import QuickStatsSelectedGame from '@/components/stats/QuickStatsSelectedGame';
import Header from '@/components/nav/header';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Link, useRouter } from 'expo-router';

const index = () => {
  const router = useRouter();
  const gameTheme = useGameThemeStore((state) => state.color);
  const [dataFromChild, setDataFromChild] = useState<number | null>(null);

  function handleDataFromChild(data: number) {
    setDataFromChild(data);
  }

  return <GamesCarousel sendDataToParent={handleDataFromChild} />;
};

export default index;
