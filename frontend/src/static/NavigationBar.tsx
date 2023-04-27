import "./NavigationBar.css"
import {NavLink} from "react-router-dom";
export default function NavigationBar() {
    return (

    <div >
        <NavLink className={"NavigationBar"} to={"/menu"}> View Tickets | </NavLink>
        <NavLink className={"NavigationBar"} to={"/archives"}> Archived Tickets | </NavLink>
        <NavLink className={"NavigationBar"} to={"/add"}> Create Ticket | </NavLink>
    </div>
)

}