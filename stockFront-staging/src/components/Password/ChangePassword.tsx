import {Modal} from "../Modal";
import React, {useCallback, useState} from "react";
import {Button} from "../Buttons/Button";
import {Input} from "../Input";
// import {getToastMessage} from "../../utils/alerts-switch";
import {useAuth} from "../../context/Auth";
import {getAuth, updatePassword} from 'firebase/auth'
import {Loading} from "../Loading/Loading";

interface Props {
    open: boolean,
    onClose: () => void
}

export const ChangePassword = ({open, onClose}: Props) => {

    const [password, setPassword] = useState<string>("")
    const [newPassword, setNewPassword] = useState<string>("")
    const [rePassword, setRePassword] = useState<string>("")
    const [isValid, setIsValid] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const {user, signin, loading} = useAuth()
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (newPassword !== rePassword) {
            return false;
        }
        // if(!IsValidPassword(newPassword)){
        //
        //     return false;
        // }
        setIsValid(true)
    if(user){


        // signin(user.email!, password).then(()=>{
            const firebaseUser = getAuth().currentUser;
            if (firebaseUser) {
                 console.log(firebaseUser)
                updatePassword(firebaseUser, newPassword)
                    .then(() => {
                        alert('Senha alterada com sucesso!');
                        onClose()
                    })
                    .catch((error) => {
                        console.error('Erro ao alterar a senha:', error);
                    })
            }
        // }).catch((e)=>
        // alert(e))
    }

        // let product = formData;
        // product.price = product.price.toString().replace(',', '.')
        // // console.log(product)
        // if (user){
        //     setLoading(true)
        //     ProductFirebaseService.create(user?.id, product).then(()=>{
        //         // alert('Product saved successfully');
        //         if(
        //             toast.current
        //         ){
        //             toast.current.show(getToastMessage("success", 'Produto inserido com successo'))
        //         }
        //         close()
        //     }).catch(()=>{
        //         toast.current?.show(getToastMessage("error", 'Erro ao tentar inserir produto'))
        //     }).finally(()=>{
        //         setLoading(false)
        //     })
        // }
        // // registerProduct(product).then((response) => {
        // //     alert('Product saved successfully');
        // //     window.location.reload()
        // // });
// eslint-disable-next-line
    }, [])



    return (
        <>

        <Modal open={open} close={onClose} title="Alterar senha">

            <form onSubmit={handleSubmit}
            className={"flex flex-col gap-5"}
            >
            {/*    <FormControl sx={{ m: 1 }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        fullWidth
                        id="outlined-adornment-password"
                        color="success"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                    />
                </FormControl>*/}
                <div>
                <label>Senha:</label>
                <Input
                    required
                    className={"m-2"}
                    id={'pass'}
                    type={"password"}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                </div>
                <div>
                    <label>Nova Senha:</label>
                <Input
                    required
                    id={'pass-new'}
                    type={"password"}
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                />
                </div>
                <div>
                    <label>Confirmar senha:</label>
                <Input
                    required
                    id={'pass-re'}
                    type={"password"}
                    value={rePassword}
                    onChange={e => setRePassword(e.target.value)}
                />
                </div>
                {/*<Message*/}
                <Button type={"submit"} title={"Confirmar"} />
            </form>
        </Modal>
            <Loading open={loading}/>
        </>
    )
}
