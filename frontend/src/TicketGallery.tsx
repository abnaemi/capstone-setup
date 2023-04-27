import { Typography } from "@mui/material";
import { Ticket } from "./model/Ticket";
import TicketCard from "./TicketCard";
import "./TicketGallery.css";


type Props = {
    tickets: Ticket[];
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
                <Typography variant="h5" component="h2">Open Tickets: </Typography>
                {openTickets.map((ticket) => (
                    <TicketCard key={ticket.id} ticket={ticket} />
                ))}
            </div>
            <div className="tickets">
                <Typography variant="h5" component="h2">In Progress Tickets: </Typography>
                {inProgressTickets.map((ticket) => (
                    <TicketCard key={ticket.id} ticket={ticket} />
                ))}
            </div>
            <div className="tickets">
                <Typography variant="h5" component="h2">Done Tickets: </Typography>
                {doneTickets.map((ticket) => (
                    <TicketCard key={ticket.id} ticket={ticket} />
                ))}
            </div>
        </div>
    );
}
