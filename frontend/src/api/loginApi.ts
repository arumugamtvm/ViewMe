import { clientService } from '../service/client';

export const postRegisterUserApi = async (payload: any) => {
    const response = await clientService('POST', "http://localhost:4000/api/register", payload)
    return { status: response?.status, data: response?.data }
}

export const postLoginUserApi = async (payload: any) => {
    const response = await clientService('POST', "http://localhost:4000/api/login", payload)
    return { status: response?.status, data: response?.data }
}

export const postCheckUsernameApi = async (payload: any) => {
    const response = await clientService('POST', "http://localhost:4000/api/is_username_availabe", payload)
    return { status: response?.status, data: response?.data }
}


export const postGetUserDetailsApi = async (payload: any) => {
    const response = await clientService('POST', "http://localhost:4000/api/get_user_details", payload)
    return { status: response?.status, data: response?.data }
}