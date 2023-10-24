import React from 'react';
import {useNavigate} from 'react-router-dom';
import {CardHome} from '../components/CardHome';
import './../App.css'
import {Button} from "../components/Buttons/Button";
import {useAuth} from "../context/Auth";

export function Home() {

    const {loggoff} = useAuth()
    const navigate = useNavigate();
    function to(item: string) {
        navigate(item);
    }
    return (
        <div className='flex flex-1, h-[100hv] justify-center items-center pt-10'>
            <Button style={{position:"absolute", top: "10px", right:"10px"}} title={"SAIR"} onClick={loggoff}/>
            <div className='grid-colunms gap-2 items-center px-2' >
            {/*<div className='flex flex-col*/}
            {/*//responsive*/}
            {/*xl:flex-row*/}
            {/*gap-2 p-2 items-center*/}

            {/* ' >*/}

                <CardHome
                    onClick={() => to('/newcheckout')}
                    iconName='pi pi-cart-plus' text='Registrar Saida' />
                <CardHome
                    onClick={() => to('/products')}
                    iconName='pi pi-box' text='Ver Estoque' />
                <CardHome
                    onClick={() => to('/orders')}
                    iconName='pi pi-book' text='Ver Pedidos' />
                <CardHome
                    onClick={() => to('/productentry')}
                    iconName='pi pi-plus' text='Registrar Entrada' />
                <CardHome
                    onClick={() => to('/entryrecords')}
                    iconName='pi pi-book' text='Registros de Entrada' />


            </div>
            {/*<ChangePassword open={true} onClose={()=>{}}/>*/}
            {/*</div>*/}
        </div>
    );
}
