import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  TextInput,
  Button,
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Item } from "./Item";

import { saveData, loadData } from "../utils/Storage";

const HomeView = () => {
  const [items, setItems] = useState([]); // Tablica obiektów
  const [item, setItem] = useState({
    name: "",
    brand: "",
    type: "Type 1",
    count: "",
  }); // Obiekt przechowujący dane pojedynczego produktu

  const STORAGE_KEY = "itemsList";

  // Odczyt danych przy pierwszym uruchomieniu
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const storedItems = await loadData(STORAGE_KEY);
        setItems(storedItems);
      } catch (e) {
        console.error(e.message);
      }
    };

    fetchItems();
  }, []);

  // Obsługa zmiany wartości w obiekcie diaper
  const handleChange = (key, value) => {
    setItem((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  // Dodawanie nowego elementu
  const handleAddItem = async () => {
    const { name, brand, type, count } = item;

    if (
      name.trim() === "" ||
      brand.trim() === "" ||
      count.trim() === "" ||
      isNaN(count)
    ) {
      alert("Proszę wypełnić wszystkie pola poprawnie.");
      return;
    }

    const newItem = {
      id: Date.now().toString(),
      name,
      brand,
      type,
      count: parseInt(count, 10),
    };

    const updatedItems = [...items, newItem];

    try {
      await saveData(STORAGE_KEY, updatedItems);
      setItems(updatedItems);
      setItem({ name: "", brand: "", type: "Medical", count: "" });
    } catch (e) {
      console.error(e.message);
    }
  };

  // Usuwanie elementu
  const handleDeleteItem = async (id) => {
    const updatedItems = items.filter((item) => item.id !== id);

    try {
      await saveData(STORAGE_KEY, updatedItems);
      setItems(updatedItems);
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
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Item item={item} handleDeleteItem={handleDeleteItem} />
        )}
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
