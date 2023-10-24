import { LiHTMLAttributes, useEffect, useState } from "react";
import { bgColor } from "../utils/Colors";
import { Products } from "../utils/@Types";
import { formatCurrency } from "../utils/converter";

interface props extends LiHTMLAttributes<HTMLLIElement> {
    item: Products;
    itemSelectId?: string
    onSelectChange: (item: Products) => void
}
export const Itemli = ({ item, onSelectChange, itemSelectId, ...rest }: props) => {
    const [select, setSelect] = useState(false)
    const handleSelect = () => {
        onSelectChange(item)
    }

    useEffect(() => {
        if (itemSelectId === item.id) {
            setSelect(true)
        } else {
            setSelect(false)

        }
    }, [item.id, itemSelectId])

    return (
        <li
            {...rest}
            onClick={handleSelect}
            className="
        py-2
        flex
        border-b-gray-light
        rounded
        bg-bgPrimaryLight
        hover:border-bgPrimary
        hover:border-2
        cursor-pointer
        px-2
        justify-between
        "
            style={{ backgroundColor: select ? bgColor.bgPrimary : '', borderWidth: select ? '1px' : '' }}
        >
            <div className={'flex-[2]'}>
                {item.name}
            </div>
            <div className={'flex-1'}>
                {"Qtd: " + item.quantity}
            </div>
            <div >
                {"Preço: " + formatCurrency(Number(item.price))}
            </div>
        </li>
    );
}
