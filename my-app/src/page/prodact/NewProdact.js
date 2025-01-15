import axios from "axios"
import { useContext, useState } from "react"
import { user } from "../../context/UsersContext"
import { useNavigate } from "react-router-dom"

export default function NewProdact() {
    const [title, setTitle] = useState("")
    const [description, SetDes] = useState("")
    const [img, setImg] = useState()
    const [accept, setAccept] = useState(false)
    const [msg, setMsg] = useState("")
    const users = useContext(user)
    const nav = useNavigate()
    const token = users.auth.token
    const formData = new FormData()
    formData.append("title", title)
    formData.append("description", description)
    formData.append("image", img)
    async function send(e) {
        e.preventDefault()
        setAccept(true)
        try {

            await axios.post('http://127.0.0.1:8000/api/product/create',
                formData
                , {
                    headers: {

                        Authorization: `Bearer ${token}`
                    }
                }
            )
            nav("/dashboard/prodact")
        } catch (err) {
            if (err.status === 422) {
                setMsg(err.response.data.message)
                
            }

        }

    }
    return (
        <div className="NewUserParint">
            <form onSubmit={send} className="NewUserForm" >
                <label htmlFor="title">Title</label>
                <input onChange={(e) => {
                    setTitle(e.target.value)
                }} type="text" id="title" placeholder="Title" />

                <label htmlFor="description">Descreption</label>
                <input value={description} onChange={(e) => {
                    SetDes(e.target.value)
                }} type="text" id="descreption" placeholder="descreption" />

                <label htmlFor="img">IMG</label>
                <input onChange={(e) => {
                    setImg(e.target.files.item(0))
                }} type="file" id="img" placeholder="img" />
                {accept  && <p className="error">{msg}</p>}
                <button className="button">Creat Prodact</button>
            </form>
        </div>
    )
}