import React, {useState} from 'react'
import {Grid, Paper, Avatar, Typography, TextField, Button, Link} from '@material-ui/core'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import {SnackbarProvider, useSnackbar} from 'notistack';
import {validateEmail} from "../Utils";

import FormControl from '@material-ui/core/FormControl';

import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Alert from '@material-ui/lab/Alert';
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Signup = () => {
    const {enqueueSnackbar} = useSnackbar();

    const paperStyle = {padding: 20, width: "300px", margin: "0 auto"}
    const headerStyle = {margin: 0}
    const avatarStyle = {backgroundColor: '#1bbd7e'}

    const [name, setName] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [password2, setPassword2] = React.useState('');
    const [role, setRole] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [validation, setValidation] = useState({})
    let navigate = useNavigate();

    const fetchData = async () => {
        axios.post("http://localhost:8088/users/ekle", {
            kullaniciAdi: name, password: password, role: role, email: email,

        })
            .then((response) => {
                navigate("/signin");
                enqueueSnackbar("Hesabınız başarıyla oluşturuldu.")
            }).catch((e) => {
            enqueueSnackbar("Bir hata oluştu! Tekrar deneyiniz.")
        });
    };
    return (<Grid style={ {marginTop:"25px"} } >
        <Paper style={paperStyle}>
            <Grid align='center'>
                <Avatar style={avatarStyle}>
                    <AddCircleOutlineOutlinedIcon/>
                </Avatar>
                <h2 style={headerStyle}>Kayıt Ol</h2>
                <Typography variant='caption' gutterBottom>Hesap Oluşturmak için formu doldurunuz.</Typography>
            </Grid>
            <form>
                <TextField fullWidth label='Kullanıcı Adı' placeholder="Kullanıcı adı giriniz."
                           value={name}
                           onChange={(event) => {
                               if (event.target.value.length < 5) {
                                   setName(event.target.value);
                                   setValidation({
                                       ...validation, kullaniciAdi: "Kullanıcı Adı: Geçerli bir kullanıcı adı giriniz!"
                                   })
                               } else {
                                   delete validation.kullaniciAdi
                                   setName(event.target.value);
                               }
                           }}
                />
                <TextField fullWidth label='E-mail adresi' placeholder="Mail adresi giriniz."
                           value={email}
                           onChange={(event) => {
                               if ( !validateEmail(event.target.value)) {                                   setEmail(event.target.value);
                                   setValidation({
                                       ...validation, email: "E-mail: Geçerli bir e-mail adresi giriniz!"
                                   })
                               } else {
                                   delete validation.email
                                   setEmail(event.target.value);
                               }
                           }}
                />
                <FormControl fullWidth size="small" style={{marginTop: "10px"}}>
                    <InputLabel id="demo-simple-select-label">Role Seçiniz</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={role}
                        label="Role Seçiniz"
                        onChange={(event) => {
                            console.log(event.target.value);
                            if (!event.target.value) {
                                setRole(event.target.value);
                                setValidation({
                                    ...validation, role: "Role: Geçerli bir role seçiniz!"
                                })
                            } else {
                                delete validation.role
                                setRole(event.target.value);
                            }
                        }}
                    >
                        <MenuItem value={"admin"}>admin</MenuItem>
                        <MenuItem value={"user"}>user</MenuItem>
                    </Select>
                </FormControl>

                <TextField fullWidth label='Şifre' placeholder="Şifre giriniz."
                           value={password}
                           type={"password"}

                           onChange={(event) => {
                               if (event.target.value.length < 5) {
                                   setPassword(event.target.value);
                                   setValidation({
                                       ...validation, password: "İlk şifre: Geçerli bir şifre giriniz!"
                                   })
                               } else {
                                   delete validation.password

                                   setPassword(event.target.value);
                                   if (password2 !== event.target.value) {
                                       setValidation({
                                           ...validation, uyum: "Şifre uyumu: Girilen şifreler aynı deği!"
                                       })
                                   } else {
                                       delete validation.uyum

                                   }
                               }
                           }}
                />
                <TextField fullWidth label='Şifre tekrarı' placeholder="Tekrar şifre giriniz."
                           value={password2}
                           type={"password"}

                           onChange={(event) => {
                               if (event.target.value.length < 5) {
                                   setPassword2(event.target.value);
                                   setValidation({
                                       ...validation, password2: "İkinci şifre: Geçerli bir 2. şifre giriniz!"
                                   })


                               } else {
                                   delete validation.password2

                                   setPassword2(event.target.value);

                                   if (password !== event.target.value) {
                                       setValidation({
                                           ...validation, uyum: "Şifre uyumu: Girilen şifreler aynı deği!"
                                       })
                                   } else {
                                       delete validation.uyum

                                   }
                               }
                           }}
                />
                {(!name || !password || !password2 || !role) > 0 &&
                    <Button size={"small"} style={{textTransform: "none"}}
                            fullWidth color={"secondary"}>
                        Bilgilerinizi giriniz.
                    </Button>}
                <SnackbarProvider/>

                <Button style={{marginTop: "10px"}}
                        variant='contained' color='primary' fullWidth
                        onClick={() => {

                            fetchData()

                        }

                        }
                        disabled={(!name || !password || !password2 || !role) || Object.keys(validation).length > 0}>Kayıt
                    ol</Button>
                <Typography style={{marginTop: "10px"}}>Hesabınız var mı
                    <Link href="/signin">
                        ? Giriş yap
                    </Link>
                </Typography>

            </form>
            {Object.keys(validation).length > 0 && <Alert variant="outlined" severity="error">
                {

                    Object.keys(validation).length > 0 && Object.keys(validation).map((el, i) => {

                        return <div key={i}>{validation[el]}</div>
                    })

                }
            </Alert>}
        </Paper>
    </Grid>)
}

export default Signup;