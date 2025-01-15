import axios from "axios"
import { useContext, useEffect, useState } from "react"
import Cookies from "universal-cookie"
import { user } from "./UsersContext"
import Loading from "../companat/Loding"
import { Outlet } from "react-router-dom"
export default function RefreshUser() {
    const cookie = new Cookies()
    const users = useContext(user)
    const token = users.auth.token
    const tokenCookie = cookie.get("Bearer")
    const [load, setLoad] = useState(true)
    useEffect(() => {
        async function refresh() {
            try {
                await axios.post("http://127.0.0.1:8000/api/refresh", null, {
                    headers: {
                        Authorization: `Bearer ${tokenCookie}`
                    }
                }).then(
                    (data => {
                        cookie.set("Bearer", data.data.token, { path: "/" })
                        users.setAuth(() => { return { token: data.data.token, userD: data.data.user } })
                    })
                )




            } catch (err) {
                console.log(err)
            } finally {
                setLoad(false)
            }
        }
        !token ? refresh() : setLoad(false)
    })

    return (
        load ? <Loading /> : <Outlet />
    )
}

