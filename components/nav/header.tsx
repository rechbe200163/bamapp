import React, { useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { IconSymbol } from '../ui/IconSymbol.ios';
import { Battery } from '../helpers/battery';
import VersionComponent from '../helpers/versionComponent';

const Header = () => {
  // Demo: stabiler zufälliger SOC pro Mount (keine Re-Renders durch Math.random)
  const socRef = useRef(Math.floor(Math.random() * 101));
  const soc = socRef.current;

  return (
    <View style={styles.wrapper}>
      <View style={styles.leftInfo}>
        <VersionComponent version={2.7} />
        <Battery soc={soc} />
      </View>
      <IconSymbol name='qrcode.viewfinder' color='black' size={30} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 60,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftInfo: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
});
