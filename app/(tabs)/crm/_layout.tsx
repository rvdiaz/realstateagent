import { Stack } from 'expo-router';

export default function CRMLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="add-client" />
      <Stack.Screen name="client-details" />
      <Stack.Screen name="pipeline" />
      <Stack.Screen name="reports" />
    </Stack>
  );
}