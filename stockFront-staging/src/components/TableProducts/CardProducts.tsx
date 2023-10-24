import React from 'react';
import { Products } from '../../utils/@Types';
import { ItemsTable } from './ItemsTable';
import { formatCurrency } from "../../utils/converter";
import { AlterColorRows } from "../../utils/AlterColorRows";

interface props {
    product: Products,
    index: number,
    handleEdit: () => void,
    handleDelete: () => void
}
export function CardProducts({ product, index, handleEdit, handleDelete }: props) {

    return (
        <tr className='border-1 dark:border-bgPrimary' style={AlterColorRows(index)}
        >
            {/*<td><ItemsTable title={product.id} />*/}
            {/*</td>*/}
            <td> <ItemsTable title={product.name} />
            </td>
            <td> <ItemsTable identify={1} title={product.description?.toString()} />
            </td>
            <td><ItemsTable title={product.quantity.toString()} />
            </td>
            <td> <ItemsTable title={product.buyPrice ? formatCurrency(Number(product.buyPrice)): "00"} /></td>
            <td> <ItemsTable title={formatCurrency(Number(product.price))} /></td>
            <td> <ItemsTable>
                <button className='bg-bgPrimary flex p-1 rounded-sm shadow text-white' onClick={handleEdit}>
                    <i className="pi pi-pencil">
                    </i>
                </button>
                <button className='bg-[red] flex p-1 rounded-sm shadow text-white' onClick={handleDelete}>
                    <i className="pi pi-trash">
                    </i>
                </button>
            </ItemsTable>
            </td>
        </tr>
    );
}
