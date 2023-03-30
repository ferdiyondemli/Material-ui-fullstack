import React, {Component, createContext, useContext} from 'react';
import AcilirMenu from "../src/components/menu/AcilirMenu"
import Menu from "../src/components/Menu"
import {BrowserRouter, Routes, Route, Link, Navigate} from "react-router-dom";
import Home from "../src/Pages/Home"
import Signup from "../src/Pages/Signup"
import Signin from "../src/Pages/Signin"
import Routelar from "../src/Pages/Routelar"
import {Context} from '../src/context/Context';
import {useState, useMemo} from "react"
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
 import { trTR
        as coreBgBG } from '@material-ui/core/locale';

const theme = createTheme(
    {

    },
    coreBgBG,
);
const App = () => {

    const [user, setUser] = useState({})
    const value = useMemo(() => ({user, setUser}), [user?.ad]);

    console.log(user?.ad);
    return (<>
        <ThemeProvider theme={theme}>

        <Context.Provider value={value} >

                        <Routes>

                            <Route path="/signup" element={user?.ad ?  <Navigate to="/home" replace={true} />:<Signup/>}/>
                            <Route path="/signin" element={user?.ad ?<Navigate to="/home" replace={true} />:<Signin/>}/>

                            <Route path="*" element={user?.ad ?<Routelar/>:<Navigate to="/signin" replace={true} />}/>


                        </Routes>

            </Context.Provider>
        </ThemeProvider>;

        </>

    )

}

export default App;
