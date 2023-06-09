import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Typography, TextField, Button, Grid, Card, CardContent, CardHeader, CardActions, Divider, Paper } from "@mui/material";
import { Ticket } from "./model/Ticket";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";


type Props = {
    onTicketUpdate: () => void;
};


export default function TicketDetail({ onTicketUpdate }: Props) {
    const [ticket, setTicket] = useState<Ticket | null>(null);
    const [commentText, setCommentText] = useState("");

    const [title, setTitle] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [customer, setCustomer] = useState<string>("");
    const [prio, setPrio] = useState<string>("");

    const [imageURL, setImageURL] = useState("");



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
                setTitle(response.data.title);
                setName(response.data.name);
                setPhone(response.data.phone);
                setEmail(response.data.email);
                setContent(response.data.content);
                setPrio(response.data.prio);
                setCustomer(response.data.customer);
            })
            .catch((error) => {
                toast.error("Ticket not found");
            });
    }

    function updateTicket() {
        const updatedTicket = {
            ...(ticket as Ticket),
            title: title,
            name: name,
            phone: phone,
            email: email,
            content: content,
            prio: prio,
            customer:customer,
        };

        axios
            .put(`/api/tickets/${ticket?.id}`, updatedTicket)
            .then((response) => {
                setTicket(response.data);
                toast.success("Ticket updated successfully!");
                onTicketUpdate();
            })
            .catch((error) => {
                console.error(error);
                toast.error("Failed to update ticket.");
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
            imageURL: imageURL,
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
                toast.success("Comment added!");
            })
            .catch((error) => {
                console.error(error);
                toast.error("Failed to add comment.");
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
                                {c.imageURL && <img src={c.imageURL} alt="Comment attachment" style={{ maxWidth: '100%', maxHeight: '300px' }} />}
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
                            <TextField
                                label="Image URL"
                                value={imageURL}
                                onChange={(event) => setImageURL(event.target.value)}
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

            <Grid item xs={12} >
                <TextField
                    label="Title"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    label="Name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    label="Phone"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    label="Email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    label="Content"
                    value={content}
                    onChange={(event) => setContent(event.target.value)}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    multiline
                    rows={4}
                />
                <Grid item xs={12} style={{ marginTop: '1rem' }}>

                <FormControl variant="outlined" fullWidth >
                    <InputLabel id="customer-label">Customer</InputLabel>
                    <Select
                        labelId="customer-label"
                        label="Customer"
                        fullWidth
                        rows={4}
                        value={customer}
                        onChange={(event) => setCustomer(event.target.value)}
                    >
                        <MenuItem value={"Standard"}>Standard</MenuItem>
                        <MenuItem value={"Premium"}>Premium</MenuItem>
                    </Select>

                </FormControl>
                </Grid>

                <Grid item xs={12} style={{ marginTop: '1rem' }}>

                <FormControl  variant="outlined" fullWidth >
                    <InputLabel  id="priority-label">Priority</InputLabel>
                    <Select
                        labelId="priority-label"
                        label="Priority"

                        value={prio}
                        onChange={(event) => setPrio(event.target.value)}
                    >
                        <MenuItem value={"Low"}>Low</MenuItem>
                        <MenuItem value={"Medium"}>Medium</MenuItem>
                        <MenuItem value={"High"}>High</MenuItem>
                    </Select>
                </FormControl>
                </Grid>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={updateTicket}
                    style={{ marginTop: "1rem" }}
                >
                    Save
                </Button>
            </Grid>



        </Grid>
    );
}

