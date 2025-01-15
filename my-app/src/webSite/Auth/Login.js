
import { useContext, useState } from 'react'
import './SignUp.css'
import axios from 'axios'
import Header from '../../companat/Header'
import { user } from '../../context/UsersContext'
import { useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'
export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [enter, setEnter] = useState(false)
    const [err, setErr] = useState(false)
    const users = useContext(user)
    const nav = useNavigate()
    const cookie = new Cookies()
    async function form(e) {
        e.preventDefault()
        setEnter(true)
        try {
            let res = await axios.post('http://127.0.0.1:8000/api/login', {
                email: email,
                password: password,
            })


            cookie.set("Bearer", res.data.data.token, { path: "/" })
            users.setAuth(() => { return { token: res.data.data.token, userD: res.data.data.user } })

            nav("/dashboard")
        } catch (err) {
            if (err.status === 401) {
                setErr(true)
            }

        }

    }

    return (
        <div>
            <Header />
            <div className="parintUp">
                <h2>Login</h2>
                <form onSubmit={form} className='formUp' >
                    <label>Email : </label>
                    <input value={email} onChange={(e) => {
                        setEmail(e.target.value)
                    }} type="email" placeholder='email' />
                    {enter && err && <p className='error'>passowrd or email  worng </p>}
                    <label>Password : </label>
                    <input value={password} onChange={(e) => {
                        setPassword(e.target.value)
                    }} type="password" placeholder='password' />
                    {enter && password.length < 8 && <p className='error'>must be more than 8 chart</p>}


                    <button type='submit' className='buttonUp'>Login</button>
                </form>
            </div>

        </div>
    )
}