import React, { ChangeEvent } from 'react';
import { Products } from "../../utils/@Types";
import { ItemsTable } from "../TableProducts/ItemsTable";
import { formatCurrency } from "../../utils/converter";
import { AlterColorRows } from "../../utils/AlterColorRows";


interface props {
    product: Products,
    index: number,
    onChangeSelect: (index: number, number: number) => void
}
export function TrProductsConfirm({ product, index, onChangeSelect }: props) {

    const options = [
    ]
    for (let i = 1; i <= 50; i++) {
        options.push(i)
    }
    function onSelect(e: ChangeEvent<HTMLSelectElement>) {
        onChangeSelect(index, Number(e.target.value))

        // product.quantity = Number(e.target.value)
    }

    return (
        <tr className='border-1 dark:border-bgPrimary' style={AlterColorRows(index)}
        >
            {/*<td><ItemsTable title={product.id} />*/}
            {/*</td>*/}
            <td> <ItemsTable title={product.name} />
            </td>
            <td><select onChange={onSelect}>
                {options.map((op => {
                    return <option key={op}>{op}</option>
                }))}
            </select>
            </td>
            <td> <ItemsTable title={formatCurrency(Number(product.price))} /></td>
        </tr>
    );
}
