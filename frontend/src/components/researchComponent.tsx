import { useContext } from "react";
import { clientService } from "../service/client";
import { AppContext } from "../App";

const ResearchComponent = () => {
    const context = useContext(AppContext);
    const getUsers = async () => {
        const response = await clientService('GET', `${context.value}/api/users`, {})
        if (response?.status == 200)
            console.log('Response Data', response?.data)
    }
    return <div><button onClick={getUsers}>Get Users from API</button></div>
}

export default ResearchComponent