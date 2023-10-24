
import React from "react";
interface Props{
    children?: React.ReactNode,
    title?: string

}
export const BHeaderPage = ({title, children}: Props)=>{
    return (

        <div className="flex
        items-center bg-bgPrimary w-full
         rounded font-bold mt-1 my-3 px-2
         text-white
        font-semibold text-2xl shadow-sm">
            {title}
            {children}
        </div>

    );
}