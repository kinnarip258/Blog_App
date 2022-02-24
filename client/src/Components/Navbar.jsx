//========================== Import Modules Start ===========================

import React from 'react';
import { NavLink } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';

//========================== Import Modules End =============================

//============================= Navbar Component Start =============================

const Navbar = () => {

    const cookie = Cookies.get('blog'); 

    const LoginState = useSelector(state => state.LoginState);

    const User = useSelector(state => state.User);
   
    return (
        <>
            <div className="nav_div" >

                <NavLink to = '/' className='links'> Home </NavLink>
                
                {
                    User.length === 0 && LoginState === true && cookie === undefined && (
                        <>
                            <NavLink to = '/signUp' className='links'> SignUp </NavLink>
                            <NavLink to = '/signIn' className='links'> SignIn  </NavLink> 
                        </>
                    )
                }
                {
                    cookie !== undefined && (
                        <>
                            <div>
                                <NavLink to = '/blogs' className='links'> Blogs  </NavLink>
                                <NavLink to = '/myArticles' className='links'>  My Articles </NavLink>
                                <NavLink to = '/logout' className='links'> Logout </NavLink>
                            </div>

                            {
                                User && (
                                    <>
                                        <h3>{`Welcome ${User.name} Sign In as ${User.email}`}</h3>
                                    </>
                                )
                            }
                        </>
                    ) 
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
