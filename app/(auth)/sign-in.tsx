import { useSignIn } from '@clerk/clerk-expo';
import { Link, useRouter } from 'expo-router';
import React from 'react';
import { Text, TextInput, Pressable, View } from 'react-native';

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState('');
  const [password, setPassword] = React.useState('');

  // Handle the submission of the sign-in form
  const onSignInPress = React.useCallback(async () => {
    if (!isLoaded) return;

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace('/');
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  }, [isLoaded, emailAddress, password]);

  return (
    <View className="flex-1 justify-center bg-gray-100 p-8">
      {/* Header */}
      <View className="mb-10">
        <Text className="text-center text-2xl font-bold text-gray-800">Welcome Back</Text>
        <Text className="text-center text-gray-600">Sign in to your account to continue</Text>
      </View>

      {/* Form */}
      <View className="gap-5 space-y-6">
        {/* Email Input */}
        <View className="flex-row items-center rounded-lg border bg-white px-4 py-3 shadow-sm">
          <Text className="w-24 font-medium text-gray-700">Email:</Text>
          <TextInput
            className="flex-1 text-gray-800"
            autoCapitalize="none"
            value={emailAddress}
            placeholder="Enter email"
            onChangeText={setEmailAddress}
            placeholderTextColor="gray"
          />
        </View>

        {/* Password Input */}
        <View className="flex-row items-center rounded-lg border bg-white px-4 py-3 shadow-sm">
          <Text className="w-24 font-medium text-gray-700">Password:</Text>
          <TextInput
            className="flex-1 text-gray-800"
            value={password}
            placeholder="Enter password"
            secureTextEntry
            onChangeText={setPassword}
            placeholderTextColor="gray"
          />
        </View>
      </View>

      {/* Sign-in Button */}
      <Pressable onPress={onSignInPress} className="mt-8 rounded-lg bg-blue-600 py-4">
        <Text className="text-center text-lg font-medium text-white">Sign In</Text>
      </Pressable>

      {/* Sign-up Link */}
      <View className="mt-6 items-center">
        <Text className="text-gray-600">Don't have an account?</Text>
        <Link href="/sign-up">
          <Text className="text-lg font-medium text-blue-600">Sign up</Text>
        </Link>
      </View>
    </View>
  );
}
