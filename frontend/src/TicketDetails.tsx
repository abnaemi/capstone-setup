import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Typography, TextField, Button, Grid, Card, CardContent, CardHeader, CardActions, Divider, Paper } from "@mui/material";
import { Ticket } from "./model/Ticket";

export default function TicketDetail() {
    const [ticket, setTicket] = useState<Ticket | null>(null);
    const [commentText, setCommentText] = useState("");

    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (id) {
            loadTicketById(id);
        }
    }, [id]);

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
            ...(ticket as Ticket),
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
            <Grid item xs={12} sm={6} md={4}>
                <Card>
                    <CardHeader title="Ticket Details" />
                    <Divider />
                    <CardContent>
                        {ticket ? (
                            <div>
                                <Typography>ID: {ticket.id}</Typography>
                                <Typography>Title: {ticket.title}</Typography>
                                <Typography>Name: {ticket.name}</Typography>
                                <Typography>Phone: {ticket.phone}</Typography>
                                <Typography>
                                    Email:{" "}
                                    <a href={`mailto:${ticket.email}`} target="_blank" rel="noopener noreferrer">
                                        {ticket.email}
                                    </a>
                                </Typography>

                                <Typography>Customer: {ticket.customer}</Typography>
                                <Typography>Priority: {ticket.prio}</Typography>
                                <Divider sx={{ my: 2 }} />
                                <Typography variant="subtitle2">Content:</Typography>
                                <Typography>{ticket.content}</Typography>
                            </div>
                        ) : (
                            <div>Loading...</div>
                        )}
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={8}>
                <Card>
                    <CardHeader title="Comments" />
                    <Divider />
                    <CardContent>
                        {ticket?.comment?.map((c) => (
                            <Paper key={c.datetime} elevation={1} sx={{ borderRadius: 4, p: 2, mt: 2 }}>
                                <Typography variant="subtitle1">{c.datetime}</Typography>
                                <Typography variant="body1">{c.comment}</Typography>
                            </Paper>
                        ))}
                    </CardContent>
                    <CardActions>
                        <form onSubmit={handleCommentSubmit} style={{ width: '100%' }}>
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
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
    );
}

