import { Link } from "react-router-dom";

export default function TopBar() {
    return (

        <div className='header flex'>
            <h2>Web Site</h2>
            <Link to='/' >Go Web</Link>
        </div>
    )
}