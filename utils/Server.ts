import axios from "axios";

export const getData = async (url: string) => {
  try {
    const response = await axios.get(url);
    console.log(response.data);
    return response.data;
  } catch (e) {
    console.log(e.message);
  }
};

export const postData = async (url: string, data) => {
  try {
    axios.post(url, data);
  } catch (e) {
    console.log(e.message);
  }
};

export const deleteData = async (url: string, id: string) => {
  try {
    axios.delete(`${url}/${id}`);
  } catch (e) {
    console.log(e.message);
  }
};
