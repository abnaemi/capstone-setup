import {Ticket} from "./model/Ticket";
import TicketCard from "./TicketCard";

type Props = {
    tickets: Ticket[]
}
export default function TicketGallery(props: Props){

    const openTickets: Ticket[] = props.tickets.filter((ticket) => ticket.status === "OPEN")
    const inProgressTickets: Ticket[] = props.tickets.filter((ticket) => ticket.status === "IN_PROGRESS")
    const doneTickets: Ticket[] = props.tickets.filter((ticket) => ticket.status === "DONE")

    return (
        <div>

            <h4 className="Status">Open Tickets: </h4>
            {
                openTickets.map((ticket) => <TicketCard key={ticket.id} ticket={ticket}/>)
            }
            <h4 className="Status">In Progress Tickets: </h4>
            {
                inProgressTickets.map((ticket) => <TicketCard key={ticket.id} ticket={ticket}/>)
            }
            <h4 className="Status">Done Tickets: </h4>
            {
                doneTickets.map((ticket) => <TicketCard key={ticket.id} ticket={ticket}/>)
            }
        </div>

    )
}