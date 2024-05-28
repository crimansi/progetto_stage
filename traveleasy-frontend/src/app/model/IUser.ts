export interface SignUpRequest{
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string,
}

export interface LoginRequest{
    username: string,
    password: string
}

export interface AuthResponse{
    token: string,
    id: number,
    email: string,
    firstName: string,
    lastName: string
}
export interface MessageResponse{
    message: string,
    errors: string[]
}