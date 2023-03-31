import React, {Component, createContext, useContext} from 'react';
import AcilirMenu from "../src/components/menu/AcilirMenu"
import Menu from "./Menu"
import {BrowserRouter, Routes, Route, Link, Navigate} from "react-router-dom";
import Home from "../src/Pages/Home"
import Signup from "../src/Pages/Signup"
import Signin from "../src/Pages/Signin"
import RoutesAuto from "./Pages/RoutesAuto"
import {Context} from '../src/context/Context';
import {useState, useMemo} from "react"
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
 import { trTR
        as coreBgBG } from '@material-ui/core/locale';
import { SnackbarProvider, useSnackbar } from 'notistack';

const theme = createTheme(
    {

    },
    coreBgBG,
);
const App = () => {

    const [user, setUser] = useState({})
    const value = {user, setUser}

     return (<>
         <SnackbarProvider>

         <ThemeProvider theme={theme}>

        <Context.Provider value={value} >

                        <Routes>

                            <Route path="/signup" element={user?.kullaniciAdi ?  <Navigate to="/home" replace={true} />:<Signup/>}/>
                            <Route path="/signin" element={user?.kullaniciAdi ?<Navigate to="/home" replace={true} />:<Signin/>}/>

                            <Route path="*" element={user?.kullaniciAdi ?<RoutesAuto/>:<Navigate to="/signin" replace={true} />}/>


                        </Routes>

            </Context.Provider>
        </ThemeProvider>;
         </SnackbarProvider>

        </>

    )

}

export default App;
