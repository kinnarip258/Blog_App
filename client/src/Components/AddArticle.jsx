//========================== Import Modules Start ===========================

import React, {useEffect, useState} from "react";
import {useFormik} from "formik";
import queryString from "query-string";
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import {useHistory} from "react-router-dom";
import { addArticle, addArticleBanner, loading, updateArticle } from "../Actions/actions";

//========================== Import Modules End =============================

//============================= Add Article Component Start =============================

const AddArticle = () => {

  //============================= Navigate the Page =============================
  const history = useHistory();

  const Toggle = useSelector(state => state.Toggle);

  const Banner = useSelector(state => state.Banner);

  const User = useSelector(state => state.User)

  //============================= Get Edited User Id =============================
  const {id} = queryString.parse(window.location.search);

  //============================= Store Edite Employee Data =============================
  const [editedObject,setEditedObject] = useState([]);
  
  //============================= dispatch Api Request =============================
  const dispatch = useDispatch();

  const [banner, setBanner] = useState('');
  
  const [article, setArticle] = useState('');

  //============================= UseFormik =============================
  const formik = useFormik({
    //============================= Initial Values =============================
    initialValues: {
        title:"", description:"", category:"", tags:"",  
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
        if(id){ 
          const formData = new FormData();
          formData.append('image', banner[0]);
          dispatch(addArticleBanner(formData)) 
          setArticle(values) 
        }
        else{
          const formData = new FormData();
          formData.append('image', banner[0]);
          dispatch(addArticleBanner(formData))
          setArticle(values)
        }
      }
  });

  useEffect(() => {
    if(Banner.length !== 0 && !id){
      dispatch(addArticle(article, Banner));
      setArticle('')
    }
    else if (Banner.length !== 0 && id){
      dispatch(updateArticle(id, article, Banner));
      setArticle('')
    }
  }, [Banner]);

  useEffect(() => {
    if(Toggle === true){
      //============================= Navigate to profile =============================
      history.push('/myArticles');
    }
  }, [Toggle, dispatch]);

  //============================= UseEffect For Get EditUser Data =============================
  useEffect(() => {
    if(id){
        //============================= get Edited User Data =============================
        const editUser = User.Articles.find((ele) => ele._id === id ? ele : null);
        console.log("editUser",editUser);
        setEditedObject(editUser);
    }
  },[id]);

  //============================= Set Edited User Data to InitialValues =============================
  useEffect(() => {
    if(id && editedObject) {
        //setvalues
        formik.setValues(editedObject)
    }
  },[editedObject]);

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
                      <option value={"Food"}>Food</option>
                      <option value={"Fashion"}>Fashion</option>
                      <option value={"Travel"}>Travel</option>
                      <option value={"Business"}>Business</option>
                      <option value={"Personal"}>Personal</option>
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

                    {
                      id ? <img src={editedObject.banner} alt ="article Banner"/> : null
                    }

                    <input name="files" type="file" onChange={(e) => setBanner(e.target.files)}/>
                    
                    <button type="submit">{!id ? "Submit" : "Update"}</button>
                    
                    </form>
                </div>
            </div>
    </>
  )
}

//============================= Add Article Component End =============================

//============================= Export Default Start =============================

export default AddArticle;

//============================= Export Default End =============================