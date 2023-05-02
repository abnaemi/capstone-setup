import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function useUser(loadAllTickets: () => void) {
    const [user, setUser] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        function checkLoggedInUser() {
            axios
                .get("/api/users/me")
                .then((response) => {
                    if (response.data && response.data !== "anonymousUser") {
                        setUser(response.data);
                    }
                })
                .catch((error) => {
                    toast.error("Error checking logged-in user:");
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }

        checkLoggedInUser();
    }, []);


    function login(username: string, password: string): Promise<void> {
        console.log("Login function called");
        return axios.post("/api/users/login", undefined, {
            auth: { username, password },
        })
            .then(response => {
                setUser(response.data);
                loadAllTickets();
                toast.success("Login Successful!");
            })
            .catch(error => {
                toast.error("Login Failed: Please check your username and password.");
            });
    }

    function logout() {
        axios.post("/api/users/logout")
            .then(() => {
                setUser(undefined);
                toast.success("Logout Successful!");
            })
            .catch(error => {
                toast.error("Logout failed:");
            });
    }

    return { user, login, logout, isLoading };
}
