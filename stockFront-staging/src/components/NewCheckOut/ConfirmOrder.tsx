import {Modal} from "../Modal";
import React, {RefObject, useCallback, useEffect, useState} from "react";
import {Order, Products} from "../../utils/@Types";
import {TrProductsConfirm} from "./TrProductsConfirm";
import {Button} from "../Buttons/Button";
import {formatCurrency} from "../../utils/converter";
import {Select} from "../Select";
import {Input} from "../Input";
import {dataAtualTela, formatDataAtualTela, horaAtualTela} from "../../utils/DatesUtils";
import {OrdersFirebaseService} from "../../database/Firebase/orders";
import {useAuth} from "../../context/Auth";
import {Toast} from "primereact/toast";
import {toastMessage} from "../../utils/alerts-switch";
import {MSG_ORDER_ERROR, MSG_ORDER_SUCCESS} from "../../utils/strings/msgs/orders";

interface props {
    order: Order,
    open: boolean,
    close: () => void,
    toast: RefObject<Toast>
}

export const ConfirmOrder = ({ order, open, close, toast }: props) => {
    const [listProducts, setListProducts] = useState<Products[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
    const [moneyChange, setMoneyChange] = useState<number>(0)
    const {user} = useAuth()



    const calcTotal = useCallback(() => {
        let _total = 0
        listProducts.forEach((item) =>
            _total += Number(item.price.toString().replace(',', '.')) * item.quantity
        )
        return _total;
    }, [listProducts]);

    useEffect(() => {
        if (
            order.products !== undefined
        ) {
            const list =Array.from(order.products)
            list.forEach((item) => {
                item.quantity = 1
                item.description = item.description? item.description : ""
            })

            setListProducts(list)
            setTotal(calcTotal)
        } else {
            alert("Ocorreu um erro")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    useEffect(() => {
        setTotal(calcTotal)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [listProducts])

    function onChangeSelect(index: number, qtd: number) {
        console.log("index: " + index);
        console.log("qtd: " + qtd);
        const itemTemp = [...listProducts]
        itemTemp[index].quantity = qtd
        setListProducts(itemTemp)

    }

    function handleConfirmOrder() {
        const newOrder: Order = {
            name: order.name ? order.name : '',
            date: order.date ? formatDataAtualTela(order.date) : dataAtualTela(),
            hour: horaAtualTela(),
            products: listProducts,
            total: total,
            paymentMethod: paymentMethod
        }

        if(user){

        OrdersFirebaseService.create(user?.id, newOrder)
            .then(() => {
                if (toast.current){
                    toastMessage(toast.current, "success", MSG_ORDER_SUCCESS, "Pedido")
                }
                setTimeout(()=>{
                    window.location.reload()
                }, 1500)

        }).catch((error) => {
                console.log(error.response)
            if (toast.current){
                toastMessage(toast.current, "error", MSG_ORDER_ERROR, "Pedido")
            }
            // alert("Houve um erro ao Tentar Registrar uma nova Saida")
                alert(error)
            })
        }

        // registerNewOrder(newOrder).then(r => {
        //     if (r.data.title) {
        //         alert(r.data.message);
        //
        //     } else {
        //         alert("Registro Cadastrado Com Sucesso!");
        //         window.location.reload()
        //     }
        //
        // }).catch((error) => {
        //     console.log(error.response)
        //     // alert("Houve um erro ao Tentar Registrar uma nova Saida")
        //     alert(error)
        // })
    }

    const handleSelectPaymentsMethod = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setPaymentMethod(e.target.value)
    }, [setPaymentMethod])

    const onChangeToReturn = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const newChange = Number(e.target.value) - total
        setMoneyChange(newChange)
    }, [setMoneyChange, total])



    return (
        <Modal open={open} close={close} title={"Confirmar Pedido"}>
            <div className={'flex flex-col '}>
                <div className={'flex gap-2'}>
                    <h4 className={'flex-1 text-md'}>Nome: {order.name}</h4>
                    <h4 className={'flex-1 text-md'}>Data: {order.date}</h4>

                </div>

                <table className="table-auto w-full">
                    <thead className='bg-bgPrimary w-full rounded font-bold mt-1 my-3 text-white'>
                        <tr className='rounded'>
                            {/*<th>Código</th>*/}
                            <th>Nome</th>
                            <th>Qtd</th>
                            <th>Preço</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listProducts.map((item, index) => <TrProductsConfirm
                            key={index}
                            product={item}
                            index={index}
                            onChangeSelect={(index, qtd) => onChangeSelect(index, qtd)}
                        />)}

                    </tbody>
                </table>

                <div className="flex flex-col gap-2 justify-center mt-2">
                    <Select onChange={handleSelectPaymentsMethod}></Select>
                    {paymentMethod === "À vista" &&
                        <Input type="number" step={0.01} onChange={onChangeToReturn} placeholder="Valor Pago" />}

                </div>
                <h4 className={'flex text-md w-full justify-end px-4 py-2'}>
                    {"Total: " + formatCurrency(total)}
                </h4>
                {moneyChange > 0 && paymentMethod === "À vista" &&
                    <h4 className={'flex text-md w-full justify-end px-4 py-2'}>
                        {"Troco: " + formatCurrency(Number(moneyChange))}
                    </h4>
                }


                <Button onClick={handleConfirmOrder} title={"Confirmar"} />
            </div>
        </Modal>
    );
}
