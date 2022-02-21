//========================== Import Modules Start ===========================

import React from 'react'
import { Switch, Route, Redirect } from "react-router-dom";
import SignIn from '../Components/SignIn';
import SignUp from '../Components/SignUp';
import Blogs from '../Components/Blogs';
import Logout from '../Components/Logout';
import Profile from '../Components/Profile';
import Home from '../Components/Home';
import AddArticle from "../Components/AddArticle";
import ProtectedRoute from '../Components/ProtectedRoute';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
//========================== Import Modules End =============================

//============================= Routes Component Start =============================


const Routes = () => {

  const cookie = Cookies.get('blog'); 
  
  const LoginState = useSelector(state => state.LoginState)

  return (
    <div>
        <Switch>
            <Route exact path= '/' component= {Home} />

            <ProtectedRoute exact path= '/blogs' component= {Blogs} authStatus = {cookie}/>
            <ProtectedRoute exact path= '/addArticle' component= {AddArticle} authStatus = {cookie}/>
            <ProtectedRoute exact path= '/profile' component= {Profile} authStatus = {cookie}/>
            <ProtectedRoute exact path= '/logout' component= {Logout} authStatus = {cookie}/>
            {
              cookie === undefined && LoginState === true ? (
                <>
                  <Route exact path= '/signUp' component= {SignUp} />
                  <Route exact path= '/signIn' component= {SignIn} />
                </>
              ) : <Redirect to= '/blogs' />
            } 
        </Switch>
    </div>
  )
}

export default Routes