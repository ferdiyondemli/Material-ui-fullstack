import React, {useContext} from 'react';
import clsx from 'clsx';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from "../../Menu"
import {Navigate, useNavigate,Link} from "react-router-dom";
 import {Context} from '../../context/Context';
import Avatar from '@material-ui/core/Avatar';
import {deepOrange, deepPurple} from '@material-ui/core/colors';
import {Switch} from '@material-ui/core';

const drawerWidth = 240;
import MenuUi from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {useSnackbar} from "notistack";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    }, appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp, duration: theme.transitions.duration.leavingScreen,
        }),
    }, appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut, duration: theme.transitions.duration.enteringScreen,
        }),
    }, menuButton: {
        marginRight: theme.spacing(2),
    }, hide: {
        display: 'none',
    }, drawer: {
        width: drawerWidth, flexShrink: 0,
    }, drawerPaper: {
        width: drawerWidth,
    }, drawerHeader: {
        display: 'flex', alignItems: 'center', padding: theme.spacing(0, 1), // necessary for content to be below app bar
        ...theme.mixins.toolbar, justifyContent: 'flex-end',
    }, content: {
        flexGrow: 1, padding: theme.spacing(3), transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp, duration: theme.transitions.duration.leavingScreen,
        }), marginLeft: -drawerWidth,
    }, contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut, duration: theme.transitions.duration.enteringScreen,
        }), marginLeft: 0,
    },
}));

export default function AcilirMenu({children}) {
    let navigate = useNavigate();
    const {enqueueSnackbar} = useSnackbar();


    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const value = useContext(Context);


    return (<div className={classes.root}>
        <CssBaseline/>
        <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
                [classes.appBarShift]: open,
            })}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    className={clsx(classes.menuButton, open && classes.hide)}
                >
                    <MenuIcon/>
                </IconButton>
                <Typography variant="h6" noWrap>
                    Yalo Baba
                </Typography>
                <Switch color={"info"} onChange={() => value.setMode(value.mode === "light" ? "dark" : "light")} />

                <Avatar style={{backgroundColor: "grey", position: "absolute", right: "50px"}}
                        aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}
                >{value.user.kullaniciAdi.charAt(0).toUpperCase()}</Avatar>
                <MenuUi
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={() => {
                        handleClose()
                        navigate("/account");
                    }}>Hesabım</MenuItem>
                    <MenuItem onClick={() => {
                        handleClose()
                        navigate("/settings");
                    }}>Ayarlar</MenuItem>
                    <MenuItem onClick={() => {
                        handleClose()
                        value.setUser({})
                        navigate("/home");
                        enqueueSnackbar("Çıkış yapıldı.")
                    }}>Çıkış yap</MenuItem>
                </MenuUi>
            </Toolbar>
        </AppBar>
        <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
                paper: classes.drawerPaper,
            }}
        >

                <div style={{  margin:"0 0 0 10px" }} className={classes.drawerHeader}>

                    <IconButton    onClick={handleDrawerClose}>
{/*
                        <img style={{width:"170px", backgroundColor:"grey",  borderRadius:"5px" }} src={"https://www.yildirimlargiyim.com.tr/UserFiles/Fotograflar/2593-untitled-2-png-untitled-2.png"}/>
*/}

                        {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                    </IconButton>
                </div>

            <Divider/>
            <List >
                {Menu.map((el, index) => (<Link className={"ali"} style={{textDecoration: "none",

                    ...(theme.palette.type=="light"? {color: "#3f51b5"}:{color: "white"})
                    // Todo inline css
                }}
                                                hidden={!(value.user.role === "admin") && !(value.user.role === el.role)}
                                                to={el.path}
                                                key={index}> <ListItem button key={index} href="/sd">
                    <i className={el.icon}></i>
                  <ListItemText  primary={el.label}/>
                </ListItem>
                </Link>))}
            </List>


        </Drawer>
        <main
            className={clsx(classes.content, {
                [classes.contentShift]: open,
            })}
        >
            <div className={classes.drawerHeader}/>
            {children}
        </main>
    </div>);
}
