//========================== Import Modules Start ===========================

import React from 'react'
import {useFormik} from "formik";
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { signInUser} from '../Actions/actions';
//========================== Import Modules End =============================

//============================= Login Component Start =============================

const SignIn = () => {

  //============================= dispatch Api Request =============================
  const dispatch = useDispatch();

  //============================= UseFormik =============================
  const formik = useFormik({
      //============================= Initial Values =============================
      initialValues: {
        username:"", password:"" 
      },
      validationSchema: Yup.object().shape({
        username: Yup.string()
          .min(3, 'Too Short!')
          .max(30, 'Too Long!')
          .required('Required'), 
        password: Yup.string()
          .min(8, 'Too Short!')
          .max(100, 'Too Long!')
          .required('Required'),  
      }),
      onSubmit: (values) => {
        dispatch(signInUser(values))
      }
  })
  return (
    <div>
        <div class="login-page">
            <div className="header_div">
              <h1>Login Form</h1>
            </div> 
            <div class="form">
              <form class="login-form" onSubmit={formik.handleSubmit}>
              <input {...formik.getFieldProps("username")} value={formik.values.username}  name="username" type="text" placeholder="username"/>
              {formik.errors.username && formik.touched.username ? (
                <div className = "error">{formik.errors.username}</div>
              ) : null}
              <input {...formik.getFieldProps("password")} value={formik.values.password}  name="password" type="password" placeholder="password"/>
              {formik.errors.password && formik.touched.password ? (
                <div className = "error">{formik.errors.password}</div>
              ) : null}
              <button type="submit">login</button>
              </form>
              <p class="message">Not registered? <a href="/signUp">Create an account</a></p>
            </div>
        </div>
    </div>
  )
}

//============================= Login Component End =============================

//============================= Export Default Start =============================

export default SignIn;

//============================= Export Default End =============================