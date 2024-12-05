import Menu from "@/components/Menu";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
      <Menu />
    </>
  );
}
