import { NavLink } from "react-router-dom";

export default function NavBar() {
    return (
        <div style={{
            borderRight: "1px solid black", width: "17%", height: "100vh", paddingTop: " 10px",

        }}>
            <NavLink className="nav " to="/dashboard/user"><i className="fa-solid fa-users"></i>Users</NavLink>
            <NavLink className="nav " to="/dashboard/newUser"> <i className="fa-solid fa-user-plus"></i>New Users</NavLink>
            <NavLink className="nav " to="/dashboard/prodact"> <i className="fa-brands fa-product-hunt"></i>Prodact</NavLink>
            <NavLink className="nav " to="/dashboard/newProdact"> <i className="fa-solid fa-square-plus"></i>New Prodact</NavLink>

        </div>
    )
}
