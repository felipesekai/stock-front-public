import { ProductEntryDTO } from "../../utils/@Types";
import { CardTableRecords } from "./CardTableRecords";

type props = {
    listItems: ProductEntryDTO[],
}

export function TableRecords({ listItems }: props) {
    return (
        <>
            <div className="table">
                {/* header */}
                <div className='bg-bgPrimary text-white font-bold text flex justify-center items-center'>
                    {/*<div className={`cell codigo`}>Código</div>*/}
                    <div className={`cell nome`}>Produto</div>
                    <div className={`cell qtd`}>Quantidade</div>
                    <div className={`cell data`}>Data</div>
                    <div className={`cell hora`}>Hora</div>
                </div>

                {listItems.map((item, index) => <CardTableRecords key={index} item={item} index={index} />)}



            </div>

        </>
    );
}

function getNameObj(variable: any) {
    if (variable === undefined || variable == null) {
        return "Nenhum Registro Encontrado!"
    }

    return Object.keys(variable).map(value => {
        return (
            <div className={`cell ${value}`}>{value}</div>
        )
    })
}
