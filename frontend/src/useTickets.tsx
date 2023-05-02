import { useCallback, useEffect, useState } from "react";
import { NewTicket, Ticket } from "./model/Ticket";
import axios from "axios";
import { toast } from "react-toastify";

export default function useTickets() {


    const [tickets, setTickets] = useState<Ticket[]>([]);

    useEffect(() => {
        loadAllTickets()}, [])


    function loadAllTickets() {
        axios
            .get("/api/tickets")
            .then((response) => {
                setTickets(response.data);
                toast.success("Tickets loaded!");
            })
            .catch((error) => {
                console.error(error);
                toast.error("Failed to load tickets.");
            });
    }



    function addTicket(newTicket: NewTicket) {
        axios
            .post("/api/tickets", newTicket)
            .then((response) => {
                setTickets([...tickets, response.data]);
                toast.success("Ticket created successfully!");
            })
            .catch((error) => {
                console.error(error);
                toast.error("Failed to create ticket.");
            });
    }


    function updateTicket(ticket: Ticket) {
        axios
            .put(`/api/tickets/${ticket.id}`, ticket)
            .then((response) => {
                setTickets(
                    tickets.map((currentTicket) =>
                        currentTicket.id === ticket.id ? response.data : currentTicket
                    )
                );
                toast.success("Ticket updated successfully!");
            })
            .catch((error) => {
                console.error(error);
                toast.error("Failed to update ticket.");
            });
    }
    function deleteTicket(id: string) {
        axios
            .delete('/api/tickets/' + id)
            .then(() => {
                setTickets(tickets.filter((ticket) => ticket.id !== id));
                toast.success("Ticket deleted successfully!");
            })
            .catch((error) => {
                console.error(error);
                toast.error("Failed to delete ticket.");
            });
    }

return {tickets,addTicket,updateTicket,deleteTicket, loadAllTickets }



}