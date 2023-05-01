import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function useUser(loadAllTickets: () => void) {
    const [user, setUser] = useState<string>();

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

    return { user, login, logout };
}
