//========================== Import Modules Start ===========================

import React from 'react';
import { NavLink } from 'react-router-dom';


//========================== Import Modules End =============================

//============================= Navbar Component Start =============================

const Navbar = () => {

    return (
        <>
            <div className="nav_div" >
                <NavLink to = '/' className='links'> Home </NavLink>
                <NavLink to = '/signUp' className='links'> SignUp </NavLink>
                <NavLink to = '/signIn' className='links'> SignIn </NavLink> 
                <NavLink to = '/blogs' className='links'> Blogs </NavLink>
                <NavLink to = '/profile' className='links'> Profile </NavLink>           
                <NavLink to = '/logout' className='links'> Logout </NavLink>
                <hr/>
            </div>  
        </>
    )
}

//============================= Navbar Component End =============================

//============================= Export Default Start =============================

export default Navbar;

//============================= Export Default End =============================
