import { SignIn_User, SignUp_User, SignUp_Toggle, User_Profile, Updated_Profile,Logout_User, Delete_User, Add_Article, Upload_ProfilePicture, Add_ArticleBanner, Updated_Article, Delete_Article, Get_Blogs } from "../Actions/actionTypes";

const initialState = { 
    LoginState : true,
    User : [],
    Toggle: false,
    Blogs: []
}

const Reducer = (state = initialState, action) => {
    switch(action.type){
        case SignUp_User:

            return{
                ...state,
                
            }

        case Upload_ProfilePicture:

            return{
                ...state,
                Toggle: true
            }

        case SignUp_Toggle: 

            return{
                ...state,
                Toggle: false
            }

        case SignIn_User:

            return{
                ...state,
                LoginState : false
            }

        case User_Profile:

            return{
                ...state,
                User: action.payload,
                Toggle: false
            }

        case Updated_Article:

            return{
                ...state,
                Toggle: true
            }

        case Delete_Article: 

            return {
                ...state,
                Toggle: true 
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
         
        case Get_Blogs:
            console.log("action.payload", action.payload);
            return {
                ...state,
                Blogs: action.payload
            }
        case Logout_User :

            return{
                ...state,
                User : [],
                LoginState: true,
                Blogs: []
            }
            
        default: 
            return state
    }
}

export default Reducer;