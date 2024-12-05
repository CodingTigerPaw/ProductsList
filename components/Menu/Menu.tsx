import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";

export const Menu = () => {
  return (
    <View style={styles.menu}>
      <Link href="/">
        <View style={styles.button}>
          <Text>Home</Text>
        </View>
      </Link>

      <Link href="/form">
        <View style={styles.button}>
          <Text>Form</Text>
        </View>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  menu: {
    backgroundColor: "#A1A1A1",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {
    padding: 20,
    backgroundColor: "#fff",
  },
});
