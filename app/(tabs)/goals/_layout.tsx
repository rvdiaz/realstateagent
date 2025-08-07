import { Stack } from 'expo-router';

export default function GoalsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="add-goal" />
      <Stack.Screen name="goal-details" />
    </Stack>
  );
}