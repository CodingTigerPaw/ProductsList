import { create } from "zustand";
import { saveData, loadData } from "@/utils/Storage";
import { STORAGE_KEY } from "@/consts";
import { getData, postData, deleteData, patchData } from "@/utils/Server";

type itemType = {
  id: string;
  name: string;
  brand: string;
  type: "Type 1" | "Type 2";
  count: number;
};

type storeType = {
  itemsStore: itemType[];
  setStoreItem: () => Promise<itemType>;
  addStoreItem: (itemsStore: itemType) => Promise<itemType>;
  removeStoreItem: () => void;
  patchStoreItem: (id: string, itemsStore: itemType) => Promise<itemType>;
};

export const useStore = create<storeType>()((set) => ({
  itemsStore: [],

  setStore: async () => {
    // const storedItems = await loadData(STORAGE_KEY);
    const storedItems = await getData();
    set(() => ({ itemsStore: storedItems }));
  },
  addStoreItem: async (item: itemType) => {
    set(({ itemsStore }: { itemsStore: itemType[] }) => {
      const newState = [item, ...itemsStore];
      //   saveData(STORAGE_KEY, newState);
      postData(item);
      return { itemsStore: newState };
    });
  },
  removeStoreItem: async (id: string) => {
    set(({ itemsStore }: { itemsStore: itemType[] }) => {
      const newState = itemsStore.filter((item: itemType) => item.id !== id);
      //   saveData(STORAGE_KEY, newState);
      deleteData(id);

      return { itemsStore: newState };
    });
  },
  patchStoreItem: async (id: string, newitem: itemType) => {
    set(({ itemsStore }) => {
      const newState = itemsStore.map((item) =>
        item.id === id ? { ...item, ...newitem } : item
      );
      patchData(id, newitem);
      return { itemsStore: newState };
    });
  },
}));
