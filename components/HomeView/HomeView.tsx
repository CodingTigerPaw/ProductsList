import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  TextInput,
  Button,
  FlatList,
  Text,
  View,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Item } from "./components/Item";

import { useStore } from "@/stores/Store";
import { Link } from "expo-router";
const HomeView = () => {
  const [item, setItem] = useState({
    name: "",
    brand: "",
    type: "Type 1",
    count: "",
  });

  const { setStore, itemsStore, addStoreItem } = useStore(); // Obiekt przechowujący dane pojedynczego produktu

  // Odczyt danych przy pierwszym uruchomieniu
  useEffect(() => {
    const fetchItems = () => {
      try {
        setStore();
      } catch (e) {
        console.error(e.message);
      }
    };
    fetchItems();
  }, []);

  const handleChange = (key, value) => {
    setItem((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  // Dodawanie nowego elementu
  const handleAddItem = async () => {
    const { name, brand, type, count } = item;

    const newItem = {
      id: Date.now().toString(),
      name,
      brand,
      type,
      count,
    };
    try {
      addStoreItem(newItem);
    } catch (e) {
      console.error(e.message);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Zarządzanie produktami</Text>
      <TextInput
        style={styles.input}
        placeholder="Nazwa"
        value={item.name}
        onChangeText={(value) => handleChange("name", value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Marka"
        value={item.brand}
        onChangeText={(value) => handleChange("brand", value)}
      />
      <Picker
        selectedValue={item.type}
        style={styles.input}
        onValueChange={(value) => handleChange("type", value)}
      >
        <Picker.Item label="Type 1" value="type 1" />
        <Picker.Item label="Type 2" value="type 2" />
      </Picker>
      <TextInput
        style={styles.input}
        placeholder="Liczba sztuk"
        value={item.count}
        keyboardType="numeric"
        onChangeText={(value) => handleChange("count", value)}
      />
      <Button title="Dodaj produkt" onPress={handleAddItem} />
      <Link href="/form">link</Link>
      <FlatList
        data={itemsStore}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Item item={item} />}
        style={styles.list}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  list: {
    marginTop: 20,
  },
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

export default HomeView;
