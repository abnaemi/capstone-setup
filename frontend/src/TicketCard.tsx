import { Grid, Card, CardContent, Typography, Button, Box, ButtonGroup } from '@mui/material';
import { Ticket } from "./model/Ticket";
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import InfoIcon from '@mui/icons-material/Info';
import { useNavigate } from "react-router-dom";

type Props = {
    ticket: Ticket,
    updateTicket: (ticket: Ticket) => void,
    deleteTicket: (id: string) => void
}

export default function TicketCard(props: Props) {
    const navigate = useNavigate()
    const nextStatus: { OPEN: "IN_PROGRESS", IN_PROGRESS: "DONE", DONE: "ARCHIVED", ARCHIVED: "ARCHIVED" } = {
        "OPEN": "IN_PROGRESS",
        "IN_PROGRESS": "DONE",
        "DONE": "ARCHIVED",
        "ARCHIVED": "ARCHIVED",
    }

    function changeStatusClick() {
        const ticketToUpdate: Ticket = { ...props.ticket, status: nextStatus[props.ticket.status] }
        props.updateTicket(ticketToUpdate)
    }

    function deleteClick() {
        props.deleteTicket(props.ticket.id)
    }

    const previousStatus: { ARCHIVED: "DONE", DONE: "IN_PROGRESS", IN_PROGRESS: "OPEN", OPEN: "OPEN" } = {
        "ARCHIVED": "DONE",
        "DONE": "IN_PROGRESS",
        "IN_PROGRESS": "OPEN",
        "OPEN": "OPEN",
    }

    function changeStatusPrevious() {
        const ticketToUpdate: Ticket = { ...props.ticket, status: previousStatus[props.ticket.status] }
        props.updateTicket(ticketToUpdate)
    }

    return (
        <Box marginBottom={-2}>
            <Card>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={2}>
                            <Typography sx={{ fontSize: 12 }}>
                                {props.ticket.title}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <Typography sx={{ fontSize: 12 }}>
                                {props.ticket.customer}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <Typography sx={{ fontSize: 12 }}>
                                {props.ticket.status}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <Typography sx={{ fontSize: 12 }}>
                                {props.ticket.prio}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <Typography sx={{ fontSize: 12 }}>
                                {props.ticket.id}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <ButtonGroup fullWidth>
                                {props.ticket.status !== 'OPEN' && props.ticket.status !== 'IN_PROGRESS' && (
                                    <Button variant="contained" size="small" onClick={changeStatusPrevious}>
                                        <KeyboardArrowLeftIcon />
                                    </Button>
                                )}
                                {props.ticket.status !== 'ARCHIVED' && (
                                    <Button variant="contained" size="small" onClick={changeStatusClick}>
                                        <KeyboardArrowRightIcon />
                                    </Button>
                                )}
                                {(props.ticket.status === 'ARCHIVED' || props.ticket.status === 'OPEN') && (
                                    <Button variant="contained" size="small" onClick={deleteClick}>
                                        <DeleteIcon />
                                    </Button>
                                )}
                                <Button variant="contained" size="small" startIcon={<InfoIcon />} onClick={() => { navigate("/tickets/details/" + props.ticket.id) }}>
                                </Button>
                            </ButtonGroup>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    )
}

