import { Grid, InputAdornment, TextField, Typography } from "@mui/material";
import { Search } from "@mui/icons-material";
import { Ticket } from "./model/Ticket";
import TicketCard from "./TicketCard";
import React, {ChangeEvent, useState} from "react";

type Props = {
    tickets: Ticket[];
    updateTicket: (ticket: Ticket) => void;
    deleteTicket: (id: string) => void;
};

export default function TicketGallery(props: Props) {
    const [searchTerm, setSearchTerm] = useState("");
    const archivedTickets: Ticket[] = props.tickets.filter(
        (ticket) => ticket.status === "ARCHIVED"
    );

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredTickets = archivedTickets.filter((ticket) =>
        ticket.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <div className="tickets">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h6" component="h2" sx={{ fontSize: 14, paddingLeft: '14px', paddingRight: '16px', fontWeight: 'bold' }}>Archived Tickets</Typography>
                    </Grid>
                    <Grid item xs={2} sm={2} sx={{ minWidth: '100px' }}>
                        <Typography variant="h6" component="h2" sx={{ fontSize: 14, fontWeight: "bold" }}>
                            Title
                        </Typography>
                    </Grid>
                    <Grid item xs={2} sm={2} sx={{ minWidth: '100px' }}>
                        <Typography variant="h6" component="h2" sx={{ fontSize: 14, fontWeight: "bold" }}>
                            Customer
                        </Typography>
                    </Grid>
                    <Grid item xs={2} sm={2} sx={{ minWidth: '100px' }}>
                        <Typography variant="h6" component="h2" sx={{ fontSize: 14, fontWeight: "bold" }}>
                            Status
                        </Typography>
                    </Grid>
                    <Grid item xs={2} sm={2} sx={{ minWidth: '100px' }}>
                        <Typography variant="h6" component="h2" sx={{ fontSize: 14, fontWeight: "bold" }}>
                            Prio
                        </Typography>
                    </Grid>
                    <Grid item xs={2} sm={2} sx={{ minWidth: '100px' }}>
                        <Typography variant="h6" component="h2" sx={{ fontSize: 14, fontWeight: "bold" }}>
                            ID
                        </Typography>
                    </Grid>
                    <Grid item xs={2} sm={2}>
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
