import {Input} from "../Input";
import {Itemli} from "../Itemli";
import React from "react";
import {Products} from "../../utils/@Types";
import {Label} from "../Label";


interface props {
    list: Products[],
    itemSelected: Products,
    setItemSelect: (item: Products)=>void,
    search: (item: string)=>void,
    text: string

}
export const PickItens= ({list, search, itemSelected, setItemSelect, text}: props)=>{
    const handleSelect = (item: Products)=>{
        setItemSelect(item)

        }

    return (
        <div id={'pickList'} className={'flex-col w-full gap-2  max-w-lg'} >
            <Label>
                {text}
            </Label>
            <Input type={'search'} placeholder={'Pesquisar Produto'} onChange={(e)=>search(e.target.value)}/>
            <ul className={'flex gap-2 flex-col p-1 overflow-auto h-96 md:h-56 2xl:h-96 '}>
                {
                    list.map(item=>{return <Itemli itemSelectId={itemSelected.id} onSelectChange={(item)=>handleSelect(item)} key={item.id} item={item}/>})
                }
            </ul>
        </div>
    );
}
