//========================== Import Modules Start ===========================

import { SignUp_User , SignIn_User, SignUp_Toggle, User_Profile, Updated_Profile, Logout_User, Delete_User, Add_Article, Upload_ProfilePicture, Add_ArticleBanner} from "./actionTypes";
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
        .then((res) => {
            toast.success(res.data.msg, { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
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

export const uploadProfilePicture = (values) => {

    return (dispatch) => {

        Axios.post(`/uploadProfilePicture`, values)
        .then((res) => {
            toast.success(res.data.msg, { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
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


//============================= User Profile Action Start =============================

export const userProfile = () => {

    return (dispatch) => {
        Axios.get(`/userProfile`)
        .then((res) => {
            dispatch({type: User_Profile, payload: res.data})
        })
        .catch(err => {
            console.log(err);
        })
    }
}

//============================= End =============================

//============================= Edit Profile Action Start =============================

export const updateProfile = (id, values, email, username) => {

    console.log("data",id, values, email, username);
    return (dispatch) => {
        Axios.put(`/updateUserProfile/?ID=${id}&Email=${email}&Username=${username}`, values)
        .then((res) => {
            toast.success(`Profile Updated Successfully!`, { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            dispatch({type: Updated_Profile, payload: res.data})
        })
        .catch(() => {
            toast.error("Email Or Username Already Exist!", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
        })
    }
}

//============================= End =============================

//============================= Delete User Action Start =============================

export const deleteUser = (email) => {

    return (dispatch) => {
        Axios.delete(`/deleteUser/?Email=${email}`)
        .then(() => {
            toast.success(`Deleted Successfully!`, { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            dispatch({type: Delete_User})
        })
        .catch(err => {
            console.log(err);
        })
    }
}

//============================= End =============================


//============================= Add Article Action Start =============================

export const addArticle = (article) => {

    return (dispatch) => {
        Axios.post(`/addArticle`, article)
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

export const addArticleBanner = (article) => {

    return (dispatch) => {
        Axios.post(`/addArticleBanner`, article)
        .then(() => {
            toast.success(`Article Added Successfully!`, { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            dispatch({type: Add_ArticleBanner});
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