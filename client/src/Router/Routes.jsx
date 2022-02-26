//========================== Import Modules Start ===========================

import React, { useEffect } from 'react'
import { Switch, Route, Redirect } from "react-router-dom";
import SignIn from '../Components/SignIn';
import SignUp from '../Components/SignUp';
import Blogs from '../Components/Blogs';
import Logout from '../Components/Logout';
import Home from '../Components/Home';
import AddArticle from "../Components/AddArticle";
import ProtectedRoute from '../Components/ProtectedRoute';
import {useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import MyArticles from '../Components/MyArticles';
import { userProfile } from '../Actions/actions';
//========================== Import Modules End =============================

//============================= Routes Component Start =============================

const Routes = () => {

  const cookie = Cookies.get('blog'); 
  
  const LoginState = useSelector(state => state.LoginState)

  const User = useSelector(state => state.User);

  const dispatch = useDispatch();

  useEffect(() => {
    if(cookie !== undefined){
      dispatch(userProfile())
    }
  }, [cookie, dispatch])
  return (
    <div>
        <Switch>
            <Route exact path= '/' component= {Home} />

            <ProtectedRoute exact path = '/EditArticle/:id' component={AddArticle} authStatus = {cookie}/>
            <ProtectedRoute exact path= '/blogs' component= {Blogs} authStatus = {cookie}/>
            <ProtectedRoute exact path= '/addArticle' component= {AddArticle} authStatus = {cookie}/>
            <ProtectedRoute exact path = '/myArticles' component={MyArticles} authStatus = {cookie}/>
            <ProtectedRoute exact path= '/logout' component= {Logout} authStatus = {cookie}/>
            {
              User.length === 0 && LoginState === true && cookie === undefined  ? (
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