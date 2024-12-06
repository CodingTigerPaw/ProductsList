import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000/items";
export const getData = async () => {
  try {
    const response = await axios.get("");
    console.log(response.data);
    return response.data;
  } catch (e) {
    console.log(e.message);
  }
};

export const postData = async (data) => {
  try {
    await axios.post("", data);
  } catch (e) {
    console.log(e.message);
  }
};

export const deleteData = async (id: string) => {
  try {
    await axios.delete(`/${id}`);
  } catch (e) {
    console.log(e.message);
  }
};

export const patchData = async (id: string, data) => {
  try {
    await axios.patch(`/${id}`, data);
  } catch (e) {
    console.log(e.message);
  }
};
