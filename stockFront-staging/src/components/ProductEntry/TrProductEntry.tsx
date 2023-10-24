import React, { ChangeEvent } from 'react';
import { Products } from "../../utils/@Types";
import { ItemsTable } from "../TableProducts/ItemsTable";
import { formatCurrency } from "../../utils/converter";
import { AlterColorRows } from "../../utils/AlterColorRows";



interface props {
    product: Products,
    index: number,

    onInputChange: (index: number, number: number) => void
}
export function TrProductEntry({ product, index, onInputChange }: props) {

    const options = [
    ]
    for (let i = 1; i < 101; i++) {
        options.push(i)

    }
    function onInput(e: ChangeEvent<HTMLInputElement>) {

        const newValue = parseInt(e.target.value, 10);

        if (!isNaN(newValue) && newValue > 0) {
            onInputChange(index, Number(newValue))
        }else {
            alert("Valor invalido!")
        }
        // product.quantity = Number(e.target.value)
    }

    return (
        <tr className='border-1 dark:border-bgPrimary' style={AlterColorRows(index)}
        >
            {/*<td><ItemsTable title={product.id} />*/}
            {/*</td>*/}
            <td> <ItemsTable title={product.name} />
            </td>
            <td><input
                className="outline-bgPrimary
                rounded px-1
                text-end
                appearance-none
                 shadow bg-bgSecondary w-16"
                type={'number'}
                onChange={onInput}
                value={product.quantity}
                style={{ appearance: "textfield" }}
            />
            </td>
            <td> <ItemsTable title={formatCurrency(Number(product.price))} /></td>
        </tr>
    );
}
