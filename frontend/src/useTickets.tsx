import {useEffect, useState} from "react";
import {NewTicket, Ticket} from "./model/Ticket";
import axios from "axios";


export default  function useTickets() {

    const [tickets, setTickets] = useState<Ticket[]>([])
    useEffect(()=>{
        loadAllTickets()
    },[])

    function loadAllTickets(){
        axios.get("/api/tickets")
            .then((response) => {setTickets(response.data)})
            .catch((error) => {console.error(error)})

    }

    function addTicket(newTicket:NewTicket){
        axios.post("/api/tickets", newTicket)
            .then((response) => {
                setTickets([...tickets, response.data])
            })
            .catch(console.error)
    }

    function updateTicket(ticket:Ticket){
        axios.put(`/api/tickets/${ticket.id}`, ticket)
            .then((response) => {
                setTickets(tickets.map(currentTicket => {
                    if (currentTicket.id === ticket.id) {
                        return response.data
                    }
                    else {
                        return currentTicket
                    }
                }))
            })
            .catch(console.error)

    }
    function deleteTicket(id: string) {
        axios.delete('/api/tickets/' + id)
            .then(() => {
                setTickets(tickets.filter((ticket) => ticket.id !== id))
            })
            .catch(console.error)
    }

return {tickets,addTicket,updateTicket,deleteTicket}



}