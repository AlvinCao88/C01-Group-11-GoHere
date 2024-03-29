import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getGlobalWashroom } from './GlobalWashroomContext';

const BackButton = ({ text = 'Back', styleButton = {}, styleText = {} }) => {
  const navigation = useNavigation();
  const { setWashroom } = getGlobalWashroom();

  const handleBackPress = () => {
    setWashroom(null); 
    navigation.goBack(); 
  };

  return (
    <TouchableOpacity onPress={handleBackPress} style={styleButton}>
      <Text style={styleText}>{text}</Text>
    </TouchableOpacity>
  );
};

export default BackButton;
