import axios from "axios"
import { useContext, useState } from "react"
import { user } from "../../context/UsersContext"
import { useNavigate } from "react-router-dom"

export default function NewProdact() {
    const [title, setTitle] = useState("")
    const [description, SetDes] = useState("")
    const [img, setImg] = useState()
    const [accept, setAccept] = useState(false)
    const [msgI, setMsgI] = useState("")
    const [msgD, setMsgD] = useState("")
    const [msgT, setMsgT] = useState("")
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
                setMsgI(err.response.data.errors.image)
                setMsgD(err.response.data.errors.description)
                setMsgT(err.response.data.errors.title)
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
                {accept && <p className="error">{msgT}</p>}

                <label htmlFor="description">Descreption</label>
                <input value={description} onChange={(e) => {
                    SetDes(e.target.value)
                }} type="text" id="descreption" placeholder="descreption" />
                {accept && <p className="error">{msgD}</p>}

                <label htmlFor="img">IMG</label>
                <input onChange={(e) => {
                    setImg(e.target.files.item(0))
                }} type="file" id="img" placeholder="img" />
                {accept && <p className="error">{msgI}</p>}
                <button className="button">Creat Prodact</button>
            </form>
        </div>
    )
}