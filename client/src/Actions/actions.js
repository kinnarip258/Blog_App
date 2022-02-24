//========================== Import Modules Start ===========================

import { SignUp_User , SignIn_User, SignUp_Toggle, Logout_User, Add_Article, Upload_ProfilePicture, Add_ArticleBanner, Delete_Article, Updated_Article, User_Profile, Get_Blogs} from "./actionTypes";
import Axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

//========================== Import Modules End =============================

//============================= Actions =============================

//============================= Register User Action Start =============================

export const signUpUser = (values) => {

    return (dispatch) => {

        Axios.post(`/signUp`, values)
        .then(() => {
            dispatch({type: SignUp_User})
        })
        .catch(err => {
            console.log(err);
            toast.error("Email Or Username Already Exist!", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
        })
    }
}

//============================= End =============================


//============================= Upload Profile Picture Action Start =============================

export const uploadProfilePicture = (profilePicture, username) => {
    
    return (dispatch) => {

        Axios.post(`/uploadProfilePicture/?Username=${username}`, profilePicture)
        .then((res) => {
            toast.success(`User Register Successfully!`, { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            dispatch({type: Upload_ProfilePicture})
        })
        .catch(err => {
            console.log(err);
            toast.error("Email Or Username Already Exist!", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
        })
    }
}

//============================= End =============================

//============================= Register Toggle Action Start =============================
export const signUpToggle = () => {

    return (dispatch) => {
        dispatch({type: SignUp_Toggle})        
    }
}
//============================= End =============================


//============================= Login Action Start =============================

export const signInUser = (values) => {

    return (dispatch) => {
        Axios.post(`/signIn`, values)
        .then((res) => {
            console.log(res.data.msg);
            toast.success(`${res.data.msg}`, { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            dispatch({type: SignIn_User})
        })
        .catch(err => {
            console.log(err);
            toast.error("Invalid Credentials!", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })
        })
    }
}

//============================= End =============================


//============================= Edit Profile Action Start =============================

export const userProfile = () => {

    return (dispatch) => {
        Axios.get(`/userProfile`)
        .then((res) => {
            dispatch({type: User_Profile, payload: res.data})
        })
        .catch((err) => {
            console.log(err);
        })
    }
}

//============================= End =============================


//============================= Edit Profile Action Start =============================

export const updateArticle = (id, values) => {

    return (dispatch) => {
        Axios.put(`/updateArticle/?ID=${id}`, values)
        .then((res) => {
            toast.success(`Article Updated Successfully!`, { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            dispatch({type: Updated_Article})
        })
        .catch(() => {
            toast.error("Email Or Username Already Exist!", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
        })
    }
}

//============================= End =============================

//============================= Delete User Action Start =============================

export const deleteArticle = (id) => {

    return (dispatch) => {
        Axios.delete(`/deleteArticle/?ID=${id}`)
        .then(() => {
            toast.success(`Deleted Successfully!`, { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            dispatch({type: Delete_Article})
        })
        .catch(err => {
            console.log(err);
        })
    }
}

//============================= End =============================


//============================= Add Article Action Start =============================

export const addArticle = (article, values) => {
    console.log(values);
    return (dispatch) => {
        Axios.post(`/addArticle/?Title=${values.title}&Categoty=${values.category}&Description=${values.description}&Tags=${values.tags}`, article)
        .then(() => {
            toast.success(`Article Added Successfully!`, { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            dispatch({type: Add_Article})
        })
        .catch(err => {
            console.log(err);
        })
    }
}

//============================= End =============================

//============================= Add Article Action Start =============================

export const addArticleBanner = (articleBanner) => {

    return (dispatch) => {
        Axios.post(`/addArticleBanner`, articleBanner)
        .then(() => {
            dispatch({type: Add_ArticleBanner});
        })
        .catch(err => {
            console.log(err);
        })
    }
}

//============================= End =============================

//============================= Get Blogs Action Start =============================

export const getBlogs = () => {

    return (dispatch) => {
        Axios.get(`/getBlogs`)
        .then((res) => {
            dispatch({type: Get_Blogs, payload: res.data});
        })
        .catch(err => {
            console.log(err);
        })
    }
}

//============================= End =============================


//============================= Logout Action Start =============================

export const logout = () => {

    return (dispatch) => {
        Axios.get(`/logout`)
        .then((res) => {
            dispatch({type: Logout_User})
            toast.success(`Logout Successfully!`, { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
        })
        .catch(err => {
            console.log(err);
        })
    }
}

//============================= End =============================