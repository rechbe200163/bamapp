import {
  Pressable,
  StyleProp,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import React from 'react';
import { cn } from '@/lib/utils/utils';
import { StyleSheet } from 'react-native';

interface ButtonProps {
  title: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
}

const CustomButton = ({
  title,
  onPress,
  style,
  disabled = true,
}: ButtonProps) => {
  console.log({ style });
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[styles.button, disabled && styles.buttonDisabled, style]}
    >
      <Text style={styles.textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    minWidth: 200,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 32,
    elevation: 8,
  },
  buttonDisabled: {
    opacity: 0.5,
    elevation: 0,
  },
  buttonPressed: {
    transform: [{ scale: 0.95 }],
  },
  textStyle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
