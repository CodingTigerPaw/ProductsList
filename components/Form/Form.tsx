import { View, TextInput, StyleSheet, Button, Text } from "react-native";
import { Formik } from "formik";
import { Picker } from "@react-native-picker/picker";
import { useStore } from "@/stores/Store";
import { itemSchema } from "@/schemas/ItemSchema";
import { withZodSchema } from "formik-validator-zod";
import { styles } from "./styles";
import { useRouter } from "expo-router";
type itemType = {
  name: string;
  brand: string;
  type: string;
  count: number;
};

export const Form = ({ item }) => {
  const { addStoreItem, patchStoreItem } = useStore();
  const router = useRouter();

  const parseAndHandleChange = (
    value: string,
    setFieldValue: any,
    id: string
  ) => {
    const parsed = isNaN(parseInt(value, 10)) ? "" : parseInt(value, 10);
    setFieldValue(id, parsed);
  };

  const handleAddItem = async ({ name, brand, type, count }: itemType) => {
    const handePatch = () => {
      patchStoreItem(item.id, newItem);
      router.back();
    };
    const newItem = {
      id: item.id ? item.id : Date.now().toString(),
      name,
      brand,
      type,
      count,
    };
    try {
      item ? handePatch() : addStoreItem(newItem);
    } catch (e) {
      console.error(e.message);
    }
  };

  return (
    <Formik
      initialValues={{
        name: item?.name || "",
        brand: item?.brand || "",
        type: item?.type || "Type 1",
        count: parseInt(item?.count) || 0,
      }}
      onSubmit={(values) => {
        handleAddItem(values);
      }}
      validate={withZodSchema(itemSchema)}
    >
      {({
        handleChange,
        values,
        setFieldValue,
        errors,
        touched,
        handleSubmit,
      }) => (
        <View>
          <TextInput
            style={styles.input}
            placeholder="Nazwa"
            value={values.name}
            onChangeText={handleChange("name")}
          />
          {errors.name && touched.name && <Text>{errors.name}</Text>}
          <TextInput
            style={styles.input}
            placeholder="Marka"
            value={values.brand}
            onChangeText={handleChange("brand")}
          />
          {errors.brand && touched.brand && <Text>{errors.brand}</Text>}

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
            onChangeText={(data) =>
              parseAndHandleChange(data, setFieldValue, "count")
            }
          />
          {errors.count && touched.count && <Text>{errors.count}</Text>}

          <Button
            title={item ? "Zapisz zmiany" : "Dodaj produkt"}
            onPress={() => {
              handleSubmit();
            }}
          />
        </View>
      )}
    </Formik>
  );
};
