import React, { useMemo, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  runOnJS,
} from 'react-native-reanimated';
import GameBoard3D, { BoardVariant } from './GameBoard3D';

type Game = {
  id: number;
  title: string;
  type: BoardVariant;
  gameTheme?: string;
};
type Props = {
  games: Game[];
  onSelected: (g: Game) => void;
};

export default function BoardPager({ games, onSelected }: Props) {
  const [index, setIndex] = useState(0);
  const x = useSharedValue(0);

  const current = games[index];

  const onSwipe = (dir: 1 | -1) => {
    const next = Math.min(games.length - 1, Math.max(0, index + dir));
    if (next !== index) {
      setIndex(next);
      onSelected(games[next]);
    }
  };

  const gh = useAnimatedGestureHandler({
    onActive: (e) => {
      x.value = e.translationX;
    },
    onEnd: (e) => {
      const threshold = 60;
      if (e.translationX > threshold) runOnJS(onSwipe)(-1);
      else if (e.translationX < -threshold) runOnJS(onSwipe)(1);
      x.value = 0;
    },
  });

  return (
    <GameBoard3D
      variant={current.type}
      primary={(current.gameTheme as any) || '#6b7280'}
    />
  );
}
