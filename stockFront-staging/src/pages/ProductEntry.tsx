import React, {FormEvent, useEffect, useState} from 'react';
import {PickItens} from "../components/PickerList/PickItens";
import {Order, Products} from "../utils/@Types";
import {ButtonArrow} from '../components/Buttons/ButtonArrow';
import {useNavigate} from "react-router-dom";
import {BHeaderPage} from "../components/BHeaderPage";
import {ButtonArrowBack} from "../components/Buttons/ButtonArrowBack";
import {ConfirmProductEntry} from '../components/ProductEntry/ConfirmProductEntry';
import {onValue} from "firebase/database";
import {getProductsRef} from "../database/Firebase/producst";
import {useAuth} from "../context/Auth";

export function ProductEntry() {
    const [open, setOpen] = useState<boolean>(false);
    const [listProductsSelected, setListProductsSelected] = useState<Products[]>([]);
    const [selectToAdd, setSelectToAdd] = useState<Products>({} as Products);
    const [selectToRemove, setSelectToRemove] = useState<Products>({} as Products);
    const [listProducts, setListProducts] = useState<Products[]>([]);
    const [search, setSearch] = useState({
        stock: '',
        selected: ''
    });
    const [formData, setFormData] = useState<Order>({} as Order);
    const navigate = useNavigate();
    const { user, setLoading} = useAuth()
    function goTo() {
        navigate("/")
    }

    const header = (
        <BHeaderPage>
            <ButtonArrowBack onClick={goTo} />
            Registar Entrada
        </BHeaderPage>
    );



    const listedFilter = listProducts.filter(product => product.name.toUpperCase().includes(search.stock.toUpperCase()))
    const selectedListedFilter = listProductsSelected.filter(product => product.name.toUpperCase().includes(search.selected.toUpperCase()))


    useEffect(() => {
        setLoading(true)
        if(user){
            const productsRef = getProductsRef(user?.id)
            onValue(productsRef, snapshot => {
                let list: Products[] = []
                snapshot.forEach((childSnapshot)=>{
                    const key = childSnapshot.key
                    const data = childSnapshot.val()
                    data.id= key
                    list.push(data)
                })
                setListProducts(list)
                setLoading(false)
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function handleAddProduct() {
        if (selectToAdd.id) {
            setListProductsSelected(prevState => [...prevState, selectToAdd]);
            setListProducts(listProducts.filter(item => item.id !== selectToAdd.id && item));
            setSelectToAdd({} as Products);
        }
    }

    function handleRemoveProduct() {
        if (selectToRemove.id) {
            setListProducts(prevState => [...prevState, selectToRemove]);
            setListProductsSelected(listProductsSelected.filter(item => item.id !== selectToRemove.id && item));
            setSelectToRemove({} as Products);
        }
    }

    const handleSubmitOrder = (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (listProductsSelected.length) {
            setFormData({
                ...formData,
                products: listProductsSelected,
                total: formData.total,
            });
            setOpen(true);
        }
    }

    const handleCloseModalOrder = () => {
        setOpen(false)
        window.location.reload()
    }

    return (
        <div className={'flex flex-col'}>
            {open &&
                <ConfirmProductEntry products={listProductsSelected} open={open} close={handleCloseModalOrder} />

            }
            {header}
            {/* <div className="flex gap-2 p-1 justify-center items-center">
                <Input type={'text'} placeholder={'Nome do Cliente'}
                    onChange={(e: React.FormEvent<HTMLInputElement>) =>
                        setFormData({ ...formData, name: e.currentTarget.value })}

                />
                <Input type={'date'} placeholder={'Data'}
                    onChange={(e: React.FormEvent<HTMLInputElement>) =>
                        setFormData({ ...formData, date: e.currentTarget.value })}
                />
            </div> */}
            <div className="flex gap-2 p-2 justify-center items-center">
                <PickItens
                    text={"Produtos"}
                    itemSelected={selectToAdd}
                    list={listedFilter}
                    search={(s) => setSearch({ ...search, stock: s })}
                    setItemSelect={setSelectToAdd} />
                <div id={'buttons'} className={'flex flex-col gap-2'}>
                    <ButtonArrow onClick={handleAddProduct}><i
                        className={'pi pi-angle-right'}></i></ButtonArrow>
                    <ButtonArrow onClick={handleRemoveProduct} ><i
                        className={'pi pi-angle-left'}></i></ButtonArrow>
                </div>
                <PickItens
                    text={"Produto(s) Selecionado(s)"}
                    list={selectedListedFilter}
                    search={(s) => setSearch({ ...search, selected: s })}
                    itemSelected={selectToRemove}
                    setItemSelect={setSelectToRemove} />


            </div>
            <p>{formData.total}</p>
            <button type={'submit'}
                id="b-default"
                onClick={handleSubmitOrder}
                className={'bg-bgPrimary my-5 ml-auto mr-10 px-14 py-2 rounded font-bold text-white'}>
                Confirmar
            </button>
        </div>
    );
}
