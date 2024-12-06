import { Link, useLocalSearchParams } from "expo-router";
import { Form } from "@/components/Form";
import { View, Text } from "react-native";

export const Modal = () => {
  const params = useLocalSearchParams();

  return (
    <View>
      <Form item={params} />
      <Link href="../">Back</Link>
    </View>
  );
};
