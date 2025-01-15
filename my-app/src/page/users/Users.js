import { useContext, useEffect, useState } from 'react'
import './users.css'
import axios from 'axios'
import { user } from '../../context/UsersContext'
import { Link } from 'react-router-dom'

export default function Users() {

    const users = useContext(user)
    const token = users.auth.token
    console.log(users)
    console.log(token)
    const [userData, setData] = useState([])
    const [runUf, setRun] = useState(0)

    async function handelDelete(id) {
        await axios.delete(`http://127.0.0.1:8000/api/user/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        setRun(prev => prev + 1)
    }

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/user/show', {
            headers: {
                Accept: "applcation/json",
                Authorization: `Bearer ${token}`
            }
        }).then(
            (data) => setData(data.data)
        )
    }, [runUf])


    const dataShow = userData.map((el, i) => {
        return (
            <tr key={i}>
                <td>{++i}</td>
                <td>{el.name}</td>
                <td>{el.email}</td>
                <td>
                    <Link to={`${el.id}`} className="fa-solid fa-pen-to-square update"></Link>
                    <i onClick={() => handelDelete(el.id)} className="fa-solid fa-trash delete"></i>
                </td>
            </tr>

        )
    })

    return (
        <div className='user' >
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>name</th>
                        <th>email</th>
                        <th>update & delete</th>
                    </tr>
                </thead>
                <tbody>
                    {dataShow}
                </tbody>

            </table>

        </div>
    )
}