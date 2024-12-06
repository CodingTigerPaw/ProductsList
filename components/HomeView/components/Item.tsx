import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useStore } from "@/stores/Store";
import { styles } from "./styles";
import { Link } from "expo-router";

export const Item = ({ item }) => {
  const { removeStoreItem } = useStore();
  return (
    <View style={styles.item}>
      <View style={styles.itemDetails}>
        <Text style={styles.itemTitle}>{item.name}</Text>
        <Text>Marka: {item.brand}</Text>
        <Text>Typ: {item.type}</Text>
        <TouchableOpacity>
          <Text>+</Text>
        </TouchableOpacity>
        <Text>Liczba sztuk: {item.count}</Text>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => removeStoreItem(item.id)}
      >
        <Text style={styles.deleteButtonText}>Usuń</Text>
      </TouchableOpacity>
      <Link
        href={{
          pathname: "/modal",
          params: {
            id: item.id,
            name: item.name,
            brand: item.brand,
            type: item.type,
            count: item.count,
          },
        }}
      >
        <View style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>Edytuj</Text>
        </View>
      </Link>
    </View>
  );
};
