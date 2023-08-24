import React from 'react'
import HomeNavbar from '../HomeNavbar'
import { Outlet } from 'react-router-dom'

const HomeLayout = () => {
<<<<<<< HEAD

=======
  const [activeLink, setActiveLink] = React.useState('');
>>>>>>> 5edfbc3 (ActiveLinkCotex)
  return (
    <div
      sx={{
        background: "linear-gradient(to bottom, #f0f2f5, #d9e2ec)", 
      }}
    >
<<<<<<< HEAD
        <HomeNavbar/>
        <Outlet />
=======
        <HomeNavbar activeLink={activeLink} setActiveLink={setActiveLink}/>
        <Outlet setActiveLink={setActiveLink}/>
>>>>>>> 5edfbc3 (ActiveLinkCotex)
    </div>
  )
}

export default HomeLayout