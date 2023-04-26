import {NavLink} from "react-router-dom";
import "./Navigationbar.css"
export default function NavigationBar() {
    return (

    <div className="Navigationbar">
    <NavLink className="NavigationItem" to={"/menu"}>View Tickets</NavLink>
    <NavLink className="NavigationItem" to={"/archives"}>Archived Tickets</NavLink>
    <NavLink  className="NavigationItem" to={"/add"}>Add Tickets</NavLink>
    </div>
)

}