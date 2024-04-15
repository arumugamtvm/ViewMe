import { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import secureLocalStorage from 'react-secure-storage';
import { postGetUserDetailsApi } from "../api/loginApi";
import { AppContext } from "../App";

const WelcomeComponent = () => {
    const context = useContext(AppContext);
    const initialUserDetails = {
        fullname: '',
        username: '',
        email: ''
    }
    const navigate = useNavigate()
    const [username, setUsername] = useState(secureLocalStorage.getItem('username'))
    const [userDetails, setUserDetails] = useState(initialUserDetails)

    useEffect(() => {
        if (username == null || username == undefined)
            navigate('/login')
        else
            getUserDetails()
    }, [])

    const getUserDetails=async()=>{
        const response=await postGetUserDetailsApi(context.value,{username:username?.toString().toLowerCase()})
        if(response.status==200)
            setUserDetails(response?.data?.data)
    }

    const onClickLogout=()=>{
        secureLocalStorage.removeItem('username')
        navigate('/login')
    }

    return <div>
        <h1>Welcome {userDetails.fullname}</h1>
        <button onClick={onClickLogout}>Logout</button>
    </div>

}

export default WelcomeComponent