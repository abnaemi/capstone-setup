import { Grid, Typography } from "@mui/material";
import { Ticket } from "./model/Ticket";
import TicketCard from "./TicketCard";

type Props = {
    tickets: Ticket[];

    updateTicket: (ticket: Ticket) => void;

    deleteTicket: (id: string) => void;
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

    const renderGridHeaders = (sectionTitle: string) => (
        <Grid container spacing={2} sx={{ borderBottom: '1px solid #e0e0e0', paddingBottom: '-10px' }}>
            <Grid item xs={12}>
                <Typography variant="h6" component="h2" sx={{ fontSize: 14, paddingLeft: '14px', paddingRight: '16px', fontWeight: 'bold' }}>{sectionTitle}</Typography>
            </Grid>
            <Grid item xs={12} container wrap="nowrap" sx={{ overflowX: { xs: 'auto', sm: 'hidden' } }}>
                <Grid item xs={2} sx={{ minWidth: '80px' }}>
                    <Typography variant="h6" component="h2" sx={{ fontSize: 14, paddingLeft: '14px', paddingRight: '16px', fontWeight: 'bold' }}>Title</Typography>
                </Grid>
                <Grid item xs={2} sx={{ minWidth: '100px' }}>
                    <Typography variant="h6" component="h2" sx={{ fontSize: 14, paddingLeft: '8px', paddingRight: '16px', fontWeight: 'bold' }}>Customer</Typography>
                </Grid>
                <Grid item xs={2} sx={{ minWidth: '80px' }}>
                    <Typography variant="h6" component="h2" sx={{ fontSize: 14, fontWeight: 'bold' }}>Status</Typography>
                </Grid>
                <Grid item xs={2} sx={{ minWidth: '80px' }}>
                    <Typography variant="h6" component="h2" sx={{ fontSize: 14, fontWeight: 'bold' }}>Prio</Typography>
                </Grid>
                <Grid item xs={2} sx={{ minWidth: '60px' }}>
                    <Typography variant="h6" component="h2" sx={{ fontSize: 14, fontWeight: 'bold' }}>ID</Typography>
                </Grid>
            </Grid>
        </Grid>
    );





    return (
        <div>
            <div className="tickets">
                {renderGridHeaders("Open Tickets:")}
                {openTickets.map((ticket) => (
                    <TicketCard key={ticket.id} ticket={ticket} updateTicket={props.updateTicket} deleteTicket={props.deleteTicket} />
                ))}
            </div>
            <div className="tickets">
                {renderGridHeaders("In Progress Tickets:")}
                {inProgressTickets.map((ticket) => (
                    <TicketCard key={ticket.id} ticket={ticket} updateTicket={props.updateTicket} deleteTicket={props.deleteTicket} />
                ))}
            </div>
            <div className="tickets">
                {renderGridHeaders("Done Tickets:")}
                {doneTickets.map((ticket) => (
                    <TicketCard key={ticket.id} ticket={ticket} updateTicket={props.updateTicket} deleteTicket={props.deleteTicket} />
                ))}
            </div>
        </div>
    );
}
