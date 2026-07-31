import api from "../api/axios";

export const getAllProducts = async () => {
  const response = await api.get("/get_all_products");
  return response.data;
};

export const getProductById = async (id) => {
  const response = await api.get(`/product/${id}`);
  return response.data;
};

export const addProduct = async (product) => {
  const response = await api.post(`/product`, product);
  return response.data;
};

export const editProduct = async (id, product) => {
  const response = await api.put(`/product/${id}`, product);
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await api.delete(`/product/${id}`);
  return response.data;
};
