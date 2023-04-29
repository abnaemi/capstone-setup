import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Typography, TextField, Button } from "@mui/material";
import { Ticket } from "./model/Ticket";

export default function TicketDetail() {
    const [ticket, setTicket] = useState<Ticket>();
    const [commentText, setCommentText] = useState("");

    const { id } = useParams<{ id: string }>();

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
        const newComment = { id: new Date().toLocaleString('de-DE'), comment: commentText };
        const updatedTicket = { ...ticket!, comment: [...ticket!.comment, newComment] };
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
        <div>
            {ticket ? (
                <div>
                    <Typography>{ticket.id}</Typography>
                    <Typography>{ticket.title}</Typography>
                    <Typography>{ticket.name}</Typography>
                    <Typography>{ticket.content}</Typography>
                    <Typography>{ticket.phone}</Typography>
                    <Typography>{ticket.email}</Typography>
                    <Typography>{ticket.customer}</Typography>
                    <Typography>{ticket.prio}</Typography>

                    {ticket.comment.map((c) => (
                        <div key={c.id}>
                            <Typography>{c.id}</Typography>
                            <Typography>{c.comment}</Typography>
                        </div>
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
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}
