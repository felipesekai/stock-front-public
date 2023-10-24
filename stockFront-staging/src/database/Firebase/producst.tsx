import {child, getDatabase, push, ref, set, remove, get} from "firebase/database";
import {Products} from "../../utils/@Types";


const db = getDatabase()

export function getProductsRef(userId: string) {
   return ref(db, 'users/' + userId + '/products')

}
export const ProductFirebaseService = {
   create(userId: string, product: Products) {
      const newKey = push(child(ref(db), 'products')).key;
      return set(ref(db, 'users/' + userId + '/products/' + newKey), product)
   },
   read(userId: string, productId: string){
     return get(ref(db, 'users/' + userId + '/products/' + productId))
   },
   update: (userId: string, product: Products) => {
      console.log(product)
      product.description = product.description ? product.description : ""
      return set(ref(db, 'users/' + userId + '/products/' + product.id), product)
   },
   delete(userId: string, product: Products) {
      return remove(ref(db, 'users/' + userId + '/products/' + product.id))
   }
}
