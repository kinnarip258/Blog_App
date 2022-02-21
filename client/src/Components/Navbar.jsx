//========================== Import Modules Start ===========================

import React from 'react';
import { NavLink } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';

//========================== Import Modules End =============================

//============================= Navbar Component Start =============================

const Navbar = () => {

    const cookie = Cookies.get('blog'); 

    const LoginState = useSelector(state => state.LoginState)
    return (
        <>
            <div className="nav_div" >

                <NavLink to = '/' className='links'> Home </NavLink>
                
                {
                    cookie === undefined && LoginState === true ? (
                        <>
                            <NavLink to = '/signUp' className='links'> SignUp </NavLink>
                            <NavLink to = '/signIn' className='links'> SignIn </NavLink> 
                        </>
                    ) : null
                }
                {
                    cookie !== undefined ? (
                        <>
                            <NavLink to = '/blogs' className='links'> Blogs </NavLink>
                            <NavLink to = '/profile' className='links'> Profile </NavLink>           
                            <NavLink to = '/addArticle' className='links'> Add New Article </NavLink>
                            <NavLink to = '/logout' className='links'> Logout </NavLink>
                        </>
                    ) : null
                }
                
                <hr/>
            </div>  
        </>
    )
}

//============================= Navbar Component End =============================

//============================= Export Default Start =============================

export default Navbar;

//============================= Export Default End =============================
