import {Ticket} from "./model/Ticket";
import TicketCard from "./TicketCard";
import "./TicketGallery.css"

type Props = {
    tickets: Ticket[]
}
export default function TicketGallery(props: Props){

    const openTickets: Ticket[] = props.tickets.filter((ticket) => ticket.status === "OPEN")
    const inProgressTickets: Ticket[] = props.tickets.filter((ticket) => ticket.status === "IN_PROGRESS")
    const doneTickets: Ticket[] = props.tickets.filter((ticket) => ticket.status === "DONE")

    return (
        <div>
            <div className="StatusOpen">
            <h4>Open Tickets: </h4>
            {
                openTickets.map((ticket) => <TicketCard key={ticket.id} ticket={ticket}/>)
            } </div>
            <div className="StatusInProgress">
            <h4>In Progress Tickets: </h4>
            {
                inProgressTickets.map((ticket) => <TicketCard key={ticket.id} ticket={ticket}/>)
            } </div>
            <div className="StatusDone">
            <h4>Done Tickets: </h4>
            {
                doneTickets.map((ticket) => <TicketCard key={ticket.id} ticket={ticket}/>)
            } </div>
        </div>

    )
}