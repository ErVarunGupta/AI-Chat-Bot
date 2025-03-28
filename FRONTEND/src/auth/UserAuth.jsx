import React, {useContext, useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/user.context';

const UserAuth = ({children}) => {

    const {user} = useContext(UserContext);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();


    useEffect(() =>{
        if(user){
            setLoading(false);
        }
        
        if(!token){
            navigate('/login');
        }

        if(!user){
            navigate('/login');
        }
    },[])

    if(loading){
        return <h1>Loading...</h1>
    }

    return (
        <>
        {children}
        </>
    )
}

export default UserAuth;