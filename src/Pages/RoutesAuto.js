 import React, {Component, createContext, useContext} from 'react';
import AcilirMenu from "../../src/components/menu/AcilirMenu"
 import Menu from "../Menu"
import {BrowserRouter, Routes, Route, Link, Navigate} from "react-router-dom";
import Home from "../../src/Pages/Home"
import Signup from "../../src/Pages/Signup"
import Signin from "../../src/Pages/Signin"
import {Context} from '../../src/context/Context';
import {useState, useMemo} from "react"
import Routelar from "../Routelar";

 export default function RoutesAuto (){


    const value = useContext(Context);


    return <AcilirMenu>


        <Routes>
            {Routelar.map((el, i)=>{
                {
                    console.log(el);
                }
               return <Route key={i} path={el.path} element={ value?.user?.kullaniciAdi?el.component: <Navigate to="/signin" replace={true} />}            />

            })
            }
            {/*<Route path="*" element={ value?.user?.kullaniciAdi?<Home/>: <Navigate to="/signin" replace={true} />}            />*/}


        </Routes>


    </AcilirMenu>
}
