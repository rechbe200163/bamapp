import { Image } from 'expo-image';

export interface Variant {
  id: number;
  title: string;
  rules: string;
  scoreSystem: string;
}

export interface Game {
  id: number;
  title: string;
  description: string;
  mode: string;
  minPlayers: number;
  maxPlayers: number;
  imagePath: string;
  rules?: string;
  scoreSystem?: string;
  gameTheme?: string;
  variants?: Variant[];
} // lib/types.ts
export type GameType = 'chess' | 'beerpong' | 'mensch' | 'hit8';
export interface Game {
  id: number;
  title: string;
  description: string;
  imagePath: string; // kannst du künftig entfernen, wenn du keine Bilder mehr brauchst
  gameTheme?: string;
  type?: GameType;
}

export type Color = `#${string}`;

export const gameImages: Record<string, any> = {
  'chess.jpg': require('@/assets/images/games/chess.jpg'),
  'hit-8.jpg': require('@/assets/images/games/hit-8.jpg'),
  'beer-pong.jpg': require('@/assets/images/games/beer-pong.jpg'),
  'mensch-aergere-dich-nicht.jpg': require('@/assets/images/games/mensch-aerger-dich-nicht.jpg'),
};
