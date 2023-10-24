import React, {createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState} from "react";
import {getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {get, remove, save} from "../database/Local";
import {contants} from "../utils/contants";
import {useNavigate} from "react-router-dom";

export type User = {
    id: string;
    name: string | null;
    email: string | null;
    password: string;
};

type AuthContextType = {
    user: User | null;
    setUser: Dispatch<SetStateAction<User | null>>;
    signin: (email: string, password: string)=>Promise<void>;
    loggoff: ()=>void;
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
};

type AuthProps = {
    children: ReactNode;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const Auth = ({ children }: AuthProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate()


   function signin (email: string, password: string){
        const auth = getAuth();
        setLoading(true)
      return signInWithEmailAndPassword(auth, email, password).then((userCred)=>{
            const user = userCred.user
            const myUser: User = {
                id: user.uid,
                name: user.displayName,
                email: user.email,
                password: user.refreshToken
            }
            save(contants.USER_LOCAL, myUser)
            setUser(myUser)
            // alert("login success!")
          navigate("/")

        }).catch((error)=>{
            console.log(error)
          throw new Error(error);
           // alert("Ocorreu um erro ao tentar fazer o login, verifique as informaçôes e tente novamente!")
        }).finally(()=>{
            setLoading(false)
       })
    }

function loggoff(){
    const auth = getAuth();
    setLoading(true)
    signOut(auth).then(() => {
        setUser(null)
        remove(contants.USER_LOCAL)
    }).catch(() => {

    }).finally(()=>{
        setLoading(false)
    })
}



    useEffect(()=>{
        getAuth().onAuthStateChanged(authUser=>{
            if(authUser){
                // console.log(authUser)
            }else{
                navigate("/login")
            }
        })

       setUser(get(contants.USER_LOCAL))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <AuthContext.Provider value={{ user, setUser, signin, loading, setLoading, loggoff }}>

            {children}
        </AuthContext.Provider>
    )
}

// Criando um hook personalizado para utilizar o contexto
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
