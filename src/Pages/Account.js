import {Button, Grid, Paper, TextField, Typography, Tooltip} from "@material-ui/core";
import {Context} from "../context/Context";
import React, {useState, createContext, useContext, useEffect} from "react";
import Alert from "@material-ui/lab/Alert";
import {validateEmail} from "../Utils";
import axios from "axios";
import {useSnackbar} from "notistack";

const Home = () => {
    const {enqueueSnackbar} = useSnackbar();

    const paperStyle = {padding: 20, width: 300, margin: "0 auto"}
    const value = useContext(Context);
    const [name, setName] = React.useState(value.user.kullaniciAdi);
    const [email, setEmail] = React.useState(value.user.email);
    const [validation, setValidation] = useState({})
    const [password, setPassword] = React.useState("");
    const [password2, setPassword2] = React.useState("");
    const [mevcutPassword, setMevcutPassword] = React.useState("");


    useEffect(() => {

        console.log(mevcutPassword);
        if (!mevcutPassword) {
            console.log("mevcutPassword yok");

            setValidation({
                ...validation, guncellePassword: "Güncellemek mevcut şifrenizi giriniz!"
            })
        } else {
            console.log("mevcutPassword var");

            delete validation.guncellePassword
            setValidation({
                ...validation
            })
        }
    }, [mevcutPassword])
    const fetchData = async () => {

        axios.put("http://localhost:8088/users/guncelle", {
            kullaniciAdi: name, password: password, email: email, id: value.user.id, eskiPassword: mevcutPassword

        })
            .then((response) => {
                value.setUser(prevState => response.data)
                enqueueSnackbar("Hesabınız başarıyla güncellendi.")

                setMevcutPassword(prevState => "")
                setPassword(prevState => "")
                setPassword2(prevState => "")

            }).catch((e) => {
            enqueueSnackbar("Bir hata oluştu! Tekrar deneyiniz.")

        });


    };

    return <>
        <h1 align={"center"}>Hesabım</h1>

        <Grid>

            <Paper style={{padding: "10px 10px 20px 10px"}}>
                <h3>Kullanıcı Bilgileri</h3>

                <form style={{margin: " 10px 0 10px 0"}}>

                    <Grid container spacing={1}>

                        <Grid item xs={4}>

                            <TextField fullWidth variant="outlined"
                                       value={name}

                                       onChange={(event) => {


                                           if (event.target.value.length < 5) {
                                               setName(event.target.value);
                                               setValidation({
                                                   ...validation,
                                                   kullaniciAdi: "Kullanıcı Adı: Geçerli bir kullanıcı adı giriniz!"
                                               })
                                           } else {
                                               delete validation.kullaniciAdi
                                               setName(event.target.value);
                                           }
                                       }}
                                       label={" Kullanıcı adı:"}
                            />
                        </Grid>
                        <Grid item xs={6}>

                            <TextField fullWidth variant="outlined"
                                       value={email}
                                       onChange={(event) => {
                                           if (!validateEmail(event.target.value)) {
                                               setEmail(event.target.value);
                                               setValidation({
                                                   ...validation, email: "E-mail: Geçerli bir e-mail adresi giriniz!"
                                               })
                                           } else {
                                               delete validation.email
                                               setEmail(event.target.value);
                                           }
                                       }}
                                       label={"Email:"}
                            />
                        </Grid>


                        <Grid item xs={6}>

                            <TextField variant="outlined" fullWidth label='Yeni Şifre' placeholder="Yeni Şifre giriniz."
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
                        </Grid>
                        <Grid item xs={6}>

                            <TextField variant="outlined" fullWidth label='Yeni Şifre tekrarı'
                                       placeholder="Tekrar yeni şifre giriniz."
                                       value={password2}
                                       type={"password"}
                                       onChange={(event) => {
                                           if (event.target.value.length < 5) {
                                               setPassword2(event.target.value);
                                               setValidation({
                                                   ...validation,
                                                   password2: "İkinci şifre: Geçerli bir 2. şifre giriniz!"
                                               })


                                           } else {
                                               delete validation.password2

                                               setPassword2(event.target.value);

                                               if (password !== event.target.value) {
                                                   setValidation({
                                                       ...validation, uyum: "Şifre uyumu: Girilen yeni şifreler aynı deği!"
                                                   })
                                               } else {
                                                   delete validation.uyum

                                               }
                                           }
                                       }}
                            />
                        </Grid>
                        <Grid item xs={6}>

                            <TextField variant="outlined" fullWidth label='Mevcut şifre'
                                       placeholder="Mevcut şifreyi giriniz."
                                       value={mevcutPassword}
                                       type={"password"}

                                       onChange={(event) => {
                                           if (event.target.value.length < 5) {
                                               setMevcutPassword(event.target.value);
                                               setValidation({
                                                   ...validation,
                                                   mecvutPassword: "Mevcut şifre: Geçerli bir şifre giriniz!"
                                               })


                                           } else {
                                               delete validation.mecvutPassword

                                               setMevcutPassword(event.target.value);


                                           }
                                       }}
                            />
                        </Grid>
                    </Grid>
                    <Tooltip title="Güncellemek içn mevcut şifrenizi giriniz." arrow>
                        <div>


                            <Button style={{marginTop: "10px"}}
                                    variant='contained' color='primary' fullWidth
                                    onClick={() => {

                                        fetchData()

                                    }

                                    }
                                    disabled={(!name || !mevcutPassword) || Object.keys(validation).length > 0}>
                                Güncelle
                            </Button>
                        </div>
                    </Tooltip>


                </form>

                {Object.keys(validation).length > 0 && <Alert variant="outlined" severity="error">
                    {

                        Object.keys(validation).length > 0 && Object.keys(validation).map((el, i) => {

                            return <div key={i}>{validation[el]}</div>
                        })

                    }
                </Alert>}
            </Paper>
        </Grid>
    </>
}


export default Home