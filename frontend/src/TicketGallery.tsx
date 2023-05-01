import { Grid, Typography, Pagination } from "@mui/material";
import { Ticket } from "./model/Ticket";
import TicketCard from "./TicketCard";
import React from "react";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import TicketStatusGraph from "./TicketStatusGraph";

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

    const [openPage, setOpenPage] = React.useState(1);
    const [inProgressPage, setInProgressPage] = React.useState(1);
    const [donePage, setDonePage] = React.useState(1);
    const [openModal, setOpenModal] = React.useState(false);

    const ticketsPerPage = 10;

    const handleOpenPageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setOpenPage(value);
    };

    const handleInProgressPageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setInProgressPage(value);
    };

    const handleDonePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setDonePage(value);
    };

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

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
            <Button variant="contained" color="primary" onClick={handleOpenModal}>
                Show Ticket Status Graph
            </Button>
            <Dialog
                open={openModal}
                onClose={handleCloseModal}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle>Ticket Status Graph</DialogTitle>
                <DialogContent>
                    <TicketStatusGraph tickets={props.tickets} />
                </DialogContent>
            </Dialog>
            <div className="tickets">
                {renderGridHeaders("Open Tickets:")}
                {openTickets
                    .slice((openPage - 1) * ticketsPerPage, openPage * ticketsPerPage)
                    .map((ticket) => (
                        <TicketCard key={ticket.id} ticket={ticket} updateTicket={props.updateTicket} deleteTicket={props.deleteTicket} />
                    ))}
                <Pagination
                    count={Math.ceil(openTickets.length / ticketsPerPage)}
                    page={openPage}
                    onChange={handleOpenPageChange}
                    color="primary"
                    sx={{ marginTop: 2, marginBottom: 2 }}
                />
            </div>
            <div className="tickets">
                {renderGridHeaders("In Progress Tickets:")}
                {inProgressTickets
                    .slice((inProgressPage - 1) * ticketsPerPage, inProgressPage * ticketsPerPage)
                    .map((ticket) => (
                        <TicketCard key={ticket.id} ticket={ticket} updateTicket={props.updateTicket} deleteTicket={props.deleteTicket} />
                    ))}
                <Pagination
                    count={Math.ceil(inProgressTickets.length / ticketsPerPage)}
                    page={inProgressPage}
                    onChange={handleInProgressPageChange}
                    color="primary"
                    sx={{ marginTop: 2, marginBottom: 2 }}
                />
            </div>
            <div className="tickets">
                {renderGridHeaders("Done Tickets:")}
                {doneTickets
                    .slice((donePage - 1) * ticketsPerPage, donePage * ticketsPerPage)
                    .map((ticket) => (
                        <TicketCard key={ticket.id} ticket={ticket} updateTicket={props.updateTicket} deleteTicket={props.deleteTicket} />
                    ))}
                <Pagination
                    count={Math.ceil(doneTickets.length / ticketsPerPage)}
                    page={donePage}
                    onChange={handleDonePageChange}
                    color="primary"
                    sx={{ marginTop: 2, marginBottom: 2 }}
                />
            </div>
        </div>
    );
}
