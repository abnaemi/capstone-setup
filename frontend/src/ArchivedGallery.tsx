import { Typography } from "@mui/material";
import { Ticket } from "./model/Ticket";
import TicketCard from "./TicketCard";



type Props = {
    tickets: Ticket[],

    updateTicket: (ticket:Ticket) => void
};

export default function TicketGallery(props: Props) {
    const archivedTickets: Ticket[] = props.tickets.filter(
        (ticket) => ticket.status === "ARCHIVED"
    );


    return (
        <div>
            <div className="tickets">
                <Typography variant="h6" component="h2"   sx={{ fontSize: 14 }} >Archived Tickets: </Typography>
                {archivedTickets.map((ticket) => (
                    <TicketCard key={ticket.id} ticket={ticket} updateTicket={props.updateTicket}/>
                ))}
            </div>

        </div>
    );
}
