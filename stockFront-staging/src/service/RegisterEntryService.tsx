import { Products } from "../utils/@Types";
import { api } from "./api";

export async function getAllRecords() {
    return await api.get(`/registryProduct`)

}

export function registerNewEntry(products: Products[]) {
    return api.post(`/registryProduct`, products)
}