import React, {useEffect, useState} from 'react';
import './App.css';
import Header from "./static/Header";

import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter, Route, Routes,} from "react-router-dom";

import TicketGallery from "./TicketGallery";
import ArchivedGallery from "./ArchivedGallery";
import {NewTicket, Ticket} from "./model/Ticket";
import axios from "axios";
import AddTicket from "./AddTicket";

function App() {


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



  return (
      <div className="App">
          <BrowserRouter>
              <Header/>
              <Routes>
                  <Route path={"/"} element={
                      <TicketGallery tickets={tickets} updateTicket={updateTicket} deleteTicket={deleteTicket}/>
                  }/>

                  <Route path={"/menu"} element={
                      <TicketGallery tickets={tickets} updateTicket={updateTicket} deleteTicket={deleteTicket}/>
                  }/>

                  <Route path={"/add"} element={
                      <AddTicket  addTicket={addTicket}/>
                  }/>
                  <Route path={"/archives"} element={
                      <ArchivedGallery  tickets={tickets} updateTicket={updateTicket} deleteTicket={deleteTicket}/>
                  }/>


              </Routes>
          </BrowserRouter>



      </div>
  );
}
export default App;
