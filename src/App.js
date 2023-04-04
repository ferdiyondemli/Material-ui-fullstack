import React, {Component, createContext, useContext, useEffect} from 'react';
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

const darkTheme = createTheme(
    {
        palette: {
            type: "dark",
            background: {
                default: "hsl(230, 17%, 14%)"
            }
        }

    },
    coreBgBG,

);const lightTheme = createTheme(
    {
        palette: {
            type: "light",
            background: {
                default: "hsl(0, 0%, 100%)"
            }

        }

    },
    coreBgBG,

);
const App = () => {

    const [user, setUser] = useState({ })
    /*  const [user, setUser] = useState({id: 7, kullaniciAdi: "12313", email: "yoloo", password: "12345", role: "user"}
    )*/



    const [mode, setMode] = useState("light");
    const selectedTheme = mode === "dark" ? darkTheme : lightTheme;

    const value = {user, setUser, mode, setMode }
    console.log(setUser)

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('yalo'));
        if (items) {
            setUser(prevState => items.user);
            setMode(prevState => items.mode)
        }
    }, []);

    useEffect(()=>{

        localStorage.setItem('yalo', JSON.stringify(value));

    },[user,mode])





     return (<>
         <SnackbarProvider>

         <ThemeProvider theme={selectedTheme}>

        <Context.Provider value={value} >

                        <Routes>

                            <Route path="/signup" element={user?.kullaniciAdi ?  <Navigate to="/home" replace={true} />:<Signup/>}/>
                            <Route path="/signin" element={user?.kullaniciAdi ?<Navigate to="/home" replace={true} />:<Signin/>}/>

                            <Route path="*" element={user?.kullaniciAdi ?<RoutesAuto/>:<Navigate to="/signin" replace={true} />}/>


                        </Routes>

            </Context.Provider>
        </ThemeProvider>
         </SnackbarProvider>

        </>

    )

}

export default App;
