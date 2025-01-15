import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { user } from "../../context/UsersContext"
import { useNavigate } from "react-router-dom"

export default function UpdateProdact() {
    const [title, setTitle] = useState("")
    const [description, SetDes] = useState("")

    const users = useContext(user)
    const nav = useNavigate()
    const token = users.auth.token

    const formData = new FormData()
    formData.append("title", title)
    formData.append("description", description)
    const id = window.location.pathname.split("/").slice(-1).join()

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/product/showbyid/${id}`, {
            headers: {
                Accept: "applaction/json",
                Authorization: `Bearer ${token}`
            }
        }).then((data) => {
            return (
                setTitle(data.data[0].title)
                ,
                SetDes(data.data[0].description))
        }
        )
    }, [])
    async function send(e) {
        e.preventDefault()

        try {

            await axios.post(`http://127.0.0.1:8000/api/product/update/${id}`,
                formData
                , {
                    headers: {

                        Authorization: `Bearer ${token}`
                    }
                }
            )
            nav("/dashboard/prodact")
        } catch (err) {
            console.log(err)
        }

    }
    return (
        <div className="NewUserParint">
            <form onSubmit={send} className="NewUserForm" >
                <label htmlFor="title">Title</label>
                <input value={title} onChange={(e) => {
                    setTitle(e.target.value)
                }} type="text" id="title" placeholder="Title" />

                <label htmlFor="description">Descreption</label>
                <input value={description} onChange={(e) => {
                    SetDes(e.target.value)
                }} type="text" id="descreption" placeholder="descreption" />


                <button className="button">Update Product</button>
            </form>
        </div>
    )
}