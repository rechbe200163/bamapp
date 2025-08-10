import { useGameThemeStore } from '@/lib/stores/useGameTheme';

export function useColorGradient() {
  const color = useGameThemeStore((s) => s.color);
  // calc gradient values of base color
  const gradientColors = [color];
  for (let i = 1; i <= 5; i++) {
    gradientColors.push(shadeColor(color, i * 10));
  }
  return gradientColors;
}

// Simple shadeColor implementation: darkens/lightens hex color by percent
function shadeColor(color: string, percent: number): string {
  let r = 0,
    g = 0,
    b = 0;
  if (color.length === 7 && color[0] === '#') {
    r = parseInt(color.slice(1, 3), 16);
    g = parseInt(color.slice(3, 5), 16);
    b = parseInt(color.slice(5, 7), 16);
  } else {
    return color; // fallback for unsupported formats
  }
  r = Math.min(255, Math.max(0, Math.round(r + (percent / 100) * (255 - r))));
  g = Math.min(255, Math.max(0, Math.round(g + (percent / 100) * (255 - g))));
  b = Math.min(255, Math.max(0, Math.round(b + (percent / 100) * (255 - b))));
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}
