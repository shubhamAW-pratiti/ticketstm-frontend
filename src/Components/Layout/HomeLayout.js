import React from 'react'
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