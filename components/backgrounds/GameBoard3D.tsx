import React, { JSX, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Canvas } from '@react-three/fiber/native';
import { OrbitControls } from '@react-three/drei'; // kannst du auch weglassen
import * as THREE from 'three';
import { useGameThemeStore } from '@/lib/stores/useGameTheme';

export type BoardVariant = 'chess' | 'beerpong' | 'mensch' | 'hit8';

type Props = {
  variant: BoardVariant;
  primary: `#${string}` | string;
};

export default function GameBoard3D({ variant, primary }: Props) {
  const theme = useGameThemeStore((s) => s.color) || primary;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#ffff',
      }}
      pointerEvents='none'
    >
      <Canvas
        camera={{
          position: [0, 6.5, 9],
          fov: 75,
          near: 0.1,
          far: 1000,
        }}
      >
        {/* Lights */}
        <color attach='background' args={[theme]} />
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={theme} />
        </mesh>
      </Canvas>
    </View>
  );
}

/* -------------------- Scenes -------------------- */

// 1) Schach: Checkerboard-Material auf Plane + kleine Kante
function ChessScene({ primary }: { primary: string }) {
  const mat = useMemo(() => {
    const size = 8;
    const canvas = document?.createElement?.('canvas');
    // In RN gibt's kein DOM; nutzen Procedural Shader statt Canvas:
    // -> Einfacher: zwei farbige Materialien mit Instanzen
    return null;
  }, []);

  const size = 8;
  const squares: JSX.Element[] = [];
  const dark = new THREE.Color(primary).multiplyScalar(0.8);
  const light = new THREE.Color('#dddddd');

  const tile = 1;
  const offset = (size * tile) / 2 - tile / 2;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const isDark = (x + y) % 2 === 1;
      squares.push(
        <mesh
          key={`sq-${x}-${y}`}
          position={[x * tile - offset, 0.01, y * tile - offset]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[tile, tile]} />
          <meshStandardMaterial color={isDark ? dark : light} />
        </mesh>
      );
    }
  }

  return (
    <>
      {/* Board base */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial color={'#111'} />
      </mesh>

      {/* Tiles */}
      {squares}

      {/* dezente Umrahmung */}
      <mesh position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <boxGeometry args={[8.6, 8.6, 0.2]} />
        <meshStandardMaterial color={'#0a0a0a'} />
      </mesh>
    </>
  );
}

