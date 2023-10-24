import { api } from "./api";
import { Products } from "../utils/@Types";

export const getAllProducts = async () => {
    return api.get('/product/all/')
}
export function registerProduct(product: Products) {
    return api.post(`/product`, product)
}
export function editProduct(product: Products) {
    return api.put(`/product/edit`, product)
}
export const getProductById = async (id: number) => {
    return api.get('/product/' + id)
}
export const getProductOrder = async (id: number) => {
    return api.get('/product/order/' + id)
}
export const deleteProduct = async (id: number) => {
    return api.delete('/product/delete/' + id)
}