import { Grid, Typography, Pagination, Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { Ticket } from "./model/Ticket";
import TicketCard from "./TicketCard";
import React, {ChangeEvent, useState} from "react";
import TicketStatusGraph from "./TicketStatusGraph";
import TicketPriorityGraph from "./TicketPrioGraph";
import TicketCustomerGraph from "./TicketCustomerGraph";



type Props = {
    tickets: Ticket[];
    updateTicket: (ticket: Ticket) => void;
    deleteTicket: (id: string) => void;
    refreshTickets: () => void;
    onLogout: () => Promise<void>;
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

    const [openPage, setOpenPage] = useState(1);
    const [inProgressPage, setInProgressPage] = useState(1);
    const [donePage, setDonePage] = useState(1);
    const [openModal, setOpenModal] = useState(false);

    const ticketsPerPage = 10;

    const handleOpenPageChange = (event: ChangeEvent<unknown>, value: number) => {
        setOpenPage(value);
    };

    const handleInProgressPageChange = (event: ChangeEvent<unknown>, value: number) => {
        setInProgressPage(value);
    };

    const handleDonePageChange = (event: ChangeEvent<unknown>, value: number) => {
        setDonePage(value);
    };

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const [openPriorityModal, setOpenPriorityModal] = useState(false);

    const handleOpenPriorityModal = () => {
        setOpenPriorityModal(true);
    };

    const handleClosePriorityModal = () => {
        setOpenPriorityModal(false);
    };


    const [openCustomerModal, setOpenCustomerModal] = useState(false);

    const handleOpenCustomerModal = () => {
        setOpenCustomerModal(true);
    };

    const handleCloseCustomerModal = () => {
        setOpenCustomerModal(false);
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
            <Button variant="contained" color="primary" onClick={handleOpenModal} sx={{ backgroundColor: '#5F7ADB' ,
                '&:hover': {
                    backgroundColor: '#4a5fa8',
                },}}>
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


            <Button variant="contained" color="primary" onClick={handleOpenCustomerModal} sx={{ marginLeft: 2, backgroundColor: '#5F7ADB',
                '&:hover': {
                    backgroundColor: '#4a5fa8',
                }, }}>
                Show Ticket Customer Graph
            </Button>
            <Dialog
                open={openCustomerModal}
                onClose={handleCloseCustomerModal}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle>Ticket Customer Graph</DialogTitle>
                <DialogContent>
                    <TicketCustomerGraph tickets={props.tickets} />
                </DialogContent>
            </Dialog>


            <Button variant="contained" color="primary" onClick={handleOpenPriorityModal} sx={{ marginLeft: 2, backgroundColor: '#5F7ADB',
                '&:hover': {
                    backgroundColor: '#4a5fa8',
                }, }} >
                Show Ticket Priority Graph
            </Button>
            <Dialog
                open={openPriorityModal}
                onClose={handleClosePriorityModal}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle>Ticket Priority Graph</DialogTitle>
                <DialogContent>
                    <TicketPriorityGraph tickets={props.tickets} />
                </DialogContent>
            </Dialog>

            <Button
                variant="contained"
                onClick={props.refreshTickets}
                sx={{ marginLeft: 2, backgroundColor: '#5F7ADB',
                    '&:hover': {
                        backgroundColor: '#4a5fa8',
                    }, }}
            >
                Refresh Tickets
            </Button>

            <Button
                variant="contained"
                color="error"
                onClick={props.onLogout}
                sx={{ marginLeft: 2  ,
                    '&:hover': {
                        backgroundColor: '#A32222',
                    }, }}
            >
                Logout
            </Button>


            <div className="tickets">
                {renderGridHeaders("Open Tickets:")}
                {openTickets
                    .slice((openPage - 1) * ticketsPerPage, openPage * ticketsPerPage)
                    .map((ticket) => (
                        <TicketCard
                            key={ticket.id}
                            ticket={ticket}
                            updateTicket={props.updateTicket}
                            deleteTicket={props.deleteTicket}
                        />
                    ))}
                <Pagination
                    count={Math.ceil(openTickets.length / ticketsPerPage)}
                    page={openPage}
                    onChange={handleOpenPageChange}
                    color="primary"
                    sx={{
                        marginTop: 2,
                        marginBottom: 2,

                        '& .MuiPaginationItem-root.Mui-selected': { backgroundColor: '#5F7ADB' ,
                            '&:hover': {
                                backgroundColor: '#4a5fa8',
                            }, },
                    }}
                />
            </div>
            <div className="tickets">
                {renderGridHeaders("In Progress Tickets:")}
                {inProgressTickets
                    .slice((inProgressPage - 1) * ticketsPerPage, inProgressPage * ticketsPerPage)
                    .map((ticket) => (
                        <TicketCard
                            key={ticket.id}
                            ticket={ticket}
                            updateTicket={props.updateTicket}
                            deleteTicket={props.deleteTicket}
                        />
                    ))}
                <Pagination
                    count={Math.ceil(inProgressTickets.length / ticketsPerPage)}
                    page={inProgressPage}
                    onChange={handleInProgressPageChange}
                    color="primary"
                    sx={{
                        marginTop: 2,
                        marginBottom: 2,

                        '& .MuiPaginationItem-root.Mui-selected': { backgroundColor: '#5F7ADB',
                            '&:hover': {
                                backgroundColor: '#4a5fa8',
                            }, },
                    }}
                />
            </div>
            <div className="tickets">
                {renderGridHeaders("Done Tickets:")}
                {doneTickets
                    .slice((donePage - 1) * ticketsPerPage, donePage * ticketsPerPage)
                    .map((ticket) => (
                        <TicketCard
                            key={ticket.id}
                            ticket={ticket}
                            updateTicket={props.updateTicket}
                            deleteTicket={props.deleteTicket}
                        />
                    ))}
                <Pagination
                    count={Math.ceil(doneTickets.length / ticketsPerPage)}
                    page={donePage}
                    onChange={handleDonePageChange}
                    color="primary"
                    sx={{
                        marginTop: 2,
                        marginBottom: 2,

                        '& .MuiPaginationItem-root.Mui-selected': { backgroundColor: '#5F7ADB',
                            '&:hover': {
                                backgroundColor: '#4a5fa8',
                            }, },
                    }}
                />
            </div>

        </div>
    );
}
