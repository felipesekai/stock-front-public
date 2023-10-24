import {SelectHTMLAttributes} from "react";

interface props extends SelectHTMLAttributes<HTMLSelectElement>{
    list?: []
}
export const Select = ({list, ...rest}: props)=>{

    const listPay = [
        {id: 0, name: "Selecione um Metodo de Pagamento"},
        {id: 1, name: "À vista"},
        {id: 2, name: "Pix"},
        {id: 3, name: "Cartão"},
    ]

    return (
        <select {...rest} defaultValue={0} className="w-full outline-bgPrimary h-12 rounded px-2 shadow bg-bgSecondary">
            {list ? list.map(item=> {
                return <option>{item}</option>
            }):
            listPay.map(item=> {
                return <option key={item.id} >{item.name}</option>
            })
            }
        </select>
    );
}