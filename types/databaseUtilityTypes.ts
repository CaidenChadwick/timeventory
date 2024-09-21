export type Status = {
    success: boolean;
    code: number;
    message: string;
    payload: any;
}

export type LoginData = {
    username: string;
    password: string;
}

export type RegistrationData = {
    email: string;
    username: string;
    password: string;
}