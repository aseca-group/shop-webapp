import axios from "axios";

const baseUrl = "http://localhost:8080";

export const getProducts = async () => {
  try {
    const response = await axios.get(`${baseUrl}/product`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const sendOrder = async (order) => {
  try {
    const response = await axios.post(`${baseUrl}/order`, order);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createCustomer = async (data) => {
  try {
    const response = await axios.post(`${baseUrl}/customer`, data);
    return response.data.id;
  } catch (error) {
    console.error(error);
  }
}

export const createAdress = async (data) => {
  try {
    const response = await axios.post(`${baseUrl}/address`, data);
    return response.data.id;
  } catch (error) {
    console.error(error);
  }
}
