//========================== Import Modules Start ===========================

import { SignUp_User , SignIn_User, SignUp_Toggle, Logout_User, Add_Article, Upload_ProfilePicture, Add_ArticleBanner, Delete_Article, Updated_Article, User_Profile, Get_Blogs, Loading, Like_Article, Get_LikeArticle, Comment_Article, Get_CommentArticle} from "./actionTypes";
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

export const updateArticle = (id, values, Banner) => {

    return (dispatch) => {
        Axios.put(`/updateArticle/?ID=${id}`, {values, Banner})
        .then(() => {
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

export const addArticle = (values,Banner) => {
    
    return (dispatch) => {
        Axios.post(`/addArticle`, {values, Banner})
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
        .then((res) => {
            dispatch({type: Add_ArticleBanner, payload: res.data});
        })
        .catch(err => {
            console.log(err);
        })
    }
}

//============================= End =============================

//============================= Get Blogs Action Start =============================

export const getBlogs = (searchValue) => {
    console.log("searchValue", searchValue);
    return (dispatch) => {
        Axios.get(`/getBlogs/?Search=${searchValue}`)
        .then((res) => {
            dispatch({type: Get_Blogs, payload: res.data});
        })
        .catch(err => {
            console.log(err);
        })
    }
}

//============================= End =============================

//============================= Like Article Action Start =============================

export const likeArticle = (articleId, userId, username) => {

    return (dispatch) => {
        Axios.post(`/likeArticle/?ID=${articleId}`, {userId, username})
        .then((res) => {
            dispatch({type: Like_Article});
        })
        .catch(err => {
            console.log(err);
        })
    }
}

//============================= End =============================

//============================= Get Like Articles Action Start =============================

export const getLikeArticles = () => {

    return (dispatch) => {
        Axios.get(`/likeArticle`)
        .then((res) => {
            dispatch({type: Get_LikeArticle, payload: res.data});
        })
        .catch(err => {
            console.log(err);
        })
    }
}

//============================= End =============================

//============================= Comment Article Action Start =============================

export const commentArticle = (comment, articleId, userId, username) => {

    return (dispatch) => {
        Axios.post(`/commentArticle/?ID=${articleId}`, {comment, userId, username})
        .then(() => {
            dispatch({type: Comment_Article});
        })
        .catch(err => {
            console.log(err);
        })
    }
}

//============================= End =============================

//============================= Get Comment Articles Action Start =============================

export const getCommentArticles = () => {

    return (dispatch) => {
        Axios.get(`/commentArticle`)
        .then((res) => {
            dispatch({type: Get_CommentArticle, payload: res.data});
        })
        .catch(err => {
            console.log(err);
        })
    }
}

//============================= End =============================


//============================= Loading Action Start =============================

export const loading = () => {

    return (dispatch) => {
        dispatch(Loading());
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