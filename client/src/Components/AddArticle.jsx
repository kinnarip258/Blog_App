//========================== Import Modules Start ===========================

import React from "react";
import {useFormik} from "formik";
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import {useHistory} from "react-router-dom";

//========================== Import Modules End =============================

//============================= Add Article Component Start =============================

const AddArticle = () => {

  //============================= Navigate the Page =============================
  const history = useHistory();

  //============================= dispatch Api Request =============================
  const dispatch = useDispatch();

  //============================= UseFormik =============================
  const formik = useFormik({
    //============================= Initial Values =============================
    initialValues: {
        title:"", description:"", category:"", tags:""  
    },
    validationSchema: Yup.object().shape({
        title: Yup.string()
          .min(3, 'Too Short!')
          .max(50, 'Too Long!')
          .required('Required'),
        description: Yup.string()
          .min(10, 'Too Short!')
          .max(300, 'Too Long!')
          .required('Required'),
        category: Yup.string().required('Required'),
        tags: Yup.string()
          .min(3, 'Too Short!')
          .max(300, 'Too Long!')
          .required('Required'), 
      }),
      onSubmit: (values) => {
          console.log(values, "values");
      }
  })

  return (
    <>
        <div class="login-page">
                <div className="header_div">
                    <h1>Add Article </h1>
                </div> 
                <div class="form">
                    <form class="login-form" onSubmit={formik.handleSubmit}>
                    <input {...formik.getFieldProps("title")} value={formik.values.title}  name="title"  type="text" placeholder="Title"/>
                    {formik.errors.title && formik.touched.title ? (
                        <div className = "error">{formik.errors.title}</div>
                    ) : null}

                    <select {...formik.getFieldProps("category")} value={formik.values.category} name="category">
                      <option>Select Category...</option>
                      <option>Food</option>
                      <option>Fashion</option>
                      <option>Travel</option>
                      <option>Business</option>
                      <option>Personal</option>
                    </select>
                    {formik.errors.category && formik.touched.category ? (
                        <div className = "error">{formik.errors.category}</div>
                    ) : null}

                    <input {...formik.getFieldProps("tags")} value={formik.values.tags}  name="tags"  type="text" placeholder="Tags"/>
                    {formik.errors.tags && formik.touched.tags ? (
                        <div className = "error">{formik.errors.tags}</div>
                    ) : null}

                    <textarea rows="5" cols="43" {...formik.getFieldProps("description")} value={formik.values.description}  name="description"  type="Description" placeholder="Description"/>
                    {formik.errors.description && formik.touched.description ? (
                        <div className = "error">{formik.errors.description}</div>
                    ) : null}
                    
                    
                    <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
    </>
  )
}

//============================= register Component End =============================

//============================= Export Default Start =============================

export default AddArticle;

//============================= Export Default End =============================