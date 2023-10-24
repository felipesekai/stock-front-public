import {Modal} from "../Modal";
import React, {useEffect, useState} from "react";
import {Products} from "../../utils/@Types";
import {TrProductEntry} from "./TrProductEntry";
import {Button} from "../Buttons/Button";
import {registryFirebaseService} from "../../database/Firebase/registryEntry";
import {useAuth} from "../../context/Auth";


interface props {
    products: Products[],
    open: boolean,
    close: () => void
}

export const ConfirmProductEntry = ({products, open, close}: props) => {
    const [listProducts, setListProducts] = useState<Products[]>([]);
    const {user} = useAuth()
    useEffect(() => {
        if (
            products !== undefined
        ) {
            const list = [...products]
            list.forEach((item) => {
                item.quantity = 1
            })

            setListProducts(list)
        } else {
            alert("Ocorreu um erro")
        }
        // eslint-disable-next-line
        // eslint-disable-next-line
    }, []);


    function handleConfirmOrder() {
        if (user) {
            registryFirebaseService.create(user.id, listProducts).then(() => {
                alert("Registro inserido com sucesso!")
                window.location.reload()
            }).catch(e =>
                console.log(e))

        }
        // registerNewEntry(listProducts).then(r => {
        //
        //     alert("Registro Cadastrado Com Sucesso!");
        //     window.location.reload()
        //
        //
        // }).catch((r) => {
        //     // alert("Houve um erro ao Tentar Registrar uma nova Saida")
        //     alert(r)
        //     console.log(r)
        // })
    }

    function setQuantityProdcut(index: number, qtd: number) {
        const itemTemp = [...listProducts]
        itemTemp[index].quantity = qtd
        setListProducts(itemTemp)

    }

    return (
        <Modal open={open} close={close} title={"Confirmar Pedido"}>
            <div className={'flex flex-col '}>
                <div className={'flex gap-2'}>
                    {/* <h4 className={'flex-1 text-md'}>Nome: {order.name}</h4> */}
                    {/* <h4 className={'flex-1 text-md'}>Data: {Date()}</h4> */}

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
                    {listProducts.map((item, index) => <TrProductEntry
                        key={index}
                        product={item}
                        index={index}
                        onInputChange={(index, qtd) => setQuantityProdcut(index, qtd)}
                    />)}

                    </tbody>
                </table>

                {/* <div className="flex flex-col gap-2 justify-center mt-2">
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
                } */}


                <Button onClick={handleConfirmOrder} title={"Confirmar"}/>
            </div>
        </Modal>
    );
}
