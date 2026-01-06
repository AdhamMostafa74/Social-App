import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button } from "@heroui/react";
import React, { useContext } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { counterContext } from "../Context/CounterContext";
import { authContext } from "../Context/AuthContext";




export default function AppNavbar() {
  const navigate = useNavigate();
  const { isLoggedIn, setisLoggedIn } = useContext(authContext);

  function signOut() {
    localStorage.removeItem('token')
    setisLoggedIn(false)
    navigate('/login')

  }
  return (
    <Navbar>
      <NavbarBrand className="gap-4">
        <Link to={'/'}  className="font-bold text-primary p-3 border rounded-2xl cursor-pointer">Home</Link>
        <Link to={'/profile'} className="font-bold text-primary p-3 border rounded-2xl cursor-pointer">Profile</Link>

      </NavbarBrand>
      
      <NavbarContent justify="end">
        {
          isLoggedIn ? <NavbarItem className="flex">
            <Button onPress={signOut} color="danger" variant="flat">
              Sign Out
            </Button>
          </NavbarItem>
            : <>
              <NavbarItem className="flex">
                <Button color="default" >Login</Button>
              </NavbarItem>
              <NavbarItem className="flex">
                <Button color="primary" variant="flat">
                  Sign Up
                </Button>
              </NavbarItem >
            </>
        }


      </NavbarContent>
    </Navbar>
  );
}
