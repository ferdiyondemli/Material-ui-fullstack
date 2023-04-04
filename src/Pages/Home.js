import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import {useState, createContext, useContext} from "react";
import {Context} from '../context/Context';
import {Link, useNavigate} from "react-router-dom";


const Home = () => {

    let navigate = useNavigate();
    const value = useContext(Context);
    return <>
        Hoşgeldin {value?.user.kullaniciAdi}
    </>
}


export default Home