import { Outlet } from "react-router-dom"
import NavBar from "../companat/NavBar"
import TopBar from "../companat/TopBar"
import { useContext } from "react"
import { user } from "../context/UsersContext"
import Cookies from "universal-cookie"
export default function Dashboard() {
    const users = useContext(user)
    const cookie = new Cookies()
    const tokenCookie = cookie.get("Bearer")

    return (
        <div>
            <TopBar />
            <div className="flexUser" >
                <NavBar />
                <div style={{ width: "100%" }}>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}