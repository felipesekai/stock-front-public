import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    title?: string,
    children?: React.ReactNode | string
}


export const Button = ({ title, children, ...rest }: ButtonProps) => {
    return <button
        {...rest}
        id={"b-default"}
        className="bg-bgPrimary
                    flex
                    gap-2
                    justify-center
                    items-center
                    text-white
                    my-2
                    ml-auto
                    mx-4
                    px-5
                    py-3
                    rounded
                    font-bold">
        {children}
        {title}
    </button>

}
