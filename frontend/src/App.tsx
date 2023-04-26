import React, {useEffect, useState} from 'react';
import './App.css';
import Header from "./static/Header";

import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter} from "react-router-dom";

import TicketGallery from "./TicketGallery";
import {Ticket} from "./model/Ticket";
import axios from "axios";

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

  return (
      <div>
          <BrowserRouter>
              <Header/>
              <TicketGallery tickets={tickets}/>
          </BrowserRouter>



      </div>
  );
}
export default App;
