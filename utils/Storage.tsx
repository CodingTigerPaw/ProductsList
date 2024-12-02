import AsyncStorage from "@react-native-async-storage/async-storage";

// Funkcja zapisująca tablicę obiektów
export const saveData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    throw new Error("Błąd podczas zapisywania danych.");
  }
};

// Funkcja odczytująca tablicę obiektów
export const loadData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value !== null ? JSON.parse(value) : [];
  } catch (e) {
    throw new Error("Błąd podczas odczytywania danych.");
  }
};

// export const removeData = async(key, id) =>{
//     try{
//         const value = await AsyncStorage.getItem(key);
//         if( value !== null){
//             const parsed = JSON.parse(value)
//             return parsed.filter(())
//         }

//     }
// }
