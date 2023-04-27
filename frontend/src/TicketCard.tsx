import { Grid, Card, CardContent, Typography } from '@mui/material';
import { Ticket } from "./model/Ticket";

type Props = {
    ticket: Ticket
}

export default function TicketCard(props: Props) {
    return (
        <Card>
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={2}>
                        <Typography sx={{ fontSize: 12 }}>
                           Title:  {props.ticket.title}
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography sx={{ fontSize: 12 }}>
                           Customer: {props.ticket.customer}
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography sx={{ fontSize: 10 }}>
                            Status: {props.ticket.status}
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography sx={{ fontSize: 10 }}>
                            Ticket Prio: {props.ticket.prio}
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography sx={{ fontSize: 10 }}>
                            Ticket ID: {props.ticket.id}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}
