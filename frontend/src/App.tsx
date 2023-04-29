import React from 'react';
import './App.css';
import Header from "./static/Header";
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter, Route, Routes,} from "react-router-dom";
import TicketGallery from "./TicketGallery";
import ArchivedGallery from "./ArchivedGallery";
import AddTicket from "./AddTicket";
import useTickets from "./useTickets";

function App() {

const {tickets,addTicket,deleteTicket,updateTicket} = useTickets()



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
