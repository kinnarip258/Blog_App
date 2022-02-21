//========================== Import Modules Start ===========================

import React from 'react'
import { Switch, Route, Redirect } from "react-router-dom";
import SignIn from '../Components/SignIn';
import SignUp from '../Components/SignUp';
import Blogs from '../Components/Blogs';
import Logout from '../Components/Logout';
import Profile from '../Components/Profile';
import Home from '../Components/Home';

//========================== Import Modules End =============================

//============================= Routes Component Start =============================


const Routes = () => {
  return (
    <div>
        <Switch>
            <Route exact path= '/' component= {Home} />
            <Route exact path= '/signUp' component= {SignUp} />
            <Route exact path= '/signIn' component= {SignIn} />
            <Route exact path= '/blogs' component= {Blogs} />
            <Route exact path= '/profile' component= {Profile} />
            <Route exact path= '/logout' component= {Logout} />
        </Switch>
    </div>
  )
}

export default Routes