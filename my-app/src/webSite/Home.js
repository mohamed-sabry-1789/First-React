import { useEffect, useState } from "react"
import Header from "../companat/Header"
import axios from "axios"
import Cookies from "universal-cookie"

export default function Home() {
    const cookie = new Cookies()
    const token = cookie.get("Bearer")
    const [prodacts, setProdacts] = useState([])
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/product/show`, {
            headers: {
                Accept: "applaction/json",
                Authorization: `Bearer ${token}`
            }
        }).then(data => setProdacts(data.data))
    }, [])
    const showData = prodacts.map((p, i) => {
        return (
            <div key={i} >
                <div>
                    <h3 >{p.title}</h3>
                    <img style={{ width: "100px", height: "100px", }} src={`${p.image}`} />
                    <p>{p.description}</p>
                </div>
            </div>
        )
    })
    return (
        <div>
            <Header />
            <h1>Home</h1>
            <div style={{ display: "flex", gap: "10px" }} >
                {showData}
            </div>
        </div>
    )
}