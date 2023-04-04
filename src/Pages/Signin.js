import React, {useContext, useState} from 'react'
import {Grid, Paper, Avatar, TextField, Button, Typography, Link, withMobileDialog} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {Context} from '../../src/context/Context';
import Select, {SelectChangeEvent} from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Box from '@material-ui/core/Box';
import axios from "axios";

import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/Alert';
import {useNavigate} from "react-router-dom";
import {useSnackbar} from "notistack";

const Signin = ({}) => {
    const navigate = useNavigate();
    const {enqueueSnackbar} = useSnackbar();

    const value = useContext(Context);
    const paperStyle = {padding: 20, height: '53vh', width: 300, margin: "0 auto"}
    const avatarStyle = {backgroundColor: '#1bbd7e'}
    const btnstyle = {marginTop: '8px'}
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [validation, setValidation] = useState({})

    const fetchData = async () => {


        axios.post("http://localhost:8088/users/giris", {
            email: email, password: password
        }).then((response) => {
            console.log(response);
            if (response?.data) {
                value.setUser(response.data)
                navigate("/home");
                enqueueSnackbar("Giriş başarılı")
            } else {
                enqueueSnackbar("Bir hata oluştu! Tekrar deneyiniz. ")
            }
        }).catch((e) => {
            console.log(e)
            console.trace()
            enqueueSnackbar("Bir hata oluştu! Tekrar deneyiniz. ")

        });


    };
    console.log(value.user);
    return (<Grid>
        <Paper style={paperStyle}>
            <Grid align='center'>
                <Avatar style={avatarStyle}><LockOutlinedIcon/>
                </Avatar>
                <h2>Giriş yap</h2>
            </Grid>

            <TextField style={{marginTop: "10px"}} label='Email' placeholder='Email adresinizi giriniz.' fullWidth
                       required
                       value={email}
                       onChange={(event) => {
                           if (event.target.value.length < 4) {
                               setValidation({
                                   ...validation, email: "email: Geçerli bir email adresi giriniz!"
                               })
                               setEmail(event.target.value);

                           } else {
                               delete validation.email
                               setEmail(event.target.value);
                           }


                       }}/>

            <TextField style={{marginTop: "10px"}} label='Şifre' placeholder='Şifre giriniz.' type='password' fullWidth
                       required
                       value={password}
                       type={"password"}

                       onChange={(event) => {
                           if (event.target.value.length < 3) {
                               setValidation({
                                   ...validation, sifre: "Şifre: Geçerli bir şifre giriniz!"
                               })
                               setPassword(event.target.value);

                           } else {
                               delete validation.sifre
                               setPassword(event.target.value);
                           }

                       }}/>

            {(!email || !password) > 0 && <Button size={"small"} style={{textTransform: "none"}}
                                                  fullWidth color={"secondary"}>
                Bilgilerinizi giriniz.
            </Button>}

            <Button color='primary' variant="contained" style={btnstyle} fullWidth onClick={() => {
                fetchData()

            }}

                    style={{textTransform: "none", marginTop: "10px"}}
                    disabled={Object.keys(validation).length > 0 || !email || !password}>GİRİŞ YAP</Button>
            <Typography style={{marginTop: "10px"}}>
                <Link href="/forgotpassword">
                    Şifremi unuttum.
                </Link>
            </Typography>
            <Typography> Hesabınız var mı
                <Link href="/signup">
                    ? Kayıt ol.
                </Link>
            </Typography>
            {Object.keys(validation).length > 0 && <Alert variant="outlined" severity="error">
                {

                    Object.keys(validation).length > 0 && Object.keys(validation).map((el, i) => {
                        console.log(validation);
                        return <div key={i}>{validation[el]}</div>
                    })

                }
            </Alert>}

        </Paper>
    </Grid>)
}

export default Signin