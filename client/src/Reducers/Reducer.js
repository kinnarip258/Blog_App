//========================== Import Modules Start ===========================

import { SignIn_User, SignUp_User, SignUp_Toggle, User_Profile, Updated_Profile,Logout_User, Delete_User, Add_Article, Upload_ProfilePicture, Add_ArticleBanner, Updated_Article, Delete_Article, Get_Blogs, Loading, Like_Article, Get_LikeArticle, Comment_Article, Get_CommentArticle } from "../Actions/actionTypes";

//========================== Import Modules End =============================

const initialState = { 
    LoginState : true,
    User : [],
    Toggle: false,
    Blogs: [],
    Banner: [],
    Like: [],
    Comment: [],
    MyArticles:[]
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
                User: action.payload.LoginUser,
                MyArticles: action.payload.MyArticles,
                Toggle: false
            }
        case Get_Blogs:
            
            return {
                ...state,
                Blogs: action.payload,
                Toggle: false,
            }

        case Add_Article: 

        return {
            ...state,
            Toggle: true,
            Banner: []
        }

        case Add_ArticleBanner:
            
            return {
                ...state,
                Banner: action.payload
            }
         
        case Updated_Article:

            return{
                ...state,
                Toggle: true,
                Banner: []
            }

        case Delete_Article: 

            return {
                ...state,
                Toggle: true 
            }

        case Like_Article: 

            return {
                ...state,
                Toggle: true,
            }

        case Get_LikeArticle:

            return {
                ...state,
                Like: action.payload
            }
        
        case Comment_Article: 

            return {
                ...state,
                Toggle: true,
            }

        case Get_CommentArticle:

            return {
                ...state,
                Comment: action.payload
            }

        case Logout_User :

            return{
                ...state,
                LoginState : true,
                User : [],
                Toggle: false,
                Blogs: [],
                Banner: [],
                Like: [],
                Comment: []
            }
           
        default: 
            return state
    }
}

export default Reducer;