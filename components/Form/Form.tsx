import { View, TextInput, StyleSheet, Button, Text } from "react-native";
import { Formik } from "formik";
import { Picker } from "@react-native-picker/picker";
import { useStore } from "@/stores/Store";
import { itemSchema } from "@/schemas/ItemSchema";
import { withZodSchema } from "formik-validator-zod";

export const Form = () => {
  const { addStoreItem } = useStore();
  const handleAddItem = async ({ name, brand, type, count }) => {
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
    <Formik
      initialValues={{
        name: "",
        brand: "",
        type: "Type 1",
        count: "",
      }}
      //   validate={withZodSchema(itemSchema)}
      onSubmit={(values) => {
        handleAddItem(values);
      }}
    >
      {({ handleChange, values, errors, touched, handleSubmit }) => (
        <View>
          <TextInput
            style={styles.input}
            placeholder="Nazwa"
            value={values.name}
            onChangeText={handleChange("name")}
          />
          <TextInput
            style={styles.input}
            placeholder="Marka"
            value={values.brand}
            onChangeText={handleChange("brand")}
          />
          <Picker
            selectedValue={values.type}
            style={styles.input}
            onValueChange={handleChange("type")}
          >
            <Picker.Item label="Type 1" value="type 1" />
            <Picker.Item label="Type 2" value="type 2" />
          </Picker>
          <TextInput
            style={styles.input}
            placeholder="Liczba sztuk"
            value={values.count}
            keyboardType="numeric"
            onChangeText={handleChange("count")}
          />
          <Button title="Dodaj produkt" onPress={handleSubmit} />
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
});
