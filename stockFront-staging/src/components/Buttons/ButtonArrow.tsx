import React, { ButtonHTMLAttributes } from 'react';
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode
}
export function ButtonArrow({ children, ...rest }: ButtonProps) {
    return (
        <button
            {...rest}
            className='   
            p-4  rounded
            shadow-sm
          border-bgPrimary    
         hover:bg-bgPrimary
         hover:border-bgPrimary
         '>
            {children}</button>
    );
}