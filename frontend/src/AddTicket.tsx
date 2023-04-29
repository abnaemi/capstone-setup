import { useState } from "react";
import { NewTicket } from "./model/Ticket";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import SaveIcon from "@mui/icons-material/Save";

type Props = {
    addTicket: (newTicket: NewTicket) => void;
};

export default function AddTicket(props: Props) {
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
            comment: [{ datetime: "System", comment: `Ticket created on ${now.toLocaleString()}` }]
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
                label="Customer"
                variant="outlined"
                value={customer}
                onChange={(event) => {
                    setCustomer(event.target.value);
                }}
            />

            <TextField
                label="Priority"
                variant="outlined"
                value={prio}
                onChange={(event) => {
                    setPrio(event.target.value);
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
                variant="outlined"
                startIcon={<SaveIcon />}
                onClick={onSaveTicket}
            >
                Save
            </Button>
        </Box>
    );
}
