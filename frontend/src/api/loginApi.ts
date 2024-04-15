// import { getBaseUrlFromFile } from '../service/apiService';
import { clientService } from '../service/client';


// const getBaseUrl = () => {
//     let url = getBaseUrlFromFile()
//     if (url != '' || url != null || url != undefined)
//         baseUrl = url ? url : 'http://localhost:4000'
// }
// getBaseUrl();

export const postRegisterUserApi = async (baseUrl:string,payload: any) => {
    const response = await clientService('POST', `${baseUrl}/api/register`, payload)
    return { status: response?.status, data: response?.data }
}

export const postLoginUserApi = async (baseUrl:string,payload: any) => {
    const response = await clientService('POST', `${baseUrl}/api/login`, payload)
    return { status: response?.status, data: response?.data }
}

export const postCheckUsernameApi = async (baseUrl:string,payload: any) => {
    const response = await clientService('POST', `${baseUrl}/api/is_username_availabe`, payload)
    return { status: response?.status, data: response?.data }
}


export const postGetUserDetailsApi = async (baseUrl:string,payload: any) => {
    const response = await clientService('POST', `${baseUrl}/api/get_user_details`, payload)
    return { status: response?.status, data: response?.data }
}