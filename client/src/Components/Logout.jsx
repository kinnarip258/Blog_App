import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../Actions/actions';
import {useHistory} from "react-router-dom";

const Logout = () => {

  //============================= dispatch Api Request =============================
  const dispatch = useDispatch();

  const LoginState = useSelector(state => state.LoginState);

  //============================= Navigate the Page =============================
  const history = useHistory();

  useEffect(() => {
    if(LoginState === true){
        history.push('/'); 
    }   
}, [LoginState])


  useEffect(() => {
    dispatch(logout())
  }, [dispatch]);


  return (
    <>

    </>
  )
}

export default Logout