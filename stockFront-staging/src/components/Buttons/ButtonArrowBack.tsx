import {ButtonHTMLAttributes} from "react";


interface props extends ButtonHTMLAttributes<HTMLButtonElement>{

}
export const ButtonArrowBack = ({...rest}: props)=>{
    return (
        <button
            id='arrow-back'
            className="bg-bgPrimary
                    flex
                    gap-2
                    justify-center
                    items-center
                    my-5
                    mx-4
                    px-5
                    py-3
                    rounded
                    font-bold"
                {...rest}
        >
            <i className={'pi pi-arrow-left'}></i>
        </button>
    )
}