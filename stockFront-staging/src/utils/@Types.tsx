export type Products = {
    id?: string;
    name: string;
    description?: string;
    quantity: number;
    price: string | number;
    buyPrice?: string | number;
}

// export type PickerProduct = TypeProtucts & {
//     selected: boolean
// }

export type Order = {
    id?: string;
    name: string;
    total: number;
    products: Products[];
    date?: string;
    hour?: string;
    paymentMethod?: string | null
}
export type OrderRequests = {
    id?: string;
    name: string;
    total: number;
    product: ProductOrder[];
    date?: string;
    hour?: number;
    paymentMethod?: string | null
}
export type ProductOrder = { productId: number, orderId: number, quantity: number }

export type ProductEntryDTO = {
    id?: string;
    // name: string;
    product: Products;
    date?: string;
    hour?: string;
}

// export type Paymments = {
//     id: number;
//     name: string;
// }
