import React, { useMemo } from 'react';
import { View, StyleSheet, StyleProp, ViewStyle, Text } from 'react-native';

export type BatteryProps = {
  soc: number; // 0–100
  style?: StyleProp<ViewStyle>; // extra Container Styles
  size?: number; // Höhe in px (Breite wird automatisch berechnet)
  colorHigh?: string;
  colorMid?: string;
  colorLow?: string;
  colorDrained?: string;
};

const clamp = (n: number, min = 0, max = 100) =>
  Math.min(max, Math.max(min, n));

export const Battery: React.FC<BatteryProps> = ({
  soc,
  style,
  size = 20,
  colorHigh = '#4caf50',
  colorMid = '#ffeb3b',
  colorLow = '#ff9800',
  colorDrained = '#f44336',
}) => {
  const normalized = clamp(soc);

  const fillColor = useMemo(() => {
    if (normalized >= 81) return colorHigh;
    if (normalized >= 41) return colorMid;
    if (normalized >= 21) return colorLow;
    return colorDrained;
  }, [normalized, colorHigh, colorMid, colorLow, colorDrained]);

  // Größenberechnung
  const bodyHeight = size;
  const bodyWidth = size * 2; // Breite doppelt so groß wie Höhe
  const capHeight = size * 0.2;
  const capWidth = size * 0.1;

  return (
    <View style={[{ flexDirection: 'row', alignItems: 'center' }, style]}>
      {/* Battery body */}
      <View
        style={[
          styles.body,
          { width: bodyWidth, height: bodyHeight, borderRadius: size * 0.15 },
        ]}
      >
        {/* Fill bar */}

        <View
          style={{
            backgroundColor: fillColor,
            width: `${normalized}%`,
            height: '100%',
            borderRadius: size * 0.1,
          }}
        />

        {/* Centered overlay text */}
        <View style={StyleSheet.absoluteFillObject}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ fontWeight: '600' }}>{normalized}%</Text>
          </View>
        </View>
      </View>

      {/* Battery cap */}
      <View
        style={{
          width: capWidth,
          height: capHeight,
          backgroundColor: '#000',
          marginLeft: 2,
          borderRadius: size * 0.05,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    borderWidth: 1,
    borderColor: '#000',
    overflow: 'hidden',
    backgroundColor: '#e0e0e0',
  },
});
