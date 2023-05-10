import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Box, Grid, Container, Paper } from "@mui/material";

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
        <Container maxWidth="xs">
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{ minHeight: '80vh' }}
            >
                <Grid item xs={12}>
                    <Paper elevation={4} style={{ padding: '1rem' }}>
                        <form onSubmit={onSubmit}>
                            <Box marginBottom={2} marginTop={2}>
                                <TextField
                                    fullWidth
                                    value={username}
                                    label="Username"
                                    variant="outlined"
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </Box>
                            <Box marginBottom={2}>
                                <TextField
                                    fullWidth
                                    value={password}
                                    label="Password"
                                    type="password"
                                    variant="outlined"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Box>
                            <Box display="flex" justifyContent="center">
                                <Button variant="contained" color="primary" type="submit">
                                    Login
                                </Button>
                            </Box>
                        </form>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}
