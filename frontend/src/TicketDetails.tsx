import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Typography, TextField, Button, Grid } from "@mui/material";
import { Ticket } from "./model/Ticket";
import Box from "@mui/material/Box";

export default function TicketDetail() {
    const [ticket, setTicket] = useState<Ticket>();
    const [commentText, setCommentText] = useState("");

    const {id} = useParams<{ id: string }>();

    useEffect(() => {
        if (id) {
            loadTicketById(id);
        }
    }, []);

    function loadTicketById(id: string) {
        axios
            .get("/api/tickets/" + id)
            .then((response) => {
                setTicket(response.data);
            })
            .catch((error) => {
                toast.error("Ticket not found");
            });
    }

    function handleCommentSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!commentText.trim()) {
            return;
        }
        const newComment = {
            datetime: new Date().toLocaleString("de-DE"),
            comment: commentText,
        };
        const updatedTicket = {
            ...ticket!,
            comment: [...ticket!.comment, newComment],
        };
        axios
            .put(`/api/tickets/${ticket?.id}`, updatedTicket)
            .then((response) => {
                setTicket(response.data);
                setCommentText("");
            })
            .catch((error) => {
                toast.error("Failed to add comment");
            });
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <Typography variant="h6">Ticket Details:</Typography>
                {ticket ? (
                    <div>
                        <Box border={1} borderRadius={4} p={2} mb={2}>
                            <Typography>ID: {ticket.id}</Typography>
                            <Typography>Title: {ticket.title}</Typography>
                            <Typography>Name: {ticket.name}</Typography>
                            <Typography>Phone: {ticket.phone}</Typography>
                            <Typography>Email: {ticket.email}</Typography>
                            <Typography>Customer: {ticket.customer}</Typography>
                            <Typography>Priority: {ticket.prio}</Typography>
                        </Box>
                        <Box border={1} borderRadius={4} p={2} mb={2}>
                            <Typography>Content: {ticket.content}</Typography>
                        </Box>
                    </div>
                ) : (
                    <div>Loading...</div>
                )}
            </Grid>
            <Grid item xs={12} sm={6}>
                <Typography variant="h5">Comments</Typography>
                {ticket?.comment.map((c) => (
                    <Box key={c.datetime} sx={{border: "1px solid grey", p: 1, mt: 2}}>
                        <Typography variant="subtitle1">{c.datetime}</Typography>
                        <Typography variant="body1">{c.comment}</Typography>
                    </Box>
                ))}
                <form onSubmit={handleCommentSubmit}>
                    <TextField
                        label="Add a comment"
                        value={commentText}
                        onChange={(event) => setCommentText(event.target.value)}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                    />
                    <Button type="submit" variant="contained">
                        Add Comment
                    </Button>
                </form>
            </Grid>
        </Grid>
    );
}