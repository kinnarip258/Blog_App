//========================== Import Modules Start ===========================

import { SignUp_User , SignIn_User} from "./actionTypes";
import Axios from 'axios';

//========================== Import Modules End =============================

//============================= Actions =============================

//============================= Register User Action Start =============================

export const signUpUser = (values) => {

    return(
        (dispatch) => {
            Axios.post(`/signUp`, values)
            .then((res) => {
                dispatch({type: SignUp_User})
            })
            .catch(err => {
                console.log("error: ", err);
            })
        }
    )
}

//============================= End =============================

//============================= Login Action Start =============================

export const signInUser = (values) => {
    console.log("values from actions", values);
    return(
        (dispatch) => {
            Axios.post(`/signIn`, values)
            .then(() => {
                dispatch({type: SignIn_User})
            })
            .catch(err => {
                dispatch({type: SignIn_User})
                console.log("error: ", err);
            })
        }
    )
}

//============================= End =============================