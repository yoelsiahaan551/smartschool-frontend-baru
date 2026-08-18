import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/paket";

export const getPaket = async () => {
  try {
    const response = await axios.get(API_URL);

    console.log("GET PAKET RESPONSE:", response.data);

    return response.data;
  } catch (error: any) {
    console.error(
      "Error get paket:",
      error.response?.data || error.message
    );

    throw error;
  }
};

export const getPaketById = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);

    return response.data;
  } catch (error: any) {
    console.error(
      "Error get paket by id:",
      error.response?.data || error.message
    );

    throw error;
  }
};

export const getFitur = async () => {
  try {
    const response = await axios.get(`${API_URL}/fitur/list`);

    return response.data;
  } catch (error: any) {
    console.error(
      "Error get fitur:",
      error.response?.data || error.message
    );

    throw error;
  }
};

export const createPaket = async (data: any) => {
  try {
    const response = await axios.post(API_URL, data);

    return response.data;
  } catch (error: any) {
    console.error(
      "Error create paket:",
      error.response?.data || error.message
    );

    throw error;
  }
};

export const updatePaket = async (
  id: string,
  data: any
) => {
  try {
    const response = await axios.put(
      `${API_URL}/${id}`,
      data
    );

    return response.data;
  } catch (error: any) {
    console.error(
      "Error update paket:",
      error.response?.data || error.message
    );

    throw error;
  }
};

export const deletePaket = async (id: string) => {
  try {
    const response = await axios.delete(
      `${API_URL}/${id}`
    );

    return response.data;
  } catch (error: any) {
    console.error(
      "Error delete paket:",
      error.response?.data || error.message
    );

    throw error;
  }
};