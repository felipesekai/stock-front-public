import {child, getDatabase, push, ref, set, remove} from "firebase/database";
import {Order, Products} from "../../utils/@Types";
import {ProductFirebaseService} from "./producst";


const db = getDatabase()

export function getOrderRef(userId: string) {
   return ref(db, OrdersFirebaseService.defaultPath(userId))

}

async function updateQuantityProducts(userId: string, list: Products[]){

   let quantity = 0
   let product_edit: Products
   let listProductsUpdates : Products[] = []
  return   await Promise.all(
        list.map(async (product) => {
            if (product.id != null) {
                await ProductFirebaseService.read(userId, product.id).then(snapshot => {
                    product_edit = snapshot.val()
                    const key = snapshot.key
                    product_edit.id = key ? key : undefined
                    listProductsUpdates.push(product_edit)
                })
            }
        })
    ).then(()=>{
        let count = 0
        listProductsUpdates.forEach((product, index)=>{
            quantity = product.quantity-list[index].quantity
            if (quantity < 0) {
                count++;
                alert('Quantidade em estoque insuficiente do produto ' + product.name)
            }else{
                product.quantity = quantity
            }
        })
        return new Promise((resolve, reject) => {
            if (count > 0) {
                reject(new Error("Produtos em estoque com quantidade Inssuficiente!"));
            } else {
                Promise.all(
                    listProductsUpdates.map(product=>{
                        ProductFirebaseService.update(userId, product)
                    })
                )
                resolve("O valor do contador é diferente de zero.");
            }

    })

})}
export const OrdersFirebaseService = {
   defaultPath (userId: string) {return 'users/' + userId + '/orders/'},

   create: function (userId: string, order: Order) {
     return  updateQuantityProducts(userId,order.products).then(()=>{
          const newKey = push(child(ref(db), 'orders')).key;
          return set(ref(db, this.defaultPath(userId) + newKey), order)
      })

   },
   // update: (userId: string, product: Products) => {
   //    product.description = product.description ? product.description : ""
   //    return set(ref(db, this.defaultPath(userId) + product.id), product)
   // },
   delete(userId: string, orderId: string) {
      return remove(ref(db, this.defaultPath(userId) + orderId))
   },

}