// 2) Beer Pong: Tisch + Becher (Zylinder) als Dreieck-Stacks
function BeerPongScene({ primary }: { primary: string }) {
  const cupColor = new THREE.Color(primary);
  const cupMat = (
    <meshStandardMaterial color={cupColor} metalness={0.1} roughness={0.6} />
  );

  const makeRack = (cx: number, cz: number, rows = 4, gap = 0.9) => {
    const items: JSX.Element[] = [];
    let idx = 0;
    for (let r = 0; r < rows; r++) {
      const count = rows - r;
      const startX = cx - (gap * (count - 1)) / 2;
      const z = cz + r * (gap * 0.95);
      for (let i = 0; i < count; i++) {
        items.push(
          <mesh
            key={`cup-${cx}-${cz}-${idx++}`}
            position={[startX + i * gap, 0.5, z]}
          >
            <cylinderGeometry args={[0.28, 0.4, 0.8, 24]} />
            {cupMat}
          </mesh>
        );
      }
    }
    return items;
  };

  return (
    <>
      {/* Table */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
        <boxGeometry args={[6, 0.2, 10]} />
        <meshStandardMaterial color={'#202020'} />
      </mesh>

      {/* Outline */}
      <mesh position={[0, 0.12, 0]}>
        <boxGeometry args={[6.02, 0.02, 10.02]} />
        <meshStandardMaterial color={'#2a2a2a'} />
      </mesh>

      {/* Mid line */}
      <mesh position={[0, 0.11, 0]}>
        <boxGeometry args={[0.02, 0.01, 9.6]} />
        <meshStandardMaterial color={'#ffffff'} />
      </mesh>

      {/* Racks */}
      {makeRack(0, -3.5)}
      {/* spiegeln */}
      <group rotation={[0, Math.PI, 0]}>{makeRack(0, -3.5)}</group>
    </>
  );
}

// 3) Mensch ärgere dich nicht: Grundplatte + Pips als kleine Zylinder/Spheres
function MenschScene({ primary }: { primary: string }) {
  const pipColor = new THREE.Color('#e5e5e5');
  const homeColor = new THREE.Color(primary);

  const pips: JSX.Element[] = [];
  // Kreuzbahn: einfache “+”-Spuren
  for (let z = -3; z <= 3; z++)
    pips.push(
      <mesh key={`v-${z}`} position={[0, 0.06, z]}>
        <cylinderGeometry args={[0.12, 0.12, 0.06, 16]} />
        <meshStandardMaterial color={pipColor} />
      </mesh>
    );
  for (let x = -3; x <= 3; x++)
    pips.push(
      <mesh key={`h-${x}`} position={[x, 0.06, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.06, 16]} />
        <meshStandardMaterial color={pipColor} />
      </mesh>
    );

  // 4 Start-Häuser (2x2 Pips)
  const house = (x: number, z: number) => (
    <group position={[x, 0.06, z]}>
      {[
        [-0.4, -0.4],
        [0.4, -0.4],
        [-0.4, 0.4],
        [0.4, 0.4],
      ].map(([dx, dz], i) => (
        <mesh key={i} position={[dx, 0, dz]}>
          <cylinderGeometry args={[0.16, 0.16, 0.06, 16]} />
          <meshStandardMaterial color={homeColor} />
        </mesh>
      ))}
    </group>
  );

  return (
    <>
      {/* Board */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial color={'#0d0f14'} />
      </mesh>

      {/* Pips */}
      {pips}

      {/* Homes */}
      {house(-2.8, -2.8)}
      {house(2.8, -2.8)}
      {house(-2.8, 2.8)}
      {house(2.8, 2.8)}
    </>
  );
}

// 4) Hit‑8: Raster + Zielkreise (Ringe)
function HitEightScene({ primary }: { primary: string }) {
  const gridColor = new THREE.Color('#2a2a2a');
  const accent = new THREE.Color(primary);

  const grid: JSX.Element[] = [];
  for (let i = -5; i <= 5; i++) {
    grid.push(
      <mesh
        key={`v-${i}`}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[i, 0.01, 0]}
      >
        <planeGeometry args={[0.02, 10]} />
        <meshStandardMaterial color={gridColor} />
      </mesh>
    );
    grid.push(
      <mesh
        key={`h-${i}`}
        rotation={[-Math.PI / 2, 0, Math.PI / 2]}
        position={[0, 0.01, i]}
      >
        <planeGeometry args={[0.02, 10]} />
        <meshStandardMaterial color={gridColor} />
      </mesh>
    );
  }

  const ring = (x: number, z: number, r = 1) => (
    <mesh position={[x, 0.05, z]} rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[r * 0.85, r, 48]} />
      <meshStandardMaterial color={accent} />
    </mesh>
  );

  return (
    <>
      {/* Base */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color={'#0a0a0a'} />
      </mesh>

      {/* Grid */}
      {grid}

      {/* Targets */}
      {ring(0, -2.5, 1.4)}
      {ring(-2.5, 2.0, 1.0)}
      {ring(2.5, 2.6, 0.8)}

      {/* Dots */}
      <mesh position={[0, 0.06, -2.5]}>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial color={accent} />
      </mesh>
      <mesh position={[-2.5, 0.06, 2.0]}>
        <sphereGeometry args={[0.14, 16, 16]} />
        <meshStandardMaterial color={accent} />
      </mesh>
      <mesh position={[2.5, 0.06, 2.6]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color={accent} />
      </mesh>
    </>
  );
}
