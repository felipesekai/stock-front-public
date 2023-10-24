
import { Products } from "../../utils/@Types";
import { CardProducts } from "./CardProducts";

interface Props {
    list: Products[];
    handleEdit: (products: Products) => void,
    handleDelete: (products: Products) => void,

}

export const TableProducts = ({ list, handleEdit, handleDelete }: Props) => {
    const footer = `Total de Produtos: ${list ? list.length : 0}.`;

    return (
        <table className="table-auto w-full">
            <thead className='bg-bgPrimary w-full rounded font-bold mt-1 my-3 text-white'>
                <tr className='rounded'>
                    {/*<th>Código</th>*/}
                    <th>Nome</th>
                    <th>Descrição</th>
                    <th>Estoque</th>
                    <th>Valor Compra</th>
                    <th>Valor Venda</th>
                    <th>Editar/Excluir</th>
                </tr>
            </thead>
            <tbody>
                {list.map((item, index) => <CardProducts
                    handleEdit={() => handleEdit(item)}
                    handleDelete={() => handleDelete(item)}
                    key={index} product={item} index={index} />)}

            </tbody>
            <tfoot>
                {footer}
            </tfoot>
        </table>
    );
}
