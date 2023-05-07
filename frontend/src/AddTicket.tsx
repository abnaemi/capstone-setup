import React, { useState } from "react";
import { NewTicket } from "./model/Ticket";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import SaveIcon from "@mui/icons-material/Save";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { SelectChangeEvent } from "@mui/material";


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
            comment: [{ datetime: "System", comment: `Ticket created on ${now.toLocaleString()}`,
                imageURL: ''}]
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

    const handlePrioChange = (event: SelectChangeEvent<string>) => {
        setPrio(event.target.value);
    };

    const handleCustomerChange = (event: SelectChangeEvent<string>) => {
        setCustomer(event.target.value);
    };


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

            <FormControl variant="outlined">
                <InputLabel id="customer-label">Customer</InputLabel>
                <Select
                    labelId="customer-label"
                    label="Customer"
                    value={customer}
                    onChange={handleCustomerChange}
                >
                    <MenuItem value={"Standard"}>Standard</MenuItem>
                    <MenuItem value={"Premium"}>Premium</MenuItem>
                </Select>
            </FormControl>

            <FormControl variant="outlined">
                <InputLabel id="priority-label">Priority</InputLabel>
                <Select
                    labelId="priority-label"
                    label="Priority"
                    value={prio}
                    onChange={handlePrioChange}
                >
                    <MenuItem value={"Low"}>Low</MenuItem>
                    <MenuItem value={"Medium"}>Medium</MenuItem>
                    <MenuItem value={"High"}>High</MenuItem>
                </Select>
            </FormControl>

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
