import { clientService } from "../service/client";

const ResearchComponent=()=>{
    const getUsers=async()=>{
        const response=await clientService('GET',"http://localhost:4000/api/users",{})
        if(response?.status==200)
            console.log('Response Data',response?.data)
    }
    return <div><button onClick={getUsers}>Get Users from API</button></div>
}

export default ResearchComponent