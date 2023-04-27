import { Typography } from "@mui/material";
import { Ticket } from "./model/Ticket";
import TicketCard from "./TicketCard";



type Props = {
    tickets: Ticket[],

    updateTicket: (ticket:Ticket) => void
};

export default function TicketGallery(props: Props) {
    const openTickets: Ticket[] = props.tickets.filter(
        (ticket) => ticket.status === "OPEN"
    );
    const inProgressTickets: Ticket[] = props.tickets.filter(
        (ticket) => ticket.status === "IN_PROGRESS"
    );
    const doneTickets: Ticket[] = props.tickets.filter(
        (ticket) => ticket.status === "DONE"
    );

    return (
        <div>
            <div className="tickets">
                <Typography variant="h6" component="h2"   sx={{ fontSize: 14 }} >Open Tickets: </Typography>
                {openTickets.map((ticket) => (
                    <TicketCard key={ticket.id} ticket={ticket} updateTicket={props.updateTicket}/>
                ))}
            </div>
            <div className="tickets">
                <Typography variant="h6" component="h2" sx={{ fontSize: 14 }} >In Progress Tickets: </Typography>
                {inProgressTickets.map((ticket) => (
                    <TicketCard key={ticket.id} ticket={ticket} updateTicket={props.updateTicket} />
                ))}
            </div>
            <div className="tickets">
                <Typography variant="h6" component="h2" sx={{ fontSize: 14 }} >Done Tickets: </Typography>
                {doneTickets.map((ticket) => (
                    <TicketCard key={ticket.id} ticket={ticket} updateTicket={props.updateTicket} />
                ))}
            </div>
        </div>
    );
}
