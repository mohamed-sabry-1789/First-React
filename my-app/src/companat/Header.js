import { Link, NavLink } from 'react-router-dom'
import './header.css'
import Cookies from 'universal-cookie'
import axios from 'axios'

export default function Header() {

    const cookie = new Cookies()
    const tokenCookie = cookie.get("Bearer")
    async function handelLogout() {
        await axios.post("http://127.0.0.1:8000/api/logout", null, {
            headers: {
                Authorization: `Bearer ${tokenCookie}`
            }
        })
        cookie.remove("Bearer", { path: "/" })
        window.location = "/"

    }
    return (
        <div className="flex header">
            <ul style={{ display: "flex", gap: "10px" }} >
                <NavLink to="/">Home</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/call">Call</NavLink>
            </ul>
            <div>
                {!tokenCookie ?
                    <>
                        <Link className="button" to="/register">Register</Link>
                        <Link className="button" to="/login">Login</Link>
                    </>
                    :
                    <>
                        <Link className="button" to="/dashboard">Dashboard</Link>
                        <div style={{ display: "inline-block" }} className='button' onClick={handelLogout}>Log Out</div>
                    </>
                }
            </div>
        </div>
    )
}