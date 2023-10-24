import React, { ButtonHTMLAttributes } from 'react';

interface props extends ButtonHTMLAttributes<HTMLButtonElement> {
    iconName: string;
    text: string;
}

export function CardHome({ iconName, text, ...rest }: props) {
    return (
        <button
            id="card-home"
            {...rest}
            className='bg-bgPrimary
             flex flex-col justify-center
              items-center w-[270px] h-[150px]

               text-white
               '
        >

            <i id='iconCard' className={iconName}
            ></i>
            <h4 className='font-bold text-3xl my-2'>{text}</h4>

        </button>
    );
}
