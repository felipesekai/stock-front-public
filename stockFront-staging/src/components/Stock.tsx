import React, {useEffect, useRef, useState} from 'react';
import {ModalNewProducts} from './Products/ModalNewProducts';
import 'primeicons/primeicons.css';
import {Products} from '../utils/@Types';
import '../css/table.css'
import {Button} from './Buttons/Button';
import {BHeaderPage} from "./BHeaderPage";
import {ButtonArrowBack} from "./Buttons/ButtonArrowBack";
import {useNavigate} from "react-router-dom";
import {TableProducts} from "./TableProducts/TableProducts";
import {ModalEditProducts} from "./Products/ModalEditProducts";
import {Modal} from "./Modal";
import {ButtonFD} from "./Buttons/ButtonFooterDialog";
import {getProductsRef, ProductFirebaseService} from "../database/Firebase/producst";
import {useAuth} from "../context/Auth";
import {onValue} from "firebase/database";
import {Toast} from "primereact/toast";
import {Loading} from "./Loading/Loading";

export function Stock() {
    const [open, setOpen] = useState<boolean>(false);
    const [openEdit, setOpenEdit] = useState<boolean>(false);
    const [openDialogDelete, setOpenDialogDelete] = useState<boolean>(false);
    const [productSelect, setProductSelect] = useState<Products>({} as Products);
    const [listProducts, setListProducts] = useState<Products[]>([]);
    const [loading, setLoading]= useState(false)

    const {user}= useAuth()
    const navigate = useNavigate();

    const toast = useRef<Toast>(null)


    function goTo() {
        navigate("/")
    }

    const header = (
        <BHeaderPage>
            <ButtonArrowBack onClick={goTo} />
            Produtos
            <Button onClick={() => setOpen(!open)} title={"Cadastrar Produto"}><i className="pi pi-plus"></i></Button>

        </BHeaderPage>
    );


    useEffect(() => {
        if(user){
            setLoading(true)
       const productsRef = getProductsRef(user?.id)
            onValue(productsRef, snapshot => {
                let list: Products[] = []
               snapshot.forEach((childSnapshot)=>{
                   const key = childSnapshot.key
                   let data = childSnapshot.val()
                   data.id = key
                   list.push(data)
               })
                setListProducts(list)
                setLoading(false)
            })

        }
        // getAllProducts().then(async response => {
        //     const data: Products[] = response.data
        //     setListProducts(data)
    //     })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleEditProduct = (product: Products) => {
        setOpenEdit(true);
        setProductSelect(product)
    }
    const handleDeleteProduct = (product: Products) => {
        setOpenDialogDelete(true);
        setProductSelect(product)
    }

    const handleConfirmDelete = ()=>{
        if(user){
        ProductFirebaseService.delete(user?.id, productSelect).then(() => {
            setOpenDialogDelete(false);
                alert("Produto excluido com sucesso!")
                // window.location.reload()
            })
        }
        // deleteProduct(Number(productSelect.id)).then(response => {
        //     const data = response.data
        //     alert(data.message)
        //     window.location.reload()
        // })
    }

    const ModalDelete = (<Modal open={openDialogDelete} close={() => setOpenDialogDelete(false)}
                       title={"Deseja Realmente Deletar Esse Produto?"}>
            <div className="flex flex-1 flex-col w-full gap-1 font-semibold">
                <h2>Nome: {productSelect.name}</h2>
                <h2>Descrição: {productSelect.description}</h2>
                <h2>Quantidade: {productSelect.quantity}</h2>
                <h2>valor: {productSelect.price}</h2>
                <footer className={' flex justify-end'}>
                    <ButtonFD onClick={handleConfirmDelete} id={"b-dialog-red"} style={{backgroundColor: "#ff0000"}}
                              title={"Confirmar"}/>

                </footer>
            </div>

        </Modal>)




    return (
        <div className="m-auto mt-2 ">
            <Loading open={loading}/>
            <Toast ref={toast}/>
            {open && <ModalNewProducts toast={toast} open={open} close={() => setOpen(false)} />}
            {openEdit && <ModalEditProducts toast={toast} open={openEdit}
                close={() => setOpenEdit(false)}
                product={productSelect}
            />}
            {ModalDelete}
            {header}
            <TableProducts handleEdit={handleEditProduct} handleDelete={handleDeleteProduct} list={listProducts} />

        </div>
    );
}
