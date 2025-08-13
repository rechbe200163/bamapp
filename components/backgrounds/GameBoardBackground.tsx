import React, { JSX } from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, {
  Defs,
  LinearGradient,
  Stop,
  Rect,
  Line,
  Circle,
  G,
} from 'react-native-svg';
import { useWindowDimensions } from 'react-native';

// ---------- helpers ----------
const hexToRGBA = (hex: string, alpha = 1) => {
  const h = hex.replace('#', '');
  const bigint = parseInt(
    h.length === 3
      ? h
          .split('')
          .map((c) => c + c)
          .join('')
      : h,
    16
  );
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r},${g},${b},${alpha})`;
};

export type BoardVariant = 'chess' | 'beerpong' | 'mensch' | 'hit8';

type Props = {
  variant: BoardVariant;
  primary: `#${string}` | string;
};

// ---------- individual boards (same as before, shortened here) ----------
const ChessBoard = ({ primary }: { primary: string }) => {
  const dark = hexToRGBA(primary, 0.75);
  const light = hexToRGBA('#ffffff', 0.35);
  const size = 8;
  const S = 100;
  const cell = S / size;

  const squares = [];
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const isDark = (x + y) % 2 === 1;
      squares.push(
        <Rect
          key={`sq-${x}-${y}`}
          x={x * cell}
          y={y * cell}
          width={cell}
          height={cell}
          fill={isDark ? dark : light}
        />
      );
    }
  }

  return (
    <Svg
      viewBox='0 0 100 100'
      preserveAspectRatio='xMidYMid slice'
      style={StyleSheet.absoluteFill}
    >
      <Defs>
        <LinearGradient id='bg' x1='0' y1='0' x2='0' y2='1'>
          <Stop offset='0%' stopColor={hexToRGBA(primary, 0.35)} />
          <Stop offset='100%' stopColor={hexToRGBA('#000', 0.25)} />
        </LinearGradient>
      </Defs>
      <Rect x={0} y={0} width={100} height={100} fill='url(#bg)' />
      {squares}
      <G opacity={0.08}>
        {Array.from({ length: size + 1 }).map((_, i) => (
          <Line
            key={`v-${i}`}
            x1={i * cell}
            y1={0}
            x2={i * cell}
            y2={100}
            stroke='#000'
            strokeWidth={0.25}
          />
        ))}
        {Array.from({ length: size + 1 }).map((_, i) => (
          <Line
            key={`h-${i}`}
            x1={0}
            y1={i * cell}
            x2={100}
            y2={i * cell}
            stroke='#000'
            strokeWidth={0.25}
          />
        ))}
      </G>
    </Svg>
  );
};

const BeerPongBoard = ({ primary }: { primary: string }) => {
  const table = hexToRGBA('#0a0a0a', 0.6);
  const line = hexToRGBA('#ffffff', 0.2);
  const cup = primary;
  const cupStroke = hexToRGBA('#000', 0.25);

  const triangle = (cx: number, cy: number, gap = 4, rows = 4) => {
    const circles: JSX.Element[] = [];
    let idx = 0;
    for (let r = 0; r < rows; r++) {
      const count = rows - r;
      const startX = cx - (gap * (count - 1)) / 2;
      const y = cy + r * (gap * 0.9);
      for (let i = 0; i < count; i++) {
        circles.push(
          <Circle
            key={`cup-${idx++}`}
            cx={startX + i * gap}
            cy={y}
            r={1.8}
            fill={cup}
            stroke={cupStroke}
            strokeWidth={0.4}
          />
        );
      }
    }
    return circles;
  };

  return (
    <Svg
      viewBox='0 0 100 100'
      preserveAspectRatio='xMidYMid slice'
      style={StyleSheet.absoluteFill}
    >
      <Rect x={0} y={0} width={100} height={100} fill={table} />
      <Line x1={50} y1={5} x2={50} y2={95} stroke={line} strokeWidth={0.4} />
      <Rect
        x={5}
        y={5}
        width={90}
        height={90}
        stroke={line}
        strokeWidth={0.6}
        fill='none'
        rx={2}
      />
      <G transform='translate(50,18)'>{triangle(0, 0)}</G>
      <G transform='translate(50,82) rotate(180)'>{triangle(0, 0)}</G>
    </Svg>
  );
};

