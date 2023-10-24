import {Dialog} from 'primereact/dialog';
import React from 'react';
import 'primeicons/primeicons.css';


interface props  {
    children: React.ReactNode,
    title: string,
    open: boolean,
    close: () => void
}

export function Modal({ children, title, open, close }: props) {

    return (
        <Dialog
            className='bg-[#ffffff] rounded-lg px-4 shadow-md py-6
        w-[50vh]
        flex
        flex-col
        gap-2
        {/*absolute*/}
        {/*top-[25%] left-[35%]*/}
         '
            header={title} visible={open} onHide={close}
            headerStyle={{ fontWeight: 'bold', textTransform: 'uppercase', display: 'flex', justifyContent: 'space-between' }}
            icons={<i className="pi"></i>}
        >
            {children}
        </Dialog>
    );
}

