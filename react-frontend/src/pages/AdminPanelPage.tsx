import styles from "../styles/AdminPage.module.css";
import { useEffect, useState } from "react";
import { Col, Container } from "react-bootstrap";
import { User } from "../models/user";
import UserListItem from "../components/userList/userListItem";
import * as UsersApi from "../network/users_api";
import { Alert, AlertColor, Snackbar, ThemeProvider, createTheme } from "@mui/material";
import { orange } from "@mui/material/colors";

const AdminPanelPage = () => {

    const [usersList, setUsersList] = useState<User[]>([]);

    const [showSnackbar, setShowSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string | undefined>(undefined);
    const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>("success");

    const toggleSnackbar = (show: boolean, message: string | undefined = undefined, severity: AlertColor = "success") => {
        if (show) {
            setSnackbarSeverity(severity);
            setSnackbarMessage(message);
            setShowSnackbar(show);
        } else {
            setShowSnackbar(show);
            setSnackbarMessage(message);
            setSnackbarSeverity(severity);
        }
    }

    useEffect(() => {
        async function getUsersList() {
            try {
                const data = await UsersApi.getUsersList();
                setUsersList(data);
            } catch (error) {
                console.error(error);
                if (error instanceof Error) {
                    toggleSnackbar(true, error.message, "error");
                }
            }
        }

        getUsersList();
    }, []);


    const primaryCardTheme = createTheme({
        palette: {
            primary: orange
        }
    })

    return (
        <div className={styles.bg}>
            <Container>
                <Col>
                    <div className={styles.headerContainer}>
                        <h3>Users List</h3>
                    </div>
                    {usersList.length <= 0 && <p>There aren't any users registered yet.</p>}
                    {usersList.map(user => (
                        <ThemeProvider theme={primaryCardTheme}>
                            <UserListItem
                                name={`${user.firstName} ${user.lastName}`}
                                email={user.email}
                                phone={user.phone}
                                dob={user.dob}
                                gender={user.gender}
                                createdAt={user.createdAt}
                                className="mt-4"
                                key={user._id}
                            />
                        </ThemeProvider>
                    ))}
                </Col>
            </Container>
            <Snackbar
                open={showSnackbar}
                autoHideDuration={4000}
                onClose={() => toggleSnackbar(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert onClose={() => toggleSnackbar(false)} severity={snackbarSeverity}>{snackbarMessage}</Alert>
            </Snackbar>
        </div>
    )
};

export default AdminPanelPage;