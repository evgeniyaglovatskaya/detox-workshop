import React from 'react';
import { View, Text, Alert, TouchableOpacity } from 'react-native';
import Styles from '../Styles';

const YellowButton = () => {
    return (
        <View style={Styles.buttonContainer}>
            <TouchableOpacity testID='ButtonID'>
                <Text style={Styles.buttonText} onPress={() => Alert.alert('Button pressed')}>
                    Tap on me
                </Text>
            </TouchableOpacity>
        </View >);
};
export default YellowButton;