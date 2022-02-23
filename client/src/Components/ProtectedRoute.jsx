//========================== Import Modules Start ===========================

import React, { useState } from 'react'
import {Route, Redirect} from 'react-router-dom';

//========================== Import Modules End =============================

//============================= Protected Route Component Start =============================

//protected route
//authstate: authenticate state
//component: componenet connected with route
//...rest: rest of the properties
const ProtectedRoute = ({authStatus, component: Component, ...rest}) => { 

    return (
        <>  
            <Route {...rest} render= {(props) => {
                if(authStatus !== undefined) {
                    return <Component {...props}/>;
                }
                else{
                    return <Redirect to='/'/>
                }
            }}/>   
        </>
    )     
}
//{{ path: "/Login", state: { from: props.location } }}
//============================= Protected Route Component End =============================

//============================= Export Default Start =============================

export default ProtectedRoute;

//============================= Export Default End =============================
