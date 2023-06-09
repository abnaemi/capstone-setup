import React, { useState } from "react";
import {Button, TextField, Box, Container, Typography} from "@mui/material";
import {NewTicket} from "./model/Ticket";
import SaveIcon from "@mui/icons-material/Save";

type Props = {
    addTicket: (newTicket: NewTicket) => void;

};

export default function ReportTicket(props: Props) {




    const [name, setName] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [customer, setCustomer] = useState<string>("");
    const [prio, setPrio] = useState<string>("");

    function onSaveTicket() {
        const now = new Date();
        const newTicket: NewTicket = {
            name: name,
            title: title,
            content: content,
            phone: phone,
            email: email,
            customer: customer,
            prio: prio,
            status: "OPEN",
            comment: [{ datetime: "System", comment: `Ticket created on ${now.toLocaleString()}`,
                imageURL: '' }]
        };

        props.addTicket(newTicket);
        setName("");
        setTitle("");
        setContent("");
        setPhone("");
        setEmail("");
        setCustomer("");
        setPrio("");
    }






    return (
        <Container maxWidth="xs">
            <Typography variant="h4" align="center" gutterBottom>
                Get in Touch with Our Support Team
            </Typography>
            <Box
                component="form"
                sx={{
                    "& > :not(style)": { m: 1 },
                    display: "flex",
                    flexDirection: "column",
                }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    label="Title"
                    variant="outlined"
                    value={title}
                    onChange={(event) => {
                        setTitle(event.target.value);
                    }}
                />



                <TextField
                    label="Name"
                    variant="outlined"
                    value={name}
                    onChange={(event) => {
                        setName(event.target.value);
                    }}
                />

                <TextField
                    label="Phone"
                    variant="outlined"
                    value={phone}
                    onChange={(event) => {
                        setPhone(event.target.value);
                    }}
                />

                <TextField
                    label="Email"
                    variant="outlined"
                    value={email}
                    onChange={(event) => {
                        setEmail(event.target.value);
                    }}
                />

                <TextField
                    label="Content"
                    variant="outlined"
                    multiline
                    rows={10}
                    value={content}
                    onChange={(event) => {
                        setContent(event.target.value);
                    }}
                />

                <Button
                    variant="contained"
                    startIcon={<SaveIcon />}
                    onClick={onSaveTicket}
                    disabled={!title || !name || !phone || !email || !content}
                >
                    Save
                </Button>

            </Box>





        </Container>
    );
}
