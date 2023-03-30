 import React, {Component, createContext, useContext} from 'react';
import AcilirMenu from "../../src/components/menu/AcilirMenu"
 import Menu from "../../src/components/Menu"
import {BrowserRouter, Routes, Route, Link, Navigate} from "react-router-dom";
import Home from "../../src/Pages/Home"
import Signup from "../../src/Pages/Signup"
import Signin from "../../src/Pages/Signin"
import {Context} from '../../src/context/Context';
import {useState, useMemo} from "react"


 export default function Routelar (){


    const value = useContext(Context);


    return <AcilirMenu>


        <Routes>

            <Route path="*" element={ value?.user.ad?<Home/>: <Navigate to="/signin" replace={true} />}            />


        </Routes>


    </AcilirMenu>
}
