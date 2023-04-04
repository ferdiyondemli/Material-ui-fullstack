import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import React, {useState, createContext, useContext} from "react";
import {Context} from '../context/Context';
import {   useNavigate} from "react-router-dom";
import {Grid, Typography,Paper,Link} from "@material-ui/core";


const NoPage = () => {
    const paperStyle = {padding: 20, width: "800px", margin: "100px auto"}
    const value = useContext(Context);

     return <>
        <Grid>
            <Paper style={paperStyle}>
            <h1 style={ {textAlign:"center"} }>Aradığnız sayfa bulunamamaktadır.</h1>
             <Typography style={ {textAlign:"center"} }>
                 {value.user.kullaniciAdi? <Link style={ {textDecoration:"none"} } href="/home">
                     Anasayfa
                 </Link>: <Link style={ {textDecoration:"none"} } href="/signup">
                     Anasayfa
                 </Link>
                 }
            </Typography>
            </Paper>
        </Grid>
    </>
}


export default NoPage