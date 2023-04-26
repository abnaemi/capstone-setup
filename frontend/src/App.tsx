import React, {useEffect, useState} from 'react';
import './App.css';
import Header from "./static/Header";

import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter,} from "react-router-dom";

import TicketGallery from "./TicketGallery";
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

  return (
      <div className="App">
          <BrowserRouter>
              <Header/>
              <TicketGallery tickets={tickets}/>
              <AddTicket  addTicket={addTicket}/>


          </BrowserRouter>



      </div>
  );
}
export default App;
