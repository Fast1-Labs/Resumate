import { Stack } from 'expo-router';
import { View } from 'react-native';

export default function Home() {
  return (
    <View>
      <Stack.Screen options={{ title: 'Builder' }} />
    </View>
  );
}
