import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function useUser(loadAllTickets: () => void) {
    const [user, setUser] = useState<string>();

    async function checkLoggedIn() {
        try {
            const response = await axios.get("/api/users/me");
            setUser(response.data);
        } catch (error) {
            console.error("Error checking logged-in status:", error);
        }
    }

    async function login(username: string, password: string) {
        try {
            const response = await axios.post("/api/users/login", undefined, {
                auth: { username, password },
            });
            setUser(response.data);
            loadAllTickets();
            toast.success("Login Successful!");
        } catch (error) {
            toast.error("Login Failed: Please check your username and password.");
        }
    }

    async function logout() {
        try {
            await axios.post("/api/users/logout");
            setUser(undefined);
            toast.success("Logout Successful!");

        } catch (error) {
            console.error("Logout failed:", error);
        }
    }

    useEffect(() => {
        checkLoggedIn();
    }, []);

    return { user, login, logout };
}
