import "./NavigationBar.css";
import {NavLink} from "react-router-dom";
import {AppBar, Toolbar, Typography} from "@mui/material";
import React from "react";
export default function NavigationBar() {
    return (


        <React.Fragment>
            <AppBar position="fixed">
                <Toolbar>{

                    <div>
                        <Typography variant="h5">Ticketsystem</Typography>


                        <NavLink className={"NavLink"}  to={"/menu"}> View Tickets | </NavLink>
                        <NavLink className={"NavLink"} to={"/archives"}> Archived Tickets | </NavLink>
                        <NavLink className={"NavLink"}  to={"/add"}> Create Ticket  </NavLink>
                    </div>

                }</Toolbar>
            </AppBar>
            <Toolbar/>
        </React.Fragment>
    );
}

