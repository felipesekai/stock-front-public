import React from 'react';
import {ProductEntryDTO} from '../../utils/@Types';
import {AlterColorRows} from "../../utils/AlterColorRows";


// import { bgColor } from "../utils/Colors.tsx";

interface props {
    item: ProductEntryDTO,
    index: number
}
export function CardTableRecords({ item, index }: props) {
    // const [open, setOpen] = useState(false)
    // const [products, setProducts] = useState<Products[]>([])
    //
    // const iconString = {
    //     open: 'pi pi-angle-up',
    //     close: 'pi pi-angle-down'
    // }
    //
    // useEffect(() => {
    //     if (open) {
    //
    //         getProductOrder(Number(item.id)).then(res => {
    //             setProducts(res.data)
    //         })
    //     } else {
    //         setProducts([])
    //     }
    //
    // }, [open, item.id])

    // function openList() {
    //     setOpen(!open)
    //
    // }

    // function getvalueObj(variable: any) {
    //     if (variable === undefined || variable == null) {
    //         return "Nenhum Registro Encontrado!"
    //     }

    //     return Object.keys(variable).map(value => {
    //         return (
    //             <div className={`cell ${value}`}>{getValueByKey(variable, value)}</div>
    //         )
    //     })
    // }

    // function getValueByKey(obj: any, key: string) {
    //     return `${obj[key]}`
    // }

    return (
        <>
            <div className='flex border-1 dark:border-bgPrimary items-center' style={AlterColorRows(index)}
            >

                {/*<div className="cell codigo">{item.id}*/}
                {/*</div>*/}
                <div className="cell nome">{item.product.name}
                </div>
                <div className="cell qtd">
                    {item.product.quantity.toString()}



                </div>

                <div className="cell data">{item.date && item.date}
                </div>
                <div className="cell hora">{item.hour ? item.hour.toString() : ""}
                </div>

            </div>

            {/* {open && <TableProductsOrder list={products} />
            } */}


        </>
    );
}
