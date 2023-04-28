import {Grid, Typography} from "@mui/material";
import { Ticket } from "./model/Ticket";
import TicketCard from "./TicketCard";



type Props = {
    tickets: Ticket[],

    updateTicket: (ticket:Ticket) => void,

    deleteTicket: (id:string) => void
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

                <Grid item xs={2}>
                    <Typography variant="h6" component="h2"  sx={{ fontSize: 14, paddingLeft: '14px', paddingRight: '16px', fontWeight: 'bold'  }}>Open Tickets</Typography>
                </Grid>

                <Grid container spacing={2}>
                    <Grid item xs={2}>
                        <Typography variant="h6" component="h2"  sx={{ fontSize: 14, paddingLeft: '14px', paddingRight: '16px', fontWeight: 'bold'  }}>Title</Typography>
                    </Grid>

                    <Grid item xs={2}>
                        <Typography variant="h6" component="h2" sx={{ fontSize: 14, paddingLeft: '8px', paddingRight: '16px', fontWeight: 'bold' }}>Customer</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant="h6" component="h2" sx={{ fontSize: 14 , fontWeight: 'bold' }}>Status</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant="h6" component="h2" sx={{ fontSize: 14, fontWeight: 'bold'  }}>Prio</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant="h6" component="h2" sx={{ fontSize: 14 , fontWeight: 'bold' }}>ID</Typography>
                    </Grid>
                </Grid>




                {openTickets.map((ticket) => (
                    <TicketCard key={ticket.id} ticket={ticket} updateTicket={props.updateTicket} deleteTicket={props.deleteTicket}/>
                ))}
            </div>
            <div className="tickets">
                <Grid item xs={2}>
                    <Typography variant="h6" component="h2"  sx={{ fontSize: 14, paddingLeft: '14px', paddingRight: '16px', fontWeight: 'bold'  }}>In Progress Tickets</Typography>
                </Grid>

                <Grid container spacing={2}>
                    <Grid item xs={2}>
                        <Typography variant="h6" component="h2"  sx={{ fontSize: 14, paddingLeft: '14px', paddingRight: '16px' , fontWeight: 'bold' }}>Title</Typography>
                    </Grid>

                    <Grid item xs={2}>
                        <Typography variant="h6" component="h2" sx={{ fontSize: 14, paddingLeft: '8px', paddingRight: '16px', fontWeight: 'bold' }}>Customer</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant="h6" component="h2" sx={{ fontSize: 14, fontWeight: 'bold'  }}>Status</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant="h6" component="h2" sx={{ fontSize: 14, fontWeight: 'bold'  }}>Prio</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant="h6" component="h2" sx={{ fontSize: 14, fontWeight: 'bold'  }}>ID</Typography>
                    </Grid>
                </Grid>
                {inProgressTickets.map((ticket) => (
                    <TicketCard key={ticket.id} ticket={ticket} updateTicket={props.updateTicket}  deleteTicket={props.deleteTicket}/>
                ))}
            </div>
            <div className="tickets">
                <Grid item xs={2}>
                    <Typography variant="h6" component="h2"  sx={{ fontSize: 14, paddingLeft: '14px', paddingRight: '16px', fontWeight: 'bold'  }}>Done Tickets</Typography>
                </Grid>

                <Grid container spacing={2}>
                    <Grid item xs={2}>
                        <Typography variant="h6" component="h2"  sx={{ fontSize: 14, paddingLeft: '14px', paddingRight: '16px', fontWeight: 'bold' }}>Title</Typography>
                    </Grid>

                    <Grid item xs={2}>
                        <Typography variant="h6" component="h2" sx={{ fontSize: 14, paddingLeft: '8px', paddingRight: '16px' , fontWeight: 'bold' }}>Customer</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant="h6" component="h2" sx={{ fontSize: 14 , fontWeight: 'bold' }}>Status</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant="h6" component="h2" sx={{ fontSize: 14 , fontWeight: 'bold' }}>Prio</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant="h6" component="h2" sx={{ fontSize: 14, fontWeight: 'bold'  }}>ID</Typography>
                    </Grid>
                </Grid>                {doneTickets.map((ticket) => (
                    <TicketCard key={ticket.id} ticket={ticket} updateTicket={props.updateTicket}  deleteTicket={props.deleteTicket} />
                ))}
            </div>
        </div>
    );
}
