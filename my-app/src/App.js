import { Route, Routes } from "react-router-dom"
import Home from "./webSite/Home"
import Dashboard from "./page/DashBoard"
import SignUp from "./webSite/Auth/Register"
import Login from "./webSite/Auth/Login"
import Users from "./page/users/Users"
import RequierAuth from "./webSite/Auth/RequierAuth"
import UpdateUser from "./page/users/UpdateUser"
import About from "./webSite/About"
import Call from "./webSite/Call"
import RefreshUser from "./context/RefreshUser"
import NewUser from "./page/users/NewUser"
import NewProdact from "./page/prodact/NewProdact"
import Prodact from "./page/prodact/Prodact"
import UpdateProdact from "./page/prodact/UpdateProdact"
export default function App() {
    return (
        <div>

            <Routes>

                <Route path="/" element={<Home />} >
                </Route>
                <Route path="/about" element={<About />} />
                <Route path="/call" element={<Call />} />
                <Route path="/register" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route element={<RefreshUser />}>
                    <Route element={<RequierAuth />}>
                        <Route path="/dashboard" element={<Dashboard />} >
                            <Route path="user" element={<Users />} />
                            <Route path="user/:id" element={<UpdateUser />} />
                            <Route path="newUser" element={<NewUser />} />
                            <Route path="newProdact" element={<NewProdact />} />
                            <Route path="prodact" element={<Prodact />} />
                            <Route path="prodact/:id" element={<UpdateProdact />} />
                        </Route>
                    </Route>
                </Route>
            </Routes>
        </div>
    )
}