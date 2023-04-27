import { Grid, Card, CardContent, Typography, Button } from '@mui/material';
import { Ticket } from "./model/Ticket";

type Props = {
    ticket: Ticket,
    updateTicket:(ticket:Ticket) => void
}

export default function TicketCard(props: Props) {


    const nextStatus: {OPEN: "IN_PROGRESS", IN_PROGRESS:"DONE", DONE:"ARCHIVED",ARCHIVED:"ARCHIVED"} = {
        "OPEN" : "IN_PROGRESS" ,
        "IN_PROGRESS" : "DONE",
        "DONE" : "ARCHIVED",
        "ARCHIVED" : "ARCHIVED",
    }
    function changeStatusClick(){

        const ticketToUpdate: Ticket = {...props.ticket, status: nextStatus[props.ticket.status]}
        props.updateTicket(ticketToUpdate)
    }


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

                    {props.ticket.status !== 'ARCHIVED' && <Button variant="contained" onClick={changeStatusClick}>Change Status</Button>}

                </Grid>
            </CardContent>
        </Card>
    )
}

