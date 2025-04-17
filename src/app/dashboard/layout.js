import Sidebar from "../ui/dashboard/sidebar/sidebar";
import Navbar from "../ui/dashboard/navbar/navbar";
import { children } from "react";
import style from "../ui/dashboard/dashboard.module.css";
const Layout = ({children}) => {
    return(
        <div className={style.container}>
            <div className={style.menu}>
                <Sidebar/>
            </div>
            <div className={style.content}>
                <Navbar/>
                {children}
            </div>
        </div>
    )
}
export default Layout