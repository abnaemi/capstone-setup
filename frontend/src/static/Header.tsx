import NavigationBar from "./NavigationBar";
import "./Header.css"

export default function Header() {
    return (
        <div className= "Header">
            <div>
                <h1> Ticketsystem</h1>
            </div>
            <NavigationBar/>
        </div>
    )
}