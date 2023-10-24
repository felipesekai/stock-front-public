import React, {RefObject, useCallback, useState} from 'react';
import {Modal} from '../Modal';
import {Products} from '../../utils/@Types';
import {formatarMoeda} from '../../utils/converter';
import {Input} from "../Input";
import {Button} from "../Buttons/Button";
import {ProductFirebaseService} from "../../database/Firebase/producst";
import {useAuth} from "../../context/Auth";
import {Toast} from "primereact/toast";
import {toastMessage} from "../../utils/alerts-switch";
import {MSG_EDIT_PRODUCT_ERROR, MSG_EDIT_PRODUCT_SUCCESS} from "../../utils/strings/msgs/alerts";
import {LoadingButtons} from "../Loading/LoadingButtons";

// import {getToastMessage} from "../../utils/alerts-switch";

interface props {
    open: boolean;
    close: () => void,
    product: Products;
    toast: RefObject<Toast>
}

export function ModalEditProducts({open, close, product, toast}: props) {
    const {user} = useAuth()
    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState<Products>(product);

    const onInputChange = useCallback((event: React.FormEvent<HTMLInputElement>) => {
        const targetInput = event.currentTarget
        const {value, name} = targetInput
        if(name === "buyPrice" || name === "price"){
            setFormData({
                ...formData,
                [name]:  formatarMoeda(value)
            })
        }else{
        setFormData({
            ...formData,
            [name]: value
        })
        }

    }, [setFormData, formData])

    const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let product = formData;
        product.price = product.price.toString().replace(',', '.')
        if(product.buyPrice){
        product.buyPrice = product.buyPrice.toString().replace(',', '.')
        }

        if (user) {
            setLoading(true)
            ProductFirebaseService.update(user?.id, product).then(() => {
                if (toast.current) {
                    toastMessage(toast.current, "success", MSG_EDIT_PRODUCT_SUCCESS, "Produto")
                }
                // toast.current?.show(getToastMessage("success", 'Product edited successfully'))
                close()
            }).catch((e) => {
                console.log(e.toString())
                if (toast.current) {
                    toastMessage(toast.current, "error", MSG_EDIT_PRODUCT_ERROR, "Produto")
                }
            }).finally(()=>{
                setLoading(false)
            })
        }
// eslint-disable-next-line
    }, [formData])

    return (
        <Modal title='Alterar Produto' open={open} close={close}>

            <form className='flex flex-col gap-2' onSubmit={handleSubmit}>
                <div className='flex flex-col'>
                    <label>Nome <span className={'text-[red]'}>*</span></label>
                    <Input name='name' required
                           value={formData.name}
                           onChange={onInputChange}
                           type='text' className='border-2 rounded border-bgPrimary h-10'/>
                </div>
                <div className='flex flex-col'>
                    <label className='capitalize'>Descrição</label>
                    <Input
                        value={formData.description}
                        name='description'
                        onChange={onInputChange}
                        type='text' className='border-2 rounded border-bgPrimary h-10' maxLength={250}/>
                </div>
                <div className='flex flex-col'>
                    <label className='capitalize'>quantidade <span className={'text-[red]'}>*</span></label>
                    <Input
                        value={formData.quantity}
                        name='quantity' onChange={onInputChange} required type='number'
                        className='border-2 rounded border-bgPrimary h-10'/>
                </div>
                <div className='flex flex-col'>
                    <label className='capitalize'>Valor de compra</label>
                    <Input
                        onChange={onInputChange}
                        value={formData.buyPrice?.toString().replace(".", ",")}
                        required
                        name='buyPrice' type='text'
                        step="0.01"
                        className='border-2 rounded border-bgPrimary h-10'/>
                </div>
                <div className='flex flex-col'>
                    <label className='capitalize'>Valor de venda<span className={'text-[red]'}>*</span></label>
                    <Input
                        onChange={onInputChange}
                        value={formData.price.toString().replace(".", ",")}
                        required
                        name='price' type='text'
                        step="0.01"
                        className='border-2 rounded border-bgPrimary h-10'/>
                </div>
                <Button disabled={loading} type='submit' style={{marginBottom: '0'}}
                        children={loading ? <LoadingButtons/> : 'Alterar'}/>
            </form>


        </Modal>
    );
}
