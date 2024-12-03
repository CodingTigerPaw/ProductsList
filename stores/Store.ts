import { create } from "zustand";
import { saveData, loadData } from "@/utils/Storage";
import { STORAGE_KEY } from "@/consts";

export const useStore = create()((set) => ({
  itemsStore: [],

  setStore: async () => {
    const storedItems = await loadData(STORAGE_KEY);
    set(() => {
      return { itemsStore: storedItems };
    });
  },
  addStoreItem: async (item) => {
    set(({ itemsStore }) => {
      const newState = [...itemsStore, item];
      saveData(STORAGE_KEY, newState);
      return {
        itemsStore: newState,
      };
    });
  },
  removeStoreItem: async (id) => {
    set(({ itemsStore }) => {
      const newState = itemsStore.filter((item) => item.id !== id);
      saveData(STORAGE_KEY, newState);
      return {
        itemsStore: newState,
      };
    });
  },
}));
