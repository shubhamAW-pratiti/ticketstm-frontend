import React from 'react'
import Home from '../Home'
import HomeNavbar from '../HomeNavbar'
import { Outlet } from 'react-router-dom'

const HomeLayout = () => {
  return (
    <div>
        <HomeNavbar />
        <Outlet />
    </div>
  )
}

export default HomeLayout