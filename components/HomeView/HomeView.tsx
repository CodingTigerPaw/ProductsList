import React, { useEffect } from "react";
import { SafeAreaView, FlatList, Text, StyleSheet } from "react-native";
import { Item } from "./components/Item";
import { useStore } from "@/stores/Store";
import { Form } from "../Form";
import { styles } from "./styles";
const HomeView = () => {
  const { setStore, itemsStore } = useStore();

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
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Zarządzanie produktami</Text>
      <Form />
      <FlatList
        data={itemsStore}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Item item={item} />}
        style={styles.list}
      />
    </SafeAreaView>
  );
};

export default HomeView;