const MenschBoard = ({ primary }: { primary: string }) => {
  const track = hexToRGBA('#fff', 0.4);
  const home = primary;
  const dot = hexToRGBA('#000', 0.35);

  const homeBlock = (x: number, y: number) => (
    <G key={`home-${x}-${y}`}>
      <Rect
        x={x}
        y={y}
        width={14}
        height={14}
        rx={2}
        fill={hexToRGBA(home, 0.35)}
      />
      <Circle cx={x + 4.5} cy={y + 4.5} r={2.2} fill={home} />
      <Circle cx={x + 9.5} cy={y + 4.5} r={2.2} fill={home} />
      <Circle cx={x + 4.5} cy={y + 9.5} r={2.2} fill={home} />
      <Circle cx={x + 9.5} cy={y + 9.5} r={2.2} fill={home} />
    </G>
  );

  const pathDots = () => {
    const dots: JSX.Element[] = [];
    for (let y = 15; y <= 85; y += 7)
      dots.push(<Circle key={`v-${y}`} cx={50} cy={y} r={1.6} fill={track} />);
    for (let x = 15; x <= 85; x += 7)
      dots.push(<Circle key={`h-${x}`} cx={x} cy={50} r={1.6} fill={track} />);
    for (let i = 0; i < 5; i++)
      dots.push(
        <Circle
          key={`t-${i}`}
          cx={50}
          cy={30 + i * 4}
          r={1.2}
          fill={dot}
          opacity={0.35}
        />
      );
    return dots;
  };

  return (
    <Svg
      viewBox='0 0 100 100'
      preserveAspectRatio='xMidYMid slice'
      style={StyleSheet.absoluteFill}
    >
      <Defs>
        <LinearGradient id='mensch-bg' x1='0' y1='0' x2='1' y2='1'>
          <Stop offset='0%' stopColor={hexToRGBA(primary, 0.2)} />
          <Stop offset='100%' stopColor={hexToRGBA('#111', 0.3)} />
        </LinearGradient>
      </Defs>
      <Rect x={0} y={0} width={100} height={100} fill='url(#mensch-bg)' />
      {pathDots()}
      {homeBlock(12, 12)}
      {homeBlock(74, 12)}
      {homeBlock(12, 74)}
      {homeBlock(74, 74)}
    </Svg>
  );
};

const HitEightBoard = ({ primary }: { primary: string }) => {
  const grid = hexToRGBA('#ffffff', 0.08);
  const accent = primary;
  const lines = [];
  for (let i = 0; i <= 20; i++) {
    const p = (i * 100) / 20;
    lines.push(
      <Line
        key={`v-${i}`}
        x1={p}
        y1={0}
        x2={p}
        y2={100}
        stroke={grid}
        strokeWidth={0.3}
      />
    );
    lines.push(
      <Line
        key={`h-${i}`}
        x1={0}
        y1={p}
        x2={100}
        y2={p}
        stroke={grid}
        strokeWidth={0.3}
      />
    );
  }

  return (
    <Svg
      viewBox='0 0 100 100'
      preserveAspectRatio='xMidYMid slice'
      style={StyleSheet.absoluteFill}
    >
      <Rect
        x={0}
        y={0}
        width={100}
        height={100}
        fill={hexToRGBA('#000', 0.5)}
      />
      {lines}
      <G opacity={0.85}>
        <Circle
          cx={50}
          cy={30}
          r={10}
          fill='none'
          stroke={accent}
          strokeWidth={1.6}
        />
        <Circle
          cx={25}
          cy={65}
          r={8}
          fill='none'
          stroke={accent}
          strokeWidth={1.2}
        />
        <Circle
          cx={75}
          cy={70}
          r={6}
          fill='none'
          stroke={accent}
          strokeWidth={1.2}
        />
        <Circle cx={50} cy={30} r={3} fill={accent} />
        <Circle cx={25} cy={65} r={2.4} fill={accent} />
        <Circle cx={75} cy={70} r={2.2} fill={accent} />
      </G>
    </Svg>
  );
};

// ---------- master ----------
const GameBoardBackground: React.FC<Props> = ({ variant, primary }) => {
  const { width, height } = useWindowDimensions();
  return (
    <View style={[StyleSheet.absoluteFill, { width, height }]}>
      {/* Jede Board-Komponente hat: style={StyleSheet.absoluteFill} am <Svg> */}
      {variant === 'chess' && <ChessBoard primary={primary} />}
      {variant === 'beerpong' && <BeerPongBoard primary={primary} />}
      {variant === 'mensch' && <MenschBoard primary={primary} />}
      {variant === 'hit8' && <HitEightBoard primary={primary} />}
    </View>
  );
};

export default GameBoardBackground;
