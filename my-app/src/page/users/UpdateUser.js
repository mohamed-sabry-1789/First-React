
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { user } from '../../context/UsersContext'
import { useNavigate } from 'react-router-dom'

export default function UpdateUser() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [rePassword, setRe] = useState("")
    const [enter, setEnter] = useState(false)
    const [err, setErr] = useState(false)
    const [msg, setMsg] = useState("")
    const users = useContext(user)
    const token = users.auth.token
    const nav = useNavigate()
    const id = window.location.pathname.split("/").splice(-1).join()

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/user/showbyid/${id}`, {
            headers: {
                Accept: "Applaction/json",
                Authorization: `Bearer ${token}`
            }
        }).then(data => {
            setName(data.data[0].name)
            setEmail(data.data[0].email)
        })
    }, [])

    const dataUs = {
        name: name,
        email: email,
        password: password,
        password_confirmation: rePassword,


    }
    async function form(e) {
        e.preventDefault()
        setEnter(true)
        try {
            await axios.post(`http://127.0.0.1:8000/api/user/update/${id}`, dataUs, {

                headers: {
                    "Content-Type": "Applcation/json",
                    "Authorization": `Bearer ${token}`
                }
            })
            nav("/dashboard/user")
        } catch (err) {
            if (err.status === 422) {
                setMsg(err.response.data.message)
                setErr(true)

            }
        }

    }
    return (
        <div>

            <div className="parintUp">
                <h2>Update</h2>
                <form onSubmit={form} className='formUp' >
                    <label>Name : </label>
                    <input value={name} onChange={(e) => {
                        setName(e.target.value)
                    }} type="text" placeholder='name' />
                    {enter && name === "" && <p className='error'>Enter Your Name</p>}
                    <label>Email : </label>
                    <input value={email} onChange={(e) => {
                        setEmail(e.target.value)
                    }} type="email" placeholder='email' />
                    <label>Password : </label>
                    <input value={password} onChange={(e) => {
                        setPassword(e.target.value)
                    }} type="password" placeholder='password' />
                    {enter && password.length < 1 && <p className='error'>must be more than 8 chart</p>}
                    <label> Repeat Password : </label>
                    <input value={rePassword} onChange={(e) => {
                        setRe(e.target.value)
                    }} type="password" placeholder='re password' />
                    {enter && password !== rePassword && <p className='error'>not match</p>}
                    {enter && err && <p className='error'>{msg}</p>}
                    <button type='submit' className='buttonUp'>Update</button>
                </form>
            </div>

        </div>
    )
}