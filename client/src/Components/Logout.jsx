import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../Actions/actions';
import {useHistory} from "react-router-dom";

const Logout = () => {

  //============================= dispatch Api Request =============================
  const dispatch = useDispatch();

  //============================= Redux State =============================
  const LoginState = useSelector(state => state.LoginState);

  //============================= Navigate the Page =============================
  const history = useHistory();

  //============================= UseEffect For Toggle =============================
  useEffect(() => {
    if(LoginState === true){
        history.push('/'); 
    }   
}, [LoginState])


  //============================= UseEffect For Logout Dispatch =============================
  useEffect(() => {
    dispatch(logout())
  }, [dispatch]);


  return (
    <>

    </>
  )
}

export default Logout