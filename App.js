import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import InputButton from './src/components/InputButton';

export default function App() {
  return (
    <View className='flex-1 items-center justify-center h-screen'>
      <InputButton title='Next' onPress={(e) => {
        e.preventDefault();
        alert('Next');
      }} />
      <StatusBar style="auto" />
    </View>
  );
}
