import { Grid, InputAdornment, TextField, Typography } from "@mui/material";
import { Search } from "@mui/icons-material";
import { Ticket } from "./model/Ticket";
import TicketCard from "./TicketCard";
import React from "react";

type Props = {
    tickets: Ticket[];
    updateTicket: (ticket: Ticket) => void;
    deleteTicket: (id: string) => void;
};

export default function TicketGallery(props: Props) {
    const [searchTerm, setSearchTerm] = React.useState("");
    const archivedTickets: Ticket[] = props.tickets.filter(
        (ticket) => ticket.status === "ARCHIVED"
    );

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredTickets = archivedTickets.filter((ticket) =>
        ticket.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <div className="tickets">

                <Grid item xs={12} sm={2}>
                    <Typography variant="h6" component="h2" sx={{ fontSize: 14, paddingLeft: '14px', paddingRight: '16px', fontWeight: 'bold' }}>Archived Tickets</Typography>
                </Grid>
                <Grid container spacing={2}>





                    <Grid item xs={12} sm={2}>


                        <Typography
                            variant="h6"
                            component="h2"
                            sx={{
                                fontSize: 14,
                                paddingLeft: "14px",
                                paddingRight: "16px",
                                fontWeight: "bold",
                            }}
                        >
                            Title
                        </Typography>
                    </Grid>

                    <Grid item xs={12} sm={2}>
                        <Typography
                            variant="h6"
                            component="h2"
                            sx={{
                                fontSize: 14,
                                paddingLeft: "8px",
                                paddingRight: "16px",
                                fontWeight: "bold",
                            }}
                        >
                            Customer
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Typography
                            variant="h6"
                            component="h2"
                            sx={{ fontSize: 14, fontWeight: "bold" }}
                        >
                            Status
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Typography
                            variant="h6"
                            component="h2"
                            sx={{ fontSize: 14, fontWeight: "bold" }}
                        >
                            Prio
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Typography
                            variant="h6"
                            component="h2"
                            sx={{ fontSize: 14, fontWeight: "bold" }}
                        >
                            ID
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <TextField
                            value={searchTerm}
                            onChange={handleSearchChange}
                            fullWidth
                            placeholder="Search by ID"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Search />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                </Grid>
                {filteredTickets.map((ticket) => (
                    <TicketCard
                        key={ticket.id}
                        ticket={ticket}
                        updateTicket={props.updateTicket}
                        deleteTicket={props.deleteTicket}
                    />
                ))}
            </div>
        </div>
    );
}