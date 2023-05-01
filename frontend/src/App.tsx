import React from 'react';
import './App.css';
import Header from "./static/Header";
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import TicketGallery from "./TicketGallery";
import ArchivedGallery from "./ArchivedGallery";
import AddTicket from "./AddTicket";
import useTickets from "./useTickets";
import TicketDetail from "./TicketDetails";
import LoginPage from "./LoginPage";
import useUser from "./useUser";
import { ToastContainer } from "react-toastify";
import ProtectedRoutes from "./ProtectedRoutes";
import LogoutPage from "./LogoutPage";



function App() {
    const { tickets, addTicket, deleteTicket, updateTicket, loadAllTickets } = useTickets();
    const { user, login, logout } = useUser(loadAllTickets);

    async function handleLogout() {
        await logout();
    }


    return (
        <BrowserRouter>
            <div className="App">
                <ToastContainer autoClose={3000} />
                <Header />

                <Routes>
                    <Route path='/login' element={<LoginPage onLogin={login} />} />

                    <Route element={<ProtectedRoutes user={user} />}>
                        <Route element={<Navigate to='/tickets' />} />
                        <Route path='/logout' element={<LogoutPage onLogout={handleLogout} />} />

                        <Route
                            path={"/"}
                            element={
                                <TicketGallery
                                    tickets={tickets}
                                    updateTicket={updateTicket}
                                    deleteTicket={deleteTicket}
                                    refreshTickets={loadAllTickets}
                                    onLogout={logout}
                                />


                            }
                        />

                        <Route
                            path={"/menu"}
                            element={
                                <TicketGallery
                                    tickets={tickets}
                                    updateTicket={updateTicket}
                                    deleteTicket={deleteTicket}
                                    refreshTickets={loadAllTickets}
                                    onLogout={logout}
                                />


                            }
                        />

                        <Route path={"/add"} element={<AddTicket addTicket={addTicket} />} />
                        <Route
                            path={"/archives"}
                            element={
                                <ArchivedGallery
                                    tickets={tickets}
                                    updateTicket={updateTicket}
                                    deleteTicket={deleteTicket}
                                />
                            }
                        />
                        <Route path={"/product/details/:id"} element={<TicketDetail />} />
                    </Route>
                </Routes>
            </div>
        </BrowserRouter>
    );
}
export default App;
