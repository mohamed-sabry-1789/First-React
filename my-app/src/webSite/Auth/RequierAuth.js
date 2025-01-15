import { useContext } from "react"
import { user } from "../../context/UsersContext"
import { Navigate, Outlet, useLocation } from "react-router-dom"

export default function RequierAuth() {
    const users = useContext(user)
    const location = useLocation()
    return users.auth.userD ? <Outlet /> : <Navigate state={{ from: location }} replace to="/login" />
}