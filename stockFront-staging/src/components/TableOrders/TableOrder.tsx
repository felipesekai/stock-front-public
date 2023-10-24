import React from "react";
import {Order, OrderRequests} from "../../utils/@Types";
import { CardOrder } from "./CardOrder";
import "./table.css"

interface TableOrderProps {
    list: Order[]
}
export const TableOrder = ({ list }: TableOrderProps) => {

    return (
        <>
            <div className="table">
                <div className='bg-bgPrimary text-white font-bold text flex justify-center items-center'>
                    {/*<div className="cell codigo">Código</div>*/}
                    <div className="cell nome">Cliente</div>
                    <div className="cell qtd">Produtos</div>
                    <div className="cell data">Data</div>
                    <div className="cell hora">Hora</div>
                    <div className="cell metodo">Metodo de Pagamento</div>
                    <div className="cell valor">Valor Total</div>

                </div>

                {list.map((item, index) => <CardOrder key={index} order={item} index={index} />)}



            </div>

        </>
    );
}
