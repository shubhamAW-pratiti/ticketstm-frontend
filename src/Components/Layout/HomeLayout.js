import React from 'react'
import HomeNavbar from '../HomeNavbar'
import { Outlet } from 'react-router-dom'

const HomeLayout = () => {
  
  return (
    <div
      sx={{
        background: "linear-gradient(to bottom, #f0f2f5, #d9e2ec)", 
      }}
    >
        <HomeNavbar/>
        <Outlet/>
    </div>
  )
}

export default HomeLayout