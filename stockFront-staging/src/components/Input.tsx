import React, { InputHTMLAttributes} from "react";

interface props extends InputHTMLAttributes<HTMLInputElement>{}

export const Input = ({...rest}:props)=>{
    return(
        <input {...rest}
        className={'w-full outline-bgPrimary h-12 rounded px-2 shadow bg-bgSecondary'}
        />

    );
}