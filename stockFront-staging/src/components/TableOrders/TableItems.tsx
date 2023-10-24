import React, { HtmlHTMLAttributes, ReactNode } from 'react';



interface Props extends HtmlHTMLAttributes<HTMLDivElement> {
    title?: string,
    children?: ReactNode
    identify?: number
}

export function TableItems({ title, identify, children, ...rest }: Props) {
    if (identify === undefined) {
        return (
            <div className='flex flex-1 gap-1 items-center justify-center bg-orange-500 py-1 px-2'
                {...rest}
            >
                {title}
                {children}
            </div>
        );
    }
    return <div className='flex flex-[3] items-center justify-center bg-orange-500 py-1 px-2'
        {...rest}
    >{title}
    </div>
}