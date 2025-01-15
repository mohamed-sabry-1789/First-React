import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { user } from "../../context/UsersContext"
import { Link } from "react-router-dom"

export default function Prodact() {
    const users = useContext(user)
    const token = users.auth.token
    const [ProdactData, setProdact] = useState([])
    const [runEfect, setRun] = useState(0)
    async function handelDelete(id) {
        await axios.delete(`http://127.0.0.1:8000/api/product/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        setRun(prev => prev + 1)
    }
    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/product/show", {
            headers: {
                Accept: "appliaction/json",
                Authorization: `Bearer ${token}`
            }
        }).then(data => setProdact(data.data))
    }, [runEfect])
    const dataShow = ProdactData.map((p, i) => {
        return (
            <tr key={i}>
                <td>{++i}</td>
                <td>{p.title}</td>
                <td>{p.description}</td>
                <td> <img style={{ width: "100px" }} src={`${p.image}`} /> </td>
                <td>
                    <Link to={`${p.id}`} className="fa-solid fa-pen-to-square update"></Link>
                    <i onClick={() => handelDelete(p.id)} className="fa-solid fa-trash delete"></i>
                </td>
            </tr>
        )
    })
    return (
        <table>
            <thead>
                <tr>
                    <th>id</th>
                    <th>title</th>
                    <th>description</th>
                    <th>image</th>
                    <th>delete & update</th>

                </tr>
            </thead>
            <tbody>
                {dataShow}
            </tbody>
        </table>
    )
}