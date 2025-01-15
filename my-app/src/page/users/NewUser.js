
import { useContext, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { user } from '../../context/UsersContext'
export default function NewUser() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [rePassword, setRe] = useState("")
    const [enter, setEnter] = useState(false)
    const [msg, setMsg] = useState("")
    const nav = useNavigate()
    const users = useContext(user)
    const token = users.auth.token
    async function form(e) {

        e.preventDefault()
        setEnter(true)
        try {
            await axios.post('http://127.0.0.1:8000/api/user/create', {
                name: name,
                email: email,
                password: password,
                password_confirmation: rePassword

            }, {
                headers: {
                    "Content-Type": "Applaction/json",
                    Authorization: `Bearer ${token}`
                }
            })

            nav("/dashboard/user")

        } catch (err) {
            if (err.status === 422) {
                setMsg(err.response.data.message)

            }

        }

    }
    return (
        <div>

            <div className="NewUserParint">
                <h2>New User</h2>
                <form onSubmit={form} className='NewUserForm' >
                    <label>Name : </label>
                    <input value={name} onChange={(e) => {
                        setName(e.target.value)
                    }} type="text" placeholder='name' />

                    <label>Email : </label>
                    <input value={email} onChange={(e) => {
                        setEmail(e.target.value)
                    }} type="email" placeholder='email' />
                    <label>Password : </label>
                    <input value={password} onChange={(e) => {
                        setPassword(e.target.value)
                    }} type="password" placeholder='password' />
                    <label> Repeat Password : </label>
                    <input value={rePassword} onChange={(e) => {
                        setRe(e.target.value)
                    }} type="password" placeholder='re password' />
                    {enter && <p className='error'>{msg}</p>}
                    <button type='submit' className='buttonUp' style={{ fontSize: "20px", color: "green", width: "100%", padding: "10px", borderRadius: "20px" }}>Create</button>
                </form>
            </div>

        </div>
    )
}