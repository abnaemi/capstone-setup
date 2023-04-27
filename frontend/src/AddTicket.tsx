import { useState } from "react";
import { NewTicket } from "./model/Ticket";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import Box from "@mui/material/Box";

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
        const newTicket: NewTicket = {
            name: name,
            title: title,
            content: content,
            phone: phone,
            email: email,
            customer: customer,
            prio: prio,
            status: "OPEN"
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
                "& > :not(style)": { m: 1, width: "25ch" },
                display: "flex",
                flexDirection: "column"
            }}
            noValidate
            autoComplete="off"
        >
            <Input
                placeholder="Name"
                value={name}
                onChange={(event) => {
                    setName(event.target.value);
                }}

            />
            <Input
                placeholder="Title"
                value={title}
                onChange={(event) => {
                    setTitle(event.target.value);
                }}

            />
            <Input
                placeholder="Content"
                multiline
                rows={10}
                value={content}
                onChange={(event) => {
                    setContent(event.target.value);
                }}

            />
            <Input
                placeholder="Phone"
                value={phone}
                onChange={(event) => {
                    setPhone(event.target.value);
                }}

            />
            <Input
                placeholder="Email"
                value={email}
                onChange={(event) => {
                    setEmail(event.target.value);
                }}

            />
            <Input
                placeholder="Customer"
                value={customer}
                onChange={(event) => {
                    setCustomer(event.target.value);
                }}

            />
            <Input
                placeholder="Prio"
                value={prio}
                onChange={(event) => {
                    setPrio(event.target.value);
                }}

            />
            <Button variant="outlined" onClick={onSaveTicket}>
                Save
            </Button>
        </Box>
    );
}
