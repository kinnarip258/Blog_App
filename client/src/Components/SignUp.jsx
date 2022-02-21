//========================== Import Modules Start ===========================

import React from "react";
import {useFormik} from "formik";
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { signUpUser } from "../Actions/actions";
//========================== Import Modules End =============================

//============================= Register Component Start =============================

const SignUp = () => {

    //============================= dispatch Api Request =============================
    const dispatch = useDispatch();

    //============================= UseFormik =============================
    const formik = useFormik({
        //============================= Initial Values =============================
        initialValues: {
            name:"", email:"", phone:"",username:"", password:"" , cpassword:"",  
        },
        validationSchema: Yup.object().shape({
            name: Yup.string()
                .min(3, 'Too Short!')
              .max(15, 'Too Long!')
              .required('Required'),
            email: Yup.string().email('Invalid email').required('Required'),
            phone: Yup.string()
              .min(10, 'Too Short!')
              .max(12, 'Too Long!')
              .required('Required'),
            username: Yup.string()
              .min(3, 'Too Short!')
              .max(30, 'Too Long!')
              .required('Required'), 
            password: Yup.string()
              .min(8, 'Too Short!')
              .max(100, 'Too Long!')
              .required('Required'),  
            cpassword: Yup.string()
              .min(8, 'Too Short!')
              .max(100, 'Too Long!')
              .required('Required'), 
        }),
        onSubmit: (values) => {
            dispatch(signUpUser(values))
            console.log(values, "values");
        }
    })
    return (
        <>
            <div class="login-page">
                <div className="header_div">
                    <h1>Registration Form</h1>
                </div> 
                <div class="form">
                    <form class="login-form" onSubmit={formik.handleSubmit}>
                    <input {...formik.getFieldProps("name")} value={formik.values.name}  name="name"  type="text" placeholder="Name"/>
                    {formik.errors.name && formik.touched.name ? (
                        <div className = "error">{formik.errors.name}</div>
                    ) : null}
                    <input {...formik.getFieldProps("email")} value={formik.values.email}  name="email"  type="email" placeholder="Email"/>
                    {formik.errors.email && formik.touched.email ? (
                        <div className = "error">{formik.errors.email}</div>
                    ) : null}
                    <input {...formik.getFieldProps("phone")} value={formik.values.phone}  name="phone"  type="number" placeholder="Phone Number"/>
                    {formik.errors.phone && formik.touched.phone ? (
                        <div className = "error">{formik.errors.phone}</div>
                    ) : null}
                    <input {...formik.getFieldProps("username")} value={formik.values.username}  name="username"  type="text" placeholder="Username"/>
                    {formik.errors.username && formik.touched.username ? (
                        <div className = "error">{formik.errors.username}</div>
                    ) : null}
                    <input {...formik.getFieldProps("password")} value={formik.values.password}  name="password"  type="password" placeholder="password"/>
                    {formik.errors.password && formik.touched.password ? (
                        <div className = "error">{formik.errors.password}</div>
                    ) : null}
                    <input {...formik.getFieldProps("cpassword")} value={formik.values.cpassword}  name="cpassword"  type="password" placeholder="Confirm Password"/>
                    {formik.errors.cpassword && formik.touched.cpassword ? (
                        <div className = "error">{formik.errors.cpassword}</div>
                    ) : null}
                    <button type="submit">create</button>
                    </form>
                    <p class="message">Already registered? <a href="/signIn">Sign In</a></p>
                </div>
            </div>
        </>
    )
}

//============================= register Component End =============================

//============================= Export Default Start =============================

export default SignUp;

//============================= Export Default End =============================