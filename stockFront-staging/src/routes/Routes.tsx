import React from 'react';
import {Route, Routes as Switch} from 'react-router-dom';
import {Home} from '../pages/Home';
import {Products} from '../pages/Products';
import {NewCheckOut} from '../pages/NewCheckOut';
import {Orders} from '../pages/Orders';
import {ProductEntry} from '../pages/ProductEntry';
import {EntryRecords} from '../pages/EntryRecords';
import Signin from '../pages/Signin';
import {useAuth} from '../context/Auth';

export function Routes() {
    const {user} = useAuth();

    return (

            <Switch>
                <Route element={<Signin/>} path="/login"/>
            {user && <>
                <Route element={<Home/>} path="/"/>
                <Route element={<Products/>} path="/products"/>
                <Route element={<NewCheckOut/>} path="/newcheckout"/>
                <Route element={<ProductEntry/>} path="/productentry"/>
                <Route element={<EntryRecords/>} path="/entryrecords"/>
                <Route element={<Orders/>} path="/orders"/>
            </>
            }
            <Route element={<Signin/>} path="*"/>
        </Switch>

    );
}
