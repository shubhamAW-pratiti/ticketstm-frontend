import React from 'react'
import {useState , useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UserProfile = () => {
    const {userId}=useParams();
    const [user,setUser]=useState(null);

    console.log('user id',userId);
    //fetch user details when the component mounts
    useEffect(()=>{
        axios.get(`http://localhost:3002/user/${userId}`)
        .then((response)=>{
            if(response.status===200){
                const fetchedUser=response.data.data;
                setUser(fetchedUser);
            }else{
                console.log('problem with fetching user details');
            }
        }).catch((error)=>{
            console.log('error fetching user details',error);
        })
    },[userId])

  return (
    <div
        style={{
            width:'100%',
            height:'100%',
            borderRadius: '10px',
            backgroundColor: '#f5f5f5',
            padding: '5%',
        }}
    >
        <h4>User Profile</h4>
        {console.log('user',user)}
        <p>User id: {user?.email}</p>
    </div>
  )
}

export default UserProfile