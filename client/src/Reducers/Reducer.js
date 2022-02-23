import { SignIn_User, SignUp_User, SignUp_Toggle, User_Profile, Updated_Profile,Logout_User, Delete_User, Add_Article, Upload_ProfilePicture, Add_ArticleBanner } from "../Actions/actionTypes";

const initialState = { 
    LoginState : true,
    LoginUser : [],
    Toggle: false
}

const Reducer = (state = initialState, action) => {
    switch(action.type){
        case SignUp_User:
            return{
                ...state,
                Toggle: true
            }

        case Upload_ProfilePicture:
            return{
                ...state
            }

        case SignUp_Toggle: {
            return{
                ...state,
                Toggle: false
            }
        }

        case SignIn_User:
            return{
                ...state,
                LoginState : false
            }

        case User_Profile:
            return{
                ...state,
                LoginUser : action.payload,
                Toggle: false
            }

        case Updated_Profile:

            return{
                ...state,
                LoginUser : action.payload,
                Toggle: true
            }

        case Delete_User: 
            return {
                ...state,
                LoginUser : "",
                LoginState: true
            }

        case Add_Article: 

            return {
                ...state,
                Toggle: true
            }

        case Add_ArticleBanner:
            return {
                ...state,
            }
        case Logout_User :

            return{
                ...state,
                LoginUser : "",
                LoginState: true
            }
            
        default: 
            return state
    }
}

export default Reducer;