import { Ticket } from "./model/Ticket";
import TicketCard from "./TicketCard";
import "./TicketGallery.css";
import { Grid } from "@mui/material";

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
        <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
                <h4>Open Tickets: </h4>
                {openTickets.map((ticket) => (
                    <TicketCard key={ticket.id} ticket={ticket} />
                ))}
            </Grid>
            <Grid item xs={12} sm={4}>
                <h4>In Progress Tickets: </h4>
                {inProgressTickets.map((ticket) => (
                    <TicketCard key={ticket.id} ticket={ticket} />
                ))}
            </Grid>
            <Grid item xs={12} sm={4}>
                <h4>Done Tickets: </h4>
                {doneTickets.map((ticket) => (
                    <TicketCard key={ticket.id} ticket={ticket} />
                ))}
            </Grid>
        </Grid>
    );
}
