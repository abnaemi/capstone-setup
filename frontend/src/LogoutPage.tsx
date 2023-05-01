import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Box } from "@mui/material";

type Props = {
    onLogout: () => Promise<void>;
};

export default function LogoutPage(props: Props) {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    function handleLogout() {
        setIsLoading(true);
        props
            .onLogout()
            .then(() => {
                navigate("/login");
            })
            .catch((error) => {
                console.error("Logout failed:", error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <Button variant="contained" color="primary" onClick={handleLogout} disabled={isLoading}>
                {isLoading ? "Logging out..." : "Logout"}
            </Button>
        </Box>
    );
}
