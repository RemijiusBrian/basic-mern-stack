import { User } from "../models/user";

interface ApiResponse {
    success: boolean,
    statusCode: number,
    data: any
}

const fetchData = async (input: RequestInfo, init?: RequestInit) => {
    const response = await fetch(input, init);
    const responseJson: ApiResponse = await response.json();
    if (response.ok) {
        return responseJson.data;
    } else {
        throw Error(`Request failed with status ${responseJson.statusCode}. Message: ${responseJson.data.error}`)
    }
}

export const getUsersList = async (): Promise<User[]> => {
    const response = await fetchData("/api/users", { method: "GET" });
    return response;
}

export interface SignUpInputs {
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    dob: Date,
    gender: gender,
    readTnC: boolean,
    agreeToEmails: boolean
}

type gender = 'male' | 'female'

export const registerUser = async (inputs: SignUpInputs): Promise<User> => {

    if (!inputs.dob) throw Error("Please enter your date of birth");
    if (!inputs.gender) throw Error("Please select Gender");
    if (!inputs.readTnC) throw Error("You have to accept the Terms and Conditions");

    const response = await fetchData("/api/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
    });

    return response;
};