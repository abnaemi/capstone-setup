
import {Link} from "@mui/material";
export default function NavigationBar() {
    return (

    <div className="Navigationbar">
        <Link href="/menu"> View Tickets | </Link>
        <Link href="/archives"> Archived Tickets | </Link>
        <Link href="/add"> Add Tickets </Link>
    </div>
)

}