import Settings from "./Pages/Settings";
import Home from "./Pages/Home";
import Bildirimler from "./Pages/Bildirimler";
import Account from "./Pages/Account";
const routelar = [
    {
        path: "/home",
        component:  <Home />,
    },
    {
        path: "/settings",
        component: <Settings />,
    },
    {
        path: "/bildirimler",
        component: <Bildirimler />,
    },
    {
        path: "/account",
        component: <Account />,
    }


]


export default routelar;