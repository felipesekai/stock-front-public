import React, {useEffect, useRef, useState} from 'react';
import {ModalNewProducts} from '../components/Products/ModalNewProducts';
import 'primeicons/primeicons.css';
import {ProductEntryDTO, Products} from '../utils/@Types';
import '../css/table.css'
import {BHeaderPage} from "../components/BHeaderPage";
import {ButtonArrowBack} from "../components/Buttons/ButtonArrowBack";
import {useNavigate} from "react-router-dom";
import {Modal} from "../components/Modal";
import {ButtonFD} from "../components/Buttons/ButtonFooterDialog";
import {TableRecords} from '../components/TableGeneric/TableRecords';
import {useAuth} from "../context/Auth";
import {onValue} from "firebase/database";
import {getRegistryRef} from "../database/Firebase/registryEntry";
import {Toast} from "primereact/toast";

export function EntryRecords() {
    const [open, setOpen] = useState<boolean>(false);
    const [openEdit, setOpenEdit] = useState<boolean>(false);
    const [openDialogDelete, setOpenDialogDelete] = useState<boolean>(false);
    const [productSelect, setProductSelect] = useState<ProductEntryDTO>({} as ProductEntryDTO);
    const [listRecords, setListRecords] = useState<ProductEntryDTO[]>([]);

    const navigate = useNavigate();

    const {user} = useAuth()

    const toast = useRef<Toast>(null)


    function goTo() {
        navigate("/")
    }

    const header = (
        <BHeaderPage>
            <ButtonArrowBack onClick={goTo} />
            Registros de Entrada
            {/* <Button onClick={() => { }} title={"Cadastrar Nova Entrada"}><i className="pi pi-plus"></i></Button> */}

        </BHeaderPage>
    );


    useEffect(() => {
        if(user){
            onValue(getRegistryRef(user?.id), snapshot => {
                let list: ProductEntryDTO[] = []
                snapshot.forEach((childSnapshot)=>{
                    const key = childSnapshot.key
                    let data = childSnapshot.val()
                    data.id = key
                    list.push(data)
                })
                setListRecords(list)
            })
        }
// eslint-disable-next-line
    }, [])

    const handleEditProduct = (product: Products) => {
        // setOpenEdit(true);
        // setProductSelect(product)
    }
    const handleDeleteProduct = (product: Products) => {
        // setOpenDialogDelete(true);
        // setProductSelect(product)
    }

    const handleConfirmDelete = () => {
        // deleteProduct(Number(productSelect.id)).then(response => {
        //     const data = response.data
        //     alert(data.message)
        //     window.location.reload()
        // })
    }

    const ModalDelete = (<Modal open={openDialogDelete} close={() => setOpenDialogDelete(false)}
        title={"Deseja Realmente Deletar Esse Produto?"}>
        <div className="flex flex-1 flex-col w-full gap-1 font-semibold">
            {/* <h2>Nome: {productSelect.name}</h2>
            <h2>Descrição: {productSelect.description}</h2>
            <h2>Quantidade: {productSelect.quantity}</h2>
            <h2>valor: {productSelect.price}</h2> */}
            <footer className={' flex justify-end'}>
                <ButtonFD onClick={handleConfirmDelete} id={"b-dialog-red"} style={{ backgroundColor: "#ff0000" }}
                    title={"Confirmar"} />

            </footer>
        </div>

    </Modal>)




    return (
        <div className="m-auto mt-2 ">
            {open && <ModalNewProducts toast={toast} open={open} close={() => setOpen(false)} />}
            {/* {openEdit && <ModalEditProducts open={openEdit}
                close={() => setOpenEdit(false)}
                product={productSelect}
            />} */}
            {/* {ModalDelete} */}
            {header}
            {/* <TableProducts handleEdit={handleEditProduct} handleDelete={handleDeleteProduct} list={listRecords} /> */}
            <TableRecords listItems={listRecords} />

        </div>
    );
}
