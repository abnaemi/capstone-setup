import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Box } from "@mui/material";

type Props = {
    onLogin: (username: string, password: string) => Promise<void>;
};

export default function LoginPage(props: Props) {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const navigate = useNavigate();

    function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        props.onLogin(username, password).then(() => {
            navigate("/menu");
        });
    }

    return (
        <form onSubmit={onSubmit}>
            <Box marginBottom={2} marginTop={2}>
                <TextField
                    value={username}
                    label="Username"
                    variant="outlined"
                    onChange={(e) => setUsername(e.target.value)}
                />
            </Box>
            <Box marginBottom={2}>
                <TextField
                    value={password}
                    label="Password"
                    type="password"
                    variant="outlined"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Box>
            <Box marginBottom={2}>
                <TextField
                    sx={{ width: "50%", mt: 2 }}
                    label="Warning"
                    value="Please Logout with the Logout Button. Please Refresh with the Refresh Button. Or else the Session is still active"
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="outlined"
                />
            </Box>
            <Button variant="contained" color="primary" type="submit">
                Login
            </Button>
        </form>
    );
}


