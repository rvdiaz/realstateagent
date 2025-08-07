import { Stack } from 'expo-router';

export default function ProfileLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="account-settings" />
      <Stack.Screen name="notifications" />
      <Stack.Screen name="privacy-security" />
      <Stack.Screen name="help-support" />
    </Stack>
  );
}