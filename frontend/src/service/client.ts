import axios from 'axios'
import secureLocalStorage from 'react-secure-storage'


export const clientService = async (method: string, endpoint: string, payload: any) => {
    try {
        const requestConfigurations = {
            method: method,
            url: endpoint,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': secureLocalStorage.getItem('token')?.toString()
            },
            data: payload
        }
        const response = await axios(requestConfigurations);
        return response;
    }
    catch (err) {
        console.log(err)
    }
}