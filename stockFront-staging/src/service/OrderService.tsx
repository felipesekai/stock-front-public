import {api} from "./api";
import {Order} from "../utils/@Types";

export async function getAllOrders  () {
    return await api.get('/order/all/')

}

export function registerNewOrder(order: Order){
    return api.post(`/order`, order)
}