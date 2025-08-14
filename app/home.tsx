import React, { useCallback, useRef, useState } from 'react';
import { useGameThemeStore } from '@/lib/stores/useGameTheme';
import BoardPager from '@/components/backgrounds/BoardPager';
import { useSelectedGameNameStore } from '@/lib/stores/useGameStore';
import { games } from '@/lib/mock-data/games';

const index = () => {
  const [selectedGameId, setSelectedGameId] = useState<number | null>(null);

  const setGameTheme = useGameThemeStore((state) => state.setGameTheme);
  const setGameName = useSelectedGameNameStore((state) => state.setGameName);

  return (
    <BoardPager
      games={games as any}
      onSelected={(g) => {
        setSelectedGameId(g.id);
        setGameTheme(g.gameTheme || '#000');
        setGameName(g.title);
      }}
    />
  );
};

export default index;
