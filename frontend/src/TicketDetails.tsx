import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";
import {Typography} from "@mui/material";
import {Ticket} from "./model/Ticket";


export default function TicketDetail() {

    const [ticket, setTicket] = useState<Ticket>()

    const {id} = useParams<{ id: string }>()

    useEffect(() => {
        if (id) {
            loadTicketById(id)
        }
    }, [])

    function loadTicketById(id: string) {
        axios.get('/api/tickets/' + id)
            .then((response) => {
                setTicket(response.data)
            })
            .catch((error) => {
                toast.error("Ticket not found")
            })
    }

    return (
        <div>
            {ticket ? (
                <div>
                    <Typography>Id: {ticket.id}</Typography>
                    <Typography>Title:{ticket.title}</Typography>
                    <Typography>Name:{ticket.name}</Typography>
                    <Typography>Content:{ticket.content}</Typography>
                    <Typography>Phone:{ticket.phone}</Typography>
                    <Typography>E-Mail:{ticket.email}</Typography>
                    <Typography>Customer:{ticket.customer}</Typography>
                    <Typography>Prio: {ticket.prio}</Typography>

                    {ticket.comment.map((c) => (
                        <div key={c.id}>
                            Comments:
                            <Typography>{c.id}</Typography>
                            <Typography>{c.comment}</Typography>
                        </div>
                    ))}
                </div>
            ) : (
                <div>Loading...</div>
            )}




        </div>
    );
}