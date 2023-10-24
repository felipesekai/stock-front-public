import React from 'react';
import { Products } from '../../../utils/@Types';
import { AlterColorRows } from '../../../utils/AlterColorRows';
import { formatCurrency } from '../../../utils/converter';
import { ItemsTable } from '../../TableProducts/ItemsTable';


interface props {
    product: Products,
    index: number,

}
export function CardProductsOrder({ product, index, }: props) {

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
            <td> <ItemsTable title={formatCurrency(Number(product.price))} /></td>

        </tr>
    );
}
