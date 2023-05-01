import { useState } from "react";
import axios from "axios";

export default function useUser(loadAllTickets: () => void) {
    const [user, setUser] = useState<string>();

    function login(username: string, password: string) {
        return axios
            .post("/api/users/login", undefined, { auth: { username, password } })
            .then((response) => {
                setUser(response.data);
                loadAllTickets(); // Call loadAllTickets after successful login
            });
    }

    async function logout() {
        try {
            await axios.post("/api/users/logout");
            setUser(undefined);
        } catch (error) {
            console.error("Logout failed:", error);
        }
    }

    return { user, login, logout };
}

