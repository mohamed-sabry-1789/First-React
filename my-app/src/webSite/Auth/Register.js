
import { useContext, useState } from 'react'
import './SignUp.css'
import axios from 'axios'
import Header from '../../companat/Header'
import { user } from '../../context/UsersContext'
import { useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'
export default function SignUp() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [rePassword, setRe] = useState("")
    const [enter, setEnter] = useState(false)
    const [msgN, setMgsN] = useState("")
    const [msgP, setMgsP] = useState("")
    const [msgR, setMgsR] = useState("")
    const [msgM, setMgsM] = useState("")

    const users = useContext(user)
    const nav = useNavigate()
    const cookie = new Cookies()
    async function form(e) {

        e.preventDefault()
        setEnter(true)
        try {
            let res = await axios.post('http://127.0.0.1:8000/api/register', {
                name: name,
                email: email,
                password: password,
                password_confirmation: rePassword

            })
            const userD = res.data.data.user
            const token = res.data.data.token
            cookie.set("Bearer", token, { path: "/" })
            users.setAuth({ userD, token })
            nav("/dashboard")

        } catch (err) {
            if (err.status === 422) {

                setMgsN(err.response.data.errors.name)
                setMgsP(err.response.data.errors.password?.[1])
                setMgsR(err.response.data.errors.password?.[0])
                setMgsM(err.response.data.errors.email)

            }
            // Optional Chaining


        }

    }


    return (
        <div>
            <Header />
            <div className="parintUp">
                <h2>SignUp</h2>
                <form onSubmit={form} className='formUp' >
                    <label>Name : </label>
                    <input value={name} onChange={(e) => {
                        setName(e.target.value)
                    }} type="text" placeholder='name' />
                    {enter && <p className='error'>{msgN}</p>}

                    <label>Email : </label>
                    <input value={email} onChange={(e) => {
                        setEmail(e.target.value)
                    }} type="email" placeholder='email' />
                    {enter && <p className='error'>{msgM}</p>}
                    <label>Password : </label>
                    <input value={password} onChange={(e) => {
                        setPassword(e.target.value)
                    }} type="password" placeholder='password' />
                    {enter && <p className='error'>{msgP}</p>}
                    <label> Repeat Password : </label>
                    <input value={rePassword} onChange={(e) => {
                        setRe(e.target.value)
                    }} type="password" placeholder='re password' />
                    {enter && <p className='error'>{msgR}</p>}
                    <button type='submit' className='buttonUp'>Register</button>
                </form>
            </div>

        </div>
    )
}