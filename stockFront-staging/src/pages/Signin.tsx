import React, {useRef, useState} from 'react';
import {Input} from "../components/Input";
import {Button} from "../components/Buttons/Button";
import {useAuth} from "../context/Auth";
import Logo from '../assets/logo-image.png'
import {LoadingButtons} from "../components/Loading/LoadingButtons";
import {Toast} from "primereact/toast";
import {toastMessage} from "../utils/alerts-switch";
import {MSGERRORLOGIN} from "../utils/strings/msgs/alerts";

const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const toast = useRef<Toast>(null)

    // @ts-ignore
    const { signin, loading } = useAuth()
    const handleLogin = async () => {

        signin(email, password).then(()=>{

        }).catch(()=>{
            // @ts-ignore
            exibirToastError()

        }).finally(()=>{

        })
    };

    const exibirToastError = () => {
        if (toast.current) {
            toastMessage(toast.current, "error", MSGERRORLOGIN, "login")
        }


    };

    return (
        <>
            <Toast ref={toast}/>
        <div className="flex justify-center items-center h-full">
            <div className="flex justify-center items-center flex-col gap-2 w-1/3 mb-20">
            <img src={Logo} alt="logoSistema" className={"w-[200px]"}/>
            {/*<h2>Login</h2>*/}
            <div className="flex items-start flex-col w-full">
                <label>Email:</label>
                <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="flex items-start flex-col w-full">
                <label>Senha:</label>
                <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <Button onClick={handleLogin}>{loading ? <LoadingButtons/> : "Login"}</Button>
        </div>
        </div>
        </>
    );
};

export default Signin;
