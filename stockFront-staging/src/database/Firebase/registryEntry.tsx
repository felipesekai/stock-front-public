import {child, getDatabase, push, ref, remove, set} from "firebase/database";
import {ProductEntryDTO, Products} from "../../utils/@Types";
import {ProductFirebaseService} from "./producst";
import {dataAtualTela, horaAtualTela} from "../../utils/DatesUtils";


const db = getDatabase()

export function getRegistryRef(userId: string) {
   return ref(db, registryFirebaseService.defaultPath(userId))

}

async function updateQuantityProducts(userId: string, list: Products[]){
   let product_edit: Products
   let listProductsUpdates : Products[] = []
  return await Promise.all(
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
        listProductsUpdates.forEach((product, index)=>{
            product.quantity = product.quantity+list[index].quantity
            ProductFirebaseService.update(userId, product)

        })
})}
export const registryFirebaseService = {
   defaultPath (userId: string) {return 'users/' + userId + '/registryProduct/'},

   create: function (userId: string, products: Products[]) {
     return  updateQuantityProducts(userId,products).then(()=>{

         Promise.all(
             products.map(product=>{
                 const newKey = push(child(ref(db), 'registryProduct')).key;
                 const registry : ProductEntryDTO = {
                     id: newKey || "",
                     date: dataAtualTela(),
                     hour: horaAtualTela(),
                     product: product,
                     }
                return  set(ref(db, this.defaultPath(userId) + newKey), registry)
             })
         )

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
