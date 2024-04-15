import { useEffect, useState,useContext } from "react"
import { useParams } from "react-router-dom"
import { postGetUserDetailsApi } from "../api/loginApi";
import { AppContext } from "../App";

const UserComponent = () => {
    const context = useContext(AppContext);
    const initialUserDetails = {
        fullname: '',
        username: '',
        email: ''
    }
    const [usernameValue, setUsername] = useState('')
    const [userDetails, setUserDetails] = useState(initialUserDetails)
    const { username } = useParams()

    useEffect(() => {
        setUsername(username)
    }, [])

    useEffect(() => {
        getUserDetails();
    }, [usernameValue])

    const getUserDetails = async () => {
        if (usernameValue != '') {
            const response = await postGetUserDetailsApi(context.value,{ username: usernameValue?.toString().toLowerCase() })
            if (response.status == 200)
                setUserDetails(response?.data?.data)
            else{
                alert('No user found in this username : '-usernameValue)
            }
        }
    }

    return <h1>{userDetails.username} - {userDetails.fullname}</h1>
}

export default UserComponent