import React from "react";

interface Props {
    children?: React.ReactNode,
    title?: string

}

export const Label = ({title, children}: Props) => {
    return (
        <label className="flex
        items-center bg-bgPrimary w-full
         rounded font-bold mt-1 my-3 px-2
         text-white
        font-semibold shadow-sm">
            {title}
            {children}
        </label>

    );
}