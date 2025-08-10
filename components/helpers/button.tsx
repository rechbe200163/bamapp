import { StyleProp, Text, TouchableOpacity, ViewStyle } from 'react-native';
import React from 'react';

interface ButtonProps {
  title: string;
  className?: string; // Button-Styles
  textClassName?: string; // Text-Styles separat
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
}

const Button = ({
  title,
  onPress,
  style,
  className = 'p-2 rounded-2xl',
  textClassName = 'text-white text-lg font-semibold',
}: ButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} className={className} style={style}>
      <Text className={textClassName}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
