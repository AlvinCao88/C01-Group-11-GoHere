import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BackButton = ({ text = 'Back', styleButton = {}, styleText = {} }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.goBack()} style={styleButton}>
      <Text style={styleText}>{text}</Text>
    </TouchableOpacity>
  );
};

export default BackButton;
