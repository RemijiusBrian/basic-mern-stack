import styles from "../styles/RegistrationPage.module.css";
import { Alert, AlertColor, Button, Card, Snackbar, ThemeProvider, createTheme } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { SignUpInputs } from "../network/users_api";
import TextInputField from "../components/form/TextInputField";
import * as UsersApi from "../network/users_api";
import LabelledCheckBox from "../components/form/CheckBox";
import { Col, Container, Form, Image } from "react-bootstrap";
import { FormRadioGroup } from "../components/form/RadioGroup";
import { FormDateField } from "../components/form/DatePicker";
import { orange } from "@mui/material/colors";
import { useState } from "react";
import { isValidPhoneNumber } from "react-phone-number-input";

const RegistrationPage = () => {

    const methods = useForm<SignUpInputs>();
    const { handleSubmit, reset } = methods;

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

    const submit = async (inputs: SignUpInputs) => {
        console.log("Submit Clicked " + JSON.stringify(inputs));
        try {
            const user = await UsersApi.registerUser(inputs);
            console.log(`Registered User - ${JSON.stringify(user)}`);

            reset({
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                dob: undefined,
                gender: undefined,
                readTnC: false,
                agreeToEmails: false
            }, {
                keepValues: false,
                keepErrors: false,
                keepTouched: false,
            });
            toggleSnackbar(true, `User ${user.firstName} Registered Successfully`, "success");
        } catch (error) {
            console.error(error);
            if (error instanceof Error) {
                toggleSnackbar(true, error.message, "error");
            }
        }
    }

    const darkCardTheme = createTheme({
        palette: {
            mode: 'dark',
            primary: orange
        }
    });

    return (
        <div className={styles.bg}>
            <Container>
                <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                    <Image
                        src="data:image/png;base64,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"
                        className={`${styles.logo} mt-4 mb-2`}
                    />

                    <ThemeProvider theme={darkCardTheme}>
                        <Card className={styles.registrationCard} style={{ borderRadius: '16px' }}>
                            <FormProvider {...methods}>
                                <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <TextInputField
                                        name="firstName"
                                        label="First Name"
                                        fullWidth
                                        registerOptions={{
                                            required: 'First name cannot be empty'
                                        }} />

                                    <TextInputField
                                        name="lastName"
                                        label="Last Name"
                                        fullWidth
                                        registerOptions={{
                                            required: 'Last name cannot be empty'
                                        }} />

                                    <TextInputField
                                        name="email"
                                        label="Email"
                                        fullWidth
                                        registerOptions={{
                                            required: 'Email cannot be empty',
                                            pattern: {
                                                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                                message: 'Please enter a valid email',
                                            },
                                        }} />

                                    <TextInputField
                                        name="phone"
                                        label="Phone"
                                        fullWidth
                                        registerOptions={{
                                            required: 'Phone cannot be empty',
                                            validate: (value) => !isValidPhoneNumber(value) ? "Invalid Phone number" : true
                                        }} />

                                    <FormDateField
                                        name="dob"
                                        label="Date of Birth"
                                        fullwidth
                                        registerOptions={{
                                            required: 'Date of Birth cannot be empty'
                                        }} />

                                    <FormRadioGroup
                                        values={['Male', 'Female']}
                                        name="gender"
                                        label="Gender"
                                        row
                                        style={{ width: '100%' }} />

                                    <LabelledCheckBox
                                        name="readTnC"
                                        label="I have read the Terms and Conditions."
                                        style={{ width: '100%' }} />

                                    <LabelledCheckBox
                                        name="agreeToEmails"
                                        label="By checking this box, you are agreeing to receive communications from
                                    Yves Saint Laurent on new product launches, exclusive in-store events
                                    and seasonal promotions."
                                        textSize="0.6rem"
                                        lineHeightNumber={0.1}
                                        style={{ width: '100%' }} />

                                    <Form.Group>
                                        <Button
                                            variant="contained"
                                            onClick={handleSubmit(submit)}
                                            sx={{ borderRadius: 28 }}>Register</Button>
                                    </Form.Group>
                                </Col>
                            </FormProvider>
                        </Card>
                    </ThemeProvider>
                </Col>
                <Snackbar
                    open={showSnackbar}
                    autoHideDuration={4000}
                    onClose={() => toggleSnackbar(false)}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                    <Alert onClose={() => toggleSnackbar(false)} severity={snackbarSeverity}>{snackbarMessage}</Alert>
                </Snackbar>
            </Container>
        </div>
    )
};

export default RegistrationPage;