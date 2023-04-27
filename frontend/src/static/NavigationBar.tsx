import "./NavigationBar.css"
import {NavLink} from "react-router-dom";
export default function NavigationBar() {
    return (

    <div className="Navigationbar">
        <NavLink to={"/menu"}> View Tickets | </NavLink>
        <NavLink to={"/archives"}> Archived Tickets | </NavLink>
        <NavLink to={"/add"}> Create Ticket | </NavLink>
    </div>
)

}