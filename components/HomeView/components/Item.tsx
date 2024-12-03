import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useStore } from "@/stores/Store";

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
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#e6e6e6",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemDetails: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  deleteButton: {
    backgroundColor: "#ff5252",
    padding: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
