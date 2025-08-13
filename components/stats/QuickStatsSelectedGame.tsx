import { View, Text, StyleSheet, FlatList } from 'react-native';
import React from 'react';
import { useGameThemeStore } from '@/lib/stores/useGameTheme';

type QuickStatsSelectedGameProps = { gameId: number | null };

interface GameQuickStats {
  gameId: number;
  [key: string]: string | number;
}

const quickGameQuickStatsData: GameQuickStats[] = [
  {
    gameId: 1,
    lastPlayed: '2024-06-01',
    totalGames: 10,
    minMoves: 30,
  },
  {
    gameId: 2,
    lastPlayed: '2024-06-03',
    totalGames: 8,
    highScore: 7,
  },
  {
    gameId: 3,
    lastPlayed: '2024-06-05',
    totalGames: 15,
    highScore: 3200,
  },
  {
    gameId: 4,
    lastPlayed: '2024-06-07',
    totalGames: 5,
    mostWins: 'Red',
  },
];

const getGameStateByGameId = (gameId: number) => {
  const gameStates = quickGameQuickStatsData.find(
    (game) => game.gameId == gameId
  );
  return gameStates;
};

const formatData = (data: GameQuickStats): Record<string, string | number> => {
  return {
    ...data,
    lastPlayed: new Date(data.lastPlayed as string).toLocaleDateString(),
  };
};

const QuickStatsSelectedGame = ({ gameId }: QuickStatsSelectedGameProps) => {
  const gameTheme = useGameThemeStore((s) => s.color);
  if (!gameId) return null;

  const gameStates = formatData(getGameStateByGameId(gameId)!);

  const headers = Object.keys(gameStates || {}).filter(
    (header) => header !== 'gameId'
  );

  return (
    <View style={styles.wrapper}>
      {headers.map((item, idx) => (
        <View style={[styles.card, { borderColor: gameTheme }]} key={idx}>
          <Text style={styles.header}>{item}</Text>
          <Text style={styles.value}>{gameStates![item]}</Text>
        </View>
      ))}
    </View>
  );
};

export default QuickStatsSelectedGame;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  listContent: {
    gap: 12,
  },
  card: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 16,
    minWidth: 110,
    alignItems: 'center',
  },
  header: {
    fontSize: 12,
    opacity: 0.7,
    marginBottom: 4,
  },
  value: {
    fontSize: 18,
    fontWeight: '600',
  },
});
