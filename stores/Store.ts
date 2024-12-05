import { create } from "zustand";
// import { saveData, loadData } from "@/utils/Storage";
// import { STORAGE_KEY } from "@/consts";
import { getData, postData, deleteData } from "@/utils/Server";

type itemType = {
  id: string;
  name: string;
  brand: string;
  type: "Type 1" | "Type 2";
  count: number;
};

type storeType = {
  itemStore: itemType[];
  setStoreItem: () => Promise<itemType>;
  addStoreItem: (itemsStore: itemType) => Promise<itemType>;
  removeStoreItem: () => void;
};

export const useStore = create()((set) => ({
  itemsStore: [],

  setStore: async () => {
    // const storedItems = await loadData(STORAGE_KEY);
    const storedItems = await getData("http://localhost:3000/items");
    set(() => ({ itemStore: storedItems }));
  },
  addStoreItem: async (item: itemType) => {
    set(({ itemsStore }: { itemsStore: itemType[] }) => {
      const newState = [item, ...itemsStore];
      //   saveData(STORAGE_KEY, newState);
      postData("http://localhost:3000/items", item);
      return { itemsStore: newState };
    });
  },
  removeStoreItem: async (id: string) => {
    set(({ itemsStore }: { itemsStore: itemType[] }) => {
      const newState = itemsStore.filter((item: itemType) => item.id !== id);
      //   saveData(STORAGE_KEY, newState);
      deleteData("http://localhost:3000/items", id);

      return { itemsStore: newState };
    });
  },
}));
