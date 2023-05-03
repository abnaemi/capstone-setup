import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import "./NavigationBar.css";

export default function NavigationBar() {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <List>
                {[
                    { text: "View Tickets", link: "/menu" },
                    { text: "Archived Tickets", link: "/archives" },
                    { text: "Create Ticket", link: "/add" },
                    { text: "Login", link: "/login" },
                    { text: "Logout", link: "/logout" },
                    { text: "Report a Problem", link: "/report" },



                ].map((item, index) => (
                    <ListItem button key={index} component={NavLink} to={item.link}>
                        <ListItemText primary={item.text} />
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <React.Fragment>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h5" className="title">
                        Ticketsystem
                    </Typography>
                    <IconButton
                        edge="end"
                        color="inherit"
                        aria-label="menu"
                        onClick={handleDrawerToggle}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Toolbar />
            <nav>
                <Drawer
                    variant="temporary"
                    anchor="right"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                >
                    {drawer}
                </Drawer>
            </nav>
        </React.Fragment>
    );
}

