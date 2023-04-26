import {NavLink} from "react-router-dom";

export default function NavigationBar() {
    return (
        <div>
      <NavLink to={"/menu"}>View Tickets</NavLink>
    <NavLink to={"/archives"}>Archived Tickets</NavLink>
    <NavLink  to={"/add"}>Add Tickets</NavLink>
    </div>
)

}