import {BHeaderPage} from "../components/BHeaderPage";
import {TableOrder} from "../components/TableOrders/TableOrder";
import {Order} from "../utils/@Types";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {ButtonArrowBack} from "../components/Buttons/ButtonArrowBack";
import {getOrderRef} from "../database/Firebase/orders";
import {useAuth} from "../context/Auth";
import {onValue} from "firebase/database";

export const Orders = () => {

    const [orders, setOrders] = useState<Order[]>([]);
const {user, setLoading} = useAuth()
    const navigate = useNavigate();

    function goTo() {
        navigate("/")
    }

    useEffect(() => {
        if (user){
            setLoading(true)
        onValue(getOrderRef(user?.id), snapshot => {
            let list: Order[] = []
            snapshot.forEach((childSnapshot)=>{
                const key = childSnapshot.key
                let data = childSnapshot.val()
                data.id = key
                list.push(data)
            })
            setOrders(list)
            setLoading(false)
        })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <div>
            <BHeaderPage>
                <ButtonArrowBack onClick={goTo} />
                Pedidos
            </BHeaderPage>
            <TableOrder list={orders} />
        </div>
    )
}
