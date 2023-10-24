import {Products} from "../../../utils/@Types";
import {CardProductsOrder} from "./CardProductsOrder";
import {useEffect, useRef, useState} from "react";
import {DivAnimated} from "../styled";

interface Props {
    list: Products[];
    // handleEdit: (products: Products) => void

}

export const TableProductsOrder = ({list}: Props) => {
    const tableRef = useRef<HTMLTableElement>(null);
    const [ofSetHeight, setOfSetHeight] = useState('')
    useEffect(() => {
        if (tableRef.current) {
            setOfSetHeight(tableRef.current.offsetHeight.toString())
        }
    }, [list]);

    return (
        <DivAnimated  altura={ofSetHeight}>
        <table ref={tableRef} className="table-auto w-full"
                // style={effect}
        >
            <thead className='bg-bgPrimary w-full rounded font-bold mt-1 my-3 text-white'>
            <tr className='rounded'>
                {/*<th>Código</th>*/}
                <th>Nome</th>
                <th>Descrição</th>
                <th>Quantidade</th>
                <th>Valor</th>
            </tr>
            </thead>
            <tbody>
            {list.map((item, index) => <CardProductsOrder key={index} product={item} index={index}/>)}
            </tbody>

        </table>
        </DivAnimated>
    );


}
