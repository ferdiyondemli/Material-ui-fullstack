import Settings from "./Pages/Settings";
import Home from "./Pages/Home";
import Bildirimler from "./Pages/Bildirimler";
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
    }


]


export default routelar;