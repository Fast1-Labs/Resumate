import { useUser } from '@clerk/clerk-expo';
import { Redirect } from 'expo-router';
import { Text, View } from 'react-native';

export default function Page() {
  const { isSignedIn } = useUser();

  if (!isSignedIn) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  return (
    <View className="flex-1 items-center justify-center">
      <Text>Hello</Text>
    </View>
  );
}
