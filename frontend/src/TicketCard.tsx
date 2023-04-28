import { Grid, Card, CardContent, Typography, Button } from '@mui/material';
import { Ticket } from "./model/Ticket";

type Props = {
    ticket: Ticket,
    updateTicket:(ticket:Ticket) => void,
    deleteTicket:(id:string) => void
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

    function deleteClick(){
     props.deleteTicket(props.ticket.id)
    }

    const previousStatus: {ARCHIVED: "DONE", DONE:"IN_PROGRESS", IN_PROGRESS:"OPEN",OPEN:"OPEN"} = {
        "ARCHIVED" : "DONE" ,
        "DONE" : "IN_PROGRESS",
        "IN_PROGRESS" : "OPEN",
        "OPEN" : "OPEN",
    }
    function changeStatusPrevious(){

        const ticketToUpdate: Ticket = {...props.ticket, status: previousStatus[props.ticket.status]}
        props.updateTicket(ticketToUpdate)
    }

    // @ts-ignore
    return (
        <Card>


            <CardContent>


                <Grid container spacing={2}>
                    <Grid item xs={2}>
                        <Typography sx={{ fontSize: 12 }}>
                             {props.ticket.title}
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography sx={{ fontSize: 12 }}>
                            {props.ticket.customer}
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography sx={{ fontSize: 12 }}>
                             {props.ticket.status}
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography sx={{ fontSize: 12 }}>
                             {props.ticket.prio}
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography sx={{ fontSize: 12 }}>
                             {props.ticket.id}
                        </Typography>
                    </Grid>

                    {props.ticket.status !== 'OPEN' && props.ticket.status !== 'IN_PROGRESS' && <Button variant="contained" size="small" onClick={changeStatusPrevious}> Prior</Button>}
                    {props.ticket.status !== 'ARCHIVED' && <Button variant="contained" size="small" onClick={changeStatusClick}>Next</Button>}

                    {(props.ticket.status === 'ARCHIVED' || props.ticket.status === 'OPEN') && <Button variant="contained" size="small" onClick={deleteClick}>Delete</Button>}



                </Grid>
            </CardContent>
        </Card>
    )
}

