import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { useState, createContext, useContext } from "react";
import { Context } from '../context/Context';
import {Link, useNavigate} from "react-router-dom";


const Home=()=>{

    let navigate = useNavigate();
    const value = useContext(Context);
    return <>

        Hello {  value?.user.kullaniciAdi}

        <Box>
             <Button variant="contained"  onClick={
                ()=> {
                    value.setUser({})
                    navigate("/home");
                }
            }>Çıkış yap</Button>

        </Box>

    </>
 }


 export default Home