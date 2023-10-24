import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    title: string,
    children?: React.ReactNode
}


export const ButtonFD = ({ title, children, ...rest }: ButtonProps) => {
    return <button
        {...rest}
        // id={`b-dialog`}
        className="bg-bgPrimary                  
                    flex
                    gap-2
                    justify-center
                    items-center
                    text-white
                    my-2
                    px-5
                    py-3 
                    rounded
                    font-bold">
        {children}
        {title}
    </button>

}