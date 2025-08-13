import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const VersionComponent = ({ version }: { version: number }) => {
  return (
    <View style={styles.body}>
      <Text>v. {version}</Text>
    </View>
  );
};

export default VersionComponent;

const styles = StyleSheet.create({
  body: {
    borderWidth: 1,
    borderColor: '#000',
    overflow: 'hidden',
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
  },
});
